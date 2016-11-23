require('babel-polyfill');

const _				= require('lodash');
const $				= require('jquery');

const constants		= require('./constants');
const device		= require('./core/device'); 
const router		= require('./core/router');

router.addRoute('', displayHome ); 

var displayHome = () => {

}


$(document).ready(function($){
	device.init()
		.then(router.init)
		//.then(Do your stuff)
		.then(entry => router.trigger(window.location.pathname.substring(1)))
});

