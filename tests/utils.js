let click = function(id, document) {
    let element = document.querySelector(id);
    let click = document.createEvent('Event');
    click.initEvent('click', true, true);
    element.dispatchEvent(click);
}
let enter = function(value, id, document) {
    let element = document.querySelector(id);
    element.value = value;   
}

module.exports = {
    click: click,
    enter: enter
};