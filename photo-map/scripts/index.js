require(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/request'], (
    Map,
    MapView,
    FeatureLayer,
    esriRequest
) => {
    esriRequest(
        'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_CameraLocations_Publicview/FeatureServer/0/query?where=1=1&f=json&outFields=*&returnGeometry=false'
    ).then(function (response) {
        const map = new Map({
            basemap: 'gray-vector',
        });
        const view = new MapView({
            container: 'viewDiv',
            map: map,
            center: [-81.63211, 38.35822], //Longitude, latitude
            zoom: 15,
        });

        const photoLocations = [
            { geometry: { type: 'point', longitude: -81.641, latitude: 38.356 }, attributes: {} },
            { geometry: { type: 'point', longitude: -81.637, latitude: 38.356 }, attributes: {} },
            { geometry: { type: 'point', longitude: -81.634, latitude: 38.357 }, attributes: {} },
            { geometry: { type: 'point', longitude: -81.636, latitude: 38.36 }, attributes: {} },
            { geometry: { type: 'point', longitude: -81.641, latitude: 38.361 }, attributes: {} },
            { geometry: { type: 'point', longitude: -81.643, latitude: 38.36 }, attributes: {} },
            { geometry: { type: 'point', longitude: -81.647, latitude: 38.36 }, attributes: {} },
            { geometry: { type: 'point', longitude: -81.624, latitude: 38.361 }, attributes: {} },
            { geometry: { type: 'point', longitude: -81.623, latitude: 38.361 }, attributes: {} },
            { geometry: { type: 'point', longitude: -81.621, latitude: 38.363 }, attributes: {} },
            { geometry: { type: 'point', longitude: -81.631, latitude: 38.361 }, attributes: {} },
        ];

        let layer = new FeatureLayer({
            source: photoLocations, // autocast as a Collection of new Graphic()
            objectIdField: 'ObjectID',
            renderer: {
                type: 'simple', // autocasts as new SimpleRenderer()
                symbol: {
                    type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                    url: 'images/camera-icon-clipart-transparent.png',
                    width: '64px',
                    height: '64px',
                },
            },
        });

        map.add(layer);

        view.on('click', function (event) {
            view.popup.autoOpenEnabled = false;

            let lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
            let lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

            view.popup.open({
                title: 'Reverse geocode: [' + lon + ', ' + lat + ']',
                location: event.mapPoint,
                content: 'This is a point of interest where a picture can go.',
            });
        });
    });
});
