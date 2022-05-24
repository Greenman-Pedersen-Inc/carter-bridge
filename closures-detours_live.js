require([
    'esri/Map',
    'esri/views/MapView',
    'esri/layers/FeatureLayer',
    'esri/widgets/LayerList',
    'esri/request',
    'esri/widgets/Legend',
    'esri/PopupTemplate',
], (Map, MapView, FeatureLayer, LayerList, esriRequest, Legend) => {
    esriRequest(
        'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/query?where=1=1&f=json&outFields=*&returnGeometry=false'
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
            center: [-81.63211, 38.35822], //Longitude, latitude
            zoom: 16,
        });
        const phasesPresent = response.data.features.map((feature) => {
            // console.log(feature.attributes);
            return feature.attributes.Phase;
        });
        const existingPhases = Array.from(new Set(phasesPresent));
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

            if (item.title === 'Phase 1') {
                // An array of objects defining actions to place in the LayerList.
                // By making this array two-dimensional, you can separate similar
                // actions into separate groups with a breaking line.
                // const thisDiv = document.getElementById('contentBox');
                // const popupBox = `<div id="popupLayer">
                //     <div>Title</div>
                //     <p>Something will go in this spot about the layers</p>
                //     <img src="https://www.state.nj.us/transportation/commuter/motoristassistance/images/geico3.jpg"></img>
                // </div>`;
                // div.innerHTML(popupBox);
                // item.actionsSections = [
                //     [
                //         {
                //             title: 'Go to full extent',
                //             className: 'esri-icon-zoom-out-fixed',
                //             id: 'full-extent',
                //         },
                //         {
                //             title: 'Layer information',
                //             className: 'esri-icon-description',
                //             id: 'information',
                //         },
                //     ],
                //     [
                //         {
                //             title: 'Increase opacity',
                //             className: 'esri-icon-up',
                //             id: 'increase-opacity',
                //         },
                //         {
                //             title: 'Decrease opacity',
                //             className: 'esri-icon-down',
                //             id: 'decrease-opacity',
                //         },
                //     ],
                // ];
            }

            // Adds a slider for updating a group layer's opacity
            // if (item.children.length > 1 && item.parent) {
            //     const slider = new Slider({
            //         min: 0,
            //         max: 1,
            //         precision: 2,
            //         values: [1],
            //         visibleElements: {
            //             labels: true,
            //             rangeLabels: true,
            //         },
            //     });
            // }
        }

        existingPhases.sort(function (a, b) {
            return b - a;
        });

        // console.log(existingPhases);

        existingPhases.forEach((phase) => {
            if (phase) {
                let layerVisiblity;

                if (phasesSelected) {
                    if (phasesSelected.includes(phase)) {
                        layerVisiblity = true;
                    } else {
                        layerVisiblity = false;
                    }
                } else {
                    if (phase === 1) {
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
                        // autocasts as new PopupTemplate()
                        title: '{name}',
                        content: '{comments}',
                        // Set content elements in the order to display.
                        // The first element displayed here is the fieldInfos.
                        content: [
                            {
                                // You can also set a descriptive text element. This element
                                // uses an attribute from the featurelayer which displays a
                                // sentence giving the total amount of trees value within a
                                // specified census block. Text elements can only be set within the content.
                                type: 'text', // TextContentElement
                                text: 'Can have more details here about the phase and detours etc.....',
                            },
                            {
                                // You can set a media element within the popup as well. This
                                // can be either an image or a chart. You specify this within
                                // the mediaInfos. The following creates a pie chart in addition
                                // to two separate images. The chart is also set up to work with
                                // related tables. Similar to text elements, media can only be set within the content.
                                type: 'media', // MediaContentElement
                                mediaInfos: [
                                    {
                                        // title: '<b>Mexican Fan Palm</b>',
                                        title: '<b>Detour Start</b>',
                                        value: {
                                            sourceURL: 'detour_start.png',
                                        },
                                        type: 'image',
                                    },
                                ],
                            },
                            {
                                // You can set a attachment element(s) within the popup as well.
                                // Similar to text and media elements, attachments can only be set
                                // within the content. Any attachmentInfos associated with the feature
                                // will be listed in the popup.
                                type: 'attachments', // AttachmentsContentElement
                            },
                        ],
                    },
                    // popupTemplate: {
                    //     title: '{name}',
                    //     content: '{comments}',
                    // },
                });
                layers.push(layer);
                // console.log(layer.length);
            }
        });

        function defineActions(event) {
            // The event object contains an item property.
            // is is a ListItem referencing the associated layer
            // and other properties. You can control the visibility of the
            // item, its title, and actions using this object.

            const item = event.item;

            // if (item.title === 'Phase 3') {
            //     console.log(item.title);
            // }

            // Adds a slider for updating a group layer's opacity
            // if (item.children.length > 1 && item.parent) {
            //     const slider = new Slider({
            //         min: 0,
            //         max: 1,
            //         precision: 2,
            //         values: [1],
            //         visibleElements: {
            //             labels: true,
            //             rangeLabels: true,
            //         },
            //     });
            // }
        }

        map.addMany(layers);

        view.when(() => {
            const featureLayer = map.layers.getItemAt(0);

            const layerList = new LayerList({
                view: view,
                listItemCreatedFunction: defineActions,
            });
            const legend = new Legend({
                view: view,
            });

            // let informationBox = document.getElementById('informationBox');
            // let informationData = `<div>${layers[0]}</div>`;
            // informationBox.append(informationData);

            view.ui.add(legend, 'bottom-right');
            view.ui.add(layerList, 'top-left');

            let widgetRoot = document.querySelector('.esri-ui-inner-container.esri-ui-corner-container');

            let menuRoot = document.createElement('div');
            menuRoot.className = 'esri-component esri-widget esri-widget--panel';
            menuRoot.innerHTML = `<div id ="phaseFormBox" class="esri-component esri-widget esri-widget--panel middle">
            <div>
            <h2 class="esri-widget__heading" role="heading" aria-level="3">Phase 1</h2>
            <div class="informationInner row">
            <div class="col-md-6">
            <img id="myImg" class="img-fluid" src="detour1.png"></img>
            </div>

            <div id="myModal" class="modal">
                <span class="close">&times;</span>
                <div id="caption"></div>

                <div class="slideshow-container">

                <div class="mySlides" style="display:block">
                    <img class="modal-content" src="detour1.png" style="width:100%">
                    <div class="text pt-5">Detour 1</div>
                    <p style="color:white;text-align:center">Washington Street On-Ramp closed. Please continue on Pennsylvania Avenue to Bigley Avenue.</p>
                </div>
        
                <div class="mySlides ">
                    <img class="modal-content" src="detour2.png" style="width:100%">
                    <div class="text pt-5">Detour 2</div>
                    <p style="color:white;text-align:center">Turn left onto Westmoreland Road and then turn right onto Odell Avenue On-Ramp to continue on I-77N.</p>
                </div>
        
                <div class="mySlides ">
                    <img class="modal-content" src="detour3.png" style="width:100%">
                    <div class="text pt-5">Detour 3</div>
                    <p style="color:white;text-align:center">Turn left onto Westmoreland Road and then turn left onto Crescent Road On-Ramp to continue on I-77S.</p>
                </div>
        
                <a class="prev" onclick="plusSlides(-1)">❮</a>
                <a class="next" onclick="plusSlides(1)">❯</a>
        
            </div>
            <br>
        
            <div style="text-align:center">
                <span class="dot" onclick="currentSlide(1)"></span>
                <span class="dot" onclick="currentSlide(2)"></span>
                <span class="dot" onclick="currentSlide(3)"></span>
            </div>

                
            </div>
            
            <div class="col-md-6">
                    <div class="descriptionBox">
                    <div>Description of closure</div>
                    
                    <p class="description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    </div>
                    </div>
                    </div>
            </div>
            </div>
        </div>`;
            widgetRoot.append(menuRoot);
            var modal = document.getElementById('myModal');

            var img = document.getElementById('myImg');
            var modalImg = document.getElementById('img01');
            var captionText = document.getElementById('caption');
            img.onclick = function () {
                modal.style.display = 'block';
                // modalImg.src = this.src;
                // captionText.innerHTML = this.alt;
            };
            var span = document.getElementsByClassName('close')[0];
            span.onclick = function () {
                modal.style.display = 'none';
            };

            let phaseBox = document.getElementById('phaseFormBox');
            if (layerVisiblity == true) {
            }
            // console.log(modalImg);
        });
    });
});

// removes random &nbsp from top of page
var el = document.querySelector('body');
el.innerHTML = el.innerHTML.replace(/&nbsp;/g, '');
