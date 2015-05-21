/**
 * Control:ControlSelAct
 * Muestra los datos de la Admision a Actualizar
 * Desarrollado:yosimar valega
 */

package adm_Controlador;

import java.io.IOException;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import adm_logica.MetodoAcompanante;
import adm_logica.MetodoAdmision;
import adm_logica.MetodoPaciente;



/**
 * Servlet implementation class ControlSelAct
 */
public class ControlSelAct extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	/**
	 * Se busca el paciente segun la cedula y el tipo SQLPacPa/MetodoPaciente
	 * Si existe se procede al buscar los datos de la Admision segun el codigo del paciente obtenerDatosAd/MetodoAdmision
	 * Si no hay se redirecciona a la  pagina Adm_ActAdmision sin datos linea 92 y 137
	 * Se busca los datos del Acompaņante por el cidog del contacto obtenerDatosAcomp/MetodoAcompanante
	 * Se redirecciona a la pagina Adm_ActAdmision con todos los datos estipulados
	 */
  
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String cedula,tipo,pac,nompa,pripa,sepa,numero_ingreso = null,numero_autorizacion = null,medio_autorizacion = null,autorizado_por = null,registrado_por = null;
		String fecha_registro = null,hora_registro = null,estado_afiliacion = null,dir_codigo_fk,semana_cotizadas = null,documentos=null;
		String observaciones,remision = null,cen_numero_cama_fk,codigo_contacto_fk=null;
		response.setContentType("text/html;charset=UTF-8");
		//datos del contacto
		
		String nomaco ="",apeaco ="",direaco ="",teleaco ="",ceduaco ="",parenaco ="";
		
		
		
		
		ResultSet rs=null;
		ResultSet rs1=null;
		ResultSet rs2=null;
		cedula=request.getParameter("ced");
		tipo=request.getParameter("tipo");
		
		
		MetodoPaciente pa1 =new MetodoPaciente();
		MetodoAdmision ad =new MetodoAdmision();
		MetodoAcompanante aco=new MetodoAcompanante();
		try{
			
			rs=pa1.SQLPacPa(cedula, tipo);
			
            if(rs.next()){
			  pac=rs.getString(1);
			  pripa=rs.getString(2);
			  sepa=rs.getString(3);
			  nompa=rs.getString(4);
			  
			  try{
				  rs1=ad.obtenerDatosAd(pac);
				  if(rs1.next()){
					  numero_ingreso=rs1.getString(1);
					  numero_autorizacion=rs1.getString(2);
					  medio_autorizacion=rs1.getString(3);
					  autorizado_por=rs1.getString(4);
					  registrado_por=rs1.getString(5);
					  fecha_registro=rs1.getString(6);
					  hora_registro=rs1.getString(7);
					  estado_afiliacion=rs1.getString(8);
					  dir_codigo_fk=rs1.getString(9);
					  semana_cotizadas=rs1.getString(10);
					  documentos=rs1.getString(11);
					  observaciones=rs1.getString(12);
					  remision=rs1.getString(13);
					  cen_numero_cama_fk=rs1.getString(14);
					  codigo_contacto_fk=rs1.getString(16);
					 
				  }else{
					  response.sendRedirect("Adm_ActAdmision.jsp?r=1");
					  
				  }
				  rs1.getStatement().getConnection().close();
				  //buscar codigo contacto
				  
                     rs2=aco.obtenerDatosAcomp(codigo_contacto_fk);
				  
				  if(rs2.next()){
					  nomaco=rs2.getString(1);
					  apeaco=rs2.getString(2);
					  direaco=rs2.getString(3);
					  teleaco=rs2.getString(4);
					  ceduaco=rs2.getString(5);
					  parenaco=rs2.getString(6);
					  
					 
				  }
				  rs2.getStatement().getConnection().close();
				  
				  if((direaco==null)||(direaco.equals("null"))){
					 
					  direaco="";
				  }
				  if(nomaco==null){
					  nomaco="";
				  }
				  if((apeaco==null)||(apeaco.equals("null"))){
					  apeaco="";
				  }
				  
				  if(teleaco==null){
					  teleaco="";
				  }
				  if(ceduaco==null){
					  ceduaco="";
				  }
				  
			  }catch(Exception ex){
				  ex.getMessage();
			  }
			  			  
			  rs.getStatement().getConnection().close();
			  String nombrecompleto="";
			  nombrecompleto=nompa+" "+pripa+" "+sepa;
			  response.sendRedirect("Adm_ActAdmision.jsp?r=0&cedu="+cedula+"&nom="+nombrecompleto+"&ingreso="+numero_ingreso+"&numeauto="+numero_autorizacion+"&medioauto="+medio_autorizacion+"&auto="+autorizado_por+"&registro="+registrado_por+"&fecha="+fecha_registro+"&hora="+hora_registro+"&estado="+estado_afiliacion+"&remision="+remision+"&semana="+semana_cotizadas+"&codigocon="+codigo_contacto_fk+"&nomaco="+nomaco+"&apeaco="+apeaco+"&direaco="+direaco+"&teleaco="+teleaco+"&ceduaco="+ceduaco+"&parenaco="+parenaco+"&tipo="+tipo);
            }
            
            else{
            	response.sendRedirect("Adm_ActAdmision.jsp?r=1");
            } 
       		}//fin try
       		catch(Exception ex){
       			ex.getMessage();
       		}
	}
		
}
