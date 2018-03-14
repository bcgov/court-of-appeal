var click = function(id, document) {
    var element = document.querySelector(id);
    var click = document.createEvent('Event');
    click.initEvent('click', true, true);
    element.dispatchEvent(click);
}
var enter = function(value, id, document) {
    var element = document.querySelector(id);
    element.value = value;   
}

module.exports = {
    click: click,
    enter: enter
};