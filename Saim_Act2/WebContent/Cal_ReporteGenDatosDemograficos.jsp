<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" import="adm_logica.Conexion" import="java.sql.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>Reporte</title>
		
		<script language="javascript" type="text/javascript" src="Cal_DatosDemograficos.js"></script>
<link rel="STYLESHEET" type="text/css" href="estilo_lab1.css">
	
		
		
		
<%
	String Serv= request.getParameter("Serv");
	String area= request.getParameter("area");
	String tdia=request.getParameter("tdia");
	String tmes=request.getParameter("tmes");
	String tano=request.getParameter("tano");
	String ftdia=request.getParameter("ftdia");
	String ftmes=request.getParameter("ftmes");
	String ftano=request.getParameter("ftano");
	String Fechai=tano+"-"+tmes+"-"+tdia;
	String Fechaf=ftano+"-"+ftmes+"-"+ftdia; 
	String ftent=request.getParameter("ftent");
	
	//String pend=request.getParameter("pend");
	
%>
<script language="javascript" type="text/javascript" >
function mostrarep(){
	var Serv="<%=Serv%>";
	var area="<%=area%>";
	var tdia="<%=tdia%>";
	var tmes="<%=tmes%>";
	var tano="<%=tano%>";
	var ftdia="<%=ftdia%>";
	var ftmes="<%=ftmes%>";
	var ftano="<%=ftano%>";
	var ftent="<%=ftent%>";
	//alert("mostrar rep");
	ReporteGeneralDDemo(Serv,ftent,area,tdia,tmes,tano,ftdia,ftmes,ftano);
}

</script>

</head>

<body onload=mostrarep()>
		<br><br>
		<table  align="center" width="80%">
		<tr><td>

		<div id="reporte" align="justify" >
</div></td></tr></table>

