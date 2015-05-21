/**
 * Control:ControlNacido
 * Mostrar los hijos de una madre
 * Desarrollado:yosimar valega 
 */

package adm_Controlador;

import java.io.IOException;
import java.sql.Date;
import java.sql.ResultSet;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Vector;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import adm_bean.Paciente;
import adm_logica.MetodoPaciente;

/**
 * Servlet implementation class ControlNacido
 */
public class ControlNacido extends HttpServlet {
	
	/**
	 * Se obtiene los datos de la madre 
	 * Se realiza una consulta sobre los nacidos vivos SQLNacido/MetodoPaciente
	 * Se crean dos vectores y se crea una session para cada vector
	 * Se redirecciona a Adm_confirmar para mostrar los datos
	 */
	

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String cedu=request.getParameter("cedula");
		String ti=request.getParameter("tipo");
		String nomadre=request.getParameter("nomadre");
		String primadre=request.getParameter("primadre");
		String semadre=request.getParameter("semadre");
		response.setContentType("text/html;charset=UTF-8");		
        HttpSession session = request.getSession(true);		
		ResultSet rs = null;
		MetodoPaciente pa = new MetodoPaciente();
		rs = pa.SQLNacido();		
		Vector l = new Vector();
		Vector k = new Vector();		
		String codigo;
		try{
			int numero = 0;
			Date fechan;
			while(rs.next()){
				Paciente p=new Paciente();				
				codigo = rs.getString(5);
				p.setNombre(rs.getString(1));
				p.setPapellido(rs.getString(2));
				p.setSapellido(rs.getString(3));
				p.setFecha(rs.getString(4));
				p.setCedula(rs.getString(6));
				p.setDocumento(rs.getString(7));
				k.add(codigo);
				l.add(p);
			}
			rs.getStatement().getConnection().close();
			session.setAttribute("listaNacido", l);
			session.setAttribute("listaNac", k);
			response.sendRedirect("Adm_Confirmar.jsp?cedula="+cedu+"&tipo="+ti+"&nomadre="+nomadre+"&primadre="+primadre+"&semadre="+semadre+"");
		}
		catch(Exception ex){
			ex.getMessage();
		}
	}
}
