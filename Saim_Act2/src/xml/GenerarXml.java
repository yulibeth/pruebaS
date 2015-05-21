package xml;

import java.io.*;
import java.lang.*;
import java.sql.*;

import adm_logica.MetodoCama;

public class GenerarXml {

	/**
	 * @param args
	 */
	//public static void main(String[] args) {
	public GenerarXml(){	
		String xml="<?xml version='1.0' encoding='iso-8859-1'?><cama>";
        String xmlc = "";
		ResultSet rs = null;
        MetodoCama m = new MetodoCama();
        rs = m.obtenerCama();
       
    	try 
        {
            BufferedWriter outfile = 
            		
              //new BufferedWriter(new FileWriter("C:\\Admisiones\\src\\xml\\cama.xml"));
              new BufferedWriter(new FileWriter("C:\\Admisiones\\WebContent\\flash\\cama.xml"));
            //new BufferedWriter(new FileWriter("http:\\localhost:8080\\Admisiones\\flash\\cama.xml"));
            
            while(rs.next()){
            	//xml=xml+"<dato codigo=\""+rs.getString(1)+"\" nombre=\""+rs.getString(2)+"\" codsubarea=\""+rs.getString(3)+"\" ubicacion_cama=\""+rs.getString(4)+"\" tipo_cama=\""+rs.getString(5)+"\" posx=\""+rs.getString(7)+"\" posy=\""+rs.getString(8)+"\" ancho=\""+rs.getString(9)+"\" altura=\""+rs.getString(10)+"\" estado=\""+rs.getString(11)+"\" />"; 
            	xml=xml+"<dato codigo=\""+rs.getString(1)+"\" nombre=\""+rs.getString(2)+"\" codsubarea=\""+rs.getString(3)+"\" ubicacion_cama=\""+rs.getString(4)+"\" tipo_cama=\""+rs.getString(5)+"\" posx=\""+rs.getString(7)+"\" posy=\""+rs.getString(8)+"\" estado=\""+rs.getString(9)+"\" />";
            	
            }
            xml=xml+"</cama>";
            outfile.write(xml);
            outfile.close();
        }
        catch (IOException e)    {    }       
        catch (SQLException e)    {    }
   }

}
