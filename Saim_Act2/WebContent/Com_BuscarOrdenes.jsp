<%@page import="java.util.Vector"%>
<%@page import="java.lang.reflect.Array"%>
<%@ page language="java" contentType="text/html; charset=utf-8" import="adm_logica.Conexion" import="java.sql.*" pageEncoding="ISO-8859-1"%>
<%@ page session="true"%>
<%@ page language="java"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.DriverManager"%>
<%@ page import="java.sql.ResultSet"%>
<%@ page import="java.sql.Statement"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
<link rel="stylesheet" href="/resources/demos/style.css" />
<title>Orden de Compra</title>
<script language="javascript" type='text/javascript' src="Com_AutorizarOrden.js"></script>
<link rel="STYLESHEET" type="text/css" href="estilo_lab1.css">
<script language=javascript src="ValidacionesFurips.js"></script>
<link rel="stylesheet" href="thickbox.css" type="text/css" />
<script language="javascript" type='text/javascript' src='Browser.js'></script>
<script language="javascript">
			function A(e) {
				tecla = e.keyCode;
				e.which;
					if (tecla == 13) {
						pacienteActivo();
					}
			}
			function pulsar(e) {
				tecla = (document.all) ? e.keyCode : e.which;
				return (tecla != 13);
			}
		</script>
<script language="javascript">
			function Verificar(e){
				var minavegador = new Browser();
				if (minavegador.name == 'firefox'){
	    			if(e) 
						document.onkeypress = function(){return true;} ;
				var evt = e?e:event; 
				if(evt.keyCode==116){ 
					if(e) 
					document.onkeypress = function(){return false;} ;
				else{ 
					evt.keyCode = 0; 
					evt.returnValue = false; 
					} 
				} 
				}
			}
		</script>
</head>

<body>
	<%  String codigou = (String) session.getAttribute("codusuario");
		Conexion con = new Conexion();
		ResultSet rs;
		Statement st = null;
		String idu = "";
		st = con.conn.createStatement();
		rs = st.executeQuery("select usuario from seg_usuario where usu_codigo="+ codigou);
		while (rs.next()) {
			idu = rs.getString(1);
		}
		rs.getStatement().close();

		st = null;
		st = con.conn.createStatement();
		rs = st.executeQuery("SELECT COUNT(estado) FROM seg_mensajes WHERE estado=0 AND remitente="+ codigou + "");
		int madmin = 0;
		if (rs.next()) {
			madmin = rs.getInt(1);
		}
		rs.getStatement().close();
		con.cerrar();
		String cod = request.getParameter("codigo");
		if (codigou == null) {
			codigou = "";
		}
		if (codigou.equals("")) { //seguridad
	%>
<script language="javascript">
	alert("Usted No Tiene Permiso Para ver esta Pagina....");
	window.location.href = "Seg_login.jsp";
	<%} else {%>
</script>

<table width="100%" align="center">
	<tr>
		<td>
		<table width="100%">
			<tr>
				<td>
					<div><a href="mensajes.jsp?TB_iframe=true&height=520&width=700" class="thickbox"> Mensajes <font color=red size=medium><b><%=madmin%></b></font></a>
						<%if (madmin > 0) {%> <bgsound src="Imagenes/INNERMK.WAV" loop="2">
						<img src="Imagenes/sobr0001.gif" /> <%}%>
					</div>
				</td>
				<td align="right">
					<div align="right" id="usuario" align="right" class="style11">
						Bienvenido,<b><%=idu%></b> |<a href="Seguridad_login?accion=cerrar&CodUsu=<%=codigou%>"	style="color: white">--Cerrar Session--</a>
					</div>
				</td>
			</tr>
		</table>
		</td>
	</tr>

	<tr>
		<td>
			<div id="cabecera1" align="center" class="linkmenu"><b>
				<a href="menu.jsp">Men&uacute; Principal</a>-Ver Ordenes</b>
			</div>
		</td>
	</tr>

	<tr>
		<td>
		<div id="">

	<table width='100%'  class='style6' border='0'>
		<tr>
			<td colspan='5'><div align='center' class='style11' id='cabecera2'>Seleccione Una Opcion </div></td>
		</tr>
		<tr align='center' >
			<td  width='25%' ><label><input name='radiobutton' type='radio' value='radiobutton' onclick='Ord(&quot;1&quot;)' />Ordenes</label></td>
			<td width='25%'><label><input name='radiobutton' type='radio' value='radiobutton' onclick='Ord(&quot;2&quot;)' />Consultar Orden</label></td>
			<td width='25%'><label><input name='radiobutton' type='radio' value='radiobutton' onclick='Ord(&quot;3&quot;)' />Consultar Productos</label></td>
			<td width='25%'><label><input name='radiobutton' type='radio' value='radiobutton' onclick='Ord(&quot;4&quot;)' />Consultar Consolidado</label></td>
		</tr>
	</table>
</div>
		</td>
	</tr>


	<tr>
		<td>
		<div id="inf" style="display: none">
			<table width='100%' align='center'>
				<tr>
				  <td id='cabecera2' class='style11' colspan='9' align='center'>ORDENES</td>
				  </tr>
				<tr>
				<td >Fecha Inicial:</td>
				<td ><input id='desde1' name='desde' type='text' width='28%' class='styletxt'/><span class='style8'> *</span></td>
				<td >Fecha Final:</td>
				<td ><input id='hasta1' name='hasta' type='text' width='28%' class='styletxt'/><span class='style8'> *</span></td>
			    <td >Ordenes:</td>
			    <td ><select name='estado' id='estado' style='width: 155px'>
			    <option value='Seleccione' selected='selected' class='styletxt'>SELECCIONE</option>
			    <option value='0'>En estudio</option>
			    <option value='1'>Aprobadas</option>
			    <option value='2'>Anuladas</option>
				<option value='3'>Todas</option>
			    </select><span class='style8'> *</span></td>
			    <td><input id='button' type='button' width='28%' class='styletxt' value='Buscar' onClick='BuscarOrdenes()'/>  </td>
			    </tr>
			    </table>
	</div>
		
		</td>
	</tr>
	<tr>
		<td>
		<div id="datos"></div>
		</td>
	</tr>
</table>
<%}%>
</body>
</html>