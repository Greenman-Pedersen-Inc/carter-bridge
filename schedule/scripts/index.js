const phaseInfoURL =
    'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/arcgis/rest/services/mdx_2200023_00_CalendarTable_PublicView/FeatureServer/0/query?where=1=1&f=json&outFields=*&returnGeometry=false';

window.onload = function () {
    require(['esri/request'], (esriRequest) => {
        esriRequest(phaseInfoURL).then(function (response) {
            function changeTimezone(date, ianatz) {
                // suppose the date is 12:00 UTC
                var invdate = new Date(
                    date.toLocaleString('en-US', {
                        timeZone: ianatz,
                    })
                );

                // then invdate will be 07:00 in Toronto
                // and the diff is 5 hours
                var diff = date.getTime() - invdate.getTime();

                // so 12:00 in Toronto is 17:00 UTC
                return new Date(date.getTime() - diff); // needs to substract
            }

            const calendarData = response.data.features.map((element) => {
                let startDate = changeTimezone(new Date(element.attributes.StartDate), 'Europe/London');
                let endDate = changeTimezone(new Date(element.attributes.EndDate), 'Europe/London');

                // var there = changeTimezone(startDate, 'Europe/London');

                // console.log(`Here: ${startDate.toString()}\nToronto: ${there.toString()}`);

                return {
                    title: element.attributes.Title,
                    start: `${(startDate.getYear() + 1900).toString()}-${(startDate.getMonth() + 1)
                        .toString()
                        .padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`,
                    end: `${(endDate.getYear() + 1900).toString()}-${(endDate.getMonth() + 1)
                        .toString()
                        .padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`,
                    color: element.attributes.Color,
                };
            });

            console.log(calendarData);

            const calendarEl = document.getElementById('viewDiv');
            const calendar = new FullCalendar.Calendar(calendarEl, {
                themeSystem: 'bootstrap5',
                // eventClick: function (info) {
                //     alert('Event: ' + info.event.title);
                //     alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
                //     alert('View: ' + info.view.type);

                //     // change the border color just for fun
                //     info.el.style.borderColor = 'red';
                // },
                events: calendarData,
            });

            calendar.render();
        });
    });
};
