function CheckValueTag(){
    frm=document.frmNhan;
   if(frm.TagName.value.length==0)
	{
		document.getElementById('TagName').innerHTML="<span style='color:red,font-weight:bold'>Tên nhãn không hợp lệ.</span>";
		return false;
	}
	else document.getElementById('TagName').innerHTML="";
}