const constants    = require('../constants');
const tpl          = require('../../templates/components/<%= componentName %>.hbs');
const Handlebars   = require('hbsfy/runtime');
const $			   = require('jquery');

Handlebars.registerPartial('partial-<%= componentName %>', require('../../templates/components/<%= componentName %>.hbs'));

var renderIn = selector => context => new Promise((resolve, reject)=>{
    $(selector).html(tpl(context));
    resolve(context);
});

var init = (entry) => new Promise((resolve, reject)=>{
    //DO INIT STUFF HERE
    resolve(entry);
});


module.exports = {
    init:init,
    renderIn:renderIn
}