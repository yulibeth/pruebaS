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
<title>Actualizar Saldos</title>

<style type="text/css">
#Opciones {height : 200px ;  overflow:auto;}
#linea {height : 300px ;  overflow-y:auto;}

#Cabecera {height : 215px ;  overflow:auto;}


#ResultadosBusqueda{height:336px;  overflow : scroll ; color: #215b8b;}

#autoc  li:hover{Cursor : pointer; background-color: #cccccc; }
#autoc { border:1px solid black; margin-left:0.8px;}
#autoc ul {list-style: none; margin: 0; padding: 0; font-size:.95em;}
#autoc ul li {padding: .2em; border-bottom: 1px solid silver;}

#dcta0  li:hover{Cursor : pointer; background-color: #cccccc; }
#dcta0 { border:1px solid black; margin-left:0.8px; display:none; height:336px; overflow : scroll ;}
#dcta0 ul {list-style: none; margin: 0; padding: 0; font-size:.95em;}
#dcta0 ul li {padding: .2em; border-bottom: 1px solid silver;}

#dter0  li:hover{Cursor : pointer; background-color: #cccccc; }
#dter0 { border:1px solid black; margin-left:0.8px; display:none; height:336px; overflow : scroll ;}
#dter0 ul {list-style: none; margin: 0; padding: 0; font-size:.95em;}
#dter0 ul li {padding: .2em; border-bottom: 1px solid silver;}


#sugerencias10  li:hover{Cursor : pointer; background-color: #cccccc; }
#sugerencias10 { border:1px solid black; margin-left:0.8px; display:none;  height:336px; overflow : scroll ;}
#sugerencias10 ul {list-style: none; margin: 0; padding: 0; font-size:.95em;}
#sugerencias10 ul li {padding: .2em; border-bottom: 1px solid silver;}

#sugerencias210{height:120px; background-color:#FFFFFF; width:600px; overflow-y:scroll; font-size:11px; display:none; position: absolute; border:1px solid #000000;}
#sugerencias3210{height:60px; background-color:#FFFFFF; width:250px; overflow-y:scroll; font-size:11px; display:none; position: absolute; border:1px solid #000000;}
#sugerencias432101{height:60px; background-color:#FFFFFF; width:250px; overflow-y:scroll; font-size:11px; display:none; position: absolute; border:1px solid #000000;}

.seleccionado {font-weight:auto; background-color: #cccccc;j=1 ; desbordamiento: auto;}
.seleccionado2 {font-weight:auto; background-color: #cccccc;j=1 ; desbordamiento: auto;}
.scrollbox {height : 90px ; altura: 90px; desbordamiento: auto; overflow:scroll}


.blanco{background-color: white;} 
.gris{background-color: #E6E6E6;} 
.azul{background-color: #08088A;} 

</style>

<script src="cont_Documentos.js" type="text/javascript"></script>
<script src="cont_autocompletarCta.js" type="text/javascript"></script>
<script src="cont_autocompletarTerceros.js" type="text/javascript"></script>

<script language="javascript">
function validarte(h){ 
    
	
	var s=h.value;
	var n=0;
	var i;
	for(i=0;i<s.length;i++){
	   valor = parseInt(s.charAt(i));
		if(isNaN(valor)){
			n++;
		}
	}
	if(n>0){
		window.alert('El Campo Solo Acepta Valores Numericos.');
		h.value="";
		h.focus();
		
	}
	return false;

	function checkKeyCode(evt){
		var evt = (evt) ? evt : ((event) ? event : null);
		var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
		//alert(event.keyCode);
		if(event.keyCode==27){
			evt.keyCode=0;
			return false
		}
		if(event.keyCode==9){
			evt.keyCode=0;
			return false
		}
	}
	document.onkeydown=checkKeyCode;      
		
}
</script>
</head>

<body onload="PeriodoSaldos(1)">
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
	<div id="cabecera1" align="center" class="linkmenu"><b><a href="menu.jsp">Menu Principal</a>-<a href="Contabilidad.jsp">Contabilidad</a>-Actalizar Periodos</b></div>
</td> 
</tr>

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
