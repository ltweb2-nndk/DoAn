Handlebars.registerHelper("ifeq", function(ele1, ele2, options) {
    if (ele1 === ele2) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
});