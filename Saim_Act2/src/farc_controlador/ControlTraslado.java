package farc_controlador;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.*;
import java.text.*;
import java.util.StringTokenizer;  //para dividir por token |

import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;

import lab_logica.MetodolabPa;

import farc_metodo.MetodoCrearArticulo;
import farc_metodo.MetodoTraslados;





/**
 * Servlet implementation class ControlTraslado
 */
public class ControlTraslado extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out=response.getWriter();
		
		MetodoTraslados mt = new MetodoTraslados();
		
		String va = request.getParameter("valor");
		String bo = request.getParameter("bo");
		//out.print("Bo: "+bo);
		if(bo==null){bo="0";}
		//out.print("Bo "+bo);
		
		
		String cont = request.getParameter("cont");
		String texto=request.getParameter("texto");
		String xx=request.getParameter("xx");
		String TipoM = request.getParameter("TipoM");
		
		
		ResultSet rs=null;
		ResultSet rs1=null;
		ResultSet rs2=null;
		ResultSet rs3=null;
		ResultSet rs4=null;
		ResultSet rs5=null;
		
		
		java.util.Date fechaS = new Date();
		Calendar c = new GregorianCalendar();
		String dia = Integer.toString(c.get(Calendar.DATE));
		String mes = Integer.toString(c.get(Calendar.MONTH));
		String annio = Integer.toString(c.get(Calendar.YEAR));
		int m=Integer.parseInt(mes)+1;
		mes=String.valueOf(m);
		int d=Integer.parseInt(dia);
		if(d<10){dia="0"+d;}
		if(m<10){mes="0"+m;}
		String fecha=dia+"/"+mes+"/"+annio;
				
		if(cont==null){cont="0";}
		int conta = Integer.parseInt(cont);
		if (conta>9){conta=9;}
		
		String datos2 ="";
		datos2 = request.getParameter("datos2");
		if(datos2==null){datos2="";}
		if(conta==1){datos2="";}
		
		String V[] = new String[150];
		String MI[][] = new String[11][11];
		String M[][] = new String[11][11];
