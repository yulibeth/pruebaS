/**
 * bean: Modulos se encuentran los objetos 
 * para la creacion y actualizacion de los modulos principales del sistema.
*/
package seguridad_bean;



public class Modulos {
	String nombregru = "";
	String descripcion = "";

	
	
	public Modulos(){
		
	}
	public Modulos(String nombre, String decri){
		nombregru = nombre;
		descripcion = decri;
	}
	
	
	
	public String getNombre(){
		return nombregru;
	}
	public String getDescripcion(){
		return descripcion;
	}
	
	//Modificar
	
	public void setNombre(String nom){
		nombregru = nom;
	}
	public void setApellido(String descri){
		descripcion = descri;
	}
	
}
