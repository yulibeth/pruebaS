/**
 * Controlador:Control Censo Grafico
 * Muestra el censo grafico de los pacientes con admision activa 
 * Desarrollado:Jhon Lugo Ching
 */
package adm_Controlador;

import java.io.*;
import java.lang.*;
import java.net.URL;
import java.sql.*;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.ResultSet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import adm_logica.MetodoCama;



import xml.GenerarXml;

/**
 * Servlet implementation class ControlCensoGrafico
 */
public class ControlCensoGrafico extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static ServletContext contexto;
	
	/**
	 * Se crea una variable de tipo String
	 * Se llama al procedimiento obtenerCama/MetodoCama
	 * Se crea un xml en la carpeta flash del proyecto
	 * A la variable xml se le inserta las consulta realizada
	 * Se escribe el xml y se redirecciona a la jsp grafico 
	 */
	
	public void doGet(HttpServletRequest req, HttpServletResponse res)throws ServletException, IOException{
		HttpSession session = req.getSession(true);
		
		String xml="<?xml version='1.0' encoding='iso-8859-1'?><cama>";
        
		ResultSet rs = null;
        MetodoCama m = new MetodoCama();
        rs = m.obtenerCama();
		
		try{
			
			String root = getServletContext().getRealPath("/");
				
			BufferedWriter outfile =
	        
			new BufferedWriter(new FileWriter(root+"\\flash\\cama.xml\\"));
				
	        while(rs.next()){
            	
	        	xml=xml+"<dato codigo=\""+rs.getString(1)+"\" nombre=\""+rs.getString(2)+"\" codsubarea=\""+rs.getString(3)+"\" ubicacion_cama=\""+rs.getString(4)+"\" tipo_cama=\""+rs.getString(5)+"\" posx=\""+rs.getString(7)+"\" posy=\""+rs.getString(8)+"\" estado=\""+rs.getString(9)+"\" />";
            		
            }	        
            xml=xml+"</cama>";
            
            outfile.write(xml);
            outfile.close();
			
            rs.getStatement().getConnection().close();
			res.sendRedirect("flash/grafico.jsp");
		
		}
		catch(Exception ex){System.out.println(ex.getMessage());}
		
		
	}

}
