window.addEventListener('DOMContentLoaded', () => {
    let titleElement = document.getElementsByTagName('title')[0];
    let title = titleElement.innerText;
    const nav = `<div class="navbar-wrapper">
        <div class="navbar-content">
            <div class="tt">
                <img class="img-fluid" src="../pub/media/Banner_1_.png" />
            </div>
            <div>
                <img class="img-fluid color-block" src="../pub/media/Banner_2.png" />
                <div class="welcome-message">
                    <span class="welcome-title">${title}</span>
                </div>
            </div>
            <div>
                <img class="img-fluid" src="../pub/media/Banner_3.png" />
            </div>
            <div>
                <img class="img-fluid" src="../pub/media/Banner_4.png" />
            </div>
        </div>
    </div>`;

    let barnav = document.querySelector('nav[role="navigation"]');
    barnav.innerHTML = nav;
});
