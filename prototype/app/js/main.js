$(function() {
    $('.logo-button').on('click', function(e) {
        $('.demos-menu').toggleClass('-on');
    });


    // const map = L.map('map').setView([35.0982149,-85.3787755], 9);
    // L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    // 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    // 	subdomains: 'abcd',
    // 	maxZoom: 19
    // }).addTo(map);

    const map = L.Mapzen.map('map');
    map.setupScene('https://mapzen.com/carto/bubble-wrap-style/2/bubble-wrap.yaml');
    map.setView([35.0982149,-85.3787755], 9);
});
