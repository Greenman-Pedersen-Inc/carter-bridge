require([
    'esri/Map',
    'esri/views/MapView',
    'esri/layers/FeatureLayer',
    'esri/widgets/LayerList',
    'esri/request',
    'esri/widgets/Legend',
    'esri/PopupTemplate',
], (Map, MapView, FeatureLayer, LayerList, esriRequest, Legend) => {
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
        let widgetRoot = document.querySelector('.esri-ui-inner-container.esri-ui-corner-container');
        let selectorMenu = document.querySelector('.esri-ui-top-right.esri-ui-corner');
        let selectRoot = document.createElement('div');
        selectRoot.innerHTML = `
<div class="esri-component esri-layer-list esri-widget esri-widget--panel phase-selection">
    <div id="optionsDiv" class="esri-widget">
        <p>
            Select present or future phase.
        </p>
        <select id="query-type" class="esri-widget">
            <option >Pick Phase</option>
            <option value="currentPhase">Current Phase</option>
            <option value="futurePhase">Future Phases</option>
        </select>
    </div>
</div>`;

        let menuRoot = document.createElement('div');
        menuRoot.className = 'esri-component esri-widget esri-widget--panel';
        menuRoot.innerHTML = `<div id ="phaseFormBox" class="esri-component esri-widget esri-widget--panel middle">
<div>
<h2 class="esri-widget__heading" id="phase_header" role="heading" aria-level="3">Phase 1</h2>
<div class="informationInner row">
<div class="col-md-6">
<img id="myImg" class="img-fluid" src="detour1.png"></img>
</div>

<div id="myModal" class="modal">
    <span class="close">&times;</span>
    <div id="caption"></div>

    <div id="carousel-contaier" class="slideshow-container">
    <div id="slideshow-one" class="mySlides" style="display:block">
        <img  class="modal-content" src="detour1.png" style="width:100%">
        <div class="text pt-5">Detour 1</div>
        <p id="popup-description-one" style="color:white;text-align:center">Washington Street On-Ramp closed. Please continue on Pennsylvania Avenue to Bigley Avenue.</p>
    </div>

    <div id="slideshow-two" class="mySlides ">
        <img  class="modal-content" src="detour2.png" style="width:100%">
        <div class="text pt-5">Detour 2</div>
        <p style="color:white;text-align:center">Turn left onto Westmoreland Road and then turn right onto Odell Avenue On-Ramp to continue on I-77N.</p>
    </div>

    <div id="slideshow-three" class="mySlides ">
        <img class="modal-content" src="detour3.png" style="width:100%">
        <div class="text pt-5">Detour 3</div>
        <p style="color:white;text-align:center">Turn left onto Westmoreland Road and then turn left onto Crescent Road On-Ramp to continue on I-77S.</p>
    </div>

    <a class="prev" onclick="plusSlides(-1)">❮</a>
    <a class="next" onclick="plusSlides(1)">❯</a>

</div>
<br>

<div id="dot-controls" tyle="text-align:center">
    <span class="dot" onclick="currentSlide(1)"></span>
    <span class="dot" onclick="currentSlide(2)"></span>
    <span class="dot" onclick="currentSlide(3)"></span>
</div>

    
</div>

<div class="col-md-6">
        <div class="descriptionBox">
        <div style="font-weight:bold;">Description of closure</div>
        <br>
        <p class="description" id="phase_description">
        Phase 1 Closure. Washington Street On-Ramp Closed and right lane closure on I-64E. 
        <br>
        <br>
        Detour: Take Pennsylvania Avenue to Bigley Avenue and then turn left onto Westmoreland Road. Either turn right to Odell Avenue On-Ramp to continue on I-77N or turn left onto Crescent Road On-Ramp to continue on I-77S. 
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
        selectorMenu.append(selectRoot);
        view.ui.add(layerList, 'top-right');

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

        // let layerVisibleIcon = document.getElementsByClassName('esri-layer-list__item-toggle');

        const queryOpts = document.getElementById('query-type');

        queryOpts.addEventListener('change', (event) => {
            if (event.target.value === 'currentPhase') {
                map.removeAll();
                const activeLayer = new FeatureLayer({
                    url: 'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/query?where=CurrentPhase+%3D+%27true%27&f=json&outFields=*&returnGeometry=false',
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

                const displayblock = document.getElementById('phaseFormBox');
                const phaseDescription = document.getElementById('phase_description');
                const phaseHeader = document.getElementById('phase_header');
                const popupDescriptionSlideOne = document.getElementById('popup-description-one');

                const slideShowContainerTwo = document.getElementById('slideshow-two');
                const slideShowContainerThree = document.getElementById('slideshow-three');
                const slideShowDotNavigation = document.getElementById('dot-controls');
                // console.log(slideShowContainerThree);

                displayblock.style.display = 'block';
                phaseHeader.innerHTML = 'Current Phase';
                phaseDescription.innerHTML =
                    ' Left lane of Pennsylvania Avenue is closed. Please use the middle and right lane to proceed. Pennsylvania Avenue On-Ramp to I-64E is open.';
                popupDescriptionSlideOne.innerHTML =
                    'Left lane of Pennsylvania Avenue is closed. Please use the middle and right lane to proceed. Pennsylvania Avenue On-Ramp to I-64E is open.';
                slideShowContainerTwo.remove();
                slideShowContainerThree.remove();
                slideShowDotNavigation.remove();

                map.add(activeLayer, 1);
            } else {
                map.removeAll();
                function addLayers(phasePeriod) {
                    esriRequest(
                        'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/query?where=1=1&f=json&outFields=*&returnGeometry=false'
                    ).then(function (response) {
                        const phasesPresent = response.data.features.map((feature) => {
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
                        // const currentPhaseLayer = new FeatureLayer({
                        //     url: 'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/',
                        //     definitionExpression: 'phase = 0',
                        // });

                        existingPhases.filter((item) => item !== 0);

                        existingPhases.sort(function (a, b) {
                            return b - a;
                        });

                        // console.log(existingPhases);
                        // console.log(existingPhases);
                        existingPhases.forEach((phase) => {
                            if (phase !== null && phase !== 0) {
                                let layerVisiblity;

                                if (phasesSelected) {
                                    if (phasesSelected.includes(phase)) {
                                        layerVisiblity = true;
                                    } else {
                                        layerVisiblity = false;
                                    }
                                } else {
                                    // console.log(phase);
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
                                const displayblock = document.getElementById('phaseFormBox');
                                const phaseHeader = document.getElementById('phase_header');
                                const phaseDescription = document.getElementById('phase_description');
                                displayblock.style.display = 'block';
                                phaseHeader.innerHTML = 'Phase 1';
                                phaseDescription.innerHTML = `Phase 1 Closure. Washington Street On-Ramp Closed and right lane closure on I-64E. 
                                <br>
                                <br>
                                Detour: Take Pennsylvania Avenue to Bigley Avenue and then turn left onto Westmoreland Road. Either turn right to Odell Avenue On-Ramp to continue on I-77N or turn left onto Crescent Road On-Ramp to continue on I-77S. 
                                <br>
                                <br>
                                Please click the image for more information on the detour.`;

                                layer.watch('visible', (newValue, oldValue, property, target) => {
                                    const phaseHeader = document.getElementById('phase_header');
                                    const phaseDescription = document.getElementById('phase_description');
                                    phaseHeader.innerHTML = 'Phase 1';

                                    if (newValue) {
                                        layers.forEach((layer) => {
                                            if (target.id !== layer.id) {
                                                layer.visible = false;
                                            }
                                        });

                                        if (phase === 1) {
                                            phaseHeader.innerHTML = 'Phase 1';

                                            displayblock.style.display = 'block';
                                        } else if (phase === 4) {
                                            phaseHeader.innerHTML = 'Phase 4';
                                            phaseDescription.innerHTML =
                                                ' Description about Phase 4 closures will update in this field.';
                                            displayblock.style.display = 'block';
                                        } else if (phase === 15) {
                                            phaseHeader.innerHTML = 'Phase 15';
                                            phaseDescription.innerHTML =
                                                ' Description about Phase 15 closures will update in this field.';
                                            displayblock.style.display = 'block';
                                        } else if (phase === 18) {
                                            phaseHeader.innerHTML = 'Phase 18';
                                            phaseDescription.innerHTML =
                                                ' Description about Phase 18 closures will update in this field.';
                                            displayblock.style.display = 'block';
                                        } else if (phase === 23) {
                                            phaseHeader.innerHTML = 'Phase 23';
                                            phaseDescription.innerHTML =
                                                ' Description about Phase 23 closures will update in this field.';
                                            displayblock.style.display = 'block';
                                        } else {
                                            displayblock.style.display = 'none';
                                        }
                                    }
                                });

                                layers.push(layer);
                            }
                        });

                        map.addMany(layers);
                    });
                }
                addLayers();
            }
            map.remove();
        });
    }
    function addLayers(phasePeriod) {
        esriRequest(
            'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/query?where=1=1&f=json&outFields=*&returnGeometry=false'
        ).then(function (response) {
            const phasesPresent = response.data.features.map((feature) => {
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
            // const currentPhaseLayer = new FeatureLayer({
            //     url: 'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/',
            //     definitionExpression: 'phase = 0',
            // });

            existingPhases.sort(function (a, b) {
                return b - a;
            });

            // console.log(existingPhases);

            existingPhases.forEach((phase) => {
                if (phase !== null && phase !== 0) {
                    let layerVisiblity;

                    if (phasesSelected) {
                        if (phasesSelected.includes(phase)) {
                            layerVisiblity = true;
                        } else {
                            layerVisiblity = false;
                        }
                    } else {
                        // console.log(phase);
                        if (phase === 1) {
                            layerVisiblity = true;
                        } else {
                            layerVisiblity = false;
                        }
                    }
                    const displayblock = document.getElementById('phaseFormBox');
                    const phaseHeader = document.getElementById('phase_header');
                    const phaseDescription = document.getElementById('phase_description');
                    // phaseHeader.innerHTML = 'Phase 1';
                    // phaseDescription.innerHTML = ' Description about Phase 1 closures will update in this field.';

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

                    layer.watch('visible', (newValue, oldValue, property, target) => {
                        if (newValue) {
                            layers.forEach((layer) => {
                                if (target.id !== layer.id) {
                                    layer.visible = false;
                                }
                            });
                            if (phase === 1) {
                                displayblock.style.display = 'block';
                                phaseHeader.innerHTML = 'Phase 1';
                            } else if (phase === 4) {
                                phaseHeader.innerHTML = 'Phase 4';
                                phaseDescription.innerHTML =
                                    ' Description about Phase 4 closures will update in this field.';
                                displayblock.style.display = 'block';
                            } else if (phase === 15) {
                                phaseHeader.innerHTML = 'Phase 15';
                                phaseDescription.innerHTML =
                                    ' Description about Phase 15 closures will update in this field.';
                                displayblock.style.display = 'block';
                            } else if (phase === 18) {
                                phaseHeader.innerHTML = 'Phase 18';
                                phaseDescription.innerHTML =
                                    ' Description about Phase 18 closures will update in this field.';
                                displayblock.style.display = 'block';
                            } else if (phase === 23) {
                                phaseHeader.innerHTML = 'Phase 23';
                                phaseDescription.innerHTML =
                                    ' Description about Phase 23 closures will update in this field.';
                                displayblock.style.display = 'block';
                            } else {
                                displayblock.style.display = 'none';
                            }
                        }
                    });

                    layers.push(layer);
                }
            });

            map.addMany(layers);
        });
    }

    addLayers();

    view.when(() => {
        addUIControls(view);
    });
});

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName('mySlides');
    let dots = document.getElementsByClassName('dot');
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].className += ' active';
}

// removes random &nbsp from top of page
var el = document.querySelector('body');
el.innerHTML = el.innerHTML.replace(/&nbsp;/g, '');
