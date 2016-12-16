require('babel-polyfill');

const _				= require('lodash');
const $				= require('jquery');

const constants		= require('./constants');

//TODO: should be injected by devices generator
const device		= require('./core/device');

//TODO: should be injected by router generator
const router		= require('./core/router');
router.addRoute('', displayHome ); 

function displayHome(){
	//Init your default landing page here
}



//TODO: should be injected by webpack generator
//require('!style-loader!css-loader!sass-loader!../styles/main.scss');

//TODO:SHould be refactored once other TODOs are done
/*$(document).ready(function(){
	device.init()
		.then(router.init)
		//.then(Do your init stuff)
		.then(entry => router.trigger(window.location.pathname.substring(1)))
});

*/