const { JSDOM } = require('jsdom');

let exposedProperties = ['window', 'navigator', 'document'];

global.document = new JSDOM('').window.document;
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
