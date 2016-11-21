require('babel-polyfill');

const _				= require('lodash');
const $				= require('jquery');

const constants		= require('./constants');
const helpers 		= require('./core/helpers');
const device		= require('./core/device'); 
const router		= require('./core/router');

router.addRoute('', () => console.log('Home Entry Point') ); 

//
const _stateFlags = ['state1', 'state2', 'state3']; 
var _currentStateFlags = []; 

var setStateFlags = flags => {

	_currentAppFlags = flags;
	
	let prefixFlag = f => `state-${f}`;
	return new Promise( (resolve, reject) => {
		_.each( _.difference(flags, _pageFlags), f => console.error(`Unkown flag: ${f}`));
		
		$(constants.ROOT_APP_TAG)
			.removeClass( _.map(_pageFlags, prefixFlag).join(' ') )
			.addClass(_.map(flags, prefixFlag).join(' '))
			.attr('data-flags', flags.join(','))
		resolve(flags);
	});
}

$(document).ready(function($){
	device.init();

	router.init(); //should be called at last => doc ready within promise and doDocReadyStuff().then(router.init);
});

