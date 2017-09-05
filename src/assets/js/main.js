const basemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
});

const map = L.map('browse').setView([39.952583, -75.165222], 14);

basemap.addTo(map);

const cardActions = ['js-diff-layers', 'js-compare-layers'];
const mapActions = ['js-analyze-area'];

const cardList = $('.layer-card-list');
const sidebar = $('.sidebar-section');
const icon = $('.resizeicon');
const mapContainer = $('.map-container');

// global function
toggleClass = (el, klass) => {
    if(el.hasClass(klass)) {
        el.removeClass(klass);
    } else {
        el.addClass(klass);
    }
};

getJsClass = (el) => {
    const classArray = el.className.split(' ');
    let klass;
    classArray.forEach(el => {
        if(el.indexOf('js') !== -1) {
            klass = el;
        }
    })
    return klass;
};

customModeling = (el) => {
    const target = $(`.dropdown.${getJsClass(el.parentElement.parentElement)} > option[value='custom']`);
    target.selected = 'selected';
};

resizeSidebar = () => {
    [sidebar, icon, mapContainer].forEach(el => {
        toggleClass(el, '-collapsed');
    });
};

checkLayer = (el) => {
    const target = $(`.layer-card.${getJsClass(el)}`);
    const mode = $('.layer-card-list').hasClass('-action');
    if(mode){
        toggleClass(target, '-selected');
        if($('.-selected').length >= 2) {
            cardList.addClass('-complete');
        } else {
            cardList.removeClass('-complete');
        }
    } else {
        toggleClass(target, '-on');   
    }
};

closeSetting = (origin) => {
    const el = origin.parentElement;
    $(el).removeClass('-expanded');
    const klass = getJsClass(el);
    $(`button.${klass}`).removeClass('-clicked');
    const mode = $('.layer-card-list').hasClass('-action');    
    if(mode){
        cardList.removeClass('-action');
        if(cardList.hasClass('-complete')) {
            cardList.removeClass('-complete');
        }
    }
};
showSetting = (el) => {
    switchListState(el);
    expandLayer(el);
    toggleClass($(el), '-clicked');
};

expandLayer = (el) => {
    toggleClass($(`.action-panel.${getJsClass(el)}`), '-expanded')
};

switchListState = (origin) => {
    const mapOnly = mapActions.includes(getJsClass(origin));
    if ($(origin).parent().hasClass('group-actions')){
        $(`.action-panel.${getJsClass(origin)}`).siblings().removeClass('-expanded');
        $(origin).siblings().removeClass('-clicked');        
        
        if(!mapOnly) {
            if(!cardList.hasClass('-action')) {
                cardList.addClass('-action');
            }
        } else {
            if(cardList.hasClass('-action')) {
                cardList.removeClass('-action');
            }
            if(cardList.hasClass('-complete')) {
                cardList.removeClass('-complete');
            }
        }
    } 
}

showSliderValue = (origin) => {
    const el = $(`span.${getJsClass(origin)}`);
    el.innerHTML = origin.value;
};

