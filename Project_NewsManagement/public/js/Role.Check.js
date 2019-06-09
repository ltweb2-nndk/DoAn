function CheckValueRole()
{
    frm=document.frmTaiKhoan;
    if(frm.TypeAccount.value=="Loại tài khoản")
	{
        alert('Loại tài khoản không hợp lê,xin vui lòng chọn lại!');
		return false;
    }
    	return true;
}
function CheckValueRoles()
{
    frm=document.frmTaiKhoan;
    if(frm.RoleID.value=="Loại tài khoản")
	{
        alert('Loại tài khoản không hợp lê,xin vui lòng chọn lại!');
		return false;
    }
    	return true;
}