/*
		//
		
		//String M2[][] = request.getParameter("m2"); //= request.getParameter("m2");
	*/
		
		
		if(va.equals("Traslados")){	
			String user=request.getParameter("user");
			out.print("<table width='100%' class='style6'><tr><td colspan='4'><div align='center' class='style11' id='cabecera2'>Salida de Articulos</div></td></tr>");
			out.print("<tr><td width='12%'>Bodega de Origen</td><td><label><select name='cmbBodegao' id='cmbBodegao' onchange='vbodegad()'><option value='Seleccione'>Seleccione</option>");
			rs=mt.ObtenerBodegas(user);
			try {
				while(rs.next()){
				out.print("<option value="+rs.getString(1)+">"+rs.getString(2)+"</option>");
				}
				rs.getStatement().getConnection().close();
			} catch (SQLException e) {
				out.print("Error "+e);
				e.printStackTrace();
			}
			out.print("</select></label></td>");	
			
			out.print("<td width='12%'>Bodega de Destino</td><td><label><select name='cmbBodegad' id='cmbBodegad' onfocus='vbodega()' ><option value='Seleccione'>Seleccione</option>");
			rs=mt.ObtenerBodegasd(bo,user);
			//rs=mt.ObtenerBodegas();
			try {
				while(rs.next()){
				out.print("<option value="+rs.getString(1)+">"+rs.getString(2)+"</option>");
				}
				rs.getStatement().getConnection().close();
			} catch (SQLException e) {
				out.print("Error "+e);
				e.printStackTrace();
			}
			out.print("</select></label></td></tr>");
			
			out.print("<tr><td>Numero de Soporte</td><td><label><input name='txtFactura' type='text' id='txtFactura' size='40' onfocus='vbodega()'/></td>");
			out.print("<td>Fecha</td><td width='45%'><label><input name='txtFecha' type='text' id='txtFecha' value='"+fecha+"' readonly='' size='40' /></label></td></tr>");
			out.print("<tr><td>Concepto</td><td><label><input name='txtConcepto' type='text' id='txtConcepto' onfocus='vbodega()' size='40'/></td></tr>");
					
		//out.print("<tr><td colspan='4'>&nbsp;</td></tr>");
			
			//rs = me.ObtenerMovimiento(TipoM);
		}

		
		if(va.equals("Traslados2")){	
			String user=request.getParameter("user");
			out.print("<table width='100%' class='style6'><tr><td colspan='4'><div align='center' class='style11' id='cabecera2'>Salida de Articulos</div></td></tr>");
			out.print("<tr><td width='12%'>Bodega de Origen</td><td><label><select name='cmbBodegao' id='cmbBodegao' onchange='vbodegad()'>");
			rs=mt.ObtenerBodegaso(bo);
			try {
				while(rs.next()){
				out.print("<option value="+rs.getString(1)+">"+rs.getString(2)+"</option>");
				}
				rs.getStatement().getConnection().close();
			} catch (SQLException e) {
				out.print("Error "+e);
				e.printStackTrace();
			}
			rs=mt.ObtenerBodegasd(bo,user);
			try {
				while(rs.next()){
				out.print("<option value="+rs.getString(1)+">"+rs.getString(2)+"</option>");
				}
				rs.getStatement().getConnection().close();
			} catch (SQLException e) {
				out.print("Error "+e);
				e.printStackTrace();
			}
			out.print("</select></label></td>");	
			
			out.print("<td width='12%'>Bodega de Destino</td><td><label><select name='cmbBodegad' id='cmbBodegad' onfocus='vbodega()' ><option value='Seleccione'>Seleccione</option>");
			rs=mt.ObtenerBodegasd(bo,user);
			//rs=mt.ObtenerBodegas();
			try {
				while(rs.next()){
				out.print("<option value="+rs.getString(1)+">"+rs.getString(2)+"</option>");
				}
				rs.getStatement().getConnection().close();
			} catch (SQLException e) {
				out.print("Error "+e);
				e.printStackTrace();
			}
			out.print("</select></label></td></tr>");
			
			out.print("<tr><td>Numero de Soporte</td><td><label><input name='txtFactura' type='text' id='txtFactura' size='40'/></td>");
			out.print("<td>Fecha</td><td width='45%'><label><input name='txtFecha' type='text' id='txtFecha' value='"+fecha+"' readonly='' size='40' /></label></td></tr>");
			out.print("<tr><td>Concepto</td><td><label><input name='txtConcepto' type='text' id='txtConcepto' size='40'/></td></tr>");
					
			out.print("<table width='100%' class='style6'><tr><td colspan='2'><div align='center' class='style11' id='cabecera2'>Generar Movimientos</div></td></tr>");
					
			out.print("<table width='100%' border='1' class='style6'><tr><td width='28%'><div align='center'>Articulo</div></td><td width='9%'><div align='center'>Lote</div></td><td width='9%'><div align='center'>Codigo Invima</div></td><td width='8%'><div align='center'>Vence</div></td><td width='8%'><div align='center'>Existencias</div></td><td width='10%'><div align='center'>Vlr Unitario</div></td><td width='20%'><div align='center'>Proveedor</div></td><td width='8%'><div align='center'>Cantidad </div></td></tr>");
			
			out.print("<td><input name='txtTipoMe0' type='text' id='txtTipoMe0' onfocus='vbodega()' onkeyup='autocompletaInventarioT(0,0)' size='39' />");//identificador Div+identificador campo
			out.print("<input name='txtTipoMeH0' type='hidden' id='txtTipoMeH0'/></td>");//identificador Div+identificador campo
			out.print("<td><label><input name='txtLote0' type='text' id='txtLote0' readonly='' size='8'/></td>");
			out.print("<td><label><input name='txtInvima0' type='text' id='txtInvima0' readonly='' size='8'/></td>");
			out.print("<td><label><input name='txtVence0' type='text' id='txtVence0' readonly='' size='7'/></td>");
			out.print("<td><label><input name='txtCantidad0' type='text' id='txtCantidad0' readonly='' size='7'/></td>");
			out.print("<td><label><input name='txtVunitario0' type='text' id='txtVunitario0'  readonly='' size='10'/></td>");
			out.print("<td width='4%'><label><input name='txtProvee0' type='text' id='txtProvee0' readonly='' size='26'/>");
			out.print("<input name='txtInv0' type='hidden' id='txtInv0' readonly='' size='26'/>");
			out.print("<td><label><input name='txtCa0' type='text' id='txtCa0' onkeyup='checknum3(0)' onBlur='Repetirt("+cont+",0,this.form)'  size='7'/></td>");//value='"+vt+"'   
			
			out.print("<tr><td><div id='sugerencias10'></div></td><td></td><td></td><td><div id='sugerencias20'></div></td></tr>");
			
		
			out.print("</table>"); 
				out.print("<div id='repetir'></div>");
			//out.print("<tr><td colspan='4'>&nbsp;</td></tr>");
			
			//rs = me.ObtenerMovimiento(TipoM);
		}
	////////////////////////////////////////////////////////////////////////////////////////////////////////	
		if(va.equals("EntradasRepetidas")){		
			//out.print("contadores "+conta);
			
			String a0 = request.getParameter("a0");
			char s ;
			char s2='@';
			String ini="";
			String fin="";
			for(int q=0; q<a0.length();q++){
				s=a0.charAt(q);
				if(s==s2){//out.println("encontrado en "+q+" es "+s);
				ini=ini+"%";}else{
				ini=ini+s;
				}
			}
							
			String a1 = request.getParameter("a1");
			String a2 = request.getParameter("a2");
			String a3 = request.getParameter("a3");
			String a4 = request.getParameter("a4");
			String a5 = request.getParameter("a5");
			String a6 = request.getParameter("a6");
			String a7 = request.getParameter("a7");
			String a8 = request.getParameter("a8");
			String a9 = request.getParameter("a9");
			
			datos2=datos2+ini;datos2=datos2+"|";
			datos2=datos2+a1;datos2=datos2+"|";
			datos2=datos2+a2;datos2=datos2+"|";
			datos2=datos2+a3;datos2=datos2+"|";
			datos2=datos2+a4;datos2=datos2+"|";
			datos2=datos2+a5;datos2=datos2+"|";
			datos2=datos2+a6;datos2=datos2+"|";
			datos2=datos2+a7;datos2=datos2+"|";
			datos2=datos2+a8;datos2=datos2+"|";
			datos2=datos2+a9;datos2=datos2+"|";
			
			//llena los datos que provienen de repetir
			int i1=0;   
			StringTokenizer elementos;  
			elementos = new StringTokenizer(datos2,"|"); 
			   
			   while(elementos.hasMoreTokens()){ 
				   V[i1] = elementos.nextToken();   
				   i1++;
			   }
			   
			   int in=0;
			   for(int z=0; z<conta; z++){
				   for(int zz=0; zz<=9; zz++){
					   MI[z][zz]=V[in];
					   in++;
				   }
			   }
			
			//out.print("Dtossss  "+datos2);
			
			int ind=0;
			out.print("<table width='100%' border='1' class='style6'>");
			for(int i=0;i<conta;i++){
				//out.print("esta es i: "+i);
				int j=i+1;
				//out.print("JJJJJ"+j);
				String art="txtTipoMe"+j;
				String artH="txtTipoMeH"+j;
				String lot="txtLote"+j;
				String inv="txtInvima"+j;
				String vence="txtVence"+j;
				String can="txtCantidad"+j;
				String vau="txtVunitario"+j;
				String pro="txtProvee"+j;
				String inventa="txtInv"+j;
				String ca="txtCa"+j;
				String txtM="txtM"+j;
				String sug1="sugerencias1"+j;
				
				for(int z=0; z<=9; z++){
				ind=z+(j*10);
				M[i][z]=V[ind];
				//out.print("fila "+(i)+" col"+z+" : "+M[i][z]);
				}
				
			//	String sug2="sugerencias2"+j;
			//	out.print("txtM0 "+datos2+"  txtMJ: "+j);
			//	out.print("conta es igual a "+conta);
				
			
				
				
				if((i==(conta-1)&&(i!=8))){
					out.print("<td><input name='"+art+"' type='text' id='"+art+"' onkeyup='autocompletaInventarioT("+j+","+j+")'  size='39' />");//identificador Div+identificador campo
					out.print("<input name='"+artH+"' type='hidden' id='"+artH+"' /></td>");//identificador Div+identificador campo
					out.print("<td><label><input name='"+lot+"' type='text' id='"+lot+"'  readonly='' size='8'/></td>");
					out.print("<td><label><input name='"+inv+"' type='text' id='"+inv+"'  readonly='' size='8'/></td>");
					out.print("<td><label><input name='"+vence+"' type='text' id='"+vence+"'  readonly='' size='7'/></td>");
					out.print("<td><label><input name='"+can+"' type='text' id='"+can+"'  readonly='' size='7'/></td>");
					out.print("<td><label><input name='"+vau+"' type='text' id='"+vau+"'  readonly='' size='10'/></td>");
					out.print("<td width='4%'><label><input name='"+pro+"' type='text' id='"+pro+"' readonly='' size='26'/>");
					out.print("<input name='"+inventa+"' type='hidden' id='"+inventa+"'  readonly='' size='26'/>");
					out.print("<td><label><input name='"+ca+"' type='text' id='"+ca+"' onfocus='anterior("+j+")' onkeyup='checknum3("+j+")' onBlur='Repetirt("+cont+","+j+",this.form)'  size='7'/></td>");//value='"+vt+"'   
					out.print("<input name='"+txtM+"' type='hidden' id='"+txtM+"' value='"+datos2+"' /></td>");//value='"+datos2+"'  identificador Div+identificador campo
					
					out.print("<tr><td><div id="+sug1+"></div></td><td></td><td></td><td><div id='sugerencias20'></div></td></tr>");			
				}
				
				if((conta>1)&&(i<(conta-1))){
					out.print("<td><input name='"+art+"' type='text' id='"+art+"' value='"+M[i][0]+"' onkeyup='autocompletaInventarioT("+j+","+j+")'  size='39' />");//identificador Div+identificador campo
					out.print("<input name='"+artH+"' type='hidden' id='"+artH+"' value='"+M[i][1]+"'/></td>");//identificador Div+identificador campo
					out.print("<td><label><input name='"+lot+"' type='text' id='"+lot+"' value='"+M[i][2]+"' readonly='' size='8'/></td>");
					out.print("<td><label><input name='"+inv+"' type='text' id='"+inv+"' value='"+M[i][3]+"' readonly='' size='8'/></td>");
					out.print("<td><label><input name='"+vence+"' type='text' id='"+vence+"' value='"+M[i][4]+"' readonly='' size='7'/></td>");
					out.print("<td><label><input name='"+can+"' type='text' id='"+can+"' value='"+M[i][5]+"' readonly='' size='7'/></td>");
					out.print("<td><label><input name='"+vau+"' type='text' id='"+vau+"' value='"+M[i][6]+"' readonly='' size='10'/></td>");
					out.print("<td width='4%'><label><input name='"+pro+"' type='text' value='"+M[i][7]+"'id='"+pro+"' readonly='' size='26'/>");
					out.print("<input name='"+inventa+"' type='hidden' id='"+inventa+"' value='"+M[i][8]+"' readonly='' size='26'/>");
					out.print("<td><label><input name='"+ca+"' type='text' id='"+ca+"' onfocus='anterior("+j+")' onkeyup='checknum3("+j+")' onBlur='Repetirt("+cont+","+j+",this.form)'  value='"+M[i][9]+"' size='7'/></td>");//value='"+vt+"'   
					out.print("<input name='"+txtM+"' type='hidden' id='"+txtM+"' value='"+datos2+"' /></td>");//value='"+datos2+"'  identificador Div+identificador campo
					
					out.print("<tr><td><div id="+sug1+"></div></td><td></td><td></td><td><div id='sugerencias20'></div></td></tr>");
				}
				
				if(i==8){
					for(int ss=0; ss<=9; ss++){ if (M[i][ss]==null){M[i][ss]="";}}
					out.print("<td><input name='"+art+"' type='text' id='"+art+"' value='"+M[i][0]+"' onkeyup='autocompletaInventarioT("+j+","+j+")'  size='39' />");//identificador Div+identificador campo
					out.print("<input name='"+artH+"' type='hidden' id='"+artH+"' value='"+M[i][1]+"'/></td>");//identificador Div+identificador campo
					out.print("<td><label><input name='"+lot+"' type='text' id='"+lot+"' value='"+M[i][2]+"' readonly='' size='8'/></td>");
					out.print("<td><label><input name='"+inv+"' type='text' id='"+inv+"' value='"+M[i][3]+"' readonly='' size='8'/></td>");
					out.print("<td><label><input name='"+vence+"' type='text' id='"+vence+"' value='"+M[i][4]+"' readonly='' size='7'/></td>");
					out.print("<td><label><input name='"+can+"' type='text' id='"+can+"' value='"+M[i][5]+"' readonly='' size='7'/></td>");
					out.print("<td><label><input name='"+vau+"' type='text' id='"+vau+"' value='"+M[i][6]+"' readonly='' size='10'/></td>");
					out.print("<td width='4%'><label><input name='"+pro+"' type='text' value='"+M[i][7]+"'id='"+pro+"' readonly='' size='26'/>");
					out.print("<input name='"+inventa+"' type='hidden' id='"+inventa+"' value='"+M[i][8]+"' readonly='' size='26'/>");
					out.print("<td><label><input name='"+ca+"' type='text' id='"+ca+"' onfocus='anterior("+j+")' onkeyup='checknum3("+j+")' onBlur='Repetirt("+cont+","+j+",this.form)'  value='"+M[i][9]+"' size='7'/></td>");//value='"+vt+"'   
					out.print("<input name='"+txtM+"' type='hidden' id='"+txtM+"' value='"+datos2+"' /></td>");//value='"+datos2+"'  identificador Div+identificador campo
					
					out.print("<tr><td><div id="+sug1+"></div></td><td></td><td></td><td><div id='sugerencias20'></div></td></tr>");
				}
			}//fin del if desde 0 a contador
		}// fin entradas repetidas

		//////////////////////////////////////////////////////////////
		
		if(va.equals("Ingreso")){	
		
		Calendar calendario = Calendar.getInstance();
		int hora, minutos, segundos;
		hora =calendario.get(Calendar.HOUR_OF_DAY);
		minutos = calendario.get(Calendar.MINUTE);
		segundos = calendario.get(Calendar.SECOND);
		String hra= hora+":"+minutos+":"+segundos;
		
		String ing = request.getParameter("ing");
		String nE = request.getParameter("nE");
		String bodo = request.getParameter("bodegao");
		String bodd = request.getParameter("bodegad");
		String fact = request.getParameter("factura");
		String conc = request.getParameter("concepto");
		String user = request.getParameter("user");
		String fech = request.getParameter("fechas");
		String dias=fech.substring(0, 2);
		String meses=fech.substring(3, 5);
		String anos=fech.substring(6, 10);
		String fec=anos+"-"+meses+"-"+dias;
	System.out.print("ING="+ing);
		StringTokenizer elementos;  
		elementos = new StringTokenizer(ing,"|"); 
		int i2=0;
		while(elementos.hasMoreTokens()){ 
		  V[i2] = elementos.nextToken();   
		  i2++;
		}
		//out.print("I2longitud: "+i2);
	/*	for(int f=0;f<i2;f++){
			out.print(" V["+f+"]: "+V[f]);
		}*/
		int fin=i2/10;
		//int r1,r2,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,r13;
		//out.print("vector: "+fin);
		if(i2>0){
			//esta seccion ingresa el movimiento
			int cant=0;	
			for(int z3=0; z3<fin; z3++){
				cant=cant+Integer.parseInt(V[z3*10+9]);
			}
			String cants=String.valueOf(cant);
			String inventario=null;
			//out.print(" la cantidad total es : "+cants);
			
			String t="";
			rs3=mt.ObtenerCodTraslado();
			try {
				while(rs3.next()){
				t=rs3.getString(1);//esta variable es el cod del movimiento
				}
				rs3.getStatement().getConnection().close();
			} catch (SQLException e) {
				out.print("Error "+e);
				e.printStackTrace();
			}
			//out.print(" El codigo del mov es : "+t);
			
			rs1=mt.ObtenerConsecutivo("3");
			String cons="";
			int cn=0;
			try {
				if(rs1.next()){
				cons=rs1.getString(1)+""+rs1.getString(2);
				cn=Integer.parseInt(rs1.getString(2))+1;
				}
				rs1.getStatement().getConnection().close();
			} catch (SQLException e) {
				out.print("Error "+e);
				e.printStackTrace();
			}
			
			String cns=String.valueOf(cn);
			mt.ActualizaConsecutivo("3",cns);
			
			mt.CrearMovimientos(cants, t, fec, hra, user, fact, conc, cons);
			
			/////////////////////////////////////////////////
			//rescatar el ultimo movimiento
			rs1=mt.ObtenerUMovimiento(fec,hra);
			String movi="";
			try {
				while(rs1.next()){
				movi=rs1.getString(1);//esta variable es el cod del movimiento
				}
				rs1.getStatement().getConnection().close();
			} catch (SQLException e) {
				out.print("Error "+e);
				e.printStackTrace();
			}
			/////
			 for(int z5=0; z5<fin; z5++){
				mt.CrearDetalle(movi,V[z5*10+8],bodo,V[z5*10+9]);	
			 }		 
		
			 
			 for(int z2=0; z2<fin; z2++){
			 int exis=Integer.parseInt(V[z2*10+5]);
			 int cantid=Integer.parseInt(V[z2*10+9]);
			 int to=exis-cantid;
			 String paso=String.valueOf(to);
			 //out.print(" Lo q queda la "+z2+1+" es: "+paso);
			 mt.CrearSalidas(V[z2*10+8],paso);	
			 }	 
			 
			 for(int z2=0; z2<fin; z2++){
				 int cantid=Integer.parseInt(V[z2*10+9]);
				 
				 String tt="";
					rs3=mt.ObtenerIva(V[z2*10+8]);
					try {
						while(rs3.next()){
						tt=rs3.getString(1);//esta variable es el cod del movimiento
						}
						rs3.getStatement().getConnection().close();
					} catch (SQLException e) {
						out.print("Error "+e);
						e.printStackTrace();
					}

					String vi="";
					rs5=mt.ObtenerVIva(tt);
					try {
						while(rs5.next()){
						vi=rs5.getString(1);//esta variable es el cod del movimiento
						}
						rs5.getStatement().getConnection().close();
					} catch (SQLException e) {
						out.print("Error "+e);
						e.printStackTrace();
					}
					
					String pp="";
					rs4=mt.ObtenerPro(V[z2*10+8]);
					try {
						while(rs4.next()){
						pp=rs4.getString(1);//esta variable es el cod del movimiento
						}
						rs4.getStatement().getConnection().close();
					} catch (SQLException e) {
						out.print("Error "+e);
						e.printStackTrace();
					}
					
					int ic=Integer.parseInt(V[z2*10+9]);
					int ivu=Integer.parseInt(V[z2*10+6]);
					int ivi=Integer.parseInt(vi);
					
					//out.print("Error "+ic+" : "+ivu+" : "+ivi);
				    float vato = ((ic*ivu)*((ivi/100f)+1));
				    //out.print(" vato "+vato);
				    int vatofi = Math.round(vato*100)/100 ;
				    //out.print(" vatofi "+vatofi);
				    String vatofis=String.valueOf(vatofi);
		//out.print("Esto es lo q mando"+movi+" : "+V[z2*10+1]+" : "+V[z2*10+4]+" : "+V[z2*10+2]+" : "+V[z2*10+9]+" : "+V[z2*10+6]+" xxx: "+vatofi+" : "+tt+" : "+bodd+" : "+fec+" : "+hra+" : "+pp+" : "+V[z2*10+3]);
		// movimiento, articulo, vence,  lote,  cantidad,  vunitario,  vtotal,  iva,  bodega,  fecha,  hra,  proveedor, invima
			
				 mt.CrearEntradasT(movi,V[z2*10+1],V[z2*10+4],V[z2*10+2],V[z2*10+9],V[z2*10+6],vatofis,tt,bodd,fec,hra,pp,V[z2*10+3]);
				 }	
			 
			 	 out.print(movi);
		//out.print("Ingreso Exitoso.");
			}
			//response.sendRedirect("nombrejsp.jsp?vatofis="+ing+"&f="+meses);
		 
		}
		
		/////////////////////////////////////////////////////////////
			
		if(va.equals("autoinv")){
			
			try {
				//System.out.print("ESSSTOO."+xx);
				rs =mt.listarArticulos(texto,xx);
				String cadena ="";
				cadena="[";
				while(rs.next()){
					cadena = cadena+"'"+rs.getString(2)+" "+rs.getString(3)+"|"+rs.getString(1)+"|"+rs.getString(4)+"|"+rs.getString(5)+"|"+rs.getString(6)+"|"+rs.getString(7)+"|"+rs.getString(8)+"|"+rs.getString(9)+"|"+rs.getString(10)+"'";
                	cadena = cadena +",";	
				}
				cadena = cadena+"]";
				//System.out.print("ESSSTOO."+cadena);
				response.getWriter().write(cadena);
				rs.getStatement().getConnection().close();
			} catch (Exception e) {
				e.getMessage();
				e.printStackTrace();
			}
		}
	}
 //}

}










