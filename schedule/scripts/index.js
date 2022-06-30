const phaseInfoURL =
    'https://services1.arcgis.com/VLhaRwzp3uCQMr7y/arcgis/rest/services/mdx_2200023_00_CalendarTable_PublicView/FeatureServer/0/query?where=1=1&f=json&outFields=*&returnGeometry=false';

function Modal(title, attributes, redirect = false) {
    let modal = document.createElement('div');
    modal.className = 'modal fade bd-example-modal-sm show';
    modal.role = 'dialog';
    modal.style = 'display: block';

    let modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog modal-dialog-centered';
    modal.appendChild(modalDialog);

    let modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalDialog.appendChild(modalContent);

    let modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    modalContent.appendChild(modalHeader);

    let modalTitle = document.createElement('h5');
    modalTitle.className = 'modal-title';
    modalTitle.innerHTML = title;
    modalTitle.title = title;
    modalHeader.append(modalTitle);

    let modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    modalContent.appendChild(modalBody);

    for (const [key, value] of Object.entries(attributes)) {
        let modalBodyText = document.createElement('p');
        modalBodyText.innerHTML = `${key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}: ${value}`;
        modalBody.appendChild(modalBodyText);
    }

    let modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';
    modalContent.appendChild(modalFooter);

    let acceptButton = document.createElement('button');
    acceptButton.className = 'btn btn-primary';
    acceptButton.type = 'button';
    acceptButton.innerHTML = 'Accept';
    acceptButton.addEventListener('click', function (event) {
        if (redirect) {
            window.location = siteRootURL;
        } else {
            modal.remove();
        }
    });
    modalFooter.appendChild(acceptButton);

    // modalOverlay.append(modal);

    document.getElementById('phaseDescriptionModal').append(modal);
}

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

                return {
                    title: element.attributes.Title,
                    start: `${(startDate.getYear() + 1900).toString()}-${(startDate.getMonth() + 1)
                        .toString()
                        .padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`,
                    end: `${(endDate.getYear() + 1900).toString()}-${(endDate.getMonth() + 1)
                        .toString()
                        .padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`,
                    color: element.attributes.Color,
                    description: element.attributes.Description,
                    phase: element.attributes.Phase,
                };
            });

            const calendarEl = document.getElementById('calendar');
            const calendar = new FullCalendar.Calendar(calendarEl, {
                themeSystem: 'bootstrap5',
                eventClick: function (info) {
                    new Modal(info.event.title, {
                        start: info.event.start,
                        end: info.event.end,
                        description: info.event.extendedProps.description,
                        link: `<a href="https://www.carterbrooksic.info/sandbox/closures-detours/?phase=${info.event.extendedProps.phase}">View Closure</a>`,
                    });
                },
                events: calendarData,
            });

            calendar.render();
        });
    });
};
