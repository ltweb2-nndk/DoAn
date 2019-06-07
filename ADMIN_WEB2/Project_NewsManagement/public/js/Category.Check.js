$(function(){
	$.validator.addMethod('validDate',function(value,element){
		if(value==='Chọn Tình Trạng') return false;
		return true;
	})
	$('#frmDanhMuc').validate({
		rules:{
			CatName:{
				required:true,
				remote: {
					url: '/admin/category/is-available',
					data: {
					  catname: function () {
						return $('#txtCatName').val();
					  }
					}
				}
			},
			CatIsActive:{
				required:true,
			    validDate:true
			}
		},
		messages:{
			CatName:{
				required:'Tên danh mục là bắt buộc',
				remote:'Tên danh mục đã tồn tại , hãy nhập giá trị khác'
			},
			CatIsActive:{
				validDate:'Lựa chọn một giá trị cho trạng thái danh mục'
			}
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