// just use teh calendar and wrap the esri request in a require

var locationPath = location.pathname.replace(/\/[^\/]+$/, '');

window.dojoConfig = {
    async: true,
    tlmSiblingOfDojo: false,
    baseUrl: location.pathname.replace(/\/[^\/]+$/, ''),
    packages: [
        {
            name: 'node_modules',
            location: locationPath + '../node_modules',
        },
    ],
};

require(['esri/request'], (esriRequest, fullcalendar) => {
    const phaseInformationLayer =
        'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/query?where=1=1&f=json&outFields=*&returnGeometry=false';
    esriRequest(phaseInformationLayer).then(function (response) {});

    console.log(fullcalendar);
});
