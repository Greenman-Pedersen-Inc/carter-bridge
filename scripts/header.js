window.addEventListener('DOMContentLoaded', () => {
    let titleElement = document.getElementsByTagName('title')[0];
    let title = titleElement.innerText;
    const nav = `<div class="navbar-wrapper">
        <div class="navbar-content">
        <a href="..">
        <img src="/carter-bridge/images/transportationlogo.png">
        </a>
        <span class="welcome-box"><h1 class="welcome-title">${title}</h1></span>
        </div>
    </div>`;
    let barnav = document.querySelector('nav[role="navigation"]');
    barnav.innerHTML = nav;
});
