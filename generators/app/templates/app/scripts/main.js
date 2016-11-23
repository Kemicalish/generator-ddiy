require('babel-polyfill');

const _				= require('lodash');
const $				= require('jquery');

const constants		= require('./constants');
const device		= require('./core/device'); 
const router		= require('./core/router');

router.addRoute('', () => console.log('Home Entry Point') ); 


$(document).ready(function($){
	device.init();
	router.init(); //should be called at last => doc ready within promise and doDocReadyStuff().then(router.init);
});

