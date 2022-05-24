require([
    'esri/Map',
    'esri/views/MapView',
    'esri/layers/FeatureLayer',
    'esri/widgets/LayerList',
    'esri/request',
    'esri/layers/GroupLayer',
    'esri/layers/MapImageLayer',
    'esri/PopupTemplate',
    'esri/core/urlUtils',
], (Map, MapView, FeatureLayer, LayerList, esriRequest, GroupLayer, MapImageLayer, PopupTemplate, urlUtils) => {
    const template = {
        title: '{name}',
        content: '{comments}',
    };

    // request GeoJson data from USGS remote server
    let url =
        "https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_Public_View/FeatureServer/0/query?where=1=1&outFields='*'&f=json";
    // "https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/query?where=1=1&outFields='*'&f=json";

    esriRequest(url, {
        responseType: 'json',
    }).then(function (response) {
        // The requested data
        let geoJson = response.data;
        console.log(response.data);
    });

    const map = new Map({
        basemap: 'hybrid',
        // layers: [demographicGroupLayer],
    });
    const view = new MapView({
        container: 'viewDiv',
        map: map,
        center: [-81.643005, 38.3577], //Longitude, latitude
        zoom: 15,
    });
    // Create GroupLayer with the two MapImageLayers created above
    // as children layers.

    const parcelLayerSQL = [
        'Phase = 1',
        'Phase = 2',
        'Phase = 3',
        'Phase = 4',
        'Phase = 5',
        'Phase = 6',
        'Phase = 7',
        'Phase = 8',
        'Phase = 9',
        'Phase = 10',
    ];
    let whereClause = parcelLayerSQL[0];

    const select = document.createElement('select', '');
    select.setAttribute('class', 'esri-widget esri-select');
    select.setAttribute('style', "width: 200px; font-family: 'Avenir Next'; font-size: 1em");
    parcelLayerSQL.forEach(function (query) {
        let option = document.createElement('option');
        option.innerHTML = query;
        option.value = query;
        select.appendChild(option);
    });
    view.ui.add(select, 'top-right');

    //Listen for change
    select.addEventListener('change', (event) => {
        whereClause = event.target.value;

        queryFeatureLayer(view.extent);
    });

    const parcelLayer = new FeatureLayer({
        url: 'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0',
    });

    var queryParams = parcelLayer.createQuery();
    queryParams.where = 'phase = 1';

    console.log(queryParams);

    function queryFeatureLayer(extent) {
        const parcelQuery = {
            where: whereClause, // Set by select element
            geometry: extent, // Restricted to visible extent of the map
            outFields: ['phase'], // Attributes to return
            returnGeometry: true,
        };

        parcelLayer
            .queryFeatures(parcelQuery)

            .then((results) => {
                console.log('Feature count: ' + results.features.length);

                displayResults(results);
            })
            .catch((error) => {
                console.log(error.error);
            });
    }

    function displayResults(results) {
        // Create a blue polygon
        const symbol = {
            type: 'simple-fill',
            style: 'none',
            outline: {
                color: '{color}',
                width: 0.5,
            },
        };

        const template = {
            title: '{name}',
            content: '{comments}',
        };

        // Assign styles and popup to features
        results.features.map((feature) => {
            feature.symbol = symbol;
            feature.template = template;
            return feature;
        });

        // Clear display
        view.popup.close();
        view.graphics.removeAll();
        // Add features to graphics layer
        view.graphics.addMany(results.features);
    }

    // const phaseAll = new FeatureLayer({
    //     url: 'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/query?where=status+%3E%3D+1&*%27&f=json',
    //     title: 'All Phases',
    //     visible: true,
    //     definitionExpression: 'phase > 0',
    // });

    // const phaseOne = new FeatureLayer({
    //     url: 'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/query?where=status+%3E%3D+1&*%27&f=json',
    //     title: 'Phase 1',
    //     visible: false,
    //     definitionExpression: 'phase = 1',
    // });
    // const phaseTwo = new FeatureLayer({
    //     url: 'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/query?where=status+%3E%3D+1&*%27&f=json',
    //     title: 'Phase 2',
    //     visible: false,
    //     definitionExpression: 'phase = 2',
    // });
    // const pahseThree = new FeatureLayer({
    //     url: 'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/query?where=status+%3E%3D+1&*%27&f=json',
    //     title: 'Phase 3',
    //     visible: false,
    //     definitionExpression: 'phase = 3',
    // });
    // const phaseFour = new FeatureLayer({
    //     url: 'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/query?where=status+%3E%3D+1&*%27&f=json',
    //     title: 'Phase 4',
    //     visible: false,
    //     definitionExpression: 'phase = 4',
    // });
    // const phaseFive = new FeatureLayer({
    //     url: 'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/query?where=status+%3E%3D+1&*%27&f=json',
    //     title: 'Phase 5',
    //     visible: false,
    //     definitionExpression: 'phase = 5',
    // });
    // const phaseSix = new FeatureLayer({
    //     url: 'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/query?where=status+%3E%3D+1&*%27&f=json',
    //     title: 'Phase 6',
    //     visible: false,
    //     definitionExpression: 'phase = 6',
    // });

    // const queryString = window.location.search;

    // console.log(queryString);
    // const urlParams = new URLSearchParams(queryString);
    // const phase = urlParams.get('phase');

    // console.log(phase);

    // function queryFeatureLayer(extent) {
    //     const parcelQuery = {
    //         where: whereClause, // Set by select element
    //         // spatialRelationship: 'intersects', // Relationship operation to apply
    //         geometry: extent, // Restricted to visible extent of the map
    //         outFields: ['*'], // Attributes to return
    //         returnGeometry: true,
    //     };
    //     parcelLayer
    //         .queryFeatures(parcelQuery)

    //         .then((results) => {
    //             console.log('Feature count: ' + results.features.length);
    //         })
    //         .catch((error) => {
    //             console.log(error.error);
    //         });
    // }

    // function queryFeatureLayer(extent) {
    //     const parcelQuery = {
    //         where: whereClause, // Set by select element
    //         spatialRelationship: 'intersects', // Relationship operation to apply
    //         geometry: extent, // Restricted to visible extent of the map
    //         outFields: ['*'], // Attributes to return
    //         returnGeometry: true,
    //     };

    //     parcelLayer
    //         .queryFeatures(parcelQuery)
    //         .then((results) => {
    //             console.log('Feature count: ' + results.features.length);

    //             displayResults(results);
    //         })
    //         .catch((error) => {
    //             console.log(error.error);
    //         });
    // }

    // Assign styles and popup to features

    // function displayResults(results) {
    //     // Create a blue polygon
    //     const symbol = {
    //         type: 'simple-fill',
    //         color: [20, 130, 200, 0.5],
    //         outline: {
    //             color: 'white',
    //             width: 0.5,
    //         },
    //     };
    // }

    // phaseSix.effect = [
    //     {
    //         scale: 36978595,
    //         // value: 'drop-shadow(3px, 3px, 4px)',
    //     },
    // ];

    // const demographicGroupLayer = new GroupLayer({
    //     title: 'Closures',
    //     visible: true,
    //     // visibilityMode: 'exclusive',
    //     // layers: [zeroLayer],
    //     layers: [phaseSix, phaseFive, phaseFour, pahseThree, phaseTwo, phaseOne, phaseAll],
    // });

    // demographicGroupLayer.popupTemplate = template;

    // view.when(async () => {
    //     const query = otherLayer.createQuery();
    //     query.where = 'status = 0';
    //     const { features } = await otherLayer.queryFeatures(query);
    //     console.log(features.length);
    // });

    /********************
     * Add feature layer
     ********************/
    // view.when(() => {
    //     const featureLayer = new FeatureLayer({
    //         url: 'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/arcgis/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer',
    //         title: 'Closures',
    //         visible: false,
    //         definitionExpression: 'phase = 1',
    //     });
    //     map.add(featureLayer);
    //     featureLayer.popupTemplate = template;
    // });

    // Creates actions in the LayerList.

    // function defineActions(event) {
    //     // The event object contains an item property.
    //     // is is a ListItem referencing the associated layer
    //     // and other properties. You can control the visibility of the
    //     // item, its title, and actions using this object.

    //     const item = event.item;

    //     if (item.title === 'Closures') {
    //         // An array of objects defining actions to place in the LayerList.
    //         // By making this array two-dimensional, you can separate similar
    //         // actions into separate groups with a breaking line.

    //         item.actionsSections = [
    //             [
    //                 {
    //                     title: 'Go to full extent',
    //                     className: 'esri-icon-zoom-out-fixed',
    //                     id: 'full-extent',
    //                 },
    //                 {
    //                     title: 'Layer information',
    //                     className: 'esri-icon-description',
    //                     id: 'information',
    //                 },
    //             ],
    //             [
    //                 {
    //                     title: 'Increase opacity',
    //                     className: 'esri-icon-up',
    //                     id: 'increase-opacity',
    //                 },
    //                 {
    //                     title: 'Decrease opacity',
    //                     className: 'esri-icon-down',
    //                     id: 'decrease-opacity',
    //                 },
    //             ],
    //         ];
    //     }

    //     // Adds a slider for updating a group layer's opacity
    //     // if (item.children.length > 1 && item.parent) {
    //     //     const slider = new Slider({
    //     //         min: 0,
    //     //         max: 1,
    //     //         precision: 2,
    //     //         values: [1],
    //     //         visibleElements: {
    //     //             labels: true,
    //     //             rangeLabels: true,
    //     //         },
    //     //     });
    //     // }
    // }

    // view.when(() => {
    //     // Create the LayerList widget with the associated actions
    //     // and add it to the top-right corner of the view.

    //     const layerList = new LayerList({
    //         view: view,

    //         // executes for each ListItem in the LayerList
    //         listItemCreatedFunction: function (event) {
    //             let item = event.item;
    //             if (item.title === 'Phase 1') {
    //                 item.actionsSections = [
    //                     [{ title: 'go to full extent', className: 'esri-icon-zoom-out-fixed', id: 'full-extent' }],
    //                 ];
    //             }
    //         },
    //     });
    //     // Add widget to the top right corner of the view
    //     view.ui.add(layerList, 'top-left');
    //     select.addEventListener('change', (event) => {
    //         whereClause = event.target.value;
    //         queryFeatureLayer(view.extent);
    //     });
    // });
    // map.add(featureLayer);
    // featureLayer.popupTemplate = template;
});

const queryString = window.location.search;
console.log(queryString);

// removes random &nbsp from top of page
var el = document.querySelector('body');
el.innerHTML = el.innerHTML.replace(/&nbsp;/g, '');

// window.location url example "http://www.myworld.com?state_name=Ohio&city_name=Akron&visible_layer=TheLayerNameHere"
const urlParams = new URLSearchParams(window.location.search);
let visibleLayer = urlParams.get('visible_layer');
// Set layer visibility...
