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
    const currentPhase = 0;
    const map = new Map({
        basemap: 'gray-vector',
    });
    const view = new MapView({
        container: 'viewDiv',
        map: map,
        center: [-81.63211, 38.35822], //Longitude, latitude
        zoom: 16,
    });
    const phaseInformation = {
        0: {
            detourImageSrc: 'images/detour1.png',
            phaseHeaderInnerHTML: 'Current Phase',
            phaseDescriptionInnerHTML:
                'Left lane of Pennsylvania Avenue is closed. Please use the middle and right lane to proceed. Pennsylvania Avenue On-Ramp to I-64E is open.',
            slides: [
                {
                    carouselImgSrc: 'images/detour1.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription:
                        'Left lane of Pennsylvania Avenue is closed. Please use the middle and right lane to proceed. Pennsylvania Avenue On-Ramp to I-64E is open.',
                    // carouselPhaseDescription:'Washington Street On-Ramp closed. Please continue on Pennsylvania Avenue to Bigley Avenue.',
                },
            ],
        },
        1: {
            phaseHeaderInnerHTML: 'Phase 1',
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `
                <p>
                    Washington Street On-Ramp Closed and right lane closure on I-64E.
                </p>
                <p>
                    Detour: Take Pennsylvania Avenue to Bigley Avenue and then turn left onto Westmoreland Road. Either turn right to Odell Avenue On-Ramp to continue on I-77N or turn left onto Crescent Road On-Ramp to continue on I-77S.
                </p>
            `,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription:
                        'Washington Street On-Ramp closed. Please continue on Pennsylvania Avenue to Bigley Avenue.',
                },
                {
                    carouselImgSrc: 'images/detour2.png',
                    carouselPhaseTitle: 'Detour 2',
                    carouselPhaseDescription:
                        'Turn left onto Westmoreland Road and then turn right onto Odell Avenue On-Ramp to continue on I-77N.',
                },
                {
                    carouselImgSrc: 'images/detour3.png',
                    carouselPhaseTitle: 'Detour 3',
                    carouselPhaseDescription:
                        'Turn left onto Westmoreland Road and then turn left onto Crescent Road On-Ramp to continue on I-77S.',
                },
            ],
        },
        4: {
            phaseHeaderInnerHTML: 'Phase 4',
            detourImageSrc: 'images/detourPhaseImg.png',
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `
                <p>
                    Washington Street On-Ramp Closed and right lane closure on I-64E.
                </p>
                <p>
                    Detour: Take Pennsylvania Avenue to Bigley Avenue and then turn left onto Westmoreland Road. Either turn right to Odell Avenue On-Ramp to continue on I-77N or turn left onto Crescent Road On-Ramp to continue on I-77S.
                </p>
            `,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription:
                        'Washington Street On-Ramp closed. Please continue on Pennsylvania Avenue to Bigley Avenue.',
                },
                {
                    carouselImgSrc: 'images/detour2.png',
                    carouselPhaseTitle: 'Detour 2',
                    carouselPhaseDescription:
                        'Turn left onto Westmoreland Road and then turn right onto Odell Avenue On-Ramp to continue on I-77N.',
                },
                {
                    carouselImgSrc: 'images/detour3.png',
                    carouselPhaseTitle: 'Detour 3',
                    carouselPhaseDescription:
                        'Turn left onto Westmoreland Road and then turn left onto Crescent Road On-Ramp to continue on I-77S.',
                },
            ],
        },
        15: {
            phaseHeaderInnerHTML: 'Phase 15',
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `
                <p>
                    Washington Street On-Ramp Closed and right lane closure on I-64E.
                </p>
                <p>
                    Detour: Take Pennsylvania Avenue to Bigley Avenue and then turn left onto Westmoreland Road. Either turn right to Odell Avenue On-Ramp to continue on I-77N or turn left onto Crescent Road On-Ramp to continue on I-77S.
                </p>
            `,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription:
                        'Washington Street On-Ramp closed. Please continue on Pennsylvania Avenue to Bigley Avenue.',
                },
                {
                    carouselImgSrc: 'images/detour2.png',
                    carouselPhaseTitle: 'Detour 2',
                    carouselPhaseDescription:
                        'Turn left onto Westmoreland Road and then turn right onto Odell Avenue On-Ramp to continue on I-77N.',
                },
                {
                    carouselImgSrc: 'images/detour3.png',
                    carouselPhaseTitle: 'Detour 3',
                    carouselPhaseDescription:
                        'Turn left onto Westmoreland Road and then turn left onto Crescent Road On-Ramp to continue on I-77S.',
                },
            ],
        },
        18: {
            phaseHeaderInnerHTML: 'Phase 18',
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: 'Description about Phase 18 closures will update in this field.',
        },
        23: {
            phaseHeaderInnerHTML: 'Phase 23',
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: 'Description about Phase 23 closures will update in this field.',
        },
    };

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
        const layerList = new LayerList({
            view: view,
            listItemCreatedFunction: defineActions,
        });
        const legend = new Legend({
            view: view,
        });

        const selectorMenu = new SelectorMenu(document.querySelector('.esri-ui-top-right.esri-ui-corner'));

        view.ui.add(legend, 'bottom-right');
        // view.ui.add(layerList, 'top-right');
        addLayers(selectorMenu);
    }
    function visibilityWatchHandler(newValue, oldValue, attribute, target) {
        if (target.infoPopup) {
            target.infoPopup.visible = newValue;
        }

        if (newValue) {
            map.layers.items.forEach((layer) => {
                if (layer.id !== target.id) {
                    layer.visible = false;
                }
            });
        }
    }
    function addLayers(selector) {
        map.removeAll();

        esriRequest(
            'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/query?where=1=1&f=json&outFields=*&returnGeometry=false'
        ).then(function (response) {
            const phasesPresent = response.data.features.map((feature) => {
                return feature.attributes.Phase;
            });

            let phasesSelected = [];
            const existingPhases = Array.from(new Set(phasesPresent));
            const layers = [];
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const urlPhase = urlParams.get('phase');

            if (urlPhase) {
                phasesSelected = urlPhase.split(',').map((phase) => {
                    return parseInt(phase);
                });

                // are the phases selected in the existing phases returned by the server?
                phasesSelected = phasesSelected.filter((value) => existingPhases.includes(value));
            }
            existingPhases.sort(function (a, b) {
                return a - b;
                // return b - a;
            });

            let visibilityWatchers = [];
            let selectedPhase;

            existingPhases.forEach((phase, index) => {
                if (phase !== null) {
                    let layer = new FeatureLayer({
                        url: `https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/`,
                        title: `Phase ${phase}`,
                        visible: false,
                        definitionExpression: `phase = ${phase}`,
                        popupTemplate: {
                            title: '{Name}',
                            content: [
                                {
                                    type: 'text',
                                    text: '{Comments}',
                                },
                                {
                                    type: 'media',
                                    mediaInfos: [
                                        {
                                            title: '',
                                            type: 'image',
                                            caption: '',
                                            value: {
                                                sourceURL: 'images/detour_start.png',
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    });

                    if (phasesSelected.length > 0) {
                        // only show the first phase that is specified in the URL
                        if (phasesSelected[0] === phase) {
                            layer.visible = true;
                            selectedPhase = index;
                        } else {
                            layer.visible = false;
                        }
                    } else {
                        if (phase === currentPhase) {
                            layer.visible = true;
                        } else {
                            layer.visible = false;
                        }
                    }

                    if (phaseInformation[phase]) {
                        let content = phaseInformation[phase];
                        layer.infoPopup = new InfoPopup(content, phase, layer.visible);
                    } else {
                        layer.infoPopup = new InfoPopup(null, phase, layer.visible);
                    }

                    visibilityWatchers.push(layer.watch('visible', visibilityWatchHandler));

                    layers.push(layer);

                    if (selectedPhase) {
                        selector.addItem(`Phase ${phase}`, layer.id);
                        selector.selectorDropdown.selectedIndex = selectedPhase - 1;
                    } else if (phase === currentPhase) {
                        selector.addItem(`Phase ${phase} [current]`, layer.id);
                    } else {
                        selector.addItem(`Phase ${phase}`, layer.id);
                    }

                    if (layer.visible) {
                        layer.queryExtent().then((response) => {
                            view.goTo(response.extent).catch((error) => {
                                console.error(error);
                            });
                        });
                    }
                }
            });

            map.addMany(layers);
            selector.layers = layers;
        });
    }

    function SelectorMenu(attachPoint) {
        this.domNode = document.createElement('div');
        this.domNode.className =
            'esri-component esri-layer-list esri-widget esri-widget--panel phase-selection';

        const selectorDescription = document.createElement('p');
        selectorDescription.className = 'my-2 fw-bold';
        selectorDescription.innerText = 'Select current or future phase below.';

        this.selectorDropdown = document.createElement('select');
        this.selectorDropdown.className = 'esri-widget';
        this.selectorDropdown.addEventListener('change', (event) => {
            map.layers.items.forEach((layer) => {
                if (layer.id === event.target.value) {
                    layer.visible = true;
                    layer.queryExtent().then((response) => {
                        view.goTo(response.extent).catch((error) => {
                            console.error(error);
                        });
                    });
                } else {
                    layer.visible = false;
                }
            });
        });

        this.addItem = function (description, layerID) {
            const option = document.createElement('option');
            option.value = layerID;
            option.innerHTML = description;

            this.selectorDropdown.append(option);
        };

        this.domNode.append(selectorDescription, this.selectorDropdown);
        attachPoint.append(this.domNode);
    }
    function CarouselPopup(attachPoint, content) {
        const self = this;

        function Slide(attachPoint, content, display = false) {
            const slide = document.createElement('div');
            slide.innerHTML = `
                <div class="mySlides" style="display:${display ? 'block' : 'hidden'}">
                    <img class="modal-content" src="${content.carouselImgSrc}">
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
                <div class="carousel-contaier slideshow-container">
                    <a class="${content.length > 1 ? 'prev' : 'hidden'}" onclick="plusSlides(-1)">❮</a>
                    <a class="${content.length > 1 ? 'next' : 'hidden'}" onclick="plusSlides(1)">❯</a>
                </div>
            </div>
        `;

        attachPoint.append(this.domNode);

        const slideContainer = this.domNode.querySelector('.carousel-contaier.slideshow-container');
        const span = document.getElementsByClassName('close')[0];

        content.forEach((slide, index) => {
            new Slide(slideContainer, slide, index === 0);
        });

        span.onclick = function () {
            self.domNode.innerHTML = '';
            self.domNode.style.display = 'none';
            self.domNode.innerHTML = '';
        };
    }
    function InfoPopup(content, phaseNumber, initiallyVisible) {
        let widgetRoot = document.querySelector('.esri-ui-bottom-left.esri-ui-corner');
        let menuRoot = document.createElement('div');

        menuRoot.className = 'phaseFormBox esri-component esri-widget esri-widget--panel middle';

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
                <div class="phase-form-content">
                    <div class="phase-picture">
                        <img src="${content ? content.detourImageSrc : ''}"></img>
                    </div>

                    <div class="description-box">
                        <h6>${content ? content.phaseHeaderInnerHTML : `Phase: ${phaseNumber}`}</h6>
                            <p class="description">
                                ${
                                    content
                                        ? content.phaseDescriptionInnerHTML
                                        : 'Phase description can be added here for further detail.'
                                }
                            </p>
                        </div>
                    </div>
                </div>`;
        widgetRoot.append(menuRoot);

        menuRoot.querySelector('img').addEventListener('click', function () {
            let carouselRoot = document.querySelector('.esri-ui-bottom-left.esri-ui-corner');

            if (content && content.slides) {
                new CarouselPopup(carouselRoot, content.slides);
            }
        });

        this.visible = initiallyVisible;
    }

    view.when(() => {
        addUIControls(view);
    });
});
