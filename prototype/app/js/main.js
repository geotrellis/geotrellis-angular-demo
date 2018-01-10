$(function() {

    // Demo picker menu
    $('.logo-button').on('click', function(e) {
        $('.demos-menu').toggleClass('-on');
    });


    // Singleton layer vs Multiple layers toggle
    $('.app-header').on('click', '.demo-switcher > .demos-menu', function(e) {
        $('.sidebar-content.-layers').toggleClass('-singleton -multiple-layers');
        $('.demos-menu').toggleClass('-on');
    });


    // Sidebar tabs
    $('.app-sidebar').on('click', '.sidebar-tabs > .tab', function(e) {
        $tab = $(e.target);
        $sidebarContent = $('.sidebar-content').filter('[data-tab=' + $tab.data('tab') + ']');

        $('.sidebar-tabs > .tab').removeClass('-on');
        $tab.addClass('-on');

        $('.sidebar-content').removeClass('-on');
        $sidebarContent.addClass('-on');
    });


    // Expand/collapse layer card
    $('.app-sidebar')
        .on('click',
            '.layer-card > .layer-overview > .layer-header > .toggle',
            function(e) { e.stopPropagation(); })
        .on('click',
            '.layer-card > .layer-overview > .dropdown',
            function(e) { e.stopPropagation(); })
        .on('click',
            '.layer-card:not(.-singleton) > .layer-overview',
            function(e) { $(this).parents('.layer-card').toggleClass('-open'); }
        );


    // Layer toggle
    $('.app-sidebar')
        .on('click',
            '.layer-header > .toggle, .layer-group-header > .toggle',
            function(e) {
                const $parent = $(this).closest('.layer-card, .layer-group');
                $parent.toggleClass('-on');

                // Disable dropdown on disabled Layers
                $select = $parent.find('.select');
                if ($parent.hasClass('-on')) {
                    $select.removeAttr('disabled');
                } else {
                    $select.attr('disabled', 'disabled');
                }
            });


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


    // Mask controls
    $('.app-sidebar').on('click', '.mask-area-radios .radio.-draw', function(e) {
        e.stopPropagation();
        $('.mask-area-controls > .-zipcode').blur().removeClass('-on');
        $('.mask-area-controls > .-draw').addClass('-on');
    });

    $('.app-sidebar').on('click', '.mask-area-radios .radio.-zipcode', function(e) {
        e.stopPropagation();
        $('.mask-area-controls > .-draw').removeClass('-on');
        $('.mask-area-controls > .-zipcode').addClass('-on').focus();
    });


    // Analysis options
    $('.app-sidebar').on('click', '.analysis-options > .button', function(e) {
        $('.analysis-options').removeClass('-on');
        $('.analysis-results').addClass('-on');
    });

    $('.app-sidebar').on('click', '.analysis-results > .sidebar-header > .button', function(e) {
        $('.analysis-results').removeClass('-on');
        $('.analysis-options').addClass('-on');
    });


    // About modal
    $('.app-header').on('click', '.heading > .button', function(e) {
        $('.about-modal').addClass('-on');
    });

    $('.app-root').on('click', '.modal-header > .button', function(e) {
        $('.modal-overlay').removeClass('-on');
    });

    $('.app-root').on('click', '.modal-overlay', function(e) {
        if (e.target === this) {
            $('.modal-overlay').removeClass('-on');
        }
    });


    // Map
    const map = L.map('map').setView([35.0982149,-85.3787755], 9);
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    	subdomains: 'abcd',
    	maxZoom: 19
    }).addTo(map);
});
