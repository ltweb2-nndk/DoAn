$(function(){
	$('#frmNhan').validate({
		rules:{
			TagName:{
				required:true,
				remote: {
					url: '/admin/tag/is-available',
					data: {
					  TagName: function () {
						return $('#txtTagName').val();
					  }
					}
				},
			},
		},
		messages:{
			TagName:{
				required:'Tên nhãn là được bắt buộc',
				remote:'Tên nhãn đã tồn tại , hãy nhập giá trị khác'
			},
		},
		errorElement:'small',
		errorClass:'help-block text-danger',
		validClass:'is-valid',
		highlight:function(e){
           $(e).removeClass('is-valid').addClass('is-invalid');
		},
		unhighlight:function(e){
			$(e).removeClass('is-invalid').addClass('is-valid');
		}
	})
})