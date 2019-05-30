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

    // Upload hình
    // $('#img-file').change((e) => {
    //     $('#user-avatar').attr('src', URL.createObjectURL(e.target.files[0]));
    // });

    
});