window.addEventListener('DOMContentLoaded', () => {
    let titleElement = document.getElementsByTagName('title')[0];
    let title = titleElement.innerText;
    const nav = `<div class="navbar-wrapper">
        <div class="navbar-content">
        <a href="index_dev.html">
        <img src="transportationlogo.png">
        </a>
        <span class="welcome-box"><h1 class="welcome-title">${title}</h1></span>
        </div>
    </div>`;
    let barnav = document.querySelector('nav[role="navigation"]');
    barnav.innerHTML = nav;
});
// removes random &nbsp from top of page
var el = document.querySelector('body');
el.innerHTML = el.innerHTML.replace(/&nbsp;/g, '');
