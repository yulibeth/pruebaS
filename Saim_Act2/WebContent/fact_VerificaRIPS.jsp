<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" import="adm_logica.Conexion" errorPage="" import="java.util.*" %>
<%@ page import="fact_bean.Tarifas,java.util.*" import="fact_controlador.* " import="fact_metodo.* "%>
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
<link rel="STYLESHEET" type="text/css" href="estilo_lab1.css"/> 
<link rel="SHORTCUT ICON" href="Imagenes/IconO.ico"/>
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="thickbox.js"></script>
<link rel="stylesheet" href="thickbox.css" type="text/css" /> 
<%
String codigou =(String)session.getAttribute("codusuario"); 
if(codigou==null){
	codigou="";
}%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Verificar RIPS</title>

<style type="text/css">
#Opciones {height : 200px ;  overflow:auto;}

#resul {height : 215px ;  overflow:auto;}

#ResultadosBusqueda{height:336px;  overflow : scroll ; color: #215b8b;}

#autoc  li:hover{Cursor : pointer; background-color: #cccccc; }
#autoc { border:1px solid black; margin-left:0.8px;}
#autoc ul {list-style: none; margin: 0; padding: 0; font-size:.95em;}
#autoc ul li {padding: .2em; border-bottom: 1px solid silver;}

.seleccionado {font-weight:auto; background-color: #cccccc;j=1 ; desbordamiento: auto;}
.scrollbox {height : 90px ; altura: 90px; desbordamiento: auto; overflow:scroll}


.blanco{background-color: white;} 
.gris{background-color: #E6E6E6;} 
.azul{background-color: #08088A;} 

</style>

<script src="fact_Movimientos.js" type="text/javascript"></script>
<script src="fact_autocompletarProgramayServicio.js" type="text/javascript"></script>
<script src="fact_autocompletarPaciente.js" type="text/javascript"></script>
<script src="fact_autocompletarRef.js" type="text/javascript"></script>
<script src="fact_autocompletarMedicos.js" type="text/javascript"></script> 
<script src="AutocompletarCIE10.js" type="text/javascript"></script> 
<script src="AutocompletarCIE10Egreso.js" type="text/javascript"></script> 


</head>
<%String venc=request.getParameter("venc"); 
String codp=request.getParameter("codp");%>

<body onload="VR1(<%=venc%>,<%=codp%>)">

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
				
				ResultSet rs4;
				Statement st4=null;
				st4=con.conn.createStatement();
				rs4=st4.executeQuery("SELECT COUNT(estado) FROM seg_mensajes WHERE estado=0 AND remitente="+codigou+"");
				int madmin=0;
				if(rs4.next()){
					madmin=rs4.getInt(1);
				}
				rs4.getStatement().close();
				con.cerrar();				
	       	%>
<table width="100%">

<tr  id="principal1">  
<td>

<div>

	<table width="100%"> 
		<tr>

			<td width="100%">  
<form id="form1" name="form1">



	<table width="100%"  class="style6" border='0'>
	  <tr>
	    <td colspan="5"><div id="Opcion"></div></td>
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
