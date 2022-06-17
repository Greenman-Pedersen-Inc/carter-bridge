require(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/widgets/LayerList', 'esri/request'], (
    Map,
    MapView,
    FeatureLayer,
    LayerList,
    esriRequest
) => {
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
        zoom: 16,
    });

    // request GeoJson data from USGS remote server
    let url =
        "https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_Public_View/FeatureServer/0/query?where=1=1&outFields='*'&f=json";

    esriRequest(url, {
        responseType: 'json',
    }).then(function (response) {
        // The requested data
        let geoJson = response.data;
        console.log(response.data);
    });

    /********************
     * Add feature layer
     ********************/
    view.when(() => {
        const featureLayer = new FeatureLayer({
            url: 'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_Public_View/FeatureServer/0',
            title: 'Closures',
        });
        map.add(featureLayer);
        featureLayer.popupTemplate = template;
    });

    // Creates actions in the LayerList.

    function defineActions(event) {
        // The event object contains an item property.
        // is is a ListItem referencing the associated layer
        // and other properties. You can control the visibility of the
        // item, its title, and actions using this object.

        const item = event.item;

        if (item.title === 'US Demographics') {
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

        // Adds a slider for updating a group layer's opacity
        if (item.children.length > 1 && item.parent) {
            const slider = new Slider({
                min: 0,
                max: 1,
                precision: 2,
                values: [1],
                visibleElements: {
                    labels: true,
                    rangeLabels: true,
                },
            });
        }
    }

    view.when(() => {
        // Create the LayerList widget with the associated actions
        // and add it to the top-right corner of the view.

        const layerList = new LayerList({
            view: view,
            // executes for each ListItem in the LayerList
            listItemCreatedFunction: defineActions,
        });
        // Add widget to the top right corner of the view
        view.ui.add(layerList, 'top-left');
    });
    // map.add(featureLayer);
    // featureLayer.popupTemplate = template;
});

// removes random &nbsp from top of page
var el = document.querySelector('body');
el.innerHTML = el.innerHTML.replace(/&nbsp;/g, '');
