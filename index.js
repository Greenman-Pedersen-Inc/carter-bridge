window.addEventListener('DOMContentLoaded', () => {
    let titleElement = document.getElementsByTagName('title')[0];
    let title = titleElement.innerText;
    const nav = `<div class="navbar-wrapper">
    <div class="navbar-content">
            
    <div class="nav-holder">
    <div class="img-container">
    <img class="img-fluid" src="./pub/media/dotLogo.png"/>
    </div>
    <div>
    <svg id="wave"  viewBox="0 0 1440 490" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(14, 76, 141, 1)" offset="0%"></stop><stop stop-color="rgba(19, 55, 105, 1)" offset="100%"></stop></linearGradient></defs><path style="transform:translate(0, 0px); opacity:1" fill="url(#sw-gradient-0)" d="M0,192L80,170.7C160,149,320,107,480,80C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0ZZ"></path></svg>
    </div>
    <div class="header-title">
        <span>Carter Bridge / Brooks St Interchange Project Portal&ZeroWidthSpace;</span>
        </div>
    </div>

    </div>
</div>
    </div>`;

    let barnav = document.querySelector('nav[role="navigation"]');
    barnav.innerHTML = nav;
});
