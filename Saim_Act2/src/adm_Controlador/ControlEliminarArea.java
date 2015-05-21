/**
 * NOMBRE DE LA CLASE: ControlEliminarArea
 * AUTOR: Oscar Rolong Schweiger
 * DESCRIPCION: En este Controlador se encuentra lo necesario
 * 				para eliminar un area. 				
 */
package adm_Controlador;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import adm_logica.MetodoEliminar;


public class ControlEliminarArea extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public void doPost(HttpServletRequest req, HttpServletResponse res)throws ServletException, IOException{
		res.setContentType("text/html;charset=UTF-8");
		String va = req.getParameter("va");		
		String area=req.getParameter("area");
		MetodoEliminar me=new MetodoEliminar();
		PrintWriter out=res.getWriter();
		ResultSet rs=null;	
		if (va.equals("1")){
			/**
			 * se obtiene el codigo del area a eliminar mediante una consulta
			 * MetodoEliminar/obtenerAreaEliminar
			 */
			rs=me.obtenerAreaEliminar(area);
			String are=null;
			
			try{
			
				while(rs.next()){
					
					are=rs.getString(1);
					out.println(are+"_"+are);
				}
				rs.getStatement().getConnection().close();
			}
			 catch(SQLException e1){
				 e1.getMessage();
			 }		 
		}
	}		
		
public void doGet(HttpServletRequest req, HttpServletResponse res)throws ServletException, IOException{
		/**
		 * se elimina el area mediante 
		 * MetodoEliminar/EliminarArea
		 */
		MetodoEliminar me=new MetodoEliminar();
		String codarea=null;		
		codarea=req.getParameter("codarea");	
		me.EliminarArea(codarea);
		res.sendRedirect("Adm_EliminarArea.jsp");
	}	

}
