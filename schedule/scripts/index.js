const phaseInfoURL =
    'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/ArcGIS/rest/services/mdx_2200023_00_Closures_20220426_PublicView/FeatureServer/0/query?where=1=1&f=json&outFields=*&returnGeometry=false';

window.onload = function () {
    require(['esri/request'], (esriRequest) => {
        esriRequest(phaseInfoURL).then(function (response) {
            console.log(response);
            const calendarEl = document.getElementById('viewDiv');
            var calendar = new FullCalendar.Calendar(calendarEl, {
                themeSystem: 'bootstrap5',

                eventClick: function (info) {
                    alert('Event: ' + info.event.title);
                    alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
                    alert('View: ' + info.view.type);

                    // change the border color just for fun
                    info.el.style.borderColor = 'red';
                },
                events: [
                    {
                        title: 'Phase 0 (current closure)',
                        start: '2022-06-18',
                        end: '2022-06-24',
                    },
                    {
                        title: 'Phase 1 (current closure)',
                        start: '2022-06-20',
                        end: '2022-06-24',
                        color: '#ff0000',
                    },
                    {
                        title: 'Phase 2 (current closure)',
                        start: '2022-06-24',
                        end: '2022-06-30',
                        color: '#378006',
                    },
                ],
            });

            function getEvents(things, stuff, other) {
                calendar.events = [
                    {
                        title: 'All Day Event',
                        start: '2022-04-01',
                    },
                    {
                        title: 'Long Event',
                        start: '2022-04-07',
                        end: '2022-04-10',
                    },
                    {
                        groupId: '999',
                        title: 'Repeating Event',
                        start: '2022-04-09T16:00:00',
                    },
                    {
                        groupId: '999',
                        title: 'Repeating Event',
                        start: '2022-04-16T16:00:00',
                    },
                    {
                        title: 'Conference',
                        start: '2022-04-11',
                        end: '2022-04-13',
                    },
                    {
                        title: 'Meeting',
                        start: '2022-04-12T10:30:00',
                        end: '2022-04-12T12:30:00',
                    },
                    {
                        title: 'Lunch',
                        start: '2022-04-12T12:00:00',
                    },
                    {
                        title: 'Meeting',
                        start: '2022-04-12T14:30:00',
                    },
                    {
                        title: 'Birthday Party',
                        start: '2022-04-13T07:00:00',
                    },
                    {
                        title: 'Click for Google',
                        url: 'http://google.com/',
                        start: '2022-04-28',
                    },
                ];
                calendar.render();
            }

            calendar.render();
        });
    });
};

// document.addEventListener('DOMContentLoaded', function () {
//     console.log('dom load');
//     var calendarEl = document.getElementById('viewDiv');
//     var calendar = new FullCalendar.Calendar(calendarEl, {
//         initialView: 'dayGridMonth',
//     });
//     calendar.render();
// });
