
const MobileDetect = require('mobile-detect');
const constants    = require('../constants');
const device_types = ['desktop', 'tablet', 'mobile'];
const $			   = require('jquery');

var _md = null;

var init = entry => new Promise((resolve, reject) => {
    _md = new MobileDetect(window.navigator.userAgent);
    console.log('DEVICE', _md);
    //todo use it with mobile-detect-modernizr.js
    
    let b = $(constants.ROOT_APP_TAG);
    if(_md.mobile()) b.addClass('mobile'); 
    else b.addClass('desktop'); 

    if(_md.tablet()) b.addClass('tablet'); 
    if(_md.phone()) b.addClass('phone'); 

    if(_md.os()) b.addClass(`os-${_md.os()}`); 

    resolve(entry)
});

module.exports = {
    init:init
}