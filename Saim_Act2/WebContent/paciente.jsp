

<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Paciente</title>
<style type="text/css">
<!--
.style2 {font-size: 18px}
.style3 {color: #FFFFFF}
-->
</style>
</head>
<body>
<p>
  <%
String nombre=request.getParameter("nom");
String cedula=request.getParameter("ced");
String genero=request.getParameter("ge");
String afiliacion=request.getParameter("afi");
String edad=request.getParameter("edad");
%>
</p>
<table width="940" border="0">
  <tr bgcolor="#0000FF">
    <td><div align="center" class="style3">DATOS DEL PACIENTE </div></td>
  </tr>
</table>
<p>&nbsp;</p>
<table>
<tr>
<td width="79"><span class="style2">Nombre:</span></td>
<td width="145"><%=nombre%></td>
<td width="63"><span class="style2">Cédula:</span></td>
  <td width="78"><%=cedula%></td>
  <td width="48"><span class="style2">Edad:</span></td>
    <td width="58"><%=edad%></td>
    <td width="45"><span class="style2">Sexo:</span></td>
    <td width="122"><%=genero%></td>
    <td width="121"><span class="style2">Tipo Afiliación:</span></td>
    <td width="130"><%=afiliacion%></td>
</tr>


</table>
</body>
</html>