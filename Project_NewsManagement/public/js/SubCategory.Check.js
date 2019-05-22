function CheckValueSubCategory(){
    frm=document.frmChuyenDe;
   if(frm.SubCatName.value.length==0)
	{
		document.getElementById('SubCatName').innerHTML="<span style='color:red,font-weight:bold'>Tên chuyên đề không hợp lệ.</span>";
		return false;
	}
	else document.getElementById('SubCatName').innerHTML="";
	if(frm.SubCatIsActive.value=="Chọn Tình Trạng")
	{
		document.getElementById('SubCatIsActive').innerHTML="<span style='color:red,font-weight:bold'>Tình trạng không hợp lệ.</span>";
		return false;
	}
	else document.getElementById('SubCatIsActive').innerHTML="";
	return true;
}
