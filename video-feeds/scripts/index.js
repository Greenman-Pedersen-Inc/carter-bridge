require([
    'esri/Map',
    'esri/views/MapView',
    'esri/layers/FeatureLayer',
    'esri/widgets/LayerList',
    'esri/request',
], (Map, MapView, FeatureLayer, LayerList, esriRequest) => {
    esriRequest(
        'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_CameraLocations_Publicview/FeatureServer/0/query?where=1=1&f=json&outFields=*&returnGeometry=false'
    ).then(function (response) {
        const map = new Map({
            basemap: 'hybrid',
        });
        // const template = {
        //     title: '{NAME}',
        //     content: '{comments}',
        // };
        const view = new MapView({
            container: 'viewDiv',
            map: map,
            center: [-81.64680323880758, 38.356395838928165], //Longitude, latitude
            zoom: 17,
        });
        const cameraActive = response.data.features.map((feature) => {
            return feature.attributes;
        });
        const cameraURL = response.data.features.map((URL) => {
            return URL.attributes.URL;
        });

        //Returns the cameraName from the json

        const existingCameras = Array.from(new Set(cameraActive)); //
        const existingURL = Array.from(new Set(cameraURL)); //
        const layers = [];
        // const urls = [];
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const urlPhase = urlParams.get('phase');
        let phasesSelected;

        console.log(existingURL);
        console.log(existingCameras);

        // if (urlPhase) {
        //     phasesSelected = urlPhase.split(',').map((phase) => {
        //         return parseInt(phase);
        //     });
        // }

        function defineActions(event) {
            // The event object contains an item property.
            // is is a ListItem referencing the associated layer
            // and other properties. You can control the visibility of the
            // item, its title, and actions using this object.

            const item = event.item;

            // if (item.title === 'Closures') {
            //     // An array of objects defining actions to place in the LayerList.
            //     // By making this array two-dimensional, you can separate similar
            //     // actions into separate groups with a breaking line.

            //     item.actionsSections = [
            //         [
            //             {
            //                 title: 'Go to full extent',
            //                 className: 'esri-icon-zoom-out-fixed',
            //                 id: 'full-extent',
            //             },
            //             {
            //                 title: 'Layer information',
            //                 className: 'esri-icon-description',
            //                 id: 'information',
            //             },
            //         ],
            //         [
            //             {
            //                 title: 'Increase opacity',
            //                 className: 'esri-icon-up',
            //                 id: 'increase-opacity',
            //             },
            //             {
            //                 title: 'Decrease opacity',
            //                 className: 'esri-icon-down',
            //                 id: 'decrease-opacity',
            //             },
            //         ],
            //     ];
            // }
        }

        cameraActive.sort(function (a, b) {
            return b - a;
        });
        //Sorts list of phases

        cameraActive.forEach((camera) => {
            if (camera) {
                let layerVisiblity;

                if (phasesSelected) {
                    // Checks to see if the phase is true and if true makes it visible if not then its hidden.
                    if (phasesSelected.includes(camera)) {
                        layerVisiblity = true;
                    } else {
                        layerVisiblity = false;
                    }
                } else {
                    if (camera.CameraName === 'Camera 14 Facing East Kanawha River Bridge') {
                        // Sets the default phase to display
                        layerVisiblity = true;
                    } else {
                        layerVisiblity = true;
                    }
                }
                // console.log(existingURL);

                let layer = new FeatureLayer({
                    url: `https://services1.arcgis.com/VLhaRwzp3uCQMr7y/arcgis/rest/services/mdx_2200023_00_CameraLocations_Publicview/FeatureServer/0`,
                    title: camera.CameraName,
                    visible: layerVisiblity,
                    definitionExpression: `CameraName = '${camera.CameraName}'`,
                    popupTemplate: {
                        // NAME and COUNTY are fields in the service containing the Census Tract (NAME) and county of the feature
                        title: camera.CameraName,
                        content: function (feature) {
                            // console.log(feature.attributes);
                            let mainDiv = document.createElement('div');
                            // mainDiv.setAttribute("onload", "init_api()")

                            let videoHolder = document.createElement('div');
                            videoHolder.setAttribute('class', 'fp-Video');
                            let videoPlayer = document.createElement('div');
                            videoPlayer.setAttribute('id', 'play');
                            videoPlayer.setAttribute('class', 'display');
                            // let playButton = document.createElement("button")
                            // playButton.setAttribute("onClick","playClick()")
                            // playButton.setAttribute("id", "playBtn")
                            // playButton.textContent = "Play"
                            mainDiv.append(videoHolder);
                            // mainDiv.append(playButton)
                            videoHolder.append(videoPlayer);

                            init_api(camera.URL);

                            return mainDiv;
                        },
                    },
                });
                layers.push(layer);
            }
        });
        map.addMany(layers);
        view.when(() => {
            const layerList = new LayerList({
                view: view,

                listItemCreatedFunction: defineActions,
            });
            view.ui.add(layerList, 'top-left');
        });
    });
});
