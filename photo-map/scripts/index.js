require([
    'esri/Map',
    'esri/views/MapView',
    'esri/layers/FeatureLayer',
    'esri/request',
    'esri/popup/content/ImageMediaInfo',
    'esri/popup/content/support/ImageMediaInfoValue',
    'esri/popup/content/MediaContent',
], (Map, MapView, FeatureLayer, esriRequest, ImageMediaInfo, ImageMediaInfoValue, MediaContent) => {
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
            popup: {
                dockEnabled: true,
                dockOptions: {
                    buttonEnabled: false,
                    breakpoint: false,
                },
            },
        });

        const photoLocations = [
            {
                geometry: { type: 'point', longitude: -81.63531, latitude: 38.36019 },
                attributes: { 'image-path': 'images/site-photos/under-bridge-1.jpg' },
            },
            {
                geometry: { type: 'point', longitude: -81.63531, latitude: 38.36019 },
                attributes: { 'image-path': 'images/site-photos/under-bridge-2.jpg' },
            },
            {
                geometry: { type: 'point', longitude: -81.63531, latitude: 38.36019 },
                attributes: { 'image-path': 'images/site-photos/under-bridge-3.jpg' },
            },
            {
                geometry: { type: 'point', longitude: -81.63531, latitude: 38.36019 },
                attributes: { 'image-path': 'images/site-photos/under-bridge-4.jpg' },
            },
            {
                geometry: { type: 'point', longitude: -81.63531, latitude: 38.36019 },
                attributes: { 'image-path': 'images/site-photos/under-bridge-5.jpg' },
            },
        ];

        let layer = new FeatureLayer({
            source: photoLocations, // autocast as a Collection of new Graphic()
            fields: [
                {
                    name: 'ObjectID',
                    alias: 'ObjectID',
                    type: 'oid',
                },
                {
                    name: 'image-path',
                    alias: 'image-path',
                    type: 'string',
                },
            ],
            objectIdField: 'ObjectID',
            outFields: ['*'],
            renderer: {
                type: 'simple', // autocasts as new SimpleRenderer()
                symbol: {
                    type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                    url: 'images/camera-icon-clipart-transparent.png',
                    width: '64px',
                    height: '64px',
                },
            },
            popupTemplate: {
                title: 'Images for Closures',
                content: [
                    {
                        type: 'media', // MediaContentElement
                        mediaInfos: [
                            {
                                title: '<b>Parking Lot Closure Images</b>',
                                type: 'image',
                                caption: 'Current Parking Log Configuration',
                                value: {
                                    sourceURL: '{image-path}',
                                },
                            },
                        ],
                    },
                ],
            },
        });

        map.add(layer);
        });
});
