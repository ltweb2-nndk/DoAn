function CheckValueRole()
{
    frm=document.frmNguoiDung;
    if(frm.TypeAccount.value=="Người dùng")
	{
        alert('Loại người dùng không hợp lê,xin vui lòng chọn lại!');
		return false;
    }
    	return true;
}

function CheckValueRoles()
{
    frm=document.frmNguoiDung;
    if(frm.RoleID.value=="Người dùng")
	{
        alert('Loại người dùng không hợp lê,xin vui lòng chọn lại!');
		return false;
    }
    	return true;
}

function CheckValueCategory()
{
    frm=document.frmBTV;
    if(frm.CatID.value=="Chọn Chuyên Mục")
    {
        document.getElementById('CatID').innerHTML="<span style='color:red,font-weight:bold'>Chuyên mục không hợp lệ.</span>";
		return false;
	}
	else document.getElementById('CatID').innerHTML="";
	return true;
}