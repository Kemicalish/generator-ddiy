const $ = require('jquery');
const _ = require('lodash');
const crossroads = require('crossroads');

var _history = null;
var _location = location;


var historyinit = () => {
    var createHistory = require('history').createBrowserHistory
    _history = createHistory()

    // Get the current location. 
    _location = window.location;

    // Listen for changes to the current location. 
    const unlisten = _history.listen((location, action) => {
        // location is an object like window.location 
        console.log(action, location.pathname, location.state)
        crossroads.parse(location.pathname)
    })
}


var init = entry => new Promise((resolve, reject) => {
    historyinit();
    resolve(entry);
});

var addRoute = (pattern, callback) => {
    crossroads.addRoute(pattern, callback);
}

var back = () => {
    if (_history) _history.goBack()
    else log.error('back button is not handled');
}

var trigger = (route) => {
    console.log('trigger route: ', route);

    if (_history) _history.push(`/${route}`);
    else log.error('"trigger" action is not handled')
}

module.exports = {
    init, init,
    back: back,
    addRoute: addRoute,
    trigger: trigger
}