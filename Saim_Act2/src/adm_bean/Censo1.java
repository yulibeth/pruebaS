/**
 * Bean Censo1, se utiliza para el ingreso,actualizacion y consulta 
 * del censo. 
 */

package adm_bean;

public class Censo1 {
	String cama = "";
	String nombre ="";
	
	public Censo1(){
		
	}
	public String getCama(){
		return cama;
	}
	public String getNombre(){
		return nombre;
	}
	public void setCama(String n){
		cama = n;
	}
	public void setNombre(String n){
		nombre = n;
	}

}
