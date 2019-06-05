$(function(){
	$.validator.addMethod('validDate',function(value,element){
		if(value==='Chọn Tình Trạng') return false;
		return true;
	})
	$('#frmChuyenDe').validate({
		rules:{
			SubCatName:{
				required:true,
			/*	remote: {
					url: '/Admin/SubCategory/is-available',
					data: {
					  SubCatName: function () {
						return $('#txtSubCatName').value();
					  }
					}
				},*/
			},
			SubCatIsActive:{
				required:true,
			    validDate:true
			}
		},
		messages:{
			SubCatName:{
				required:'Tên chuyên đề là bắt buộc',
				//remote:'Tên chuyên đề đã tồn tại, hãy nhập tên chuyên đề'
			},
			SubCatIsActive:{
				validDate:'Lựa chọn một giá trị cho trạng thái chuyên đề'
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