 <%@ page language="java" contentType="text/html; charset=utf-8"
pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">

<%

String a=request.getParameter("a");
if (a==null){
	a="";
}

%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>


<%
//String codigou=(String)request.getSession().getAttribute("codusuario");
//out.println(codigou);

%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Clinica de la Costa</title>
<link rel="shortcut icon" href="/Imagenes/favicon.ico">


<script language="javascript">

//Actualizar una vez al cargar página
//script por tunait!
//ver condiciones de uso en http://javascript.tunait.com/
window.onunload = sale;
var valor;
if(document.cookie){
	galleta = unescape(document.cookie)
	galleta = galleta.split(';')
	for(m=0; m<galleta.length; m++){
		if(galleta[m].split('=')[0] == "recarga"){
			valor = galleta[m].split('=')[1]
			break;
		}
	}
	if(valor == "sip"){
		document.cookie = "recarga=nop"; 
		window.onunload = function(){};
		document.location.reload()
	}
	else{
	window.onunload=sale
	}
}
function sale(){
	document.cookie ="recarga=sip"
}
</script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Clinica de la Costa</title>
<style type="text/css">
<!--
body {
	background-image: url(Imagenes/yosi.jpg);
}
-->
</style></head>

<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><title>Clinica de la Costa</title></head><frameset rows="106,*" cols="*" frameborder="no" border="0" framespacing="0">

  <frame src="Adm_arriba.jsp" name="topFrame" noresize="noresize" id="topFrame" title="topFrame" scrolling="no">
  <frameset rows="*" cols="168,*" framespacing="0" frameborder="no" border="0">

    <frame src="fire.jsp" name="leftFrame" noresize="noresize" id="leftFrame" title="leftFrame" scrolling="no">
   <frame src="Adm_centro.jsp" name="mainFrame" id="mainFrame" title="mainFrame">

</frameset>
</frameset>
<noframes><body>

</body>
</noframes></html>