require('babel-polyfill');

const _				= require('lodash');
const $				= require('jquery');

const constants		= require('./constants');
const device		= require('./core/device');
const router		= require('./core/router');

function displayHome(){
	//Init your default landing page here
}

router.addRoute('', displayHome ); 



$(document).ready(function(){
	device.init()
		.then(router.init)
		//.then(Do your init stuff)
		.then(entry => router.trigger(window.location.pathname.substring(1)))
});

