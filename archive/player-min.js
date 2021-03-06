//Status constants
var SESSION_STATUS = Flashphoner.constants.SESSION_STATUS;
var STREAM_STATUS = Flashphoner.constants.STREAM_STATUS;
var session;
var PRELOADER_URL =
    'https://github.com/flashphoner/flashphoner_client/raw/wcs_api-2.0/examples/demo/dependencies/media/preloader.mp4';
//Init Flashphoner API on page load
function init_api(url) {
    console.log(STREAM_STATUS);

    Flashphoner.init({}); //Connect to WCS server over websockets
    session = Flashphoner.createSession({
        urlServer: 'wss://demo.flashphoner.com', //specify the address of your WCS
    }).on(SESSION_STATUS.ESTABLISHED, function (session) {
        // playBtn.addEventListener('click', function (event) {
        playClick(session, url);
        // });
    });
}
//Detect browser
var Browser = {
    isSafari: function () {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    },
};
/**
*
If browser is Safari, we launch the preloader before playing the stream.
Playback should start strictly upon a user's gesture (i.e. button click). This is limitation of mobile Safari browsers.
https://docs.flashphoner.com/display/WEBSDK2EN/Video+playback+on+mobile+devices
*
**/
function playClick(session, url) {
    if (Browser.isSafari()) {
        Flashphoner.playFirstVideo(document.getElementById('play'), true, PRELOADER_URL).then(function () {
            playStream(session, url);
        });
    } else {
        playStream(session, url);
    }
}

// Playing stream
function playStream(session, url) {
    session
        .createStream({
            name: url, //specify the RTSP stream address
            display: document.getElementById('play'),
        })
        .play();
}
