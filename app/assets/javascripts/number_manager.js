// Author: Austin Gulati (contact@austingulati.com)
// Really simple plugin that manages an ordered list of numbers
// Given a _selector, puts 1 in the first occurrence of the
// selector on the page, 2 in the second, and so on

numberManager = function(_selector) {
    return {
        ping: function() {
            $(_selector).each(function(index) {
                $(this).html(index+1);
            });
        }
    };
}

// Another helpful function, similar to innerHTML

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};