<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" import="adm_logica.Conexion" errorPage="" %>
<!-- Los import -->
<%@ page session="true"%>
<%@ page language="java" %>
<%@ page import = "java.sql.Connection"%>
<%@ page import = "java.sql.DriverManager"%>
<%@ page import = "java.sql.ResultSet"%> 
<%@ page import = "java.sql.Statement"%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="STYLESHEET" type="text/css" href="estilo_lab1.css">
<LINK REL="SHORTCUT ICON" HREF="Imagenes/IconO.ico">
<title>Detalle Cuenta</title>
<style type="text/css">

#Cuentas li:hover{Cursor : pointer;background-color: #cccccc; }
#Cuentas {height:75px; border:1px solid black; display:none; overflow : scroll ;}
#Cuentas ul {list-style: none; margin: 0; padding: 0; font-size:.95em;}
#Cuentas ul li {padding: .2em; border-bottom: 1px solid silver;}
#DetFact1 {height:150px; overflow : scroll ;}
</style>

<%
String CodFactura=request.getParameter("CodFactura");
String tipo=request.getParameter("tipo");
if(CodFactura==null){
	CodFactura="";
}

if(tipo==null){
	tipo="";
}

%>
<script>
function A(tecla,e){
	var k=null;	tecla =   e.keyCode;  e.which;
	if(tecla == 13){/*BuscarCuenta();*/}
}

function pulsar(e) {
	  tecla = (document.all) ? e.keyCode : e.which;
	  return (tecla != 13);
	}

function DetFact(){
	/*var Dia
	var FechaFija=document.getElementById("txtFechaFija").value;
	var y=FechaFija.split("/").length;
 	var z=FechaFija.split("/");		     	
 	for(x=0; x<y-1; x=x+1)
 	{ 
    Dia=z[0];
    Mes=z[1];
    Anio=z[2];
    // form1.cbArea.value();
    }*/
    fechaFija();
	var CodFact=<%=CodFactura%>;
	var tip=<%=tipo%>;
	DetalleFactura(CodFact,tip);
	
}

</script>   
<script languaje="javascript" src="cont_Facturas.js"></script>
<script languaje="javascript" src="cont_AutocompletarCuentas.js"></script>
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="thickbox.js"></script>
<link rel="stylesheet" href="thickbox.css" type="text/css" /> 
</head>
<body id="back" onload="DetFact();fechaFija()">

<%String codigou =(String)session.getAttribute("codusuario");
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

<%
String cod=request.getParameter("codigo");
if(codigou==null){
	codigou="";
}
if(cod==null){
	cod="";
}

if(codigou.equals("")){%>
<script language="javascript">alert("Usted No Tiene Permiso Para ver esta Pagina....");
window.location.href="Seg_login.jsp";
</script>
<%}else{%>

<table width="100%">
<tr >
<td>
	  <table width="100%">
			<tr>
			<td>
			<div > <a  href="mensajes.jsp?TB_iframe=true&height=520&width=700"  class="thickbox"> Mensajes <font color=red size=medium><b><%=madmin %></b></font></a> <%if (madmin>0){ %><bgsound src="Imagenes/INNERMK.WAV" loop="2"><img src="Imagenes/sobr0001.gif" /><%}%></div>
			</td>
			<td align="right">
			<div align="right" id="usuario" align="right" class="style11">Bienvenido,<b><%=idu%></b> |<a href="Seguridad_login?accion=cerrar&CodUsu=<%=codigou %>" style="color: white">--Cerrar Session--</a></div>
			</td>
			
		</tr>
	</table>
</td>
</tr>

 
<tr>  
<td>
	<div id="cabecera1" align="center" class="linkmenu"><b><a href="menu.jsp">Menu Principal</a>-<a href="Contabilidad.jsp">Contabilidad</a></b></div> 
</td>
</tr>

<tr id="principal1">
<td >

<div>
					<br />
<div id='DetFact'></div>
<input name='txtFechaFija' type='hidden' id='txtFechaFija'  >
<input name='txtCodigoUsuario' type='hidden' id='txtCodigoUsuario' value="<%=codigou %>" >
</div>
</td></tr></table>
<%} %>
</body>
</html>