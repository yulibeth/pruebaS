<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8" import="adm_logica.Conexion" import="java.sql.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="STYLESHEET" type="text/css" href="estilo_lab1.css">
<LINK REL="SHORTCUT ICON" HREF="Imagenes/IconO.ico">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Menu Principal</title>
<script language="javascript" type="text/javascript" src="ajaxseguridad.js"></script>
<link rel="StyleSheet" href="dtree.css" type="text/css" />
	<script type="text/javascript" src="dtree.js"></script>
<script language="javascript" type="text/javascript" src="clickderecho.js"></script>
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="thickbox.js"></script>
<link rel="stylesheet" href="thickbox.css" type="text/css" />


<%
String codigou =(String)session.getAttribute("codusuario");

if(codigou==null){
	codigou="";
}
%>


<script> 
/*if (history.forward(1)){ 
location.replace(history.forward(-1)) 

} */

</script> 

<%
if(codigou.equals("")){%>
<script language="javascript">alert("Usted No Tiene Permiso Para ver esta Pagina....");
window.location.href="Seg_login.jsp";
</script>

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
				//con.cerrar();
				
				ResultSet rs3;
				Statement st3=null;
				st3=con.conn.createStatement();
				rs3=st3.executeQuery("SELECT COUNT(estado) FROM hic_adm_formatos_pac WHERE estado=0 AND codigo_usu_fk="+codigou+"");
				int pend =0;
				if(rs3.next()){
					pend=rs3.getInt(1);
				}
				
				ResultSet rs4;
				Statement st4=null;
				st4=con.conn.createStatement();
				rs4=st4.executeQuery("SELECT COUNT(estado) FROM seg_mensajes WHERE estado=0 AND remitente="+codigou+"");
				int madmin=0;
				if(rs4.next()){
					madmin=rs4.getInt(1);
				}
				rs4.getStatement().close();
				
				ResultSet rs5;
				Statement st5=null;
				st5=con.conn.createStatement();
				rs5=st5.executeQuery("select sdp.profesion from seg_datos_personales sdp,seg_usuario su where sdp.dat_codigo=su.dat_codigo_fk and su.usu_codigo="+codigou+"");
				String prof=null;
				if(rs5.next()){
					prof=rs5.getString(1);
				}
				rs5.getStatement().close();
				System.out.println(prof);
				int pr=0;
				if(prof.equals("Enfermera")){
					pr=1;
				}
				con.cerrar();
	       	%>
<script language="javascript">
var cont=0;
function CargarForPend(){
	var CodUsuario=<%=codigou%>;
	var pend=<%=pend%>;
	var pr=<%=pr%>;
	if ((CodUsuario==101)||(CodUsuario==295)||(CodUsuario==143)){
		TB_show('Pacientes con Mas de 24h', "rep24h.jsp?TB_iframe=true&height=600&width=800", null); 
		}
	if(pend>2){
		if(pr==0){
		CargarAlertas(CodUsuario, pend);
		}else{
			if(pend>11){
			
				CargarAlertas(CodUsuario, pend);
			}
		}
		}
	

}
</script>

</head>
<body onload="CargarForPend()">
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

<tr id="principal1" class="style6">   
<td>
<div id="cabecera1" align="center"  class="style6"><a href="menu.jsp">Menu Principal</a>-Ordenes de Compra</div>



<div>       
	<table>
		<tr> 
			<td>  
<br /><br />
					<%@include file="menuord.jsp"%>
				 
			</td>


			<td align="center">
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />  
			     <div id="imagLa"></div>
			</td>
		</tr>
	</table>
</div>
<%} %>
</td></tr>
</table>


</body>
</html>