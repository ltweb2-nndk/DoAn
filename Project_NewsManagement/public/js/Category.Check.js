function CheckValueCategory(){
    frm=document.frmDanhMuc;
   if(frm.CatName.value.length==0)
	{
		document.getElementById('CatName').innerHTML="<span style='color:red,font-weight:bold'>Tên danh mục không hợp lệ.</span>";
		return false;
	}
	else document.getElementById('CatName').innerHTML="";
	if(frm.CatIsActive.value=="Chọn Tình Trạng")
	{
		document.getElementById('CatIsActive').innerHTML="<span style='color:red,font-weight:bold'>Tình trạng không hợp lệ.</span>";
		return false;
	}
	else document.getElementById('CatIsActive').innerHTML="";
	return true;
}
