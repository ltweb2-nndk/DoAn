$(function () {
  $.validator.addMethod('email',function(value,element){
		if(value.toLowerCase().search('@gmail.com')==-1) return false;
		return true;
  })
 $.validator.addMethod('catid',function(value,element){
		if(value=='Chọn Chuyên Mục') return false;
		return true;
	})
  $('#frmAddEditor').validate({
    rules: {
      FullName: {
        required: true,
      },
      UserName: {
        required: true,
        email: true,
        remote: {
          url: '/admin/account/username-is-available',
          data: {
            user: function () {
              return $('#txtUserName').val();
            }
          }
        }
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
      CatID:{
        required:true,
        catid:true
      }
    },
    messages: {
      FullName: {
        required: 'Họ tên là bắt buộc.',
      },
      UserName: {
        required: 'Địa chỉ email là bắt buộc.',
        email: 'Địa chỉ email là không hợp lệ.',
        remote:'Tên đăng nhập đã tồn tại, xin hãy nhập lại'
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
      CatID:{
        catid:'Chọn chuyên mục cần phân công',
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