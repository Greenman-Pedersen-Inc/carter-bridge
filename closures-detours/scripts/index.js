require([
    'esri/Map',
    'esri/views/MapView',
    'esri/layers/FeatureLayer',
    'esri/request',
    'esri/widgets/Legend',
], (Map, MapView, FeatureLayer, esriRequest, Legend) => {
    const currentPhase = 0;
    const phaseInformationLayer =
        'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/query?where=1=1&f=json&outFields=*&returnGeometry=false';
    const map = new Map({
        // basemap: 'satellite',
        basemap: 'hybrid',
        // basemap: 'osm',
        // basemap: 'dark-gray-vector',
        // basemap: 'gray-vector',
        // basemap: 'streets-vector',
        // basemap: 'streets-night-vector',
        // basemap: 'streets-navigation-vector',
        // basemap: 'topo-vector',
        // basemap: 'streets-relief-vector',
    });
    const view = new MapView({
        container: 'viewDiv',
        map: map,
        center: [-81.63211, 38.35822], //Longitude, latitude
        zoom: 16,
    });
    const phaseInformation = {
        0: {
            image: 'images/Phase-0.jpg',
            title: 'Current Phase',
            description:
                'Left lane of Pennsylvania Avenue is closed. Please use the middle and right lane to proceed. Pennsylvania Avenue On-Ramp to I-64E is open.',
            slides: [
                {
                    image: 'images/Phase-0.jpg',
                    title: 'Detour 1',
                    description:
                        'Left lane of Pennsylvania Avenue is closed. Please use the middle and right lane to proceed. Pennsylvania Avenue On-Ramp to I-64E is open.',
                },
            ],
        },
        1: {
            image: 'images/Phase-1-detour-1.jpg',
            description: `
                    Washington Street On-Ramp Closed and right lane closure on I-64E.
                    <br>
                    <br>
                    Please click on the photo for more info
            `,
            slides: [
                {
                    image: 'images/Phase-1-detour-1.jpg',
                    title: 'Detour 1',
                    description:
                        'Washington Street On-Ramp closed. Please continue on Pennsylvania Avenue to Bigley Avenue.',
                },
                {
                    image: 'images/Phase-1-detour-2.jpg',
                    title: 'Detour 1A',
                    description:
                        'Turn left onto Westmoreland Road and then turn right onto Odell Avenue On-Ramp to continue on I-77N.',
                },
                {
                    image: 'images/Phase-1-detour-3.jpg',
                    title: 'Detour 1B',
                    description:
                        'Turn left onto Westmoreland Road and then turn left onto Crescent Road On-Ramp to continue on I-77S.',
                },
            ],
        },
        2: {
            image: 'images/Phase-2.jpg',
            description: `I-77S left lane of ramp to I-64E/I-77S/Beckley closed.`,
            slides: [
                {
                    image: 'images/Phase-2.jpg',
                    title: 'Detour 1',
                    description: 'I-77S left lane of ramp to I-64E/I-77S/Beckley closed.',
                },
            ],
        },
        3: {
            image: 'images/Phase-3.jpg',
            description: `I-77S right lane of ramp to I-64E/I-77S/Beckley closed.`,
            slides: [
                {
                    image: 'images/Phase-3.jpg',
                    title: 'Detour 1',
                    description: 'I-77S right lane of ramp to I-64E/I-77S/Beckley closed.',
                },
            ],
        },
        4: {
            image: 'images/Phase-4-detour-1.jpg',
            description: `Washington Street On-Ramp Closed and right lane closure on I-64E.
                         <br>
                        <br>
                        Please click on the photo for more info`,
            slides: [
                {
                    image: 'images/Phase-4-detour-1.jpg',
                    title: 'Detour 1',
                    description: `Washington Street On-Ramp closed. Please continue on Pennsylvania Avenue to Bigley Avenue.`,
                },
                {
                    image: 'images/Phase-4-detour-2.jpg',
                    title: 'Detour 1A',
                    description:
                        'Turn left onto Westmoreland Road and then turn right onto Odell Avenue On-Ramp to continue on I-77N.',
                },
                {
                    image: 'images/Phase-4-detour-3.jpg',
                    title: 'Detour 1B',
                    description:
                        'Turn left onto Westmoreland Road and then turn left onto Crescent Road On-Ramp to continue on I-77S.',
                },
            ],
        },
        6: {
            image: 'images/Phase-6.jpg',
            description: `I-77N left lane of Exit 101 to I-64W/Huntington closed.`,
            slides: [
                {
                    image: 'images/Phase-6.jpg',
                    title: 'Detour 1',
                    description: 'I-77N left lane of Exit 101 to I-64W/Huntington closed.',
                },
            ],
        },
        7: {
            image: 'images/Phase-7.jpg',
            description: `I-77S left lane of ramp to I-77N/I-79/Parkersburg closed.`,
            slides: [
                {
                    image: 'images/Phase-7.jpg',
                    title: 'Detour 1',
                    description: 'I-77S left lane of ramp to I-77N/I-79/Parkersburg closed.',
                },
            ],
        },
        8: {
            image: 'images/Phase-8.jpg',
            description: `I-77N right lane of Exit 101 to I-64W/Huntington closed.`,
            slides: [
                {
                    image: 'images/Phase-8.jpg',
                    title: 'Detour 1',
                    description: 'I-77N right lane of Exit 101 to I-64W/Huntington closed.',
                },
            ],
        },
        9: {
            image: 'images/Phase-9.jpg',
            description: `I-64W left lane past Exit 58C Closed.`,
            slides: [
                {
                    image: 'images/Phase-9.jpg',
                    title: 'Detour 1',
                    description: 'I-64W left lane past Exit 58C Closed.',
                },
            ],
        },
        10: {
            image: 'images/Phase-10-detour-1.jpg',
            description: `I-64W right lane of Exit 101 I-64W/US-119S/Huntington closed and I-64W right lane past Exit 58C closed.
                        <br>
                        <br>
                        Please click on the photo for more info`,
            slides: [
                {
                    image: 'images/Phase-10-detour-1.jpg',
                    title: 'Closure 1',
                    description: 'I-64W right lane of Exit 101 I-64W/US-119S/Huntington closed.',
                },
                {
                    image: 'images/Phase-10-detour-2.jpg',
                    title: 'Closure 2',
                    description: 'I-64W right lane past Exit 58C closed.',
                },
            ],
        },
        11: {
            image: 'images/Phase-11.jpg',
            description: `Right shoulder of Exit 58C of I-64W closed.`,
            slides: [
                {
                    image: 'images/Phase-11.jpg',
                    title: 'Detour 1',
                    description: 'Right shoulder of Exit 58C of I-64W closed.',
                },
            ],
        },
        12: {
            image: 'images/Phase-12.jpg',
            description: `Left shoulder of Exit 58C of I-64W closed.`,
            slides: [
                {
                    image: 'images/Phase-12.jpg',
                    title: 'Detour 1',
                    description: 'Left shoulder of Exit 58C of I-64W closed.',
                },
            ],
        },
        13: {
            image: 'images/Phase-13.jpg',
            description: `I-64E left lane of Exit 59 I-77N/I-79/Parkersburg closed.`,
            slides: [
                {
                    image: 'images/Phase-13.jpg',
                    title: 'Detour 1',
                    description: 'I-64E left lane of Exit 59 I-77N/I-79/Parkersburg closed.',
                },
            ],
        },
        15: {
            image: 'images/Phase-15-detour-1.jpg',
            description: `Washington Street On-Ramp Closed and right lane closure on I-64E.
            <br>
            <br>
            Please click on the photo for more info`,
            slides: [
                {
                    image: 'images/Phase-15-detour-1.jpg',
                    title: 'Detour 1',
                    description:
                        'Washington Street On-Ramp closed. Please continue on Pennsylvania Avenue to Bigley Avenue.',
                },
                {
                    image: 'images/Phase-15-detour-2.jpg',
                    title: 'Detour 1A',
                    description:
                        'Turn left onto Westmoreland Road and then turn right onto Odell Avenue On-Ramp to continue on I-77N.',
                },
                {
                    image: 'images/Phase-15-detour-3.jpg',
                    title: 'Detour 1B',
                    description:
                        'Turn left onto Westmoreland Road and then turn left onto Crescent Road On-Ramp to continue on I-77S.',
                },
            ],
        },
        16: {
            image: 'images/Phase-16.jpg',
            description: `I-77S right lane closed.`,
            slides: [
                {
                    image: 'images/Phase-16.jpg',
                    title: 'Detour 1',
                    description: 'I-77S right lane closed.',
                },
            ],
        },
        17: {
            image: 'images/Phase-17-detour-1.jpg',
            description: `I-77S right lane closed before and after Brooks St Ramp.
            <br>
            <br>
            Please click on the photo for more info`,
            slides: [
                {
                    image: 'images/Phase-17-detour-1.jpg',
                    title: 'Closure 1',
                    description: 'I-77S right lane closed before Brooks St Ramp.',
                },
                {
                    image: 'images/Phase-17-detour-2.jpg',
                    title: 'Closure 2',
                    description: 'I-77S right lane closed after Brooks St Ramp.',
                },
            ],
        },
        18: {
            image: 'images/Phase-18-detour-1.jpg',
            description: `Court Street on-ramp and right lane of I-77N/I-79/Parkersburg closed. Please take Brooks St Ramp for I-77N. Take Court St down to Lee St. Turn left onto Lee St. Turn left onto Brooks St and continue to take the ramp for I-77N.
                <br>
                <br>
                Please click on the photo for more info`,
            slides: [
                {
                    image: 'images/Phase-18-detour-1.jpg',
                    title: 'Detour 1',
                    description: 'Please take Brooks St Ramp for I-77N.',
                },
                {
                    image: 'images/Phase-18-detour-2.jpg',
                    title: 'Detour 1',
                    description:
                        'Take Court St down to Lee St. Turn left onto Lee St. Turn left onto Brooks St and continue to take the ramp for I-77N.',
                },
            ],
        },
        19: {
            image: 'images/Phase-19-detour-1.jpg',
            description: `I-77S Exit 100 Leon Sullivan Way Off-Ramp Closed. Continue on I-77S and take Exit 99 State Capitol/Greenbrier St. Keep right at the fork. Turn right onto Greenbrier St. Turn right onto Washington St E. Continue straight until Leon Sullivan Way.
                <br>
                <br>
                Please click on the photo for more info`,
            slides: [
                {
                    image: 'images/Phase-19-detour-1.jpg',
                    title: 'Closure 1',
                    description: 'Closure 1 I-77S Exit 100 Leon Sullivan Way Off-Ramp Closed.',
                },
                {
                    image: 'images/Phase-19-detour-2.jpg',
                    title: 'Detour 1',
                    description: 'Continue on I-77S and take Exit 99 State Capitol.',
                },
                {
                    image: 'images/Phase-19-detour-3.jpg',
                    title: 'Detour 2',
                    description: 'Keep right at the fork.',
                },
                {
                    image: 'images/Phase-19-detour-4.jpg',
                    title: 'Detour 3',
                    description:
                        'Turn right onto Washington St E. Continue straight until Leon Sullivan Way.',
                },
            ],
        },
        21: {
            image: 'images/Phase-21-detour-1.jpg',
            description:
                'I-77N Exit 100 Leon Sullivan Way/Capitol St. Off-Ramp Closed. Take Exit 99 State Capitol/Greenbrier St. Turn left onto Greenbrier St. Turn right onto Washington St E. Continue straight until Leon Sullivan Way.',
            slides: [
                {
                    image: 'images/Phase-21-detour-1.jpg',
                    title: 'Closure 1',
                    description: ' I-77N Exit 100 Leon Sullivan Way/Capitol St. Off-Ramp Closed.',
                },
                {
                    image: 'images/Phase-21-detour-2.jpg',
                    title: 'Detour 1',
                    description: 'Take Exit 99 State Capitol/Greenbrier St.',
                },
                {
                    image: 'images/Phase-21-detour-3.jpg',
                    title: 'Detour 2',
                    description: 'Turn left onto Greenbrier St.',
                },
                {
                    image: 'images/Phase-21-detour-4.jpg',
                    title: 'Detour 3',
                    description:
                        'Turn right onto Washington St E and continue straight until Leon Sullivan Way.',
                },
            ],
        },
        23: {
            image: 'images/Phase-23-detour-1.jpg',
            description: `Capitol St exit ramp closed. Continue straight on Leon Sullivan Way. Turn right onto Washington St E. Continue on Washington St E. Turn right on Dickinson St.
                <br>
                <br>
                Please click on the photo for more info`,
            slides: [
                {
                    image: 'images/Phase-23-detour-1.jpg',
                    title: 'Detour 1',
                    description: 'Continue straight on Leon Sullivan Way.',
                },
                {
                    image: 'images/Phase-23-detour-2.jpg',
                    title: 'Detour 2',
                    description: 'Turn right onto Washington St E.',
                },
                {
                    image: 'images/Phase-23-detour-3.jpg',
                    title: 'Detour 3',
                    description: 'Continue on Washington St.',
                },
            ],
        },
        24: {
            image: 'images/Phase-24-detour-1.jpg',
            description: `Leon Sullivan exit ramp closed. Take Capitol St ramp. Continue on Christopher St and take a left on Capitol St. Continue to Lee St.
            <br>
            <br>
            Please click on the photo for more info`,
            slides: [
                {
                    image: 'images/Phase-24-detour-1.jpg',
                    title: 'Detour 1',
                    description: 'Take Capitol St ramp',
                },
                {
                    image: 'images/Phase-24-detour-2.jpg',
                    title: 'Detour 1',
                    description:
                        'Continue on Christopher St and take a left on Capitol St. Continue to Lee St.',
                },
            ],
        },
        25: {
            image: 'images/Phase-25-detour-1.jpg',
            description: `Brooks St ramp to I-64W/I-77N/I-79/Parkersburg/Huntington closed. Continue on Brooks St. Turn left on Smith St. Continue on Smith St. Turn left onto Smith St Ramp.
            <br>
            <br>
            Please click on the photo for more info`,
            slides: [
                {
                    image: 'images/Phase-25-detour-1.jpg',
                    title: 'Closure 1',
                    description: 'Continue on Brooks St.',
                },
                {
                    image: 'images/Phase-25-detour-2.jpg',
                    title: 'Detour 2',
                    description: 'Continue on Brooks St.',
                },
                {
                    image: 'images/Phase-25-detour-3.jpg',
                    title: 'Detour 3',
                    description: 'Turn left on Smith St. Continue on Smith St.',
                },
                {
                    image: 'images/Phase-25-detour-4.jpg',
                    title: 'Detour 4',
                    description: 'Turn left onto Smith St Ramp.',
                },
            ],
        },
        27: {
            image: 'images/Phase-27-detour-1.jpg',
            description: `Brooks St ramp to I-64W/I-77S/Beckley closed. Turn right on Washington St E. Continue on Washington St E. Turn left onto Greenbrier St. Take the I-64E/I-77 ramp.
            <br>
            <br>
            Please click on the photo for more info`,
            slides: [
                {
                    image: 'images/Phase-27-detour-1.jpg',
                    title: 'Closure 1',
                    description: 'Brooks St ramp to I-64W/I-77S/Beckley closed.',
                },
                {
                    image: 'images/Phase-27-detour-2.jpg',
                    title: 'Detour 1',
                    description: 'Turn right on Washington St E.',
                },
                {
                    image: 'images/Phase-27-detour-3.jpg',
                    title: 'Detour 2',
                    description: 'Continue on Washington St E. Turn left onto Greenbrier St.',
                },
                {
                    image: 'images/Phase-27-detour-4.jpg',
                    title: 'Detour 3',
                    description: 'Continue on Greenbrier St. Take the I-64E/I-77 ramp.',
                },
            ],
        },
        29: {
            image: 'images/Phase-29-detour-1.jpg',
            description: `Brooks St ramp closed. 
            For I-64W/I-77S/Beckley turn right on Washington St E. Continue on Washington St E. Turn left onto Greenbrier St. Take the I-64E/I-77 ramp. 
            For I-64W/I-77N/I-79/Parkersburg/Huntington continue on Brooks St. Turn left on Smith St. Continue on Smith St. Turn left onto Smith St Ramp.
            <br>
            <br>
            Please click on the photo for more info`,
            slides: [
                {
                    image: 'images/Phase-29-detour-1-1.jpg',
                    title: 'Detour 1-1',
                    description: 'Turn right on Washington St E. Continue on Washington St E.',
                },
                {
                    image: 'images/Phase-29-detour-1-2.jpg',
                    title: 'Detour 1-2',
                    description: 'Turn left onto Greenbrier St.',
                },
                {
                    image: 'images/Phase-29-detour-1-3.jpg',
                    title: 'Detour 1-3',
                    description: 'Continue on Greenbrier St. Take the I-64E/I-77 ramp.',
                },
                {
                    image: 'images/Phase-29-detour-2-1.jpg',
                    title: 'Detour 2-1',
                    description: 'Continue on Brooks St.',
                },
                {
                    image: 'images/Phase-29-detour-2-2.jpg',
                    title: 'Detour 2-2',
                    description: 'Turn left on Smith St. Continue on Smith St.',
                },
                {
                    image: 'images/Phase-29-detour-2-3.jpg',
                    title: 'Detour 2-3',
                    description: 'Turn left onto Smith St Ramp.',
                },
            ],
        },
        33: {
            image: 'images/Phase-33-detour-1.jpg',
            description: `I-77S left lane of ramp to I-64E/I-77S/Beckley closed.`,
            slides: [
                {
                    image: 'images/Phase-33-detour-1.jpg',
                    title: 'Detour 1',
                    description: 'I-77S left lane of ramp to I-64E/I-77S/Beckley closed.',
                },
                {
                    image: 'images/Phase-33-detour-2.jpg',
                    title: 'Detour 2',
                    description: 'I-77S left lane of ramp to I-64E/I-77S/Beckley closed.',
                },
            ],
        },
        34: {
            image: 'images/Phase-34.jpg',
            description: `I-77S left lane closed.`,
            slides: [
                {
                    image: 'images/Phase-34.jpg',
                    title: 'Detour 1',
                    description: 'I-77S left lane closed.',
                },
            ],
        },
        35: {
            image: 'images/Phase-35.jpg',
            description: `I-77N left lane closed.`,
            slides: [
                {
                    image: 'images/Phase-35.jpg',
                    title: 'Detour 1',
                    description: 'I-77N left lane closed.',
                },
            ],
        },
        36: {
            image: 'images/Phase-36.jpg',
            description: `I-77N left lane closed.`,
            slides: [
                {
                    image: 'images/Phase-36.jpg',
                    title: 'Detour 1',
                    description: 'I-77S right lane closed before and after Brooks St Ramp.',
                },
            ],
        },
        37: {
            image: 'images/Phase-37.jpg',
            description: `I-77N right lane closed.`,
            slides: [
                {
                    image: 'images/Phase-37.jpg',
                    title: 'Detour 1',
                    description: 'I-77N right lane closed.',
                },
            ],
        },
        38: {
            image: 'images/Phase-38.jpg',
            description: `I-77S right lane closed and Exit 100 Leon Sullivan Way off-ramp closed. Continue on I-77S and take Exit 99 State Capitol/Greenbrier St. Keep right at the fork. Turn right onto Greenbrier St. Turn right onto Washington St E. Continue straight until Leon Sullivan Way.`,
            slides: [
                {
                    image: 'images/Phase-38.jpg',
                    title: 'Closure',
                    description: 'I-77S right lane closed and Exit 100 Leon Sullivan Way off-ramp closed',
                },
                {
                    image: 'images/Phase-38-detour-1.jpg',
                    title: 'Detour 2',
                    description: 'Continue on I-77S and take Exit 99 State Capitol/Greenbrier St.',
                },
                {
                    image: 'images/Phase-38-detour-2.jpg',
                    title: 'Detour 3',
                    description: 'Keep right at the fork. Turn right onto Greenbrier St.',
                },
                {
                    image: 'images/Phase-38-detour-3.jpg',
                    title: 'Detour 4',
                    description:
                        'Turn right onto Washington St E. Continue straight until Leon Sullivan Way.',
                },
            ],
        },
        40: {
            image: 'images/Phase-40-detour-1.jpg',
            description: `Willow Street Closed. Continue on Pennsylvania Ave. Turn left onto Bigley Avenue then slight left to continue on Bigley Avenue.`,
            slides: [
                {
                    image: 'images/Phase-40-detour-1.jpg',
                    title: 'Detour 1',
                    description: 'Continue on Pennsylvania Ave. Turn left onto Bigley Avenue.',
                },
                {
                    image: 'images/Phase-40-detour-2.jpg',
                    title: 'Detour 2',
                    description: 'Slight left to continue on Bigley Avenue.',
                },
                {
                    image: 'images/Phase-40-detour-3.jpg',
                    title: 'Detour 3',
                    description: 'Slight left to continue on Bigley Avenue.',
                },
            ],
        },
        41: {
            image: 'images/Phase-41-detour-1.jpg',
            description: `Court Street closed between Donnally St and Smith St. Continue on Donnally St and turn left onto Capitol St. Turn left onto Smith St.
            <br>
            <br>
            Please click on the photo for more info`,
            slides: [
                {
                    image: 'images/Phase-41-detour-2.jpg',
                    title: 'Detour 1',
                    description: 'Continue on Donnally St and turn left onto Capitol St.',
                },
                {
                    image: 'images/Phase-41-detour-3.jpg',
                    title: 'Detour 2',
                    description: 'Turn left onto Smith St.',
                },
            ],
        },
        42: {
            image: 'images/Phase-42-detour-1.jpg',
            description: `Smith St closed between Eagan St and On-Ramp to I-77N. Turn left onto Eagan St. Turn right onto Donnally St. Turn right on Court St.
            <br>
            <br>
            Please click on the photo for more info`,
            slides: [
                {
                    image: 'images/Phase-42-detour-2.jpg',
                    title: 'Detour 1',
                    description: 'Turn left onto Eagan St.',
                },
                {
                    image: 'images/Phase-42-detour-3.jpg',
                    title: 'Detour 2',
                    description: 'Turn right onto Donnally St.',
                },
                {
                    image: 'images/Phase-42-detour-4.jpg',
                    title: 'Detour 3',
                    description: 'Turn right on Court St.',
                },
            ],
        },
        43: {
            image: 'images/Phase-43-detour-1.jpg',
            description: `Piedmont Rd closed between Morris St and Slack St. Take Morris St and turn right on Smith St. Continue on Smith St then turn right onto Court St. Turn right onto Piedmont Rd.
            <br>
            <br>
            Please click on the photo for more info`,
            slides: [
                {
                    image: 'images/Phase-43-detour-2.jpg',
                    title: 'Detour 1',
                    description: 'Take Morris St and turn right on Smith St.',
                },
                {
                    image: 'images/Phase-43-detour-3.jpg',
                    title: 'Detour 2',
                    description: 'Continue on Smith St then turn right onto Court St.',
                },
                {
                    image: 'images/Phase-43-detour-4.jpg',
                    title: 'Detour 3',
                    description: 'Turn right onto Piedmont Rd.',
                },
            ],
        },
        44: {
            image: 'images/Phase-44-detour-1.jpg',
            description: `Leon Sullivan Way closed between John Norman St and Smith St. Turn right onto Shrewsbury St. Turn left onto John Norman St.
            <br>
            <br>
            Please click on the photo for more info`,
            slides: [
                {
                    image: 'images/Phase-44-detour-2.jpg',
                    title: 'Detour 1',
                    description: 'Leon Sullivan Way closed between John Norman St and Smith St.',
                },
                {
                    image: 'images/Phase-44-detour-3.jpg',
                    title: 'Detour 2',
                    description: 'Turn right onto Shrewsbury St.',
                },
                {
                    image: 'images/Phase-44-detour-4.jpg',
                    title: 'Detour 3',
                    description: 'Turn left onto John Norman St.',
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

        esriRequest(phaseInformationLayer).then(function (response) {
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
                    // let renderer = {
                    //     type: 'simple', // autocasts as new SimpleRenderer()
                    //     symbol: {
                    // type: 'simple-fill', // autocasts as new SimpleFillSymbol()
                    // color: [255, 128, 0, 0.5],
                    // outline: {
                    //     // autocasts as new SimpleLineSymbol()
                    //     width: 1,
                    //     color: 'white',
                    // },
                    //     },
                    // };

                    let layer = new FeatureLayer({
                        url: `https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/`,
                        title: `Phase ${phase}`,
                        visible: false,
                        // renderer: renderer,
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
                                                sourceURL: 'images/Phase-0.jpg',
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    });

                    layer.once('loaded', (event) => {
                        console.log(layer.renderer);
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
                    <img class="modal-content" src="${content.image}">
                    <div class="text pt-5">${content.title}</div>
                    <p style="color:white;text-align:center">
                        ${content.description}
                    </p>
                </div>
             `;

            attachPoint.append(slide);
        }

        this.domNode = document.createElement('div');
        this.domNode.className = 'carousel-popup modal';
        this.domNode.innerHTML = `
            <span class="close">&times;</span>
            <div class="carousel-container slideshow-container">
                <a class="${content.length > 1 ? 'prev' : 'hidden'}" onclick="plusSlides(-1)">❮</a>
                <a class="${content.length > 1 ? 'next' : 'hidden'}" onclick="plusSlides(1)">❯</a>
            </div>
        `;

        attachPoint.append(this.domNode);

        const slideContainer = this.domNode.querySelector('.carousel-container.slideshow-container');
        const span = document.getElementsByClassName('close')[0];

        content.forEach((slide, index) => {
            new Slide(slideContainer, slide, index === 0);
        });

        span.onclick = function () {
            const carouselsToDestroy = document.querySelectorAll('.carousel-popup');
            carouselsToDestroy.forEach((carousel) => {
                carousel.remove();
            });
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
                        <img src="${content ? content.image : ''}"></img>
                    </div>

                    <div class="description-box">
                        <h6>Phase: ${phaseNumber}</h6>
                            <p class="description">
                                ${
                                    content
                                        ? content.description
                                        : 'Phase description can be added here for further detail.'
                                }
                            </p>
                        </div>
                    </div>
                </div>`;
        widgetRoot.append(menuRoot);

        menuRoot.querySelector('img').addEventListener('click', function () {
            let carouselRoot = document.querySelector('body');

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
