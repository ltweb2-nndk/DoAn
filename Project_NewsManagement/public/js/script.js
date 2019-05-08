$(document).ready(() => {
    // Ẩn, hiện nút quay về đầu trang
    $(window).scroll(() => {
        if ($(window).scrollTop() > 200) {
            $('#scrollToTopButton').css('display', 'block');
        }
        else $('#scrollToTopButton').css('display', 'none');
    });
    // Ấn nút quay về đầu trang -> quay về đầu trang
    $('#scrollToTopButton').click(() => {
        $('html, body').animate({
            scrollTop: 0
        }, '300');
    });
    // Ấn các lỗi khi ấn bất kì ô input đăng ký nào
    $('.input-form, .dob-form').click(function() {
        $('.input-errors').hide();
    });
    // Ẩn các lỗi khi đăng ký sau 5 giây
    setTimeout(() => {
        $('.input-errors').hide();
    }, 5000);
    // Ẩn thông báo đăng ký thành công sau 10 giây
    // $('.register-alert').fadeOut(10000);
});