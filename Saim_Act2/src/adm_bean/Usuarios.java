/**
 * Bean Usuarios, se utiliza para el ingreso y actualizacion 
 * de los usuarios. 
 */

package adm_bean;

public class Usuarios {
	String nomUsuario="";
	String Password="";
	
	public Usuarios(){}

	public String getNomUsuario(){
		return nomUsuario;
	}
	public String getPassword(){
		return Password;
	}
	
	
	//Modificar
	public void setNomUsuario(String nomUsu){
		nomUsuario = nomUsu;
	}
	public void setPassword(String Pass){
		Password = Pass;
	}

	
}
