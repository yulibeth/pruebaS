<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" import="adm_logica.Conexion" errorPage="" import="java.util.*" %>
<!-- Los import -->
<%@ page session="true"%>
<%@ page language="java" %>
<%@ page import = "java.sql.Connection"%>
<%@ page import = "java.sql.DriverManager"%>
<%@ page import = "java.sql.ResultSet"%> 
<%@ page import = "java.sql.Statement"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="STYLESHEET" type="text/css" href="estilo_lab1.css"> 
<LINK REL="SHORTCUT ICON" HREF="Imagenes/IconO.ico">
<%
String codigou =(String)session.getAttribute("codusuario");
if(codigou==null){
	codigou="";
}
String calendario=request.getParameter("calendario");
if(calendario==null){
	calendario="";
}
%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Recibos de Caja</title>
<script language="javascript">
function A(tecla,e){
	var k=null;	tecla =   e.keyCode;  e.which;
	if(tecla == 13){BuscarPaciente();}
}

function pulsar(e) {
	  tecla = (document.all) ? e.keyCode : e.which;
	  return (tecla != 13);
	}

</script>
<style type="text/css">
#CantCit{height:170px; overflow : scroll ;}

#arriba{
position: absolute;
    left: 0%;
    top: 20%;
}
</style>

<script languaje="javascript" src="pyp_recibos_de_caja.js"></script>
<script languaje="javascript" src="calendar.js"></script>
<script language="javascript"></script>
</head>

<body onload="">
<%
if(codigou.equals("")){%>

<script language="javascript">alert("Usted No Tiene Permiso Para ver esta Pagina....");window.location.href="Seg_login.jsp";</script>
<%}else{
%>
<%
Conexion con=new Conexion();
	ResultSet rs2;
	Statement st2 = null;
	   String idu="";         
	      	
	       	st2 = con.conn.createStatement();
	       	
	       	rs2=st2.executeQuery("select usuario from seg_usuario  where usu_codigo="+codigou+"");%>
				<%while(rs2.next()){
					
		        idu=rs2.getString(1);
				}
				rs2.getStatement().close();
				con.cerrar();				
	       	%>
<table width="100%">
<tr align="right">
<td>
	  <div align="right" id="usuario" align="right" class="style11">Bienvenido, <b ><%=idu %></b> | <a href="Seguridad_login?accion=cerrar"   style="color: white"> --Cerrar Session--</a></div>
</td>
</tr>

<tr>
<td>
	<div id="cabecera1" align="center" class="linkmenu"><b><a href="menu.jsp">Menu Principal</a>-<a href="ConsultaExterna.jsp">Consulta Externa </a>-<a href="ConsultaExterna.jsp">Reportes</a>-Recibos de Caja </b></div>
</td> 
</tr>

<tr  id="principal1">  
<td>

<div>

	<table width="100%"> 
		<tr>

			<td width="100%">  
<form id="form1" name="form1" onkeypress = "return pulsar(event);">

<table width="100%" border="0">
  <tr>
    <td width="16%">Tipo Documento </td>
    <td width="15%"><select name="cmbTipoDoc" id="cmbTipoDoc">
      <option value="Seleccione" selected="selected">Seleccione</option>

     						         <% 
 ResultSet rs3=null;
 Statement st3 = null;  
 try{
 	Conexion con2=new Conexion();
 	st3 = con2.conn.createStatement();
 	rs3=st3.executeQuery("SELECT sigla,descripcion FROM adm_tipodocumento");%>
 	<%while(rs3.next()){%>
	<option value="<%=rs3.getString(1)%>"><%=rs3.getString(1)%></option>
 	<%}
 	rs3.getStatement().close();
 	con2.cerrar();
}catch(SQLException e){
	 
	 System.out.println(e);
out.println("no se pudo realizar la conexion!<br/>"); 
}%>

    </select>    </td>
    <td width="19%">Numero Documento </td>
    <td width="23%">
      <input name="txtNumDocumento" type="text" id="txtNumDocumento" onkeydown="A(this,event)" />   </td>
<!--<td>Valor a Recibir:</td><td><input name='txtTotalPagar' type='text' id='txtTotalPagar' /></td>-->
    <td width="27%"><input name="btnBuscarPac" type="button" id="btnBuscarPac" value="Buscar" onclick="BuscarPaciente()" /></td>
  </tr>
</table>
<table width="100%" border="0">
  <tr>
    <td><div id="contenido"></div></td>
   </tr>
</table>

<input name="txtCodusuario" type="hidden" id="txtCodusuario" value="<%=codigou %>"/>
</form>


</td></tr></table>
</div>
</td></tr></table>

<%} %>
</body>
</html>
