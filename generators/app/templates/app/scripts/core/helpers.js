const Handlebars   = require('hbsfy/runtime');
/**
 * Only write here common helpers usable in any SPA project
 * they should not need any dependencies to keep it lightweight
 * use dedicated file otherwise
 */

Handlebars.registerHelper('round', function(num) {
    return Math.round(num);
});