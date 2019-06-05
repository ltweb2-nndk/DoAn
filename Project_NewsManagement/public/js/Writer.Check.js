$(function () {
  $.validator.addMethod('email',function(value,element){
		if(value.toLowerCase().search('@gmail.com')==-1) return false;
		return true;
	})
  $('#frmAddWriter').validate({
    rules: {
      FullName: {
        required: true,
      },
      UserName: {
        required: true,
        email: true,
       /* remote: {
          url: '/account/is-available',
          data: {
            UserName: function () {
              return $('#txtUsername').val();
            }
          }
        }*/
      },
      DOB: {
        required: true,
      },
      Password: {
        required: true,
        minlength: 8
      },
      ConfirmPassword: {
        required: true,
        equalTo: $('[name="Password"]')
      },
      Pseudonym:{
        required:true
      }
    },
    messages: {
      FullName: {
        required: 'Họ tên là bắt buộc.',
      },
      UserName: {
        required: 'Địa chỉ email là bắt buộc.',
        email: 'Địa chỉ email là không hợp lệ.',
       // remote:"Tên đăng nhập đã tồn tại"
      },
      DOB: {
        required: 'Ngày sinh là bắt buộc.',
      },
      Password: {
        required: 'Mật khẩu là bắt buộc.',
        minlength: 'Mật khẩu phải ít nhất 8 kí tự .'
      },
      ConfirmPassword: {
        required: 'Xác nhận lại mật khẩu.',
        equalTo: 'Mật khẩu không khớp giá trị đã nhập.'
      },
      Pseudonym:{
        required:'Bút danh là bắt buộc'
      }
    },
    errorElement: 'small',
    errorClass: 'help-block text-danger',
    validClass: 'is-valid',
    highlight: function (e) {
      $(e).removeClass('is-valid').addClass('is-invalid');
    },
    unhighlight: function (e) {
      $(e).removeClass('is-invalid').addClass('is-valid');
    },
  });
})