function CheckValueSubCategories()
{
	frm=document.frmBaiviet;
	if(frm.SubCatID.value=="Chọn chuyên mục")
	{
		alert('Vui lòng chọn chuyên mục!');
		return false;
	}
	return true;
}