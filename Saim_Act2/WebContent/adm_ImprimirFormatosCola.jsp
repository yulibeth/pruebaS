
<%@page contentType="text/html" pageEncoding="UTF-8"%> 
<%@ page import="net.sf.jasperreports.engine.*" %> 
<%@ page import="net.sf.jasperreports.engine.design.*" %> 
<%@ page import="net.sf.jasperreports.engine.data.*"%> 
<%@ page import="net.sf.jasperreports.engine.export.*"%> 
<%@ page import="net.sf.jasperreports.engine.util.*"%> 
<%@ page import="net.sf.jasperreports.view.*"%> 
<%@ page import="net.sf.jasperreports.view.save.*"%> 
<%@ page import="java.sql.*"%> 
<%@ page import="java.util.*" %> 
<%@ page import="java.io.*" %> 
<%@ page trimDirectiveWhitespaces="true" %>
<%
String FechaFormato=request.getParameter("FechaFormato");
String HoraFormato=request.getParameter("HoraFormato");
String CodFormato=request.getParameter("CodFormato");
String CedPac=request.getParameter("CedPac");
String usuario=request.getParameter("usuario");
Connection conexion; Class.forName("com.mysql.jdbc.Driver");
conexion = DriverManager.getConnection("jdbc:mysql://localhost:3307/saim","root","!d1c5ccya!" ); 
File reportFile = new File(application.getRealPath("ReportesFormatosPreingreso.jasper"));
Map parameters = new HashMap(); 
parameters.put("FechaFormato",FechaFormato);
parameters.put("HoraFormato",HoraFormato);
parameters.put("CodFormato",CodFormato);
parameters.put("CedPac",CedPac);
parameters.put("usuario",usuario);
byte[] bytes = JasperRunManager.runReportToPdf(reportFile.getPath (), parameters, conexion);
response.setContentType("application/pdf"); 
response.setContentLength(bytes.length); 
ServletOutputStream ouputStream = response.getOutputStream(); 
ouputStream.write(bytes, 0, bytes.length); 
ouputStream.flush();
ouputStream.close();
conexion.close();
%> 