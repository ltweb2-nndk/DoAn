$(document).ready(function(){
    $(window).scroll(function() {
        if ($(window).scrollTop() > 200) {
            $('#scrollToTopButton').css('display', 'block');
        }
        else $('#scrollToTopButton').css('display', 'none');
    });

    $('#scrollToTopButton').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, '300');
    });
});