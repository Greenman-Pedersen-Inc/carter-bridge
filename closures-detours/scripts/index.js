require([
    'esri/Map',
    'esri/views/MapView',
    'esri/layers/FeatureLayer',
    'esri/request',
    'esri/widgets/Legend',
], (Map, MapView, FeatureLayer, esriRequest, Legend) => {
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
            title: 'Current Phase',
            phaseDescriptionInnerHTML:
                'Left lane of Pennsylvania Avenue is closed. Please use the middle and right lane to proceed. Pennsylvania Avenue On-Ramp to I-64E is open.',
            slides: [
                {
                    carouselImgSrc: 'images/detour1.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription:
                        'Left lane of Pennsylvania Avenue is closed. Please use the middle and right lane to proceed. Pennsylvania Avenue On-Ramp to I-64E is open.',
                },
            ],
        },
        1: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `
                    Washington Street On-Ramp Closed and right lane closure on I-64E.
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
                    carouselPhaseTitle: 'Detour 1A',
                    carouselPhaseDescription:
                        'Turn left onto Westmoreland Road and then turn right onto Odell Avenue On-Ramp to continue on I-77N.',
                },
                {
                    carouselImgSrc: 'images/detour3.png',
                    carouselPhaseTitle: 'Detour 1B',
                    carouselPhaseDescription:
                        'Turn left onto Westmoreland Road and then turn left onto Crescent Road On-Ramp to continue on I-77S.',
                },
            ],
        },
        2: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `I-77S left lane of ramp to I-64E/I-77S/Beckley closed.</p>`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'I-77S left lane of ramp to I-64E/I-77S/Beckley closed.',
                },
            ],
        },
        3: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `I-77S right lane of ramp to I-64E/I-77S/Beckley closed.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'I-77S right lane of ramp to I-64E/I-77S/Beckley closed.',
                },
            ],
        },
        4: {
            detourImageSrc: 'images/detourPhaseImg.png',
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `Washington Street On-Ramp Closed and right lane closure on I-64E.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription:
                        'Washington Street On-Ramp closed. Please continue on Pennsylvania Avenue to Bigley Avenue.',
                },
                {
                    carouselImgSrc: 'images/detour2.png',
                    carouselPhaseTitle: 'Detour 1A',
                    carouselPhaseDescription:
                        'Turn left onto Westmoreland Road and then turn right onto Odell Avenue On-Ramp to continue on I-77N.',
                },
                {
                    carouselImgSrc: 'images/detour3.png',
                    carouselPhaseTitle: 'Detour 1B',
                    carouselPhaseDescription:
                        'Turn left onto Westmoreland Road and then turn left onto Crescent Road On-Ramp to continue on I-77S.',
                },
            ],
        },
        6: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `I-77N left lane of Exit 101 to I-64W/Huntington closed.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'I-77N left lane of Exit 101 to I-64W/Huntington closed.',
                },
            ],
        },
        7: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `I-77S left lane of ramp to I-77N/I-79/Parkersburg.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'I-77S left lane of ramp to I-77N/I-79/Parkersburg.',
                },
            ],
        },
        8: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `I-77N right lane of Exit 101 to I-64W/Huntington closed.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'I-77N right lane of Exit 101 to I-64W/Huntington closed.',
                },
            ],
        },
        9: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `I-64W left lane past Exit 58C Closed.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'I-64W left lane past Exit 58C Closed.',
                },
            ],
        },
        10: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `I-64W right lane of Exit 101 I-64W/US-119S/Huntington closed and I-64W right lane past Exit 58C closed.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription:
                        'I-64W right lane of Exit 101 I-64W/US-119S/Huntington closed and I-64W right lane past Exit 58C closed.',
                },
            ],
        },
        11: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `Right shoulder of Exit 58C of I-64W closed.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Right shoulder of Exit 58C of I-64W closed.',
                },
            ],
        },
        12: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `Left shoulder of Exit 58C of I-64W closed.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Left shoulder of Exit 58C of I-64W closed.',
                },
            ],
        },
        13: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `I-64E left lane of Exit 59 I-77N/I-79/Parkersburg closed.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'I-64E left lane of Exit 59 I-77N/I-79/Parkersburg closed.',
                },
            ],
        },
        15: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `Washington Street On-Ramp Closed and right lane closure on I-64E.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription:
                        'Washington Street On-Ramp closed. Please continue on Pennsylvania Avenue to Bigley Avenue.',
                },
                {
                    carouselImgSrc: 'images/detour2.png',
                    carouselPhaseTitle: 'Detour 1A',
                    carouselPhaseDescription:
                        'Turn left onto Westmoreland Road and then turn right onto Odell Avenue On-Ramp to continue on I-77N.',
                },
                {
                    carouselImgSrc: 'images/detour3.png',
                    carouselPhaseTitle: 'Detour 1B',
                    carouselPhaseDescription:
                        'Turn left onto Westmoreland Road and then turn left onto Crescent Road On-Ramp to continue on I-77S.',
                },
            ],
        },
        16: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `I-77S right lane closed.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'I-77S right lane closed.',
                },
            ],
        },
        17: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `I-77S right lane closed before and after Brooks St Ramp.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'I-77S right lane closed before and after Brooks St Ramp.',
                },
            ],
        },
        18: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML:
                'Court Street on-ramp and right lane of I-77N/I-79/Parkersburg closed. Please take Brooks St Ramp for I-77N. Take Court St down to Lee St. Turn left onto Lee St. Turn left onto Brooks St and continue to take the ramp for I-77N.',
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Please take Brooks St Ramp for I-77N.',
                },
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription:
                        'Take Court St down to Lee St. Turn left onto Lee St. Turn left onto Brooks St and continue to take the ramp for I-77N.',
                },
            ],
        },
        19: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML:
                'I-77S Exit 100 Leon Sullivan Way Off-Ramp Closed. Continue on I-77S and take Exit 99 State Capitol/Greenbrier St. Keep right at the fork. Turn right onto Greenbrier St. Turn right onto Washington St E. Continue straight until Leon Sullivan Way.',
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription:
                        'Continue on I-77S and take Exit 99 State Capitol/Greenbrier St.',
                },
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Keep right at the fork. Turn right onto Greenbrier St.',
                },
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription:
                        'Turn right onto Washington St E. Continue straight until Leon Sullivan Way.',
                },
            ],
        },
        21: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML:
                'I-77N Exit 100 Leon Sullivan Way/Capitol St. Off-Ramp Closed. Take Exit 99 State Capitol/Greenbrier St. Turn left onto Greenbrier St. Turn right onto Washington St E. Continue straight until Leon Sullivan Way.',
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Take Exit 99 State Capitol/Greenbrier St.',
                },
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Turn left onto Greenbrier St.',
                },
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription:
                        'Turn right onto Washington St E. Continue straight until Leon Sullivan Way.    ',
                },
            ],
        },
        23: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML:
                'Capitol St exit ramp closed. Continue straight on Leon Sullivan Way. Turn right onto Washington St E. Continue on Washington St E. Turn right on Dickinson St.',
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Continue straight on Leon Sullivan Way.',
                },
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Turn right onto Washington St E.',
                },
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription:
                        'Continue on Washington St. Turn right on Dickinson St. Continue to Christopher St.',
                },
            ],
        },
        24: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `Leon Sullivan exit ramp closed. Take Capitol St ramp. Continue on Christopher St and take a left on Capitol St. Continue to Lee St.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription:
                        'Continue on Christopher St and take a left on Capitol St. Continue to Lee St.',
                },
            ],
        },
        25: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `Brooks St ramp to I-64W/I-77N/I-79/Parkersburg/Huntington closed. Continue on Brooks St. Turn left on Smith St. Continue on Smith St. Turn left onto Smith St Ramp.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Continue on Brooks St.',
                },
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Turn left on Smith St. Continue on Smith St.',
                },
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Turn left onto Smith St Ramp.',
                },
            ],
        },
        27: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `Brooks St ramp to I-64W/I-77S/Beckley closed. Turn right on Washington St E. Continue on Washington St E. Turn left onto Greenbrier St. Take the I-64E/I-77 ramp.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Turn right on Washington St E.',
                },
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Continue on Washington St E. Turn left onto Greenbrier St.',
                },
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Continue on Greenbrier St. Take the I-64E/I-77 ramp.',
                },
            ],
        },
        29: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `Brooks St ramp closed. For I-64W/I-77S/Beckley turn right on Washington St E. Continue on Washington St E. Turn left onto Greenbrier St. Take the I-64E/I-77 ramp. For I-64W/I-77N/I-79/Parkersburg/Huntington continue on Brooks St. Turn left on Smith St. Continue on Smith St. Turn left onto Smith St Ramp.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Continue on Brooks St.',
                },
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Turn left on Smith St. Continue on Smith St.',
                },
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Turn left onto Smith St Ramp.',
                },
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 2',
                    carouselPhaseDescription: 'Turn right on Washington St E.',
                },
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 2',
                    carouselPhaseDescription: 'Continue on Washington St E. Turn left onto Greenbrier St.',
                },
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 2',
                    carouselPhaseDescription: 'Continue on Greenbrier St. Take the I-64E/I-77 ramp.',
                },
            ],
        },
        33: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `I-77S left lane of ramp to I-64E/I-77S/Beckley closed.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'I-77S left lane of ramp to I-64E/I-77S/Beckley closed.',
                },
            ],
        },
        34: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `I-77S left lane closed.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'I-77S left lane closed.',
                },
            ],
        },
        35: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `I-77N left lane closed.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'I-77N left lane closed.',
                },
            ],
        },
        36: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `I-77N left lane closed.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'I-77S right lane closed before and after Brooks St Ramp.',
                },
            ],
        },
        37: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `I-77N right lane closed.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'I-77N right lane closed.',
                },
            ],
        },
        38: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `I-77S right lane closed and Exit 100 Leon Sullivan Way off-ramp closed. Continue on I-77S and take Exit 99 State Capitol/Greenbrier St. Keep right at the fork. Turn right onto Greenbrier St. Turn right onto Washington St E. Continue straight until Leon Sullivan Way.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription:
                        'Continue on I-77S and take Exit 99 State Capitol/Greenbrier St.',
                },
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Keep right at the fork. Turn right onto Greenbrier St.',
                },
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription:
                        'Turn right onto Washington St E. Continue straight until Leon Sullivan Way.',
                },
            ],
        },
        40: {
            detourImageSrc: 'images/detourPhaseImg.png',
            phaseDescriptionInnerHTML: `Willow Street Closed. Continue on Pennsylvania Ave. Turn left onto Bigley Avenue then slight left to continue on Bigley Avenue.`,
            slides: [
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Continue on Pennsylvania Ave. Turn left onto Bigley Avenue.',
                },
                {
                    carouselImgSrc: 'images/detourPhaseImg.png',
                    carouselPhaseTitle: 'Detour 1',
                    carouselPhaseDescription: 'Slight left to continue on Bigley Avenue.',
                },
            ],
        },
    };

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
                        <h6>Phase: ${phaseNumber}</h6>
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
        const legend = new Legend({
            view: view,
        });

        const selectorMenu = new SelectorMenu(document.querySelector('.esri-ui-top-right.esri-ui-corner'));

        view.ui.add(legend, 'bottom-right');
        addLayers(selectorMenu);
    });
});
