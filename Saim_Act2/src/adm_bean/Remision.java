/**
 * Bean Remision, se utiliza para el ingreso y actualizacion 
 * de la remision del paciente. 
 */

package adm_bean;
public class Remision {
	    String cedula ="";
	    String nombre ="";
	    String papellido ="";
	    String sapellido="";
	    String tipodocumento ="";
	    String fecha = null;
	    String hora = "";
	    String eps="";
	    String numeroauto="";
	    String autorizacion="";
	    String codigocama="";
	    String estado="";
	    String area="";
	    String subarea="";
	    
	    public Remision(){
	    	
	    }
	    public Remision(String ced, String nom, String pape, String sape,String ep , String f, String hor,String td, String numeroaut,String autori,String codcam,String estadore,String area,String Subarea){
	    	cedula = ced;
	    	nombre = nom;
	    	papellido = pape;
	    	sapellido = sape;
	    	eps=ep;
	    	fecha = f;
	    	hora = hor;
	    	tipodocumento = td;
	    	numeroauto=numeroaut;
	    	autorizacion=autori;
	    	codigocama=codcam;
	    	estado=estadore;
	    	
	    }
	    public String getArea(){
			return area;
		}
	    public String getSubarea(){
			return subarea;
		}
	    
	    
	    public String getEstado(){
			return estado;
		}
	    
	    
	    public String getCama(){
			return codigocama;
		}
	    
		public String getCedula(){
			return cedula;
		}
		
		public String getNombre(){
			return nombre;
		}
		public String getPapellido(){
			return papellido;
		}
		public String getSapellido(){
			return sapellido;
		}
		public String getTipodocumento(){
			return tipodocumento;
		}
		public String getFecha(){
			return fecha;
		}
		public String getHora(){
			return hora;
		}
		public String getEps(){
			return eps;
		}
		public String getNautorizacion(){
			return numeroauto;
		}
		public String getAutorizacion(){
			return autorizacion;
		}
		
		//Modificar
		
		
		public void setArea(String Area){
			area = Area;
		}
		public void setsubArea(String subArea){
			subarea = subArea;
		}
		public void setEstado(String estadore){
			estado = estadore;
		}
		
		public void setCama(String codcam){
			codigocama = codcam;
		}
		
		public void setCedula(String ced){
			cedula = ced;
		}
		public void setNombre(String nom){
			nombre = nom;
		}
		public void setPapellido(String pape){
			papellido = pape;
		}
		public void setSapellido(String sape){
			sapellido = sape;
		}
		public void setTipodocumento(String tipo){
			tipodocumento = tipo;
		}
		public void setFecha(String fech){
			fecha = fech;
			
		}
		public void setDireccion(String hor){
			hora = hor;
		}
		public void setEps(String ep){
			eps = ep;
		}
		public void setNautorizacion(String numeroaut){
			numeroauto=numeroaut;
		}
		public void setAutorizacion(String autori){
			autorizacion=autori;
		}
	    
	}


