function CheckValueArticle()
{
    frm=document.frmBaiviet;
    if(frm.StatusID.value=="Chọn Tình Trạng")
	{
		document.getElementById('StatusID').innerHTML="<span style='color:red,font-weight:bold'>Tình trạng không hợp lệ.</span>";
		return false;
	}
	else document.getElementById('StatusID').innerHTML="";
	return true;
}
function CheckValueSubCategories()
{
	frm=document.frmBaiviet;
	if(frm.CatID.value=="Chọn chuyên mục")
	{
		alert('Vui lòng chọn chuyên mục!');
		return false;
	}
	return true;
}
function CheckValueStatus()
{
	frm=document.frmBaiviet;
	if(frm.StatusID.value=="Tình trạng")
	{
		alert('Vui lòng chọn tình trạng!');
		return false;
	}
	return true;
}