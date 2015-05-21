/**
 * Bean Urgencia_vital, se utiliza para el ingreso y actualizacion 
 * de una urgencia vital. 
 */
package adm_bean;

public class Urgencia_vital {

	String codigo="";
	String fecha="";
	String hora="";
	String descripcion="";
	String estado="";
		
	public Urgencia_vital(){
		
	}
	public Urgencia_vital(String cod, String fec, String hor, String desc, String est){
		codigo = cod;
		fecha = fec;
		hora = hor;
		descripcion = desc;
		estado = est;
		
	}
	
    public String getCodigo(){return codigo;}
    public String getFecha(){return fecha;}
    public String getHora(){return hora;}
    public String getDescripcion(){return descripcion;}
    public String getEstado(){return estado;}
    //Modificadores
    
    public void setCodigo(String cod){codigo =cod;}
    public void setFeha(String fec){fecha=fec;}
    public void setHora(String hor){hora=hor;}
    public void setDescripcion(String desc){descripcion=desc;}
    public void setEstado(String est){estado=est;}
    
	
}
