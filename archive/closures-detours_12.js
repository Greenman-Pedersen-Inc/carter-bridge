require(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/widgets/LayerList', 'esri/request'], (
    Map,
    MapView,
    FeatureLayer,
    LayerList,
    esriRequest
) => {
    esriRequest(
        'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/query?where=1=1&f=json&outFields=Phase&returnGeometry=false'
    ).then(function (response) {
        const map = new Map({
            basemap: 'hybrid',
        });
        const template = {
            title: '{NAME}',
            content: '{comments}',
        };
        const view = new MapView({
            container: 'viewDiv',
            map: map,
            center: [-81.643005, 38.3577], //Longitude, latitude
            zoom: 15,
        });
        const phasesPresent = response.data.features.map((feature) => {
            return feature.attributes.Phase;
        });
        //returns all layers with a phase

        const existingPhases = Array.from(new Set(phasesPresent)); //
        const layers = [];
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const urlPhase = urlParams.get('phase');
        let phasesSelected;

        if (urlPhase) {
            phasesSelected = urlPhase.split(',').map((phase) => {
                return parseInt(phase);
            });
        }

        function defineActions(event) {
            // The event object contains an item property.
            // is is a ListItem referencing the associated layer
            // and other properties. You can control the visibility of the
            // item, its title, and actions using this object.

            const item = event.item;

            if (item.title === 'Closures') {
                // An array of objects defining actions to place in the LayerList.
                // By making this array two-dimensional, you can separate similar
                // actions into separate groups with a breaking line.

                item.actionsSections = [
                    [
                        {
                            title: 'Go to full extent',
                            className: 'esri-icon-zoom-out-fixed',
                            id: 'full-extent',
                        },
                        {
                            title: 'Layer information',
                            className: 'esri-icon-description',
                            id: 'information',
                        },
                    ],
                    [
                        {
                            title: 'Increase opacity',
                            className: 'esri-icon-up',
                            id: 'increase-opacity',
                        },
                        {
                            title: 'Decrease opacity',
                            className: 'esri-icon-down',
                            id: 'decrease-opacity',
                        },
                    ],
                ];
            }
        }
        // function changeCursor(response) {
        //     if (response.data.features.length > 0) {
        //         document.getElementById('viewDiv').style.cursor = 'pointer';
        //         // console.log('worked');
        //     } else {
        //         document.getElementById('viewDiv').style.cursor = 'default';
        //     }
        // }
        // changeCursor();

        view.on(
            'pointer-move',
            _.debounce((event) => {
                view.hitTest(event).then((response) => {
                    if (response.data.features.length > 0) {
                        // check if a feature is returned from the layer we are interested in,
                        // and set the graphic to the "view.popup.features"
                        // const graphicsInOurLayer = response.results.filter(function (result) {
                        //     return result.graphic.layer === fl;
                        // });
                        if (graphicsInOurLayer.length > 0) {
                            view.popup.features = [graphicsInOurLayer[0].graphic];
                            // set the location of the popup - using the pointer-move event
                            // (must translate it to a map point)
                            view.popup.location = view.toMap({ x: event.x, y: event.y });
                            if (!view.popup.visible) {
                                view.popup.visible = true;
                            }
                        } else {
                            view.popup.visible = false;
                        }
                    } else {
                        view.popup.visible = false;
                    }
                });
            }, 200)
        );

        existingPhases.sort(function (a, b) {
            return b - a;
        });
        //Sorts list of phases

        existingPhases.forEach((phase) => {
            if (phase) {
                let layerVisiblity;

                if (phasesSelected) {
                    // Checks to see if the phase is true and if true makes it visible if not then its hidden.
                    if (phasesSelected.includes(phase)) {
                        layerVisiblity = true;
                    } else {
                        layerVisiblity = false;
                    }
                } else {
                    if (phase === 1) {
                        // Sets the default phase to display
                        layerVisiblity = true;
                    } else {
                        layerVisiblity = false;
                    }
                }

                let layer = new FeatureLayer({
                    url: `https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0`,
                    title: `Phase ${phase}`,
                    visible: layerVisiblity,
                    definitionExpression: `Phase = ${phase}`,
                    popupTemplate: {
                        title: '{name}',
                        content: '{comments}',
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
            changeCursor(response);
            view.ui.add(layerList, 'top-left');
        });
    });
});
// removes random &nbsp from top of page
var el = document.querySelector('body');
el.innerHTML = el.innerHTML.replace(/&nbsp;/g, '');
