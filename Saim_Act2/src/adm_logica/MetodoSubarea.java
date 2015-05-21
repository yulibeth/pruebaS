/**
 * NOMBRE DE LA CLASE: MetodoSubarea
 * AUTOR: Oscar Rolong Schweiger
 * DESCRIPCION: En este metodo se encuentra lo necesario para insertar y consultar
 * 				al crear nuevas subareas.
 */
package adm_logica;

import java.sql.*;

import adm_bean.SubArea;

public class MetodoSubarea {
	
public MetodoSubarea(){
    	
    }
	
	    
    public void insertar(String nombre, String codigoArea){
    	/**
    	 * en este metodo se insertan los datos de la nueva subarea creada
    	 * que trae consigo el nombre de la subarea y el codigo interno del area a la
    	 * cual se va asignar la nueva subarea.
    	 * toma como dato de entrada el nombre de la subarea y el codigo del area.
    	 */
    	SubArea sa = new SubArea();
    	sa.setNombre(nombre);
    	sa.setCodigoArea(codigoArea);
		
		try{
			PreparedStatement ps = null;
		    Conexion con=new Conexion();
		    ps=con.conn.prepareStatement("insert into adm_subarea(nombre,codigoarea) values(?,?)");				
			ps.setString(1, sa.getNombre());
		    ps.setString(2,sa.getCodigoArea());
		 	ps.executeUpdate();
			ps.close();
			con.cerrar();
			
		}catch(Exception ex){
			
		}
		
		
	}
    
    public java.sql.ResultSet SQLArea(){
    	/**
		 * en este metodo se obtiene el nombre del area de la clinca
		 * si es urgencia,hospitalizacion,uci's o cualquier otra.
		 * */
        java.sql.ResultSet rs=null;
        Statement st = null;
        try{
        	Conexion con=new Conexion();
        	st = con.conn.createStatement();
        	rs=st.executeQuery("select nombre from adm_area");
        }
        catch(Exception ex){
        	
        }	
        return rs;
    }
	
    public java.sql.ResultSet SQLCodArea(String nom){
    	/**
    	 * en este metodo se obtiene el codigo interno del area 
    	 * para posteriormente asignarlo en la insercion del subarea
    	 * se toma como dato de entrada el nombre de la subarea.
    	 */
    	java.sql.ResultSet rs=null;
        Statement st = null;
        try{
        	
        	Conexion con=new Conexion();
        	st = con.conn.createStatement();
        	rs=st.executeQuery("select codigo from adm_area where nombre='"+nom+"'");
        	
        }
        catch(Exception ex){
        	
        }	
        return rs;
    }
	
	

}
