/**
 * Controlador:ControlCola
 * Muestra los pacientes por atender en el triage
 * Desarrollado:yosimar valega
 */

package adm_Controlador;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;
import java.util.*;

import adm_bean.Preingreso;
import adm_logica.Conexion;
import adm_logica.MetodoPreingreso;

public class ControlCola extends HttpServlet{	
	private static final long serialVersionUID = 1L;
	
	/**
	 * Se llama al procedimiento obtenerCola/MetodoPreingreso
	 * Se crea una lista y en el mientras que se llama un objeto de tipo Preingreso
	 * Se llana la lista con las propiedades del objeto Preingreso
	 * Se crea una session llamada lista y se redireaccioina a la jsp Adm_Pacientes para mostrar los datos
	 * 
	 * 
	 */
	
	public void doGet(HttpServletRequest req, HttpServletResponse res)throws ServletException, IOException{
		res.setContentType("text/html;charset=UTF-8");
		HttpSession session = req.getSession(true);
		MetodoPreingreso ba=new MetodoPreingreso();
		ResultSet rs=null;
		try{
		rs=ba.obtenerCola();		
		LinkedList lista= new LinkedList();		
		while(rs.next()){			
			Preingreso pr = new Preingreso();
			pr.setNombre(rs.getString("nombre"));			
			pr.setPapellido(rs.getString("primer_apellido"));			
			pr.setSapellido(rs.getString("segundo_apellido"));			
			pr.setCedula(rs.getString("numero_documento"));				
			pr.setEps(rs.getString("eps"));
			pr.setFecha(rs.getString("fecha_entrada"));
			pr.setHora(rs.getString("hora_entrada"));
			pr.setTipodocumento(rs.getString("tipo_documento"));
			lista.add(pr);
		}		
		session.setAttribute("lista", lista);
		rs.getStatement().getConnection().close();
		res.sendRedirect("Adm_Pacientes.jsp");
		}//end try
		catch(SQLException e){
			e.getMessage();
		}
	}//cierre del void doget	
}