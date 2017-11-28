$(function() {

    // Demo picker menu
    $('.logo-button').on('click', function(e) {
        $('.demos-menu').toggleClass('-on');
    });


    // Expand/collapse layer card
    $('.app-sidebar')
        .on('click',
            '.layer-card > .layer-overview > .layer-header > .toggle',
            function(e) { e.stopPropagation(); })
        .on('click',
            '.layer-card > .layer-overview > .picker',
            function(e) { e.stopPropagation(); })
        .on('click',
            '.layer-card:not(.-singleton) > .layer-overview',
            function(e) { $(this).parents('.layer-card').toggleClass('-open'); }
        );


    // Unimodal sliders
    $('.layer-control.-opacity > .slider.-unimodal').on('input', function(e) {
        const $input = $(e.target);
        const $output = $input.siblings('.value');
        const val = parseFloat($input.val()).toFixed(2);
        $output.text((val * 100).toFixed(0) + '%');
    });

    $('.layer-control.-threshold > .slider.-unimodal').on('input', function(e) {
        const $input = $(e.target);
        const $output = $input.siblings('.value');
        const val = parseFloat($input.val()).toFixed(2);
        if (val == 1) {
            $output.text('All');
        } else if (val == 0) {
            $output.text('None');
        } else {
            $output.text('Top ' + (val * 100).toFixed(0) + '%');
        }
    });


    // Bimodal sliders
    $('.layer-factor > .slider.-bimodal').on('input', function(e) {
        const $this = $(e.target);
        const val = parseInt($this.val());
        if (val < 0) {
            $this.attr('data-val', 'neg-' + Math.abs(val));
        } else if (val > 0) {
            $this.attr('data-val', 'pos-' + Math.abs(val));
        } else {
            $this.removeAttr('data-val');
        }
    });


    // Map

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
