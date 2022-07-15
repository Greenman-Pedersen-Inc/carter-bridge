require([
    'esri/Map',
    'esri/views/MapView',
    'esri/layers/FeatureLayer',
    'esri/layers/GraphicsLayer',
    'esri/geometry/geometryEngine',
    'esri/Graphic',
], function (Map, MapView, FeatureLayer, GraphicsLayer, geometryEngine, Graphic) {
    var attTypeSelect = document.getElementById('attractions');

    //attractions
    var attractions = new FeatureLayer({
        url: 'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0',
        outFields: ['*'],
        visible: false,
    });

    //GraphicsLayer for desplaying results
    var resultsLayer = new GraphicsLayer();

    const map = new Map({
        basemap: 'hybrid',
        // layers: [demographicGroupLayer],
    });

    var view = new MapView({
        container: 'viewDiv',
        map: map,
        center: [-81.643005, 38.3577], //Longitude, latitude
        zoom: 15,
    });
    view.ui.add('infoDiv', 'top-right');

    //query all features from the attractions layer
    view.when(function () {
        return attractions.when(function () {
            var query = attractions.createQuery();
            return attractions.queryFeatures(query);
        });
    })
        .then(getValues)
        .then(getUniqueValues)
        .then(addToSelect);

    // return an array of all the values in the
    // Type field of the attractions layer
    function getValues(response) {
        var features = response.features;
        var values = features.map(function (feature) {
            return feature.attributes.Type;
        });
        return values;
    }

    // return an array of unique values in
    // the Type field of the attractions layer
    function getUniqueValues(values) {
        var uniqueValues = [];

        values.forEach(function (item, i) {
            if ((uniqueValues.length < 1 || uniqueValues.indexOf(item) === -1) && item !== '') {
                uniqueValues.push(item);
            }
        });
        return uniqueValues;
    }

    // Add the unique values to the attractions type
    // select element. This will allow the user
    // to filter attractions by type.
    function addToSelect(values) {
        values.sort();
        values.forEach(function (value) {
            var option = document.createElement('option');
            option.text = value;
            attTypeSelect.add(option);
        });

        return setattractionsDefinitionExpression(attTypeSelect.value);
    }

    // set the definition expression on the attractions
    // layer to reflect the selection of the user
    function setattractionsDefinitionExpression(newValue) {
        //You messed up the SQL syntax for the defenition query
        attractions.definitionExpression = "Type = '" + newValue + "'";
        if (!attractions.visible) {
            attractions.visible = true;
        }
        //You misspelled the function name here
        return queryForAttractionGeometries();
    }

    //You forgot to add the evenet listener for attTypeSelect change
    // set a new definitionExpression on the attractions layer
    attTypeSelect.addEventListener('change', function () {
        var type = event.target.value;
        setattractionsDefinitionExpression(type);
    });

    // Get all the geometries of the attractions layer
    // the createQuery() method creates a query
    // object that respects the definitionExpression
    // of the layer
    function queryForAttractionGeometries() {
        var attractionsQuery = attractions.createQuery();
        return attractions.queryFeatures(attractionsQuery).then(function (response) {
            attractionsGeometries = response.features.map(function (feature) {
                return feature.geometry;
            });
            return attractionsGeometries;
        });
    }
});
// removes random &nbsp from top of page
var el = document.querySelector('body');
el.innerHTML = el.innerHTML.replace(/&nbsp;/g, '');
