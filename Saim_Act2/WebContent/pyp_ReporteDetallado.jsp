
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
String fechaIni=request.getParameter("fechaIni");
String fechaFin=request.getParameter("fechaFin");
Connection conexion; Class.forName("com.mysql.jdbc.Driver");
conexion = DriverManager.getConnection("jdbc:mysql://localhost:3307/saim","root","1234" ); 
File reportFile = new File(application.getRealPath("pyp_DetalladoDeCitas.jasper"));
//String ruta="C:\\Archivos de programa\\Apache Software Foundation\\Tomcat 7.0\\webapps\\Servidor\\reportes";
//String ruta="C:\\Program Files\\Apache Software Foundation\\Tomcat 7.0\\webapps\\Saim";
//Para Servidores en Ingles Como vista o Window server  2008
String ruta="C:\\Program Files\\Apache Software Foundation\\Tomcat 7.0\\webapps\\Saim";
//String ruta="C:\\Program Files\\Apache Software Foundation\\Tomcat 7.0\\webapps\\Servidor\\reportes";

Map parameters = new HashMap(); 
parameters.put("fechaIni",fechaIni);
parameters.put("fechaFin",fechaFin);
parameters.put("ruta",ruta);
byte[] bytes = JasperRunManager.runReportToPdf(reportFile.getPath (), parameters, conexion);
response.setContentType("application/pdf"); 
response.setContentLength(bytes.length); 
ServletOutputStream ouputStream = response.getOutputStream(); 
ouputStream.write(bytes, 0, bytes.length); 
ouputStream.flush();
ouputStream.close();
conexion.close();
%> 