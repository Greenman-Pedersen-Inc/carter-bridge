require([
    'esri/core/watchUtils',
    'esri/Map',
    'esri/views/MapView',
    'esri/layers/FeatureLayer',
    'esri/widgets/LayerList',
    'esri/request',
    'esri/widgets/Legend',
    'esri/PopupTemplate',
], (watchUtils, Map, MapView, FeatureLayer, LayerList, esriRequest, Legend, PopupTemplate) => {
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
    function addUIControls() {
        // const featureLayer = map.layers.getItemAt(0);

        const layerList = new LayerList({
            view: view,
            listItemCreatedFunction: defineActions,
        });

        const legend = new Legend({
            view: view,
        });
        view.ui.add(legend, 'bottom-right');
        view.ui.add(layerList, 'top-right');

        addLayers('currentPhase');
    }

    function CarouselPopup(attachPoint, content) {
        const self = this;
        // let modal = document.getElementById('myModal');
        // let img = document.getElementById('detourImg');
        // let widgetRoot = document.querySelector('.esri-ui-bottom-left.esri-ui-corner');
        // let carouselRoot = document.querySelector('.esri-ui-bottom-left.esri-ui-corner');
        // let modal = document.getElementById('myModal');

        // modal.style.display = 'block';

        function Slide(attachPoint, content, display = false) {
            const slide = document.createElement('div');
            slide.innerHTML = `
                <div class="mySlides" style="display:${display ? 'block' : 'hidden'}">
                    <img class="modal-content" src="${content.carouselImgSrc}" style="width:100%">
                    <div class="text pt-5">${content.carouselPhaseTitle}</div>
                    <p style="color:white;text-align:center">
                        ${content.carouselPhaseDescription}
                    </p>
                </div>
             `;

            attachPoint.append(slide);
        }

        this.domNode = document.createElement('div');
        this.domNode.className = 'esri-component esri-widget esri-widget--panel';
        this.domNode.innerHTML = `
            <div class="modal">
                <span class="close">&times;</span>
                <div></div>
                <div class="carousel-contaier slideshow-container">
                    <a class="prev" onclick="plusSlides(-1)">❮</a>
                    <a class="next" onclick="plusSlides(1)">❯</a>
                </div>
                <br>
               
            </div>
        `;
        // <div id="dot-controls" style="text-align:center">
        //     <span class="dot" onclick="currentSlide(1)"></span>
        //     <span class="dot" onclick="currentSlide(2)"></span>
        //     <span class="dot" onclick="currentSlide(3)"></span>
        // </div>

        attachPoint.append(this.domNode);

        let slideContainer = this.domNode.querySelector('.carousel-contaier.slideshow-container');
        content.forEach((slide, index) => {
            new Slide(slideContainer, slide, index === 0);
        });

        let span = document.getElementsByClassName('close')[0];

        // let carouselPopup = modal.append(carouselRoot);
        span.onclick = function () {
            self.domNode.innerHTML = '';
            self.domNode.style.display = 'none';
            self.domNode.innerHTML = '';
        };

        // attachPoint.append(widgetRoot);
    }

    const phaseInformation = {
        current: {
            detourImageSrc: 'detour1.png',
            phaseHeaderInnerHTML: 'Current Phase',
            phaseDescriptionInnerHTML:
                ' Left lane of Pennsylvania Avenue is closed. Please use the middle and right lane to proceed. Pennsylvania Avenue On-Ramp to I-64E is open.',
            slides: [
                {
                    carouselImgSrc: 'detour1.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription:
                        'Washington Street On-Ramp closed. Please continue on Pennsylvania Avenue to Bigley Avenue.',
                },
                {
                    carouselImgSrc: 'detour2.png',
                    carouselPhaseTitle: 'Detour 2',
                    carouselPhaseDescription:
                        'Turn left onto Westmoreland Road and then turn right onto Odell Avenue On-Ramp to continue on I-77N.',
                },
                {
                    carouselImgSrc: 'detour3.png',
                    carouselPhaseTitle: 'Detour 3',
                    carouselPhaseDescription:
                        'Turn left onto Westmoreland Road and then turn left onto Crescent Road On-Ramp to continue on I-77S.',
                },
            ],
        },
        1: {
            phaseHeaderInnerHTML: 'Phase 1',
            detourImageSrc: 'detourPhaseImg.png',
            phaseDescriptionInnerHTML: `
            Phase 1 Closure. Washington Street On-Ramp Closed and right lane closure on I-64E.
            <br>
            <br>
            Detour: Take Pennsylvania Avenue to Bigley Avenue and then turn left onto Westmoreland Road.
            Either turn right to Odell Avenue On-Ramp to continue on I-77N or turn left onto Crescent Road On-Ramp to continue on I-77S.
            <br>
            <br>
            Please click the image for more information on the detour.`,
            slides: [
                {
                    carouselImgSrc: 'detour1.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription:
                        'Washington Street On-Ramp closed. Please continue on Pennsylvania Avenue to Bigley Avenue.',
                },
            ],
        },
        4: {
            phaseHeaderInnerHTML: 'Phase 4',
            detourImageSrc: 'detourPhaseImg.png',
            phaseDescriptionInnerHTML: `Detour: Take Pennsylvania Avenue to Bigley Avenue and then turn left onto Westmoreland Road. Either turn right to Odell Avenue On-Ramp to continue on I-77N or turn left onto Crescent Road On-Ramp to continue on I-77S.`,
        },
        15: {
            phaseHeaderInnerHTML: 'Phase 15',
            detourImageSrc: 'detourPhaseImg.png',
            phaseDescriptionInnerHTML: 'Description about Phase 15 closures will update in this field.',
        },
        18: {
            phaseHeaderInnerHTML: 'Phase 18',
            detourImageSrc: 'detourPhaseImg.png',
            phaseDescriptionInnerHTML: 'Description about Phase 18 closures will update in this field.',
        },
        23: {
            phaseHeaderInnerHTML: 'Phase 23',
            detourImageSrc: 'detourPhaseImg.png',
            phaseDescriptionInnerHTML: 'Description about Phase 23 closures will update in this field.',
        },
    };

    function InfoPopup(content, initiallyVisible) {
        let widgetRoot = document.querySelector('.esri-ui-bottom-left.esri-ui-corner');
        // let carouselRoot = document.querySelector('.esri-component.esri-widget.esri-widget--panel');
        // let carouselContent = document.createElement('div');
        let menuRoot = document.createElement('div');

        Object.defineProperty(this, 'visible', {
            get() {
                return this._visible;
            },
            set(value) {
                this._visible = value;
                if (value) {
                    menuRoot.style.display = 'block';
                } else {
                    menuRoot.style.display = 'none';
                }
            },
            enumerable: false,
            configurable: false,
        });

        menuRoot.innerHTML = `
            <div class="phaseFormBox esri-component esri-widget esri-widget--panel middle">
                <div>
                    <h2 class="esri-widget__heading" role="heading" aria-level="3"></h2>
                    <div class="informationInner row">
                        <div class="col-md-6">
                            <img class="img-fluid" src="${
                                content ? content.detourImageSrc : phaseInformation.current.detourImageSrc
                            }"></img>
                        </div>

                        <div class="col-md-6">
                            <div class="descriptionBox">
                                <div style="font-weight:bold;">${
                                    content ? content.phaseHeaderInnerHTML : 'Phase #'
                                }</div>
                                    <br>
                                    <p class="description">
                                        ${
                                            content
                                                ? content.phaseDescriptionInnerHTML
                                                : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
                                        }
                                        <br>
                                        <br>
                                        Please click the image for more information on the detour.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        widgetRoot.append(menuRoot);

        menuRoot.querySelector('.img-fluid').addEventListener('click', function () {
            let carouselRoot = document.querySelector('.esri-ui-bottom-left.esri-ui-corner');

            if (content && content.slides) {
                new CarouselPopup(carouselRoot, content.slides);
            }
        });

        this.visible = initiallyVisible;
    }

    let selectorMenu = document.querySelector('.esri-ui-top-right.esri-ui-corner');
    let selectRoot = document.createElement('div');
    selectRoot.innerHTML = `
        <div class="esri-component esri-layer-list esri-widget esri-widget--panel phase-selection">
            <div id="optionsDiv" class="esri-widget">
                <p>
                    Select present or future phase.
                </p>
                <select id="query-type" class="esri-widget">
                    <option value="currentPhase">Current Phase</option>
                    <option value="futurePhase">Future Phases</option>
                </select>
            </div>
        </div>`;
    selectorMenu.append(selectRoot);

    const queryOpts = document.getElementById('query-type');
    queryOpts.addEventListener('change', (event) => {
        let widgetRoot = document.querySelector('.esri-ui-bottom-left.esri-ui-corner');

        widgetRoot.innerHTML = '';
        // if (event.target.value === 'currentPhase') {
        // } else {
        //     addLayers('allFuture');
        // }
        addLayers(event.target.value);
        console.log('clear widget stuff for phase');
        map.remove();
    });

    function addLayers(phasePeriod) {
        map.removeAll();
        if (phasePeriod === 'currentPhase') {
            const layer = new FeatureLayer({
                url: 'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/query?where=1=1&f=json&outFields=*&returnGeometry=false',
                definitionExpression: `CurrentPhase = 'true'`,
                title: 'Current Phase',
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
                            type: 'media', // MediaContentElement
                            mediaInfos: [
                                {
                                    title: '<b>Detour Start</b>',
                                    value: {
                                        sourceURL: 'detour_start.png',
                                    },
                                    type: 'image',
                                },
                            ],
                        },
                        {
                            type: 'attachments', // AttachmentsContentElement
                        },
                    ],
                },
            });

            layer.watch('visible', (newValue, oldValue, property, target) => {
                layer.infoPopup.visible = newValue;
            });

            map.add(layer);
            layer.infoPopup = new InfoPopup(phaseInformation['current'], true);
        } else {
            esriRequest(
                'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/query?where=1=1&f=json&outFields=*&returnGeometry=false'
            ).then(function (response) {
                console.log(response);

                //     const carouselContainer = document.getElementById('carousel-contaier');
                //     let newSlideNumberTwo = document.createElement('div');
                //     let newSlideNumberThree = document.createElement('div');

                //     newSlideNumberTwo.innerHTML = `<div id="slideshow-two" class="mySlides ">
                //             <img  class="modal-content" src="detour2.png" style="width:100%">
                //             <div class="text pt-5">Detour 2</div>
                //             <p style="color:white;text-align:center">Turn left onto Westmoreland Road and then turn right onto Odell Avenue On-Ramp to continue on I-77N.</p>
                //         </div>`;
                //     newSlideNumberThree.innerHTML = `<div id="slideshow-three" class="mySlides ">
                //     <img class="modal-content" src="detour3.png" style="width:100%">
                //     <div class="text pt-5">Detour 3</div>
                //     <p style="color:white;text-align:center">Turn left onto Westmoreland Road and then turn left onto Crescent Road On-Ramp to continue on I-77S.</p>
                // </div>`;

                //     carouselContainer.append(newSlideNumberTwo);
                //     carouselContainer.append(newSlideNumberThree);
                const phasesPresent = response.data.features.map((feature) => {
                    return feature.attributes.Phase;
                });

                let phasesSelected;
                const existingPhases = Array.from(new Set(phasesPresent));
                const layers = [];
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const urlPhase = urlParams.get('phase');
                //     // const displayblock = document.getElementById('phaseFormBox');
                //     const phaseHeader = document.getElementById('phase_header');
                //     const phaseDescription = document.getElementById('phase_description');
                //     const detourImage = document.getElementById('detourImg');

                if (urlPhase) {
                    phasesSelected = urlPhase.split(',').map((phase) => {
                        return parseInt(phase);
                    });
                }
                existingPhases.sort(function (a, b) {
                    return b - a;
                });

                let visibilityWatchers = [];

                existingPhases.forEach((phase) => {
                    if (phase !== null && phase !== 0) {
                        let layer = new FeatureLayer({
                            url: `https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/`,
                            title: `Phase ${phase}`,
                            visible: false,
                            definitionExpression: `phase = ${phase}`,
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

                        if (phasesSelected) {
                            if (phasesSelected.includes(phase)) {
                                layer.visible = true;
                            } else {
                                layer.visible = false;
                            }
                        } else {
                            if (phase === 1) {
                                layer.visible = true;
                                // updatePopup(phase, true);
                            } else {
                                layer.visible = false;
                            }
                        }

                        // function visibilityWatchHandler(newValue, oldValue, property, target) {
                        //     visibilityWatchers.forEach((watcher) => {
                        //         watcher.remove();
                        //     });
                        //     visibilityWatchers = [];

                        //     console.log(visibilityWatchHandler);

                        //     if (newValue) {
                        //         layers.forEach((target) => {
                        //             if (target.id !== layer.id) {
                        //                 target.visible = false;
                        //             }
                        //             visibilityWatchers.push(target.watch('visible', visibilityWatchHandler));
                        //         });
                        //     }

                        //     updatePopup(phase);
                        // }

                        if (phaseInformation[phase]) {
                            layer.infoPopup = new InfoPopup(phaseInformation[phase], layer.visible);
                        } else {
                            layer.infoPopup = new InfoPopup(null, layer.visible);
                        }

                        function visibilityWatchHandler(newValue, oldValue, property, target) {
                            console.log(phase, newValue);

                            if (layer.infoPopup) {
                                layer.infoPopup.visible = newValue;
                            }

                            if (newValue) {
                                layers.forEach((target) => {
                                    if (target.id !== layer.id) {
                                        target.visible = false;
                                    }
                                });
                            }
                            // updatePopup(phase, layers.map((layer) => layer.visible).includes(true));
                        }
                        // layer.infoPopup = new InfoPopup(phaseInformation['current'], true);

                        visibilityWatchers.push(layer.watch('visible', visibilityWatchHandler));

                        layers.push(layer);
                    }
                });

                map.addMany(layers);
            });
        }
    }

    view.when(() => {
        addUIControls(view);
    });
});

// removes random &nbsp from top of page
var el = document.querySelector('body');
el.innerHTML = el.innerHTML.replace(/&nbsp;/g, '');
