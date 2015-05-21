
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/*
\u00e1 = �
\u00e9 = �
\u00ed = �
\u00f3 = �
\u00fa = �
*/
/** *********************************************** */
function getXMLObject() // XML OBJECT
{
	var xmlHttp = false;
	try {
		xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); // For Old Microsoft
		// Browsers
	} catch (e) {
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); // For Microsoft
			// IE 6.0+
		} catch (e2) {
			xmlHttp = false; // No Browser accepts the XMLHTTP Object then
			// false
		}
	}
	if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
		xmlHttp = new XMLHttpRequest(); // For Mozilla, Opera Browsers
	}
	return xmlHttp; // Mandatory Statement returning the ajax object created
}

var xmlhttp = new getXMLObject(); // xmlhttp holds the ajax object

var generopaciente =""; 
var codpacientediagnostico ="";
function BuscarPaciente(){
	
	var TipoDocumento = document.getElementById("cbafiliacion").value;
	var NumeroDocumento = document.getElementById("txtnumdoc").value;
	
	if (NumeroDocumento == "") {
		alert("Escriba Numero Documento.");
		document.getElementById('txtnumdoc').focus();
	} else {
		
		ajax = getXMLObject();
		ajax.open("POST", "Busqueda_Paciente", true); // getname will be the
		// servlet name
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4) {
				var datos = ajax.responseText.split("|");
				if (datos[0] == 1) {
					document.getElementById('datos_ingreso_paciente').innerHTML = datos[2];
					codpacientediagnostico = datos[1];
					desactivarelementoFormulario("cbafiliacion");
		            desactivarelementoFormulario("txtnumdoc");
		            desactivarelementoFormulario("btnBuscarPac");
		            aparecerElemento("informe_formulario_general");
		     		
		            //inicializadores de mini informes
		            
		            aorta_iniciar_valores();
		            iniciar_datos_valvulas();
			        valvulas_iniciar_valores_aspectos();
		            valvulas_iniciar_valores_insuficiencias();
		            valvulas_iniciar_valores_estenosis();
		            iniciar_valores_valvulas_protesicas();
     	            aorta_generar_informe();
		   
		            var i=0;
		            for(i=0;i <nombre_valvulas.length;i++){
		            	   valvulas_control(i+1);
		            	   valvulas_generar_informe();
		            	   valvulas_protesicas_generar_informe();
		            } 
		            valvulas_control(1);
		            
		            iniciar_valores_ventriculo_derecho();
		            ventriculo_derecho_generar_informe();
		            
		            iniciar_valores_vena_cava();
		            vena_cava_generar_Informe();
		            
		            auricula_izquierda_generar_informe();
		            auricula_derecha_generar_informe();
		         
		            inicializar_valores_funcion_ventriculo_izquierdo();
		            cargar_generalidades_ventriculo_izquierdo();
		            ventriculo_izquierdo_generar_informe();
		            
		            iniciar_valores_pericardio();
		            pericardio_generar_informe();
		            
		            generopaciente = document.getElementById("genero").innerHTML;

		            
		            
		           // vistapreviaFormularios();
		         
				} else {
					if (codpacientediagnostico.length <= 0) {
						document.getElementById('datos_ingreso_paciente').innerHTML = datos[1];
					   	window.location.href = "adm_IngresarDemografico.jsp";
					} else {
						alert(datos[1]);
					}

				}

			}
			
		};
		ajax.setRequestHeader('Content-Type',
		'application/x-www-form-urlencoded;charset=utf-8');
        ajax.send("valor=1&TipoDocumento=" + TipoDocumento
		+ "&NumeroDocumento=" + NumeroDocumento); // Posting txtname
       //alert("valor=1&TipoDocumento=" + TipoDocumento + "&NumeroDocumento=" + NumeroDocumento);
	}
}


function convertir_cm_m(opc){
	switch (opc){
	case 1:
	//convertir de cm a mm radio pisa
	 
	   var convertir_m = recopilarinfotextbox('insuficiencia_velaliasing_valvula_aorta');
	   convertir_m = parseFloat(convertir_m)/100 ;
	   reemplazarinfotextbox("insuficiencia_velaliasing_valvula_aorta_m", convertir_m);
	   valvulas_control_formulario_insuficiencia_aorta(4);
	   break;
	   
	case 2:
		var velpicojet_m = recopilarinfotextbox('insuficiencia_velpicojetregurgitacion_valvula_aorta');
		velpicojet_m = parseFloat(velpicojet_m)/100 ;
		   reemplazarinfotextbox("insuficiencia_velpicojetregurgitacion_valvula_aorta_m", velpicojet_m);
		   valvulas_control_formulario_insuficiencia_aorta(4);
		   break;
//insuficiencia_velaliasing_valvula_mitral_m		   
	case 3:
		//convertir de cm a mm radio pisa
		 
		   var velaliasing_m = recopilarinfotextbox('insuficiencia_velaliasing_valvula_mitral');
		   velaliasing_m = parseFloat(velaliasing_m)/100 ;
		   reemplazarinfotextbox("insuficiencia_velaliasing_valvula_mitral_m", velaliasing_m);
		   valvulas_control_formulario_insuficiencia_mitral(8);
		   break;
		   
	case 4:
		var velpicojet_mitral_m = recopilarinfotextbox('insuficiencia_velpicojetregurgitacion_valvula_mitral');
		velpicojet_mitral_m = parseFloat(velpicojet_mitral_m)/100 ;
		   reemplazarinfotextbox("insuficiencia_velpicojetregurgitacion_valvula_mitral_m", velpicojet_mitral_m);
		   valvulas_control_formulario_insuficiencia_mitral(8);
		   break;	   
		
	}
}

function convertir_m_cm(opc){
	switch (opc){
	case 1:
	//convertir de m a cm 
	 
	   var convertir_cm = recopilarinfotextbox('insuficiencia_velaliasing_valvula_aorta_m');
	   convertir_cm = 100*parseFloat(convertir_cm) ;
	   reemplazarinfotextbox("insuficiencia_velaliasing_valvula_aorta", convertir_cm);
	   valvulas_control_formulario_insuficiencia_aorta(4);
	   break;
	   
	case 2:
		//convertir de m a cm velpicojetm
		 
		   var velpicojet_cm = recopilarinfotextbox('insuficiencia_velpicojetregurgitacion_valvula_aorta_m');
		   velpicojet_cm = 100*parseFloat(velpicojet_cm) ;
		   reemplazarinfotextbox("insuficiencia_velpicojetregurgitacion_valvula_aorta", velpicojet_cm);
		   valvulas_control_formulario_insuficiencia_aorta(4);
		   break;
		   
	case 3:
		//convertir de m a cm 
		 
		   var velaliasing_cm = recopilarinfotextbox('insuficiencia_velaliasing_valvula_mitral_m');
		   velaliasing_cm = 100*parseFloat(velaliasing_cm) ;
		   reemplazarinfotextbox("insuficiencia_velaliasing_valvula_mitral", velaliasing_cm);
		   valvulas_control_formulario_insuficiencia_mitral(8);
		   break;
		   
	case 4:
		//convertir de m a cm velpicojetm
		 
		   var velpicojet_mitral_cm = recopilarinfotextbox('insuficiencia_velpicojetregurgitacion_valvula_mitral_m');
		   velpicojet_mitral_cm = 100*parseFloat(velpicojet_mitral_cm) ;
		   reemplazarinfotextbox("insuficiencia_velpicojetregurgitacion_valvula_mitral", velpicojet_mitral_cm);
		   valvulas_control_formulario_insuficiencia_mitral(8);
		   break;	   
	}
}
function convertir_cm(opc){
	switch (opc){
	case 1:
	//convertir de cm a mm radio pisa
	 
	   var convertir_cm = recopilarinfotextbox('insuficiencia_radiopisa_valvula_aorta');
	   convertir_cm = 10*parseFloat(convertir_cm) ;
	   reemplazarinfotextbox("insuficiencia_radiopisa_valvula_aorta_mm", convertir_cm);
	   valvulas_control_formulario_insuficiencia_aorta(4);
	   break;
	   
	case 2:
		//convertir de cm a mm lvotd
		 
		   var lvotd_cm = recopilarinfotextbox('insuficiencia_lvotd_valvula_aorta');
		   lvotd_cm = 10*parseFloat(lvotd_cm) ;
		   reemplazarinfotextbox("insuficiencia_lvotd_valvula_aorta_mm", lvotd_cm);
		   valvulas_control_formulario_insuficiencia_aorta(5);
		   break;
		   
	case 3:
		//convertir de cm a mm vtilvot
		 
		   var vtilvot_cm = recopilarinfotextbox('insuficiencia_vtilvot_valvula_aorta');
		   vtilvot_cm = 10*parseFloat(vtilvot_cm) ;
		   reemplazarinfotextbox("insuficiencia_vtilvot_valvula_aorta_mm", vtilvot_cm);
		   valvulas_control_formulario_insuficiencia_aorta(5);
		   break;
		   
	case 4:
		//convertir de cm a mm mad
		 
		   var mad_cm = recopilarinfotextbox('insuficiencia_mad_valvula_aorta');
		   mad_cm = 10*parseFloat(mad_cm) ;
		   reemplazarinfotextbox("insuficiencia_mad_valvula_aorta_mm", mad_cm);
		   valvulas_control_formulario_insuficiencia_aorta(5);
		   break;
		   
	case 5:
		//convertir de cm a mm vtima
		 
		   var vtima_cm = recopilarinfotextbox('insuficiencia_vtima_valvula_aorta');
		   vtima_cm = 10*parseFloat(vtima_cm) ;
		   reemplazarinfotextbox("insuficiencia_vtima_valvula_aorta_mm", vtima_cm);
		   valvulas_control_formulario_insuficiencia_aorta(5);
		   break;
		   
	case 6:
		//convertir de cm a mm tsvi
		 
		   var tsvi_cm = recopilarinfotextbox('estenosis_tsvi_valvula_aorta');
		   tsvi_cm = 10*parseFloat(tsvi_cm) ;
		   reemplazarinfotextbox("estenosis_tsvi_valvula_aorta_mm", tsvi_cm);
		   valvulas_control_formulario_estenosis_aorta(4);
		   break;
		   
	case 7:	
		//convertir de cm a mm radiopisa_valvula_mitral
		 
		   var rpi_mitral_cm = recopilarinfotextbox('insuficiencia_radiopisa_valvula_mitral');
		   rpi_mitral_cm = 10*parseFloat(rpi_mitral_cm) ;
		   reemplazarinfotextbox("insuficiencia_radiopisa_valvula_mitral_mm", rpi_mitral_cm);
		   valvulas_control_formulario_insuficiencia_mitral(8);
		   break;
		   
	case 8:
		//convertir de cm a mm madm
		 
		   var mad_mitral_cm = recopilarinfotextbox('insuficiencia_mad_valvula_mitral');
		   mad_mitral_cm = 10*parseFloat(mad_mitral_cm) ;
		   reemplazarinfotextbox("insuficiencia_mad_valvula_mitral_mm", mad_mitral_cm);
		   valvulas_control_formulario_insuficiencia_mitral(9);
		   break;	
		   
	case 9:
		//convertir de cm a mm vtima mitral
		 
		   var vtima_mitral_cm = recopilarinfotextbox('insuficiencia_vtima_valvula_mitral');
		   vtima_mitral_cm = 10*parseFloat(vtima_mitral_cm) ;
		   reemplazarinfotextbox("insuficiencia_vtima_valvula_mitral_mm", vtima_mitral_cm);
		   valvulas_control_formulario_insuficiencia_mitral(9);
		   break;	 
		   
	case 10:
		//convertir de cm a mm madm
		 
		   var pad_mitral_cm = recopilarinfotextbox('insuficiencia_pad_valvula_mitral');
		   pad_mitral_cm = 10*parseFloat(pad_mitral_cm) ;
		   reemplazarinfotextbox("insuficiencia_pad_valvula_mitral_mm", pad_mitral_cm);
		   valvulas_control_formulario_insuficiencia_mitral(9);
		   break;	
		   
	case 11:
		//convertir de cm a mm vtipa mitral
		 
		   var vtipa_mitral_cm = recopilarinfotextbox('insuficiencia_vtipa_valvula_mitral');
		   vtipa_mitral_cm = 10*parseFloat(vtipa_mitral_cm) ;
		   reemplazarinfotextbox("insuficiencia_vtipa_valvula_mitral_mm", vtipa_mitral_cm);
		   valvulas_control_formulario_insuficiencia_mitral(9);
		   break;	
		   
		
		
}//fin switch

}//fin function convertir_cm(opc)

function convertir_mm(opc){
	switch (opc){
	case 1:
	//convertir de mm a cm radio pisa
			 
	   var radiopisa_mm = recopilarinfotextbox('insuficiencia_radiopisa_valvula_aorta_mm');
	   radiopisa_mm = 0.1*parseFloat(radiopisa_mm) ;
	  reemplazarinfotextbox("insuficiencia_radiopisa_valvula_aorta", radiopisa_mm);
	 valvulas_control_formulario_insuficiencia_aorta(4);
	 break;
	 
	case 2:
		//convertir de mm a cm lvotd
		 var lvotd_mm = recopilarinfotextbox('insuficiencia_lvotd_valvula_aorta_mm');
		 lvotd_mm = 0.1*parseFloat(lvotd_mm) ;
		  reemplazarinfotextbox("insuficiencia_lvotd_valvula_aorta", lvotd_mm);
		  valvulas_control_formulario_insuficiencia_aorta(5);
		 break;
		 
	case 3:
		//convertir de mm a cm vtilvot
		 var vtilvot_mm = recopilarinfotextbox('insuficiencia_vtilvot_valvula_aorta_mm');
		 vtilvot_mm = 0.1*parseFloat(vtilvot_mm) ;
		  reemplazarinfotextbox("insuficiencia_vtilvot_valvula_aorta", vtilvot_mm);
		  valvulas_control_formulario_insuficiencia_aorta(5);
		 break;	 
		 
	case 4:
		//convertir de mm a cm mad
		 var mad_mm = recopilarinfotextbox('insuficiencia_mad_valvula_aorta_mm');
		 mad_mm = 0.1*parseFloat(mad_mm) ;
		  reemplazarinfotextbox("insuficiencia_mad_valvula_aorta", mad_mm);
		  valvulas_control_formulario_insuficiencia_aorta(5);
		 break;	 
		 
	case 5:
		//convertir de mm a cm vtima
		 var vtima_mm = recopilarinfotextbox('insuficiencia_vtima_valvula_aorta_mm');
		 vtima_mm = 0.1*parseFloat(vtima_mm) ;
		  reemplazarinfotextbox("insuficiencia_vtima_valvula_aorta", vtima_mm);
		  valvulas_control_formulario_insuficiencia_aorta(5);
		 break;	 
		 
	case 6:
		//convertir de mm a cm tsvi
		 var tsvi_mm = recopilarinfotextbox('estenosis_tsvi_valvula_aorta_mm');
		 tsvi_mm = 0.1*parseFloat(tsvi_mm) ;
		  reemplazarinfotextbox("estenosis_tsvi_valvula_aorta", tsvi_mm);
		  valvulas_control_formulario_estenosis_aorta(4);
		 break;	 
		
	case 7:	 
		//convertir de mm a cm tsvi
		 var rpi_mitral_mm = recopilarinfotextbox('insuficiencia_radiopisa_valvula_mitral_mm');
		 rpi_mitral_mm = 0.1*parseFloat(rpi_mitral_mm) ;
		  reemplazarinfotextbox("insuficiencia_radiopisa_valvula_mitral", rpi_mitral_mm);
		  valvulas_control_formulario_insuficiencia_mitral(8);
		 break;	
		 
	case 8:
		//convertir de mm a cm mad
		 var mad_mital_mm = recopilarinfotextbox('insuficiencia_mad_valvula_mitral_mm');
		 mad_mital_mm = 0.1*parseFloat(mad_mital_mm) ;
		  reemplazarinfotextbox("insuficiencia_mad_valvula_mitral", mad_mital_mm);
		  valvulas_control_formulario_insuficiencia_mitral(9);
		 break;	 	
		 
	case 9:
		//convertir de mm a cm vtima mitral
		 var vtima_mitral_mm = recopilarinfotextbox('insuficiencia_vtima_valvula_mitral_mm');
		 vtima_mitral_mm = 0.1*parseFloat(vtima_mitral_mm) ;
		  reemplazarinfotextbox("insuficiencia_vtima_valvula_mitral", vtima_mitral_mm);
		  valvulas_control_formulario_insuficiencia_mitral(9);
		 break;		
		 
	case 10:
		//convertir de mm a cm pad
		 var pad_mital_mm = recopilarinfotextbox('insuficiencia_pad_valvula_mitral_mm');
		 pad_mital_mm = 0.1*parseFloat(pad_mital_mm) ;
		  reemplazarinfotextbox("insuficiencia_pad_valvula_mitral", pad_mital_mm);
		  valvulas_control_formulario_insuficiencia_mitral(9);
		 break;	 	
		 
	case 11:
		//convertir de mm a cm vtipa mitral
		 var vtipa_mitral_mm = recopilarinfotextbox('insuficiencia_vtipa_valvula_mitral_mm');
		 vtipa_mitral_mm = 0.1*parseFloat(vtipa_mitral_mm) ;
		  reemplazarinfotextbox("insuficiencia_vtipa_valvula_mitral", vtipa_mitral_mm);
		  valvulas_control_formulario_insuficiencia_mitral(9);
		 break;			 
	 
	}//fin switch
	
}//fin function convertir_mm(opc)


function calcularSuperficie(){
	var swtalla = false;
	var swpeso =false;
	var talla=recopilarinfotextbox('txt_talla');
	var peso=recopilarinfotextbox('txt_peso');
	if(talla.length > 0){
	swtalla=/^\d+$/.test(talla);
		if(swtalla == false){
			alert("caracter invalido en la talla");
			reemplazarinfotextbox("txt_talla", recopilarinfotextbox("txt_talla").substring(0, recopilarinfotextbox("txt_talla").length -1));
		}
		
		if(parseInt(talla) <=0 ){
		    swtalla=false;
			alert("la talla no puede tener magnitud 0");
    		reemplazarinfotextbox("txt_talla", "");
    		reemplazarinfotextbox("txt_sup_corp", "");
	     }
	}else{
		reemplazarinfotextbox("txt_sup_corp", "");
	}
	
    if((peso.length >0)){
	swpeso=/^\d+$/.test(peso);
   	         if(swpeso == false){
   	      	alert("caracter invalido en el peso");
			reemplazarinfotextbox("txt_peso", recopilarinfotextbox("txt_peso").substring(0, recopilarinfotextbox("txt_peso").length -1));
		
	        }
   	      if(parseInt(peso)<=0){
				swpeso=false;
				    alert("el peso no pueden tener magnitud 0");
  	      		reemplazarinfotextbox("txt_peso", "");
  	    		reemplazarinfotextbox("txt_sup_corp", "");
  			}
    }
    else{
    	reemplazarinfotextbox("txt_sup_corp", "");
    }
    
    if(swtalla==true){
    	if(swpeso==true){
    				var bsa = parseFloat(0.007184 * (Math.pow(talla,0.725))*(Math.pow(peso,0.425)));
    	         	reemplazarinfotextbox("txt_sup_corp", Math.round(bsa * 100) / 100);
    	      
    				
    			}
   	}
	    valvulas_control_formulario_estenosis_aorta(4);
	    ventriculo_izquierdo_control_formulario(0);
    
}

/*function realizarInformes(opcion){
	switch(opcion){
    case 1:
		if(verEstadoCheckbox("activacion_analisis_aorta")){
			aparecerElemento("informe_aorta");
			aorta_iniciar_valores();
		}
		else{
			aorta_reiniciar_elementos();
			desaparecerElemento("informe_aorta");
		}
    break;
	case 2:
	if(verEstadoCheckbox("activacion_analisis_valvulas")){
			aparecerElemento("informe_valvulas");
		}
		else{
			desaparecerElemento("informe_valvulas");
		}
	break;
	case 3:
	if(verEstadoCheckbox("activacion_analisis_ventriculo_izquierdo")){
			aparecerElemento("informe_ventriculo_izquierdo");
		}
		else{
			desaparecerElemento("informe_ventriculo_izquierdo");
		}
	break;

	case 4:
		if(verEstadoCheckbox("activacion_analisis_ventriculo_derecho")){
				
				aparecerElemento("informe_ventriculo_derecho");
			}
			else{
				
				desaparecerElemento("informe_ventriculo_derecho");
			}
			
		break;
	case 5:
		if(verEstadoCheckbox("activacion_analisis_auricula_derecha")){
				
				aparecerElemento("informe_auricula_derecha");
			}
			else{
				
				desaparecerElemento("informe_auricula_derecha");
			}
			
		break;
	
	
	
	
	
	}
	
	
	
}*/
/************************************************************/
/**************FUNCIONES INFORME AORTA***********************/
/************************************************************/


/************************************/
/********* VARIABLES ****************/
/************************************/
var nombrespatologiasaorta = new Array();

/***********************************/
var nombreslugaresaorta = new Array();
var nombrespatologia =new Array();
var nombrestecnicoslugaresaorta = new Array();
var indice_clave_sector_aorta=0;
var mediciones_aorta_DATA = new Array();
var patologias_aorta_DATA = new Array();

function aorta_iniciar_valores(){
	nombrespatologiasaorta = new Array();
	nombreslugaresaorta =  new Array("anillo","senos_valsalva","union_sinotubular","aorta_ascendente","arco_aortico");
	nombrestecnicoslugaresaorta = new Array("anillo","senos de valsalva","uni\u00F3n sinotubular","aorta ascendente","arco a\u00F3rtico");
	nombrespatologia = new Array("aneurisma","diseccion","ulcera","trombo","hematoma","cuartacion");
	
	
	var cadenainicializacionpatologias="";
	var k=0;
	for (var i=0; i < nombreslugaresaorta.length; i++){// no se tiene encuenta el anillo
		cadenainicializacionpatologias="";
		if(i>0){
			for(var j =0; j < nombrespatologia.length-1; j++){
				nombrespatologiasaorta.push("analisis_aorta_"+nombrespatologia[j]+"_"+nombreslugaresaorta[i]);
				cadenainicializacionpatologias += recopilarinfoRadios("analisis_aorta_"+nombrespatologia[j]+"_"+nombreslugaresaorta[i])+"-";
			}
			
			if(i == nombreslugaresaorta.length-1 ){
				
				nombrespatologiasaorta.push("analisis_aorta_"+nombrespatologia[j]+"_"+nombreslugaresaorta[i]);
				cadenainicializacionpatologias += recopilarinfoRadios("analisis_aorta_"+nombrespatologia[j]+"_"+nombreslugaresaorta[i])+"-";
			}
			cadenainicializacionpatologias =cadenainicializacionpatologias.substring(0, cadenainicializacionpatologias.length -1);
			patologias_aorta_DATA[k]=cadenainicializacionpatologias;
		    k++;
		}
		mediciones_aorta_DATA[i]="0"; 
		
		
	}
}





function aorta_control(opcion){
	
switch(opcion){
	case 1:
		 indice_clave_sector_aorta=0;
	break;
	
	case 2:

		 indice_clave_sector_aorta=1;
		
		break;
		
	case 3:

		 indice_clave_sector_aorta=2;
		
		break;
	case 4:

		 indice_clave_sector_aorta=3;
		break;
	case 5:

		 indice_clave_sector_aorta=4;
		break;
	
	
	}
	
	
	
}


function aorta_control_formularios(opcion){
	
	switch(opcion){
	
case 1: 
		
		if(recopilarindexCombobox('analisis_aorta_aspecto') > 0){ // si la aorta es anormal
			aparecerElemento("patologias_senos_valsalva");
			aparecerElemento("patologias_unionsinotubular");
			aparecerElemento("patologia_aortaascendente");
			aparecerElemento("patologias_arcoaortico");

		}else{
	
			desaparecerElemento("patologias_senos_valsalva");
			desaparecerElemento("patologias_unionsinotubular");
			desaparecerElemento("patologia_aortaascendente");
			desaparecerElemento("patologias_arcoaortico");
			aorta_reiniciar_elementos();
		}
		
		break;
	
	
	
	case 2:
		
		var medida= recopilarinfotextbox("analisis_aorta_"+nombreslugaresaorta[indice_clave_sector_aorta]+"_medicion");
		
		if(medida.length>0){
			var swmedida=/^\d+$/.test(medida);
			if(swmedida ==false){
			
				reemplazarinfotextbox("analisis_aorta_"+nombreslugaresaorta[indice_clave_sector_aorta]+"_medicion", recopilarinfotextbox("analisis_aorta_"+nombreslugaresaorta[indice_clave_sector_aorta]+"_medicion").substring(0, recopilarinfotextbox("analisis_aorta_"+nombreslugaresaorta[indice_clave_sector_aorta]+"_medicion").length -1));
			}
	
			mediciones_aorta_DATA[indice_clave_sector_aorta]=recopilarinfotextbox("analisis_aorta_"+nombreslugaresaorta[indice_clave_sector_aorta]+"_medicion");
			
		}else{
			mediciones_aorta_DATA[indice_clave_sector_aorta]="0";
		}
	
		break;
	
	
	case 3:

		var cadenavaolesobtenidosradios="";
		if(indice_clave_sector_aorta < 4 ){
			var i=0;
			for(i=0;i < nombrespatologia.length-1;i++ ){
				cadenavaolesobtenidosradios += recopilarinfoRadios("analisis_aorta_"+nombrespatologia[i]+"_"+nombreslugaresaorta[indice_clave_sector_aorta])+ "-";
			}
			cadenavaolesobtenidosradios = cadenavaolesobtenidosradios.substring(0, cadenavaolesobtenidosradios.length-1);
			
			
			
		}else{
			var i=0;
			for(i=0;i < nombrespatologia.length;i++ ){
				cadenavaolesobtenidosradios += recopilarinfoRadios("analisis_aorta_"+nombrespatologia[i]+"_"+nombreslugaresaorta[indice_clave_sector_aorta])+ "-";
			}
			cadenavaolesobtenidosradios = cadenavaolesobtenidosradios.substring(0, cadenavaolesobtenidosradios.length-1);
			
		}
		
		
		patologias_aorta_DATA[indice_clave_sector_aorta-1]=cadenavaolesobtenidosradios;
		
		
	//	alert(patologias_aorta[indice_clave_sector_aorta-1]);
		
		break;
	
	
	}
	
	aorta_generar_informe();
	
}


function aorta_reiniciar_elementos(){
	
	//reemplazarindexCombobox("analisis_aorta_aspecto","0");
	
	for(var i =0; i < nombrespatologiasaorta.length; i++){
		
		reiniciarRadiosButtons(nombrespatologiasaorta[i], "0");
		
	}
	aorta_iniciar_valores();
	
}


function aorta_generar_informe(){
	var cadenaresultadoaorta="";
	cadenaresultadoaorta += "De aspecto "+recopilarTextCombobox("analisis_aorta_aspecto");
	
	var i=0;
	//var cadenamediciones="";
	/*for (i=0;i < mediciones_aorta_DATA.length;i++){
		if(mediciones_aorta_DATA[i]>0){
			//switch condicional para las medidas
			cadenamediciones += nombrestecnicoslugaresaorta[i]+",";
		}
		
	}
	cadenamediciones = cadenamediciones.substring(0, cadenamediciones.length -1);
	//alert(""+patologias_aorta.toString());
	if(cadenamediciones.length > 0){
		cadenaresultadoaorta += " "+"con dilatacion de "+cadenamediciones;
    }*/
	
	
	
	i = 0;
	var j=0;
    var resultadopatologias ="";
	for (i=0;i<nombrespatologia.length;i++){// lugares aorta varias
		cadenaconcatenacionlocalizacionesaorta="";
        j=0;
        k=1;
		while (j<patologias_aorta_DATA.length){ // matriz descriptiva de patologias
			if(i == nombrespatologia.length -1 ){
				j = patologias_aorta_DATA.length -1;
				k =  patologias_aorta_DATA.length;
     		}
            var patologias = patologias_aorta_DATA[j].split("-");
     			if(patologias[i]>0){//patologia actual
     		
    	    	cadenaconcatenacionlocalizacionesaorta += nombrestecnicoslugaresaorta[k]+",";
    			}
    			k++;
			j++;
			
	}
	   if(cadenaconcatenacionlocalizacionesaorta.length >0){
			cadenaconcatenacionlocalizacionesaorta = cadenaconcatenacionlocalizacionesaorta.substring(0,cadenaconcatenacionlocalizacionesaorta.length-1);
			resultadopatologias += ' con '+nombrespatologia[i]+ ' en ('+cadenaconcatenacionlocalizacionesaorta+'),';
	    
	    }
		cadenaconcatenacionlocalizacionesaorta="";
	}

	
	if(resultadopatologias.length > 0){
		resultadopatologias = resultadopatologias.substring(0, resultadopatologias.length-1);
		cadenaresultadoaorta += resultadopatologias;
	}
	cadenaresultadoaorta +=".";
	reemplazarinfotextbox("analisis_aorta_observaciones", cadenaresultadoaorta);
	vistapreviaFormularios();
}

/************************************************************/
/**************FUNCIONES INFORME VALVULAS***********************/
/************************************************************/


/************************************/
/********* VARIABLES ****************/
/************************************/

var analisis_aspectos_valvulas = new Array();
var nombre_valvulas= new Array();
var nombre_tecnico_valvulas=new Array();
var nombres_aspectos_valvulas = new Array();
var nombres_tecnicos_aspectos_valvulas = new Array();

var insuficiencia_aorta = new Array(); // ninguna,leve,moderado,severo
var datos_insuficiencia_valvula_aorta= new Array();
var estenosis_aorta = new Array();  // ninguna,leve,moderado,sever
var datos_estenosis_valvula_aorta = new Array();


var insuficiencia_mitral = new Array(); // ninguna,leve,moderado,sever
var datos_insuficiencia_valvula_mitral= new Array();
var estenosis_mitral = new Array(); // ninguna,leve,moderado,sever
var datos_estenosis_valvula_mitral = new Array();


var insuficiencia_tricuspidea = new Array(); // ninguna,leve,moderado,sever
var datos_insuficiencia_valvula_tricuspidea= new Array();
var estenosis_tricuspidea = new Array(); // ninguna,leve,moderado,sever
var datos_estenosis_valvula_tricuspidea = new Array();


var insuficiencia_pulmonal = new Array(); // ninguna,leve,moderado,sever
var datos_insuficiencia_valvula_pulmonal = new Array();
var estenosis_pulmonal = new Array(); // ninguna,leve,moderado,sever
var datos_estenosis_valvula_pulmonal = new Array();

var indice_clave_sector_valvula = 0;

function valvulas_control(opcion){
	
	switch(opcion){
	
	case 1:
		indice_clave_sector_valvula=0;
		break;
		
	case 2:
		indice_clave_sector_valvula=1;
		break;
		
	case 3:
		indice_clave_sector_valvula=2;
		break;
		
	case 4:
		indice_clave_sector_valvula=3;
		break;
	}
	
}

function iniciar_datos_valvulas(){
	nombre_valvulas = new Array("valvula_aorta","valvula_mitral","valvula_tricuspidea","valvula_pulmonal");
	nombre_tecnico_valvulas= new Array("aorta","mitral","tricuspidea","pulmonal");
}


function valvulas_iniciar_valores_aspectos(){
	nombres_aspectos_valvulas =  new Array("esclerosis","calcificacion","esclerocalcificacion","engrosamiento","perforacion","endomo","restriccion","plastia");
	nombres_tecnicos_aspectos_valvulas = new Array("esclerosis","calcificaci\u00f3n","esclerocalcificaci\u00f3n","engrosamiento","perforaci\u00f3n","en domo","restricci\u00f3n","plastia");

	var i =0;
	var j =0;
	var cadena_aspectos_encontrados = "";
	for (i =0;i < nombre_valvulas.length; i++ ){
		 cadena_aspectos_encontrados = "";
		for(j=0;j<nombres_aspectos_valvulas.length;j++){
			if(j==nombres_aspectos_valvulas.length-1 ){
				cadena_aspectos_encontrados += recopilarinfoRadios("aspecto_"+nombres_aspectos_valvulas[j]+"_"+nombre_valvulas[i]);
				
			}else{
				cadena_aspectos_encontrados += recopilarinfoRadios("aspecto_"+nombres_aspectos_valvulas[j]+"_"+nombre_valvulas[i])+"-";
			}
		}
		analisis_aspectos_valvulas[i]=cadena_aspectos_encontrados;
		
		
		
		
   }
	

	
	
	
}

function valvulas_iniciar_valores_insuficiencias(){
	datos_insuficiencia_valvula_aorta = new Array("jetcentrallvot","venacontracta","revflujodiastolico","tiempohemipresion","eroa","rvol","fr");
	datos_insuficiencia_valvula_mitral= new Array("venacontracta","jetcentral","prolapso","flujovenas","flujotrans","densidadcwdoppler","formajetcwdoppler","tamventriculo","eroa","rvol","fr");
	datos_insuficiencia_valvula_tricuspidea= new Array("morfologia","tamanocavidades","areajetcentral","densidadjet","contornojet","diavenacontracta","radiopisa","flujohepatico");
	datos_insuficiencia_valvula_pulmonal = new Array("morfologia","tamventriculoderecho","tamjet","densidadjet","flupulcomflusis");
	
	var i =0;
	var j=0;
	for(i=0; i <nombre_valvulas.length ; i++){
		j=0;
		switch(i){
		case 0: //valvula aorta insuficiencia y estenosis
			for(j=0; j<datos_insuficiencia_valvula_aorta.length ; j++){
				insuficiencia_aorta[j]="1";
			}
			break;
		case 1: //valvula mitral insuficiencia y estenosis
			for(j=0; j<datos_insuficiencia_valvula_mitral.length ; j++){
				insuficiencia_mitral[j]="1";
			}
			break;
		case 2: //valvula tricuspidea insuficiencia y estenosis
			for(j=0; j<datos_insuficiencia_valvula_tricuspidea.length ; j++){
				insuficiencia_tricuspidea[j]="1";
			}
			break;
		case 3: //valvula pulmonal insuficiencia y estenosis
			for(j=0; j<datos_insuficiencia_valvula_pulmonal.length ; j++){
				insuficiencia_pulmonal[j]="1";
			}
			break;
		}
    }

}


function valvulas_iniciar_valores_estenosis(){
	datos_estenosis_valvula_aorta = new Array("gradientemedio","velocidadpico","velradio","ava","avaindexado");
	datos_estenosis_valvula_mitral= new Array("gradientemedio","area","pap");
	datos_estenosis_valvula_tricuspidea= new Array("gradientemedio","vti","tph","areavalvular");
	datos_estenosis_valvula_pulmonal = new Array("gradientepico","velocidadpico");
	
	var i =0;
	var j=0;
	for(i=0; i <nombre_valvulas.length ; i++){
		j=0;
		switch(i){
		case 0: //valvula aorta insuficiencia y estenosis
			for(j=0; j<datos_estenosis_valvula_aorta.length ; j++){
				estenosis_aorta[j]="1";
			}
			break;
		case 1: //valvula mitral insuficiencia y estenosis
			for(j=0; j<datos_estenosis_valvula_mitral.length ; j++){
				estenosis_mitral[j]="1";
			}
			break;
		case 2: //valvula tricuspidea insuficiencia y estenosis
			for(j=0; j<datos_estenosis_valvula_tricuspidea.length ; j++){
				estenosis_tricuspidea[j]="1";
			}
			break;
		case 3: //valvula pulmonal insuficiencia y estenosis
			for(j=0; j<datos_estenosis_valvula_pulmonal.length ; j++){
				estenosis_pulmonal[j]="1";
			}
			break;
		}
    }

}


function valvulas_control_formulario_aspecto(opcion){
	switch(opcion){
	case 1:
		if(recopilarindexCombobox('tipo_aspecto_'+nombre_valvulas[indice_clave_sector_valvula]) > 0){ // si la aorta es anormal
		
			aparecerElemento("aspectos_"+nombre_valvulas[indice_clave_sector_valvula]);
    	}else{
			desaparecerElemento("aspectos_"+nombre_valvulas[indice_clave_sector_valvula]);
			for(var i =0; i < nombres_aspectos_valvulas.length; i++){
				reiniciarRadiosButtons("aspecto_"+nombres_aspectos_valvulas[i]+"_"+nombre_valvulas[indice_clave_sector_valvula], "0");
			}
			//reemplazarindexCombobox("aspecto_"+nombres_aspectos_valvulas[nombres_aspectos_valvulas.length-1]+"_"+nombre_valvulas[indice_clave_sector_valvula], 0);
			valvulas_iniciar_valores_aspectos();
		}
		break;
		
	case 2:
	    var j=0;
		var cadena_aspectos_encontrados="";
		  for(j=0;j<nombres_aspectos_valvulas.length;j++){
				if(j==nombres_aspectos_valvulas.length-1 ){
		        	cadena_aspectos_encontrados += recopilarinfoRadios("aspecto_"+nombres_aspectos_valvulas[j]+"_"+nombre_valvulas[indice_clave_sector_valvula]);
				}else{
				cadena_aspectos_encontrados += recopilarinfoRadios("aspecto_"+nombres_aspectos_valvulas[j]+"_"+nombre_valvulas[indice_clave_sector_valvula])+"-";
			}
		}
     		  analisis_aspectos_valvulas[indice_clave_sector_valvula]=cadena_aspectos_encontrados;
		break;
		
	case 3:
		
		if(parseInt(recopilarinfoRadios("aspecto_protesis_"+nombre_valvulas[indice_clave_sector_valvula]))>0){
		//reiniciarRadiosButtons("aspecto_protesis_"+nombre_valvulas[indice_clave_sector_valvula],"0");
		aparecerElemento("analisis_"+nombre_valvulas[indice_clave_sector_valvula]+"_protesica");
		aparecerElemento("analisis_"+nombre_valvulas[indice_clave_sector_valvula]+"_protesica2");
		//desaparecerElemento("analisis_"+nombre_valvulas[indice_clave_sector_valvula]+"_normal");
		switch(indice_clave_sector_valvula){
		case 0:
		swProtesisValvulaAorta=true;
				break;
		case 1:
			swProtesisValvulaMitral=true;
				break;
		case 2:
			swProtesisValvulaTricuspidea=true;
			break;
			
		case 3:
			swProtesisValvulaPulmonal=true;
			break;
			
		}
		}else{

			desaparecerElemento("analisis_"+nombre_valvulas[indice_clave_sector_valvula]+"_protesica");
			desaparecerElemento("analisis_"+nombre_valvulas[indice_clave_sector_valvula]+"_protesica2");
		}
		
		break;
		
	}
	valvulas_generar_informe();
	
}

var swProtesisValvulaAorta=false;
var swProtesisValvulaMitral=false;
var swProtesisValvulaTricuspidea=false;
var swProtesisValvulaPulmonal=false;


function iniciar_valores_valvulas_protesicas(){
	tipoestenosisValvulaProtesicaAorta = new Array("1","1","1","1","1","1");
	tipoestenosisValvulaProtesicaMitral = new Array("1","1","1","1","1");
	tipoestenosisValvulaProtesicaTricuspidea = new Array("1","1","1");
	tipoestenosisValvulaProtesicaPulmonal = new Array("1","1","1","1","1");
}

var tipoestenosisValvulaProtesicaAorta = new Array();

function valvula_aorta_protesica_control_formulario(opcion){
	
	switch(opcion){
	
	case 0:
		
		if(recopilarindexCombobox("protesis_valvula_protesica_aorta")==0){
			swProtesisValvulaAorta=false;
			reemplazarindexCombobox("protesis_valvula_protesica_aorta", 1);
			desaparecerElemento("analisis_"+nombre_valvulas[indice_clave_sector_valvula]+"_protesica");
			desaparecerElemento("analisis_"+nombre_valvulas[indice_clave_sector_valvula]+"_protesica2");
			aparecerElemento("analisis_"+nombre_valvulas[indice_clave_sector_valvula]+"_normal");
			reiniciarRadiosButtons("aspecto_protesis_"+nombre_valvulas[indice_clave_sector_valvula],"0");
			
		}
		
		
		break;
		
	case 1:
		tipoestenosisValvulaProtesicaAorta[0]= recopilarValueCombobox("contorno_jet_valvula_aorta_protesica");
		
		
		break;
		
	case 2:
		tipoestenosisValvulaProtesicaAorta[1]= recopilarValueCombobox("tiempo_de_aceleracion_valvula_aorta_protesica");
		
		
		break;
	case 3:
		
		var velpico= recopilarinfotextbox("velocidad_pico_valvula_aorta_protesica");
		var swvelpico= false;	
	    if((velpico.length >0)){
			
	    	swvelpico=/^\d+\.?\d*$/.test(velpico);
	   	         if(swvelpico == false){
	   	      	alert("caracter invalido en la velocidad pico de la valvula protesica aortica");
				reemplazarinfotextbox("velocidad_pico_valvula_aorta_protesica", recopilarinfotextbox("velocidad_pico_valvula_aorta_protesica").substring(0, recopilarinfotextbox("velocidad_pico_valvula_aorta_protesica").length -1));
			
		        }
	   	         
	   	      if((velpico.length >2) ){
	   	    	if(parseFloat(velpico)<=0.0){
    			alert("velocidad pico de la valvula protesica aortica no puede tener magnitud 0.0");
 				reemplazarinfotextbox("velocidad_pico_valvula_aorta_protesica", "");
 				swvelpico=false;
 				tipoestenosisValvulaProtesicaAorta[2]="1";
 		   }
	   	      }
	    }else{
	    	tipoestenosisValvulaProtesicaAorta[2]="1";
	    }
	    
	    
	    if(swvelpico==true){
	    	if(parseInt(velpico)<3){
				tipoestenosisValvulaProtesicaAorta[2]="2";
	    	}else if((parseInt(velpico)>=3)&&((parseInt(velpico)<=4))){
				tipoestenosisValvulaProtesicaAorta[2]="3";
	    	}else{
				tipoestenosisValvulaProtesicaAorta[2]="4";
	    	}
	    	
	    }
		
		
		break;
case 4:

		var gradientemedio= recopilarinfotextbox("gradiente_medio_valvula_aorta_protesica");
		
		
		var swgradientemedio= false;	
	    if((gradientemedio.length >0)){
			
	    	swgradientemedio=/^\d+\.?\d*$/.test(gradientemedio);
	   	         if(swgradientemedio == false){
	   	      	alert("caracter invalido en el gradiente medio de la valvula protesica aortica");
				reemplazarinfotextbox("gradiente_medio_valvula_aorta_protesica", recopilarinfotextbox("gradiente_medio_valvula_aorta_protesica").substring(0, recopilarinfotextbox("velocidad_pico_valvula_aorta_protesica").length -1));
			
		        }
	   	         
	   	    	if((gradientemedio.length >2) ){
		   	    	if(parseFloat(gradientemedio)<=0.0){
    			alert("el gradiente medio de la valvula protesica aortica no puede tener magnitud 0.0");
 				reemplazarinfotextbox("gradiente_medio_valvula_aorta_protesica", "");
 				swgradientemedio=false;
 				tipoestenosisValvulaProtesicaAorta[2]="1";
 		   }
	   	    	}
	    }else{
			tipoestenosisValvulaProtesicaAorta[2]="1";
	    }
	    
	    
	    if(swgradientemedio==true){
	    	if(parseInt(gradientemedio)<20){
				tipoestenosisValvulaProtesicaAorta[3]="2";
	    	}else if((parseInt(gradientemedio)>=20)&&((parseInt(gradientemedio)<=35))){
				tipoestenosisValvulaProtesicaAorta[3]="3";
	    	}else{
				tipoestenosisValvulaProtesicaAorta[3]="4";
	    	}
	    	
	    }
		
		
		break;
case 5:
	var vtits= recopilarinfotextbox("vtits_valvula_aorta_protesica");
	var swvtits= false;	
    if((vtits.length >0)){
		
    	swvtits=/^\d+\.?\d*$/.test(vtits);
   	         if(swvtits == false){
   	      	alert("caracter invalido en el vti ts de la valvula protesica aortica");
			reemplazarinfotextbox("vtits_valvula_aorta_protesica", recopilarinfotextbox("vtits_valvula_aorta_protesica").substring(0, recopilarinfotextbox("vtits_valvula_aorta_protesica").length -1));
		
	        }
   	         
   	      if((vtits.length >2)){
   	    	if(parseFloat(vtits)<=0.0){
			alert("el vti ts de la valvula protesica aortica no puede tener magnitud 0.0");
				reemplazarinfotextbox("vtits_valvula_aorta_protesica", "");
				reemplazarinfotextbox("dvi_valvula_aorta_protesica", "");
				reemplazarinfotextbox("area_efectiva_valvula_aorta_protesica", "");
				
			
				tipoestenosisValvulaProtesicaAorta[4]="1";
				tipoestenosisValvulaProtesicaAorta[5]="1";
				swvtits=false;
		   }
    }
    }else{
    	reemplazarinfotextbox("dvi_valvula_aorta_protesica", "");
		reemplazarinfotextbox("area_efectiva_valvula_aorta_protesica", "");
    	tipoestenosisValvulaProtesicaAorta[4]="1";
		tipoestenosisValvulaProtesicaAorta[5]="1";
    	
    }
    
    
	var vti= recopilarinfotextbox("vti_valvula_aorta_protesica");
	var swvti= false;	
    if((vti.length >0)){
		
    	swvti=/^\d+\.?\d*$/.test(vti);
   	         if(swvti == false){
   	      	alert("caracter invalido en el vti de la valvula protesica aortica");
			reemplazarinfotextbox("vti_valvula_aorta_protesica", recopilarinfotextbox("vti_valvula_aorta_protesica").substring(0, recopilarinfotextbox("vti_valvula_aorta_protesica").length -1));
		
	        }
   	         
   	      if((vti.length >2)){
   	    	if(parseFloat(vti)<=0.0){
		  	alert("el vti de la valvula protesica aortica no puede tener magnitud 0");
				reemplazarinfotextbox("vti_valvula_aorta_protesica", "");
				reemplazarinfotextbox("dvi_valvula_aorta_protesica", "");
				reemplazarinfotextbox("area_efectiva_valvula_aorta_protesica", "");
				
			
				tipoestenosisValvulaProtesicaAorta[4]="1";
				tipoestenosisValvulaProtesicaAorta[5]="1";
				swvti=false;
		   }
    }
    
	}else{
	    	reemplazarinfotextbox("dvi_valvula_aorta_protesica", "");
			reemplazarinfotextbox("area_efectiva_valvula_aorta_protesica", "");
	    	tipoestenosisValvulaProtesicaAorta[4]="1";
			tipoestenosisValvulaProtesicaAorta[5]="1";
	    	
	    }
	var radio= recopilarinfotextbox("radio_valvula_aorta_protesica");
	var swradio= false;	
    if((radio.length >0)){
		
    	swradio=/^\d+\.?\d*$/.test(radio);
   	         if(swradio == false){
   	      	alert("caracter invalido en el radio de la valvula protesica aortica");
			reemplazarinfotextbox("radio_valvula_aorta_protesica", recopilarinfotextbox("radio_valvula_aorta_protesica").substring(0, recopilarinfotextbox("radio_valvula_aorta_protesica").length -1));
		
	        }
   	         
   	      if((radio.length >2)){
   	    	if(parseFloat(radio)<=0.0){
			alert("el radio de la valvula protesica aortica no puede tener magnitud 0");
				reemplazarinfotextbox("radio_valvula_aorta_protesica", "");
				reemplazarinfotextbox("csa_valvula_aorta_protesica", "");
				reemplazarinfotextbox("area_efectiva_valvula_aorta_protesica", "");
				tipoestenosisValvulaProtesicaAorta[5]="1";
				swradio=false;
		   }
   	      }
    }else{
	reemplazarinfotextbox("csa_valvula_aorta_protesica", "");
	reemplazarinfotextbox("area_efectiva_valvula_aorta_protesica", "");
	tipoestenosisValvulaProtesicaAorta[5]="1";
    	
    }
    var swdvi = false;
    var swcsa=false;
    var dvi=0;
    var csa=0;

    if(swvtits == true){
    	if(swvti == true){
    		dvi = parseFloat(parseInt(vtits)/parseInt(vti));
    		reemplazarinfotextbox("dvi_valvula_aorta_protesica", dvi);
    		if(parseFloat(dvi)>= 0.30 ){
    			tipoestenosisValvulaProtesicaAorta[4]="2";
    		}else if((parseFloat(dvi)< 0.30 )&&(parseFloat(dvi)>= 0.25)){
    			tipoestenosisValvulaProtesicaAorta[4]="3";
    		}else{
    			tipoestenosisValvulaProtesicaAorta[4]="4";
    		}
    		
    		swdvi =true;
    		
    	}

    }
    
    if(swradio ==true){
    	
    	csa = parseFloat(Math.PI * parseInt(radio)*parseInt(radio));
    	reemplazarinfotextbox("csa_valvula_aorta_protesica", csa);
    	swcsa=true;
    }
    
    
    if(swdvi == true){
    	if(swcsa == true){
    		var area = Math.round( parseFloat(parseFloat(dvi)*parseFloat(csa)*100)/100);
    		reemplazarinfotextbox("area_efectiva_valvula_aorta_protesica", area);
    		if(parseFloat(area)> 1.2){
    			tipoestenosisValvulaProtesicaAorta[5]="2";
    		}else if((parseFloat(area)<= 1.2 )&&(parseFloat(area)>= 0.8)){
    			tipoestenosisValvulaProtesicaAorta[5]="3";
    		}else{
    			tipoestenosisValvulaProtesicaAorta[5]="4";
    		}

    	}

    }
    
    
    
    
	
	break;
	}
	
	valvulas_protesicas_generar_informe();
}




var tipoestenosisValvulaProtesicaMitral= new Array();
function valvula_mitral_protesica_control_formulario(opcion){
	
	switch(opcion){
	
	case 0:
		
		if(recopilarindexCombobox("protesis_valvula_protesica_mitral")==0){
			swProtesisValvulaMitral=false;
			reemplazarindexCombobox("protesis_valvula_protesica_mitral", 1);
			desaparecerElemento("analisis_"+nombre_valvulas[indice_clave_sector_valvula]+"_protesica");
			desaparecerElemento("analisis_"+nombre_valvulas[indice_clave_sector_valvula]+"_protesica2");
			aparecerElemento("analisis_"+nombre_valvulas[indice_clave_sector_valvula]+"_normal");
			reiniciarRadiosButtons("aspecto_protesis_"+nombre_valvulas[indice_clave_sector_valvula],"0");
			
		}
		
		
		break;
	case 1:
		tipoestenosisValvulaProtesicaMitral[0]= recopilarValueCombobox("tiempo_de_hemipresion_valvula_mitral_protesica");
		
		
		break;
		
	case 2:
		
		var velpico= recopilarinfotextbox("velocidad_pico_valvula_mitral_protesica");
		var swvelpico= false;	
	    if((velpico.length >0)){
			
	    	swvelpico=/^\d+\.?\d*$/.test(velpico);
	   	         if(swvelpico == false){
	   	      	alert("caracter invalido en la velocidad pico de la valvula protesica mitral");
				reemplazarinfotextbox("velocidad_pico_valvula_mitral_protesica", recopilarinfotextbox("velocidad_pico_valvula_mitral_protesica").substring(0, recopilarinfotextbox("velocidad_pico_valvula_mitral_protesica").length -1));
			
		        }
	   	   if(velpico.length > 2){
	   	      if(parseFloat(velpico) <=0.0 ){
    			alert("velocidad pico de la valvula protesica mitral no puede tener magnitud 0.0");
 				reemplazarinfotextbox("velocidad_pico_valvula_mitral_protesica", "");
 				swvelpico=false;
 				tipoestenosisValvulaProtesicaMitral[1]="1";
	   	      }
 		   }
	    }else{
				tipoestenosisValvulaProtesicaMitral[1]="1";
	    }
	    
	    
	    if(swvelpico==true){
	    	if(parseFloat(velpico)<1.9){
	    		tipoestenosisValvulaProtesicaMitral[1]="2";
	    	}else if((parseFloat(velpico)>=1.9)&&((parseFloat(velpico)<=2.5))){
	    		tipoestenosisValvulaProtesicaMitral[1]="3";
	    	}else{
	    		tipoestenosisValvulaProtesicaMitral[1]="4";
	    	}
	    	
	    }
		
		
		
		
		
		break;
	case 3:
		
		var gradientemedio= recopilarinfotextbox("gradiente_medio_valvula_mitral_protesica");
		var swgradientemedio= false;	
	    if((gradientemedio.length >0)){
			
	    	swgradientemedio=/^\d+\.?\d*$/.test(gradientemedio);
	   	         if(swgradientemedio == false){
	   	      	alert("caracter invalido en el gradiente medio de la valvula protesica mitral");
				reemplazarinfotextbox("gradiente_medio_valvula_mitral_protesica", recopilarinfotextbox("gradiente_medio_valvula_mitral_protesica").substring(0, recopilarinfotextbox("gradiente_medio_valvula_mitral_protesica").length -1));
			
		        }
	   	         
	   	      if((gradientemedio.length >2)){
	   	    	 if(parseFloat(gradientemedio) <=0.0 ){
    			alert("el gradiente medio de la valvula protesica mitral no puede tener magnitud 0.0");
 				reemplazarinfotextbox("gradiente_medio_valvula_mitral_protesica", "");
 				swgradientemedio=false;
 				tipoestenosisValvulaProtesicaMitral[2]="1";
 		   }
	    }
	    }else{
				tipoestenosisValvulaProtesicaMitral[2]="1";
	    }
	    
	    
	    if(swgradientemedio==true){
	    	if(parseInt(gradientemedio)<=5){
	    		tipoestenosisValvulaProtesicaMitral[2]="2";
	    	}else if((parseInt(gradientemedio)>=6)&&((parseInt(gradientemedio)<=10))){
	    		tipoestenosisValvulaProtesicaMitral[2]="3";
	    	}else{
	    		tipoestenosisValvulaProtesicaMitral[2]="4";
	    	}
	    	
	    }
	
		
		break;
	case 4:
		
		var vtits= recopilarinfotextbox("vtits_valvula_mitral_protesica");
		var swvtits= false;	
	    if((vtits.length >0)){
			
	    	swvtits=/^\d+\.?\d*$/.test(vtits);
	   	         if(swvtits == false){
	   	      	alert("caracter invalido en el vti ts de la valvula protesica mitral");
				reemplazarinfotextbox("vtits_valvula_mitral_protesica", recopilarinfotextbox("vtits_valvula_mitral_protesica").substring(0, recopilarinfotextbox("vtits_valvula_mitral_protesica").length -1));
			
		        }
	   	         
	   	      if((vtits.length >2)){
	   	    	if(parseFloat(vtits) <=0.0 ){
				alert("el vti ts de la valvula protesica mitral no puede tener magnitud 0.0");
					reemplazarinfotextbox("vtits_valvula_mitral_protesica", "");
					reemplazarinfotextbox("dvi_valvula_mitral_protesica", "");
					reemplazarinfotextbox("eoa_valvula_mitral_protesica", "");
					
				
					tipoestenosisValvulaProtesicaMitral[3]="1";
					tipoestenosisValvulaProtesicaMitral[4]="1";
					swvtits=false;
			   }
	    }
	    }else{
			reemplazarinfotextbox("dvi_valvula_mitral_protesica", "");
			reemplazarinfotextbox("eoa_valvula_mitral_protesica", "");
			tipoestenosisValvulaProtesicaMitral[3]="1";
			tipoestenosisValvulaProtesicaMitral[4]="1";
	    }
	    
	    
		var vti= recopilarinfotextbox("vti_valvula_mitral_protesica");
		var swvti= false;	
	    if((vti.length >0)){
			
	    	swvti=/^\d+\.?\d*$/.test(vti);
	   	         if(swvti == false){
	   	      	alert("caracter invalido en el vti de la valvula protesica mitral");
				reemplazarinfotextbox("vti_valvula_mitral_protesica", recopilarinfotextbox("vti_valvula_mitral_protesica").substring(0, recopilarinfotextbox("vti_valvula_mitral_protesica").length -1));
			
		        }
	   	         
	   	      if((vti.length >2)){
	   	    	if(parseFloat(vti) <=0.0 ){
				alert("el vti de la valvula protesica mitral no puede tener magnitud 0.0");
					reemplazarinfotextbox("vti_valvula_mitral_protesica", "");
					reemplazarinfotextbox("dvi_valvula_mitral_protesica", "");
					reemplazarinfotextbox("eoa_valvula_mitral_protesica", "");
					
					tipoestenosisValvulaProtesicaMitral[3]="1";
					tipoestenosisValvulaProtesicaMitral[4]="1";
					swvti=false;
			   }
	    }
	    }else{
				reemplazarinfotextbox("dvi_valvula_mitral_protesica", "");
				reemplazarinfotextbox("eoa_valvula_mitral_protesica", "");
				tipoestenosisValvulaProtesicaMitral[3]="1";
				tipoestenosisValvulaProtesicaMitral[4]="1";
	    }
	    
		var radio= recopilarinfotextbox("radio_valvula_mitral_protesica");
		var swradio= false;	
	    if((radio.length >0)){
			
	    	swradio=/^\d+\.?\d*$/.test(radio);
	   	         if(swradio == false){
	   	      	alert("caracter invalido en el radio de la valvula protesica aortica");
				reemplazarinfotextbox("radio_valvula_mitral_protesica", recopilarinfotextbox("radio_valvula_mitral_protesica").substring(0, recopilarinfotextbox("radio_valvula_mitral_protesica").length -1));
			
		        }
	   	         
	   	      if((radio.length >2)){
	   	    	if(parseFloat(radio) <=0.0 ){
				alert("el radio de la valvula protesica aortica no puede tener magnitud 0");
					reemplazarinfotextbox("radio_valvula_mitral_protesica", "");
					reemplazarinfotextbox("csa_valvula_mitral_protesica", "");
					reemplazarinfotextbox("eoa_valvula_mitral_protesica", "");
					tipoestenosisValvulaProtesicaMitral[4]="1";
					swradio=false;
			   }
	    }
	    }else{
			reemplazarinfotextbox("csa_valvula_mitral_protesica", "");
			reemplazarinfotextbox("eoa_valvula_mitral_protesica", "");
			tipoestenosisValvulaProtesicaMitral[4]="1";
	    	
	    }
	    var swdvi = false;
	    var swcsa=false;
	    var dvi=0;
	    var csa=0;
	    
	    
	    
	    if(swvtits == true){
	    	if(swvti == true){
	    		
	    		dvi = parseFloat(parseInt(vtits)/parseInt(vti));
	    		reemplazarinfotextbox("dvi_valvula_mitral_protesica", dvi);
	    		if(parseFloat(dvi)< 2.2 ){
	    			tipoestenosisValvulaProtesicaAorta[3]="2";
	    		}else if((parseFloat(dvi)>= 2.2 )&&(parseFloat(dvi)<= 2.5)){
	    			tipoestenosisValvulaProtesicaAorta[3]="3";
	    		}else{
	    			tipoestenosisValvulaProtesicaAorta[3]="4";
	    		}
	    		
	    		swdvi =true;
	    		
	    	}

	    }
	    
	    if(swradio ==true){
	    	
	    	csa = parseFloat(Math.PI * parseInt(radio)*parseInt(radio));
	    	reemplazarinfotextbox("csa_valvula_mitral_protesica", csa);
	    	swcsa=true;
	    }
	    
	    
	    if(swdvi == true){
	    	if(swcsa == true){
	    	
	    		var eoa = 	 Math.round( parseFloat(parseFloat(dvi)*parseFloat(csa)*100)/100);
	    		reemplazarinfotextbox("eoa_valvula_mitral_protesica", eoa);
	    		if(parseFloat(eoa)>= 2.0){
	    			tipoestenosisValvulaProtesicaMitral[4]="2";
	    		}else if((parseFloat(eoa)< 2.0 )&&(parseFloat(eoa)>= 1.0)){
	    			tipoestenosisValvulaProtesicaMitral[4]="3";
	    		}else{
	    			tipoestenosisValvulaProtesicaMitral[4]="4";
	    		}

	    	}

	    }
	    
	    
	    
		
		
		break;
	}
	
	valvulas_protesicas_generar_informe();
}

var tipoestenosisValvulaProtesicaTricuspidea= new Array();
function valvula_tricuspidea_protesica_control_formulario(opcion){

	switch(opcion){
	
	case 0:
		
		if(recopilarindexCombobox("protesis_valvula_protesica_tricuspidea")==0){
			swProtesisValvulaTricuspidea=false;
			reemplazarindexCombobox("protesis_valvula_protesica_tricuspidea", 1);
			desaparecerElemento("analisis_"+nombre_valvulas[indice_clave_sector_valvula]+"_protesica");
			desaparecerElemento("analisis_"+nombre_valvulas[indice_clave_sector_valvula]+"_protesica2");
			aparecerElemento("analisis_"+nombre_valvulas[indice_clave_sector_valvula]+"_normal");
			reiniciarRadiosButtons("aspecto_protesis_"+nombre_valvulas[indice_clave_sector_valvula],"0");
		}
		
		
		break;
	
	case 1:
		
	
		var velpico= recopilarinfotextbox("velocidad_pico_valvula_tricuspidea_protesica");
		var swvelpico= false;	
	    if((velpico.length >0)){
			
	    	swvelpico=/^\d+\.?\d*$/.test(velpico);
	   	         if(swvelpico == false){
	   	      	alert("caracter invalido en la velocidad pico de la valvula protesica tricuspide");
				reemplazarinfotextbox("velocidad_pico_valvula_tricuspidea_protesica", recopilarinfotextbox("velocidad_pico_valvula_tricuspidea_protesica").substring(0, recopilarinfotextbox("velocidad_pico_valvula_tricuspidea_protesica").length -1));
			
		        }
	   	   if(velpico.length > 2){
	   	      if(parseFloat(velpico) <=0.0 ){
    			alert("velocidad pico de la valvula protesica tricuspide no puede tener magnitud 0");
 				reemplazarinfotextbox("velocidad_pico_valvula_tricuspidea_protesica", "");
 				swvelpico=false;
 				tipoestenosisValvulaProtesicaTricuspidea[0]="1";
	   	      }
 		   }
	    }else{
	    	tipoestenosisValvulaProtesicaTricuspidea[0]="1";
	    }
	    
	    
	    if(swvelpico==true){
	    	if(parseFloat(velpico)>1.7){
	    		tipoestenosisValvulaProtesicaTricuspidea[0]="5";
	    	
	    	}else{
	    		tipoestenosisValvulaProtesicaTricuspidea[0]="1";
	    	}
	    	
	    }
		
		break;
	case 2:
		var gradientemedio= recopilarinfotextbox("gradiente_medio_valvula_tricuspidea_protesica");
		var swgradientemedio= false;	
	    if((gradientemedio.length >0)){
			
	    	swgradientemedio=/^\d+\.?\d*$/.test(gradientemedio);
	   	if(swgradientemedio == false){
	   	      	alert("caracter invalido en el gradiente medio de la valvula protesica tricuspide");
				reemplazarinfotextbox("gradiente_medio_valvula_tricuspidea_protesica", recopilarinfotextbox("gradiente_medio_valvula_tricuspidea_protesica").substring(0, recopilarinfotextbox("gradiente_medio_valvula_tricuspidea_protesica").length -1));
			
		        }
	   	         
	    if((gradientemedio.length >2)){
	    	 if(parseFloat(gradientemedio) <=0.0 ){
    			alert("el gradiente medio de la valvula protesica tricuspide no puede tener magnitud 0.0");
 				reemplazarinfotextbox("gradiente_medio_valvula_tricuspidea_protesica", "");
 				swgradientemedio=false;
	    		tipoestenosisValvulaProtesicaTricuspidea[1]="1";
 		   }
	    }
	    }else{
	    	tipoestenosisValvulaProtesicaTricuspidea[1]="1";
	    }

	    if(swgradientemedio==true){
	    	if(parseInt(gradientemedio)>=6){
	    		tipoestenosisValvulaProtesicaTricuspidea[1]="5";
	    	}else{
	    		tipoestenosisValvulaProtesicaTricuspidea[1]="1";
	    	}
	    	
	    }
		
		break;
		
	case 3:
		var tiempohemipresion= recopilarinfotextbox("tiempo_de_hemipresion_valvula_tricuspidea_protesica");
		var swtiempohemipresion= false;	
	    if((tiempohemipresion.length >0)){
			
	    	swtiempohemipresion=/^\d+\.?\d*$/.test(tiempohemipresion);
	   	         if(swtiempohemipresion == false){
	   	      	alert("caracter invalido en el tiempo de hemipresion de la valvula protesica tricuspide");
				reemplazarinfotextbox("tiempo_de_hemipresion_valvula_tricuspidea_protesica", recopilarinfotextbox("tiempo_de_hemipresion_valvula_tricuspidea_protesica").substring(0, recopilarinfotextbox("tiempo_de_hemipresion_valvula_tricuspidea_protesica").length -1));
			
		        }
	   	         
	   	      if((tiempohemipresion.length >2)){
	   	    	if(parseFloat(tiempohemipresion) <=0.0 ){
    			alert("el tiempo de hemipresion de la valvula protesica tricuspide no puede tener magnitud 0.0");
 				reemplazarinfotextbox("tiempo_de_hemipresion_valvula_tricuspidea_protesica", "");
 				swtiempohemipresion=false;
	    		tipoestenosisValvulaProtesicaTricuspidea[2]="1";
 		   }
	    }
	    }else{
	    	tipoestenosisValvulaProtesicaTricuspidea[2]="1";
	    }
	    
	    
	    if(swtiempohemipresion==true){
	    	if(parseInt(tiempohemipresion)>=230){
	    		tipoestenosisValvulaProtesicaTricuspidea[2]="5";
	    	}else{
	    		tipoestenosisValvulaProtesicaTricuspidea[2]="1";
	    	}
	    	
	    }
		
		break;
	
	}
	
	valvulas_protesicas_generar_informe();
	
}
var tipoestenosisValvulaProtesicaPulmonal= new Array();
function valvula_pulmonal_protesica_control_formulario(opcion){
	
	switch(opcion){
	
	case 0:
		
		if(recopilarindexCombobox("protesis_valvula_protesica_pulmonal")==0){
			swProtesisValvulaPulmonal=false;
			reemplazarindexCombobox("protesis_valvula_protesica_pulmonal", 1);
			desaparecerElemento("analisis_"+nombre_valvulas[indice_clave_sector_valvula]+"_protesica");
			desaparecerElemento("analisis_"+nombre_valvulas[indice_clave_sector_valvula]+"_protesica2");
			aparecerElemento("analisis_"+nombre_valvulas[indice_clave_sector_valvula]+"_normal");
			reiniciarRadiosButtons("aspecto_protesis_"+nombre_valvulas[indice_clave_sector_valvula],"0");
		}
		
		
		break;
	case 1:
		var velpico= recopilarinfotextbox("velocidad_pico_valvula_pulmonal_protesica");
		var swvelpico= false;	
	    if((velpico.length >0)){
			
	    	swvelpico=/^\d+\.?\d*$/.test(velpico);
	   	         if(swvelpico == false){
	   	      	alert("caracter invalido en la velocidad pico de la valvula protesica pulmonar");
				reemplazarinfotextbox("velocidad_pico_valvula_pulmonal_protesica", recopilarinfotextbox("velocidad_pico_valvula_pulmonal_protesica").substring(0, recopilarinfotextbox("velocidad_pico_valvula_pulmonal_protesica").length -1));
			
		        }
	   	
	   	      if((velpico.length >2)){
	   	    	if(parseFloat(velpico) <=0.0 ){
    			alert("velocidad pico de la valvula protesica pulmonar no puede tener magnitud 0.0");
 				reemplazarinfotextbox("velocidad_pico_valvula_pulmonal_protesica", "");
 				swvelpico=false;
 				tipoestenosisValvulaProtesicaPulmonal[0]="1";
	   	      }
	    }
	    }else{
	    	tipoestenosisValvulaProtesicaPulmonal[0]="1";
	    }
	    
	    
	    if(swvelpico==true){
	    	if(parseInt(velpico)>2){
	    		tipoestenosisValvulaProtesicaPulmonal[0]="5";
	    	
	    	}else{
	    		tipoestenosisValvulaProtesicaPulmonal[0]="1";
	    	}
	    	
	    }
		break;
	case 2:

		if(parseInt(recopilarinfoRadios("engrosado_valvula_pulmonal_protesica"))>0){
			tipoestenosisValvulaProtesicaPulmonal[1]="5";
		}else{
			tipoestenosisValvulaProtesicaPulmonal[1]="1";
		}
		
		
    break;
	case 3:
		if(parseInt(recopilarinfoRadios("estrechamiento_valvula_pulmonal_protesica"))>0){
			tipoestenosisValvulaProtesicaPulmonal[2]="5";
		}else{
			tipoestenosisValvulaProtesicaPulmonal[2]="1";
		}
		
		
    break;
	
	case 4:
		if(parseInt(recopilarinfoRadios("estudios_seriados_valvula_pulmonal_protesica"))>0){
			tipoestenosisValvulaProtesicaPulmonal[3]="5";
		}else{
			tipoestenosisValvulaProtesicaPulmonal[3]="1";
		}
		
		
    break;
	
	case 5:
		if(parseInt(recopilarinfoRadios("disfuncion_seriados_valvula_pulmonal_protesica"))>0){
			tipoestenosisValvulaProtesicaPulmonal[4]="5";
		}else{
			tipoestenosisValvulaProtesicaPulmonal[4]="1";
		}
		
		
    break;
	}
	
	valvulas_protesicas_generar_informe();
}
function valvulas_protesicas_generar_informe(){
	
	var cadena_resultado_valvula_protesica="Pr\u00F3tesis "+recopilarTextCombobox("protesis_valvula_protesica_"+nombre_tecnico_valvulas[indice_clave_sector_valvula])+" ";

	switch(indice_clave_sector_valvula){
	
	case 0:
		cadena_resultado_valvula_protesica += "a\u00F3rtica con par\u00E1metros doppler sugestivos de funcionamiento ";
		cadena_resultado_valvula_protesica += ver_severidad_insuficiencias_estenosis(tipoestenosisValvulaProtesicaAorta,"protesica");
		break;
		
	case 1:
		cadena_resultado_valvula_protesica += "mitral con par\u00E1metros doppler sugestivos de funcionamiento ";
		cadena_resultado_valvula_protesica += ver_severidad_insuficiencias_estenosis(tipoestenosisValvulaProtesicaMitral,"protesica");
		break;
		
	case 2:
		cadena_resultado_valvula_protesica += "tric\u00FAspide con par\u00E1metros doppler sugestivos de funcionamiento ";
		cadena_resultado_valvula_protesica += ver_severidad_insuficiencias_estenosis(tipoestenosisValvulaProtesicaTricuspidea,"protesica");
		break;
		
	case 3:
		cadena_resultado_valvula_protesica += "pulmonar con par\u00E1metros doppler sugestivos de funcionamiento ";
		cadena_resultado_valvula_protesica += ver_severidad_insuficiencias_estenosis(tipoestenosisValvulaProtesicaPulmonal,"protesica");
		break;
	
	}
	
	
	if(parseInt(recopilarinfoRadios("regurgitacion_paravalvular_"+nombre_valvulas[indice_clave_sector_valvula]+"_protesica"))>0){
		cadena_resultado_valvula_protesica += ", se observa regurgitaci\u00F3n paravalvular";
		
	}
	cadena_resultado_valvula_protesica += ".";
	reemplazarinfotextbox("analisis_observaciones_"+nombre_tecnico_valvulas[indice_clave_sector_valvula]+"_protesica", cadena_resultado_valvula_protesica);
	vistapreviaFormularios();
}


function valvulas_control_formulario_insuficiencia_aorta(opcion){
	
	switch (opcion){
	case 0:
		
		insuficiencia_aorta[opcion]= recopilarValueCombobox("insuficiencia_jetcentrallvot_valvula_aorta");
		break;
	case 1:
		insuficiencia_aorta[opcion]= recopilarValueCombobox("insuficiencia_venacontracta_valvula_aorta");
		break;
	case 2:
		insuficiencia_aorta[opcion]= recopilarValueCombobox("insuficiencia_revflujodiastolico_valvula_aorta");
		break;
	case 3:
		insuficiencia_aorta[opcion]= recopilarValueCombobox("insuficiencia_tiempohemipresion_valvula_aorta");
		break;
	case 4: //eroa
		var swradiopisa=false;
		var swradiopisamm=false;
		var swvelaliasing=false;
		var swvelaliasingm=false;
		var swvelpicojet=false;
		var swvelpicojetm=false;
		var radiopisa=recopilarinfotextbox('insuficiencia_radiopisa_valvula_aorta');
		var radiopisamm=recopilarinfotextbox('insuficiencia_radiopisa_valvula_aorta_mm');
		var velaliasing=recopilarinfotextbox('insuficiencia_velaliasing_valvula_aorta');
		var velaliasingm=recopilarinfotextbox('insuficiencia_velaliasing_valvula_aorta_m');
		var velpicojet=recopilarinfotextbox('insuficiencia_velpicojetregurgitacion_valvula_aorta');
		var velpicojetm=recopilarinfotextbox('insuficiencia_velpicojetregurgitacion_valvula_aorta_m');
		
		

		if(radiopisa.length > 0){
			swradiopisa=/^\d+\.?\d*$/.test(radiopisa);
			if(swradiopisa == false){
				//alert("caracter invalido en el radio pisa de la valvula aorta cm");
				reemplazarinfotextbox("insuficiencia_radiopisa_valvula_aorta", "");
			}
			if(radiopisa.length > 2){
			   if(parseFloat(radiopisa) <=0.0 ){
				   
    			    alert("el radiopisa de la valvula aorta no puede tener magnitud 0");
    				reemplazarinfotextbox("insuficiencia_radiopisa_valvula_aorta", "");
    	    		reemplazarinfotextbox("insuficiencia_eroa_valvula_aorta", "");
    	    		insuficiencia_aorta[opcion]="1";
    	    		swradiopisa = false;
    		   }else{
    			   swradiopisa = true;   
    		   }
			}
		}else{
			reemplazarinfotextbox("insuficiencia_eroa_valvula_aorta", "");
			  insuficiencia_aorta[opcion]="1";
		}
		
		//radio pisa mm
		if(radiopisamm.length > 0){
			swradiopisamm=/^\d+\.?\d*$/.test(radiopisamm);
			if(swradiopisamm == false){
				//alert("caracter invalido en el radio pisa de la valvula aorta mm");
				reemplazarinfotextbox("insuficiencia_radiopisa_valvula_aorta_mm", "");
			}
			if(radiopisamm.length > 2){
			   if(parseFloat(radiopisamm) <=0.0 ){
				   
    			    alert("el radiopisa de la valvula aorta no puede tener magnitud 0");
    				reemplazarinfotextbox("insuficiencia_radiopisa_valvula_aorta_mm", "");
    	    		reemplazarinfotextbox("insuficiencia_eroa_valvula_aorta_mm", "");
    	    		insuficiencia_aorta[opcion]="1";
    	    		swradiopisamm = false;
    		   }else{
    			   
    			   swradiopisamm = true;
    			   
    		   }
			}
		}else{

			   
			reemplazarinfotextbox("insuficiencia_eroa_valvula_aorta", "");
			  insuficiencia_aorta[opcion]="1";
		}

		
		
	    if((velaliasing.length >0)){
		
	    	swvelaliasing=/^\d+\.?\d*$/.test(velaliasing);
	   	         if(swvelaliasing == false){
	   	      	//alert("caracter invalido en la velocidad de aliasing de la valvula aorta");
				reemplazarinfotextbox("insuficiencia_velaliasing_valvula_aorta", "");
			
		        }
	   	         
	   	      if(velaliasing.length > 2){
				   if(parseFloat(velaliasing) <=0.0 ){
				   
				     alert("la velocidad de aliasing de la valvula aorta no puede tener magnitud 0");
 				reemplazarinfotextbox("insuficiencia_velaliasing_valvula_aorta", "");
 	    		reemplazarinfotextbox("insuficiencia_eroa_valvula_aorta", "");
 	    		swvelaliasing=false;
 	    		  insuficiencia_aorta[opcion]="1";
 		   }else{
 			  swvelaliasing=true;
 		     }
	   	    }
	    }
	    else{
	    	reemplazarinfotextbox("insuficiencia_eroa_valvula_aorta", "");
	    	  insuficiencia_aorta[opcion]="1";
	    }
	    
	    
	    //(velaliasingm
	    if((velaliasingm.length >0)){
			
	    	swvelaliasingm=/^\d+\.?\d*$/.test(velaliasingm);
	   	         if(swvelaliasingm == false){
	   	      	//alert("caracter invalido en la velocidad de aliasing de la valvula aorta");
				reemplazarinfotextbox("insuficiencia_velaliasing_valvula_aorta_m", "");
			
		        }
	   	         
	   	      if(velaliasingm.length > 2){
				   if(parseFloat(velaliasingm) <=0.0 ){
					   
	    			    alert("el radiopisa de la valvula aorta no puede tener magnitud 0");
	    				reemplazarinfotextbox("insuficiencia_velaliasing_valvula_aorta", "");
	    	    		reemplazarinfotextbox("insuficiencia_eroa_valvula_aorta", "");
	    	    		swvelaliasingm=false;
	   	    		  insuficiencia_aorta[opcion]="1";
	    		   }else{
	    			   swvelaliasingm=true;
	    		   }
	   	      }
	    }
	    else{
	    	reemplazarinfotextbox("insuficiencia_eroa_valvula_aorta", "");
	    	  insuficiencia_aorta[opcion]="1";
	    }
	    //fin (velaliasingm

	    
	    if((velpicojet.length >0)){
			
	    	swvelpicojet=/^\d+\.?\d*$/.test(velpicojet);
	   	         if(swvelpicojet == false){
	   	      	//alert("caracter invalido en la velocidad de pico del jet de la valvula aorta");
				reemplazarinfotextbox("insuficiencia_velpicojetregurgitacion_valvula_aorta", "");
			
		        }
	   	      if(velpicojet.length > 2){
				   if(parseFloat(velpicojet) <=0.0 ){
				 alert("la velocidad pico del jet de la valvula aorta no puede tener magnitud 0");
  				reemplazarinfotextbox("insuficiencia_velpicojetregurgitacion_valvula_aorta", "");
  	    		reemplazarinfotextbox("insuficiencia_eroa_valvula_aorta", "");
  	    		swvelpicojet=false;
  	    	    insuficiencia_aorta[opcion]="1";
  		   
		   }else{
			   swvelpicojet=true;
		   }
	      }
	    }
	    else{
	    	reemplazarinfotextbox("insuficiencia_eroa_valvula_aorta", "");
	    	 insuficiencia_aorta[opcion]="1";
	    }
	    
	    
	    
	    //velpicojetm
       if((velpicojetm.length >0)){
			
	    	swvelpicojetm=/^\d+\.?\d*$/.test(velpicojetm);
	   	         if(swvelpicojetm == false){
	   	      	//alert("caracter invalido en la velocidad de pico del jet de la valvula aorta");
				reemplazarinfotextbox("insuficiencia_velpicojetregurgitacion_valvula_aorta_m", "");
			
		        }
	   	         
	   	         
	   	      if(velpicojetm.length > 2){
				   if(parseFloat(velpicojetm) <=0.0 ){
					   
					   alert("la velocidad pico del jet de la valvula aorta no puede tener magnitud 0");
		  				reemplazarinfotextbox("insuficiencia_velpicojetregurgitacion_valvula_aorta_m", "");
		  	    		reemplazarinfotextbox("insuficiencia_eroa_valvula_aorta", "");
		  	    		swvelpicojet=false;
		  	    	    insuficiencia_aorta[opcion]="1";
	    		   }else{
	    			   swvelpicojet=true;
	    		   }
	   	      }
	    }
	   	      

	    else{
	    	reemplazarinfotextbox("insuficiencia_eroa_valvula_aorta", "");
	    	 insuficiencia_aorta[opcion]="1";
	    }
	    //fin velpicojetm
	    
	    
       if(swradiopisa==true ){
    	   if(swvelaliasing==true){
	    	   if(swvelpicojet ==true){
	    					   var eroa = parseFloat(((2*Math.PI*parseFloat(radiopisa) *parseFloat(radiopisa)*(parseInt(velaliasing)))/parseInt(velpicojet)));

                               if(eroa < 0.10){
                            	   insuficiencia_aorta[opcion]="2";
                               }else if((eroa >= 0.10)&&(eroa < 0.29)){
                            	   insuficiencia_aorta[opcion]="3";
                               }
                               else{
                            	   insuficiencia_aorta[opcion]="4";
                               }
	    					   
        			    	   reemplazarinfotextbox("insuficiencia_eroa_valvula_aorta", Math.round(eroa * 100) / 100);
	    	   }

	       }

	    }
	    break;
	    
	    
	case 5:
		var swlvotd=false;
		var swlvotdmm=false;
		var swvtilvotmm= false;
		var swmad=false;
		var swmadmm=false;
		var swvtima=false;
		var swvtimamm=false;
		
		
		var lvotd = recopilarinfotextbox("insuficiencia_lvotd_valvula_aorta");
		var lvotdmm = recopilarinfotextbox("insuficiencia_lvotd_valvula_aorta_mm");
		var vtilvot = recopilarinfotextbox("insuficiencia_vtilvot_valvula_aorta");
		var vtilvotmm = recopilarinfotextbox("insuficiencia_vtilvot_valvula_aorta_mm");
		var mad = recopilarinfotextbox("insuficiencia_mad_valvula_aorta");
		var madmm = recopilarinfotextbox("insuficiencia_mad_valvula_aorta_mm");
		var vtima = recopilarinfotextbox("insuficiencia_vtima_valvula_aorta");
		var vtimamm = recopilarinfotextbox("insuficiencia_vtima_valvula_aorta_mm");
		

		if(lvotd.length > 0){
			swlvotd=/^\d+\.?\d*$/.test(lvotd);
			if(swlvotd == false){
				//alert("caracter invalido en el lvotd de la valvula aorta");
				reemplazarinfotextbox("insuficiencia_lvotd_valvula_aorta","");
			}
			if(lvotd.length > 2){
				if(parseFloat(lvotd) <=0.0 ){
					   swlvotd=false;
					alert("el lvotd de la valvula aorta no puede tener magnitud 0");
						reemplazarinfotextbox("insuficiencia_lvotd_valvula_aorta", "");
						reemplazarinfotextbox("insuficiencia_rvol_valvula_aorta", "");
						reemplazarinfotextbox("insuficiencia_fr_valvula_aorta", "");
						insuficiencia_aorta[opcion]="1";
						insuficiencia_aorta[opcion+1]="1";
						swlvotd =false;
				   }else{
					   swlvotd=true;
					   
					   }
				   }
			}
			
			   
		else{
			reemplazarinfotextbox("insuficiencia_rvol_valvula_aorta", "");
			reemplazarinfotextbox("insuficiencia_fr_valvula_aorta", "");
			insuficiencia_aorta[opcion]="1";
			insuficiencia_aorta[opcion+1]="1";
		}
		
//lvotdmm
		if(lvotdmm.length > 0){
			swlvotdmm=/^\d+\.?\d*$/.test(lvotdmm);
			if(swlvotdmm == false){
				//alert("caracter invalido en el lvotd de la valvula aorta mm");
				reemplazarinfotextbox("insuficiencia_lvotd_valvula_aorta_mm","");
			}
			if(lvotdmm.length > 2){
				if(parseFloat(lvotdmm) <=0.0 ){
					   swlvotdmm=false;
					alert("el lvotd de la valvula aorta no puede tener magnitud 0");
						reemplazarinfotextbox("insuficiencia_lvotd_valvula_aorta_mm", "");
						reemplazarinfotextbox("insuficiencia_rvol_valvula_aorta", "");
						reemplazarinfotextbox("insuficiencia_fr_valvula_aorta", "");
						insuficiencia_aorta[opcion]="1";
						insuficiencia_aorta[opcion+1]="1";
						swlvotdmm =false;
				   }else{
					   swlvotdmm=true;
					   
					   }
				   }
			}
			
			   
		else{
			reemplazarinfotextbox("insuficiencia_rvol_valvula_aorta", "");
			reemplazarinfotextbox("insuficiencia_fr_valvula_aorta", "");
			insuficiencia_aorta[opcion]="1";
			insuficiencia_aorta[opcion+1]="1";
		}
	
//fin lvotdmm		
		
		
		
	    if((vtilvot.length >0)){
		
	    	swvtilvot=/^\d+\.?\d*$/.test(vtilvot);
	   	         if(swvtilvot == false){
	   	      	//alert("caracter invalido en el vtilvot de la valvula aorta");
				reemplazarinfotextbox("insuficiencia_vtilvot_valvula_aorta", "");
			
		        }
	   	         
	   	      if(vtilvot.length > 2){
				   if(parseFloat(vtilvot) <=0.0 ){
				   swvtilvot=false;
	    				alert("el vtilvot de la valvula aorta no puede tener magnitud 0");
   				reemplazarinfotextbox("insuficiencia_vtilvot_valvula_aorta", "");
   				reemplazarinfotextbox("insuficiencia_rvol_valvula_aorta", "");
   				reemplazarinfotextbox("insuficiencia_fr_valvula_aorta", "");
   				insuficiencia_aorta[opcion]="1";
   				insuficiencia_aorta[opcion+1]="1";
				   
			   }else{
				   swvtilvot=true;
			   }
	   	      }
	    }
	    else{
	    	reemplazarinfotextbox("insuficiencia_rvol_valvula_aorta", "");
			reemplazarinfotextbox("insuficiencia_fr_valvula_aorta", "");
			insuficiencia_aorta[opcion]="1";
			insuficiencia_aorta[opcion+1]="1";
	    }

	    //vtilvotmm
	    
	    if((vtilvotmm.length >0)){
			
	    	swvtilvotmm=/^\d+\.?\d*$/.test(vtilvot);
	   	         if(swvtilvotmm == false){
	   	      	//alert("caracter invalido en el vtilvot de la valvula aorta");
				reemplazarinfotextbox("insuficiencia_vtilvot_valvula_aorta_mm", "");
			
		        }
	   	         
	   	      if(vtilvotmm.length > 2){
				   if(parseFloat(vtilvotmm) <=0.0 ){
				   swvtilvotmm=false;
	    				alert("el vtilvot de la valvula aorta no puede tener magnitud 0");
   				reemplazarinfotextbox("insuficiencia_vtilvot_valvula_aorta_mm", "");
   				reemplazarinfotextbox("insuficiencia_rvol_valvula_aorta", "");
   				reemplazarinfotextbox("insuficiencia_fr_valvula_aorta", "");
   				insuficiencia_aorta[opcion]="1";
   				insuficiencia_aorta[opcion+1]="1";
				   
			   }else{
				   swvtilvotmm=true;
			   }
	   	      }
	    }
	    else{
	    	reemplazarinfotextbox("insuficiencia_rvol_valvula_aorta", "");
			reemplazarinfotextbox("insuficiencia_fr_valvula_aorta", "");
			insuficiencia_aorta[opcion]="1";
			insuficiencia_aorta[opcion+1]="1";
	    }
	    
	    //fin vtilvot
	    

	    
	    
		/*	if(radiopisa.length > 0){
		swradiopisa=/^\d+\.?\d*$/.test(radiopisa);
		if(swradiopisa == false){
			alert("caracter invalido en el radio pisa de la valvula aorta");
			reemplazarinfotextbox("insuficiencia_radiopisa_valvula_aorta", recopilarinfotextbox("insuficiencia_radiopisa_valvula_aorta").substring(0, recopilarinfotextbox("insuficiencia_radiopisa_valvula_aorta").length -1));
		}
		if(radiopisa.length > 2){
		   if(parseFloat(radiopisa) <=0.0 ){
			   
			    alert("el radiopisa de la valvula aorta no puede tener magnitud 0");
				reemplazarinfotextbox("insuficiencia_radiopisa_valvula_aorta", "");
	    		reemplazarinfotextbox("insuficiencia_eroa_valvula_aorta", "");
	    		  insuficiencia_aorta[opcion]="1";
	    		swradiopisa = false;
		   }else{
			   swradiopisa = true;   
		   }
		}else{
			swradiopisa = false;
		}*/
	    
	    if((mad.length >0)){
			
	    	swmad=/^\d+\.?\d*$/.test(mad);
	   	         if(swmad == false){
	   	      	//alert("caracter invalido en el mad de la valvula aorta");
				reemplazarinfotextbox("insuficiencia_mad_valvula_aorta", "");
			
		        }
	   	         if(mad.length > 2){
	   	          if(parseFloat(mad) <=0.0 ){
					   
			    		swmad=false;
			    				alert("el mad de la valvula aorta no puede tener magnitud 0");
			    				reemplazarinfotextbox("insuficiencia_mad_valvula_aorta", "");
			    				reemplazarinfotextbox("insuficiencia_rvol_valvula_aorta", "");
			    				reemplazarinfotextbox("insuficiencia_fr_valvula_aorta", "");
			    				insuficiencia_aorta[opcion]="1";
			    				insuficiencia_aorta[opcion+1]="1";
						   }
	   	          else{
	   	        	swmad=true;
	   	          }
	   	         }
	   	   
	    }
	    else{
	    	reemplazarinfotextbox("insuficiencia_rvol_valvula_aorta", "");
			reemplazarinfotextbox("insuficiencia_fr_valvula_aorta", "");
			insuficiencia_aorta[opcion]="1";
			insuficiencia_aorta[opcion+1]="1";
	    }
	    
	    //madmm
	    if((madmm.length >0)){
			
	    	swmadmm=/^\d+\.?\d*$/.test(madmm);
	   	         if(swmadmm == false){
	   	      //	alert("caracter invalido en el mad de la valvula aorta mm");
				reemplazarinfotextbox("insuficiencia_mad_valvula_aorta_mm", "");
			
		        }
	   	         if(madmm.length > 2){
	   	          if(parseFloat(madmm) <=0.0 ){
					   
			    		swmadmm=false;
			    				alert("el mad de la valvula aorta no puede tener magnitud 0");
			    				reemplazarinfotextbox("insuficiencia_mad_valvula_aorta_mm", "");
			    				reemplazarinfotextbox("insuficiencia_rvol_valvula_aorta", "");
			    				reemplazarinfotextbox("insuficiencia_fr_valvula_aorta", "");
			    				insuficiencia_aorta[opcion]="1";
			    				insuficiencia_aorta[opcion+1]="1";
						   }
	   	          else{
	   	        	swmadmm=true;
	   	          }
	   	         }
	   	   
	    }
	    else{
	    	reemplazarinfotextbox("insuficiencia_rvol_valvula_aorta", "");
			reemplazarinfotextbox("insuficiencia_fr_valvula_aorta", "");
			insuficiencia_aorta[opcion]="1";
			insuficiencia_aorta[opcion+1]="1";
	    }	    
	    //fin madmm
	    
	    
	    
   if((vtima.length >0)){
			
	   swvtima=/^\d+\.?\d*$/.test(vtima);
	   	         if(swvtima == false){
	   	      	//alert("caracter invalido en la velocidad de pico del jet de la valvula aorta");
				reemplazarinfotextbox("insuficiencia_vtima_valvula_aorta", "");
			
		        }
	   	      if(vtima.length > 2){
				   if(parseFloat(vtima) <=0.0 ){
				swvtima=false;
				alert("el vtima de la valvula aorta no puede tener magnitud 0");
   				reemplazarinfotextbox("insuficiencia_vtima_valvula_aorta", "");
   				reemplazarinfotextbox("insuficiencia_rvol_valvula_aorta", "");
   				reemplazarinfotextbox("insuficiencia_fr_valvula_aorta", "");
   				insuficiencia_aorta[opcion]="1";   
   				insuficiencia_aorta[opcion+1]="1";
				   
			   }else{
				   swvtima=true;
			   }
	   	      }   
	    }
   
   
	    else{
	    	reemplazarinfotextbox("insuficiencia_rvol_valvula_aorta", "");
			reemplazarinfotextbox("insuficiencia_fr_valvula_aorta", "");
			insuficiencia_aorta[opcion]="1";
			insuficiencia_aorta[opcion+1]="1";
	    }
   
  //vtimamm
   
   if((vtimamm.length >0)){
		
	   swvtimamm=/^\d+\.?\d*$/.test(vtimamm);
	   	         if(swvtimamm == false){
	   	      	//alert("caracter invalido en la velocidad de pico del jet de la valvula aorta");
				reemplazarinfotextbox("insuficiencia_vtima_valvula_aorta_mm", "");
			
		        }
	   	      if(vtimamm.length > 2){
				   if(parseFloat(vtimamm) <=0.0 ){
				swvtimamm=false;
				alert("el vtima de la valvula aorta no puede tener magnitud 0");
   				reemplazarinfotextbox("insuficiencia_vtima_valvula_aorta_mm", "");
   				reemplazarinfotextbox("insuficiencia_rvol_valvula_aorta", "");
   				reemplazarinfotextbox("insuficiencia_fr_valvula_aorta", "");
   				insuficiencia_aorta[opcion]="1";   
   				insuficiencia_aorta[opcion+1]="1";
				   
			   }else{
				   swvtimamm=true;
			   }
	   	      }   
	    }
   
   
	    else{
	    	reemplazarinfotextbox("insuficiencia_rvol_valvula_aorta", "");
			reemplazarinfotextbox("insuficiencia_fr_valvula_aorta", "");
			insuficiencia_aorta[opcion]="1";
			insuficiencia_aorta[opcion+1]="1";
	    }
   
   //fin vtimamm
		
   /*alert("1"+swlvotd);
   alert("2"+swvtilvot);
   alert("3"+swmad);
   alert("4"+swvtima);
   */
   if(swlvotd==true){
       if(swvtilvot==true){
    	   if(swmad ==true){
    		   if(swvtima==true){
    			   
    			   
    			   
    						   var rvolaorta = parseFloat((Math.PI*(parseFloat(lvotd))*(parseFloat(lvotd)) *parseInt(vtilvot)) -(Math.PI*(parseFloat(mad))*(parseFloat(mad)) *parseInt(vtima)));
        			    	   var rfporcentaje= parseFloat(rvolaorta /(Math.PI*(parseFloat(lvotd))*(parseFloat(lvotd)) *parseInt(vtilvot)));

        			    	   if(parseFloat(rvolaorta)<30){
        			    			insuficiencia_aorta[opcion]="2";
        			    	   }else if((parseFloat(rvolaorta)>=30)&&(parseFloat(rvolaorta)>=59)){
        			    			insuficiencia_aorta[opcion]="3";
        			    	   }else{
        			    			insuficiencia_aorta[opcion]="4";
        			    	   }
        			    	   
        			    	   
        			    	   if(parseFloat(rfporcentaje)<30){
       			    			insuficiencia_aorta[opcion+1]="2";
       			    	   }else if((parseFloat(rvolaorta)>=30)&&(parseFloat(rvolaorta)>=49)){
       			    			insuficiencia_aorta[opcion+1]="3";
       			    	   }else{
       			    			insuficiencia_aorta[opcion+1]="4";
       			    	   }
                               //condiciones de severidad
        			    	   
        			    /*	   alert("rvol: "+insuficiencia_aorta[opcion]);
        			    	   alert("fr: "+insuficiencia_aorta[opcion+1]);*/
        			    	   reemplazarinfotextbox("insuficiencia_rvol_valvula_aorta", Math.round(rvolaorta * 100) / 100);
        					   reemplazarinfotextbox("insuficiencia_fr_valvula_aorta", Math.round(rfporcentaje * 100) / 100);
    				
    		  }
    	   }

       }

    }
   
   
		
		break;

}
	valvulas_generar_informe();
	
}

function valvulas_control_formulario_insuficiencia_mitral(opcion){
	
	switch(opcion){
	
	case 0:
		
		insuficiencia_mitral[opcion]= recopilarValueCombobox("insuficiencia_venacontracta_valvula_mitral");
		break;
	case 1:
		insuficiencia_mitral[opcion]= recopilarValueCombobox("insuficiencia_jetcentral_valvula_mitral");
		break;
	case 2:
		insuficiencia_mitral[opcion]= recopilarValueCombobox("insuficiencia_prolapso_valvula_mitral");
		break;
	case 3:
		insuficiencia_mitral[opcion]= recopilarValueCombobox("insuficiencia_flujovenas_valvula_mitral");
		break;
		
	case 4:
		
		insuficiencia_mitral[opcion]= recopilarValueCombobox("insuficiencia_flujotrans_valvula_mitral");
		break;
	case 5:
		insuficiencia_mitral[opcion]= recopilarValueCombobox("insuficiencia_densidadcwdoppler_valvula_mitral");
		break;
	case 6:
		insuficiencia_mitral[opcion]= recopilarValueCombobox("insuficiencia_formajetcwdoppler_valvula_mitral");
		break;
	case 7:
		insuficiencia_mitral[opcion]= recopilarValueCombobox("insuficiencia_tamventriculo_valvula_mitral");
		break;
	case 8: //eroa
		var swradiopisa=false;
		var swradiopisamm=false;
		var swvelaliasing=false;
		var swvelaliasingm=false;
		var swvelpicojet=false;
		var swvelpicojetm=false;
		var radiopisa=recopilarinfotextbox('insuficiencia_radiopisa_valvula_mitral');
		var radiopisamm=recopilarinfotextbox('insuficiencia_radiopisa_valvula_mitral_mm');
		var velaliasing=recopilarinfotextbox('insuficiencia_velaliasing_valvula_mitral');
		var velaliasingm=recopilarinfotextbox('insuficiencia_velaliasing_valvula_mitral_m');
		var velpicojet=recopilarinfotextbox('insuficiencia_velpicojetregurgitacion_valvula_mitral');
		var velpicojetm=recopilarinfotextbox('insuficiencia_velpicojetregurgitacion_valvula_mitral_m');
		
		
    	if(radiopisa.length > 0){
			swradiopisa=/^\d+\.?\d*$/.test(radiopisa);
			if(swradiopisa == false){
				//alert("caracter invalido en el radio pisa de la valvula mitral");
				reemplazarinfotextbox("insuficiencia_radiopisa_valvula_mitral", "");
			}
			
			if(radiopisa.length > 2){
				   if(parseFloat(radiopisa) <=0.0 ){
					   
	    			    alert("el radiopisa de la valvula mitral no puede tener magnitud 0");
	    				reemplazarinfotextbox("insuficiencia_radiopisa_valvula_mitral", "");
	    	    		reemplazarinfotextbox("insuficiencia_eroa_valvula_mitral", "");
	    	    		  insuficiencia_mitral[opcion]="1";
	    	    		swradiopisa = false;
	    		   }else{
	    			   swradiopisa = true;   
	    		   }
				}
			/*else{
					swradiopisa = false;
				}*/
		}else{
			reemplazarinfotextbox("insuficiencia_eroa_valvula_mitral", "");
			 insuficiencia_mitral[opcion]="1";
		}
    	
    	//radiopisamm funcion insuficiencia
    	
    	if(radiopisamm.length > 0){
			swradiopisamm=/^\d+\.?\d*$/.test(radiopisamm);
			if(swradiopisamm == false){
				//alert("caracter invalido en el radio pisa de la valvula mitral");
				reemplazarinfotextbox("insuficiencia_radiopisa_valvula_mitral_mm", "");
			}
			
			if(radiopisamm.length > 2){
				   if(parseFloat(radiopisamm) <=0.0 ){
					   
	    			    alert("el radiopisa de la valvula mitral no puede tener magnitud 0");
	    				reemplazarinfotextbox("insuficiencia_radiopisa_valvula_mitral_mm", "");
	    	    		reemplazarinfotextbox("insuficiencia_eroa_valvula_mitral", "");
	    	    		  insuficiencia_mitral[opcion]="1";
	    	    		swradiopisa = false;
	    		   }else{
	    			   swradiopisa = true;   
	    		   }
				}
			/*else{
					swradiopisa = false;
				}*/
		}else{
			reemplazarinfotextbox("insuficiencia_eroa_valvula_mitral", "");
			 insuficiencia_mitral[opcion]="1";
		}
    	
    	//
		
	    if((velaliasing.length >0)){
		
	    	swvelaliasing=/^\d+\.?\d*$/.test(velaliasing);
	   	         if(swvelaliasing == false){
	   	      	//alert("caracter invalido en la velocidad de aliasing de la valvula mitral");
				reemplazarinfotextbox("insuficiencia_velaliasing_valvula_mitral","");
			
		        }
	   	      if(velaliasing.length > 2){
				   if(parseFloat(velaliasing) <=0.0 ){
				    swvelaliasing=false;
				    alert("la velocidad de aliasing de la valvula mitral no puede tener magnitud 0");
  				reemplazarinfotextbox("insuficiencia_velaliasing_valvula_mitral", "");
  	    		reemplazarinfotextbox("insuficiencia_eroa_valvula_mitral", "");
  	    	  insuficiencia_mitral[opcion]="1";
  		   }else{
  			   swvelaliasing=true;
  		     }
	   	   }
	    }
	    else{
	    	reemplazarinfotextbox("insuficiencia_eroa_valvula_mitral", "");
	  	  insuficiencia_mitral[opcion]="1";
	    }

	    
	    //(velaliasingm
	    if((velaliasingm.length >0)){
			
	    	swvelaliasingm=/^\d+\.?\d*$/.test(velaliasingm);
	   	         if(swvelaliasingm == false){
	   	      	//alert("caracter invalido en la velocidad de aliasing de la valvula aorta");
				reemplazarinfotextbox("insuficiencia_velaliasing_valvula_mitral_m", "");
			
		        }
	   	         
	   	      if(velaliasingm.length > 2){
				   if(parseFloat(velaliasingm) <=0.0 ){
					  
					    alert("la velocidad de aliasing de la valvula mitral no puede tener magnitud 0");
	  				reemplazarinfotextbox("insuficiencia_velaliasing_valvula_mitral_m", "");
	  	    		reemplazarinfotextbox("insuficiencia_eroa_valvula_mitral", "");
	  	    		 swvelaliasingm=false;
	  	    	  insuficiencia_mitral[opcion]="1";
	    		   }else{
	    			   swvelaliasing=true;
	   	       }
	   	      }
	    }
	    else{
	    	reemplazarinfotextbox("insuficiencia_eroa_valvula_mitral", "");
		  	  insuficiencia_mitral[opcion]="1";
	    }
	    //fin (velaliasingm
	    
	    if((velpicojet.length >0)){
	    	swvelpicojet=/^\d+\.?\d*$/.test(velpicojet);
	   	         if(swvelpicojet == false){
	   	      	//alert("caracter invalido en la velocidad de pico del jet de la valvula mitral");
				reemplazarinfotextbox("insuficiencia_velpicojetregurgitacion_valvula_mitral","");
			
		        }
	   	         
	   	      if(velpicojet.length > 2){
				   if(parseFloat(velpicojet) <=0.0 ){
				
		        	swvelpicojet=false;
  				alert("la velocidad pico del jet de la valvula mitral no puede tener magnitud 0");
  				reemplazarinfotextbox("insuficiencia_velpicojetregurgitacion_valvula_mitral", "");
  	    		reemplazarinfotextbox("insuficiencia_eroa_valvula_mitral", "");
  	    	  insuficiencia_mitral[opcion]="1";
  		   }else{
  			 swvelpicojet=true;
  		      }
	   	    }
	    }else{
	    	reemplazarinfotextbox("insuficiencia_eroa_valvula_mitral", "");
	  	  insuficiencia_mitral[opcion]="1";
	    }
	    
	  
	    
	    //velpicojetm
	       if((velpicojetm.length >0)){
				
		    	swvelpicojetm=/^\d+\.?\d*$/.test(velpicojetm);
		   	         if(swvelpicojetm == false){
		   	      	//alert("caracter invalido en la velocidad de pico del jet de la valvula aorta");
					reemplazarinfotextbox("insuficiencia_velpicojetregurgitacion_valvula_mitral_m", "");
				
			        }
		   	         
		   	         
		   	      if(velpicojetm.length > 2){
					   if(parseFloat(velpicojetm) <=0.0 ){
						   
						   swvelpicojetm=false;
			  				alert("la velocidad pico del jet de la valvula mitral no puede tener magnitud 0");
			  				reemplazarinfotextbox("insuficiencia_velpicojetregurgitacion_valvula_mitral_m", "");
			  	    		reemplazarinfotextbox("insuficiencia_eroa_valvula_mitral", "");
			  	    	  insuficiencia_mitral[opcion]="1";
		    		   }else{
		    			   swvelpicojetm=true;
		   	      }
		      }
	       } 	      

		    else{
		    	reemplazarinfotextbox("insuficiencia_eroa_valvula_mitral", "");
			  	  insuficiencia_mitral[opcion]="1";
		    }
		    //fin velpicojetm
	    
	    
	    
       if(swradiopisa==true){
    	   
	       if(swvelaliasing==true){
	    	   if(swvelpicojet ==true){
	    					   var eroa = parseFloat(((2*Math.PI*parseFloat(radiopisa) *parseFloat(radiopisa)*(parseInt(velaliasing)))/parseInt(velpicojet)));
	    					   if(eroa < 0.20){
                            	   insuficiencia_mitral[opcion]="2";
                               }else if((eroa >= 0.20)&&(eroa < 0.39)){
                            	   insuficiencia_mitral[opcion]="3";
                               }
                               else{
                            	   insuficiencia_mitral[opcion]="4";
                               }
        			    	   reemplazarinfotextbox("insuficiencia_eroa_valvula_mitral", Math.round(eroa * 100) / 100);
    		   
	    	   }

	       }

	    }
	    break;
	    
	case 9:
		var swmad=false;
		var swmadmm=false;
		var swvtima= false;
		var swvtimamm= false;
		var swpad=false;
		var swpadmm=false;
		var swvtipa=false;
		var swvtipamm=false;
		
		var mad = recopilarinfotextbox("insuficiencia_mad_valvula_mitral");
		var madmm = recopilarinfotextbox("insuficiencia_mad_valvula_mitral_mm");
		var vtima = recopilarinfotextbox("insuficiencia_vtima_valvula_mitral");
		var vtimamm = recopilarinfotextbox("insuficiencia_vtima_valvula_mitral_mm");
		var pad = recopilarinfotextbox("insuficiencia_pad_valvula_mitral");
		var padmm = recopilarinfotextbox("insuficiencia_pad_valvula_mitral_mm");
		var vtipa = recopilarinfotextbox("insuficiencia_vtipa_valvula_mitral");
		var vtipamm = recopilarinfotextbox("insuficiencia_vtipa_valvula_mitral_mm");

	    if((mad.length >0)){
			
	    	swmad=/^\d+\.?\d*$/.test(mad);
	   	         if(swmad == false){
	   	      	//alert("caracter invalido en el mad de la valvula mitral");
				reemplazarinfotextbox("insuficiencia_mad_valvula_mitral", "");

		        }
	   	         
	   	      if((mad.length >2)){
	   	    	 if(parseFloat(mad) <=0.0 ){
	     			    swmad=false;
	    				alert("el mad de la valvula mitral no puede tener magnitud 0");
	    				reemplazarinfotextbox("insuficiencia_mad_valvula_mitral", "");
	    				reemplazarinfotextbox("insuficiencia_rvol_valvula_mitral", "");
	    				reemplazarinfotextbox("insuficiencia_fr_valvula_mitral", "");
	    				
	    			   	  insuficiencia_mitral[opcion]="1";
	    			   	  insuficiencia_mitral[opcion+1]="1";
	    		        }else{
	    		        	  swmad=true;
	    		        }
	   	      }
	   	     
	   	     
	    }
	    else{
	    	reemplazarinfotextbox("insuficiencia_rvol_valvula_mitral", "");
			reemplazarinfotextbox("insuficiencia_fr_valvula_mitral", "");
		   	  insuficiencia_mitral[opcion]="1";
		   	  insuficiencia_mitral[opcion+1]="1";
	    }
	    
	    //madm
      if((madmm.length >0)){
			
	    	swmadmm=/^\d+\.?\d*$/.test(madmm);
	   	         if(swmadmm == false){
	   	      	//alert("caracter invalido en el mad de la valvula mitral");
				reemplazarinfotextbox("insuficiencia_mad_valvula_mitral_mm", "");

		        }
	   	         
	   	      if((madmm.length >2)){
	   	    	 if(parseFloat(madmm) <=0.0 ){
	     			    swmadmm=false;
	    				alert("el mad mm de la valvula mitral no puede tener magnitud 0");
	    				reemplazarinfotextbox("insuficiencia_mad_valvula_mitral_mm", "");
	    				reemplazarinfotextbox("insuficiencia_rvol_valvula_mitral", "");
	    				reemplazarinfotextbox("insuficiencia_fr_valvula_mitral", "");
	    				
	    			   	  insuficiencia_mitral[opcion]="1";
	    			   	  insuficiencia_mitral[opcion+1]="1";
	    		        }else{
	    		        	  swmadmm=true;
	    		        }
	   	      }
	   	     
	   	     
	    }
	    else{
	    	reemplazarinfotextbox("insuficiencia_rvol_valvula_mitral", "");
			reemplazarinfotextbox("insuficiencia_fr_valvula_mitral", "");
		   	  insuficiencia_mitral[opcion]="1";
		   	  insuficiencia_mitral[opcion+1]="1";
	    }
	    //fin madm
		
	    if((vtima.length >0)){
			
	 	   swvtima=/^\d+\.?\d*$/.test(vtima);
	 	   	         if(swvtima == false){
	 	   	      	//alert("caracter invalido en el vtipa la valvula mitral");
	 				reemplazarinfotextbox("insuficiencia_vtima_valvula_mitral", "");
	 			
	 		        }
	 	   	     if((vtima.length >2)){   
	 	   	     if(parseFloat(vtima) <=0.0 ){
 				    swvtima=false;
	    				alert("el vtima de la valvula mitral no puede tener magnitud 0");
	    				reemplazarinfotextbox("insuficiencia_vtima_valvula_mitral", "");
	    				reemplazarinfotextbox("insuficiencia_rvol_valvula_mitral", "");
	    				reemplazarinfotextbox("insuficiencia_fr_valvula_mitral", "");
	    			   	  insuficiencia_mitral[opcion]="1";
	    			   	  insuficiencia_mitral[opcion+1]="1";
	    		   }else{
	    			   swvtima==true;
	    		   }
	 	   	     }
	 	    }
	 	    else{
	 	    	reemplazarinfotextbox("insuficiencia_rvol_valvula_mitral", "");
	 			reemplazarinfotextbox("insuficiencia_fr_valvula_mitral", "");
	 		   	  insuficiencia_mitral[opcion]="1";
			   	  insuficiencia_mitral[opcion+1]="1";
	 			
	 	    }
		
	    //vtimamm
	    if((vtimamm.length >0)){
			
		 	   swvtimamm=/^\d+\.?\d*$/.test(vtimamm);
		 	   	         if(swvtimamm == false){
		 	   	      	//alert("caracter invalido en el vtipa la valvula mitral");
		 				reemplazarinfotextbox("insuficiencia_vtima_valvula_mitral_mm", "");
		 			
		 		        }
		 	   	     if((vtimamm.length >2)){   
			 	   	     if(parseFloat(vtimamm) <=0.0 ){    
		 	   	    
	 				    swvtimamm=false;
		    				alert("el vtima mm de la valvula mitral no puede tener magnitud 0");
		    				reemplazarinfotextbox("insuficiencia_vtima_valvula_mitral_mm", "");
		    				reemplazarinfotextbox("insuficiencia_rvol_valvula_mitral", "");
		    				reemplazarinfotextbox("insuficiencia_fr_valvula_mitral", "");
		    			   	  insuficiencia_mitral[opcion]="1";
		    			   	  insuficiencia_mitral[opcion+1]="1";
		    		   }else{
		    			   swvtimamm==true;
		 	    }
		 	   	     }
		 	   	     
	    } else{
		 	    	reemplazarinfotextbox("insuficiencia_rvol_valvula_mitral", "");
		 			reemplazarinfotextbox("insuficiencia_fr_valvula_mitral", "");
		 		   	  insuficiencia_mitral[opcion]="1";
				   	  insuficiencia_mitral[opcion+1]="1";
		 			
		 	    }
	    //fin vtimamm
	    
		if(pad.length > 0){
			swpad=/^\d+\.?\d*$/.test(pad);
			if(swpad == false){
				//alert("caracter invalido en el vtipa de la valvula mitral");
				reemplazarinfotextbox("insuficiencia_pad_valvula_mitral", "");

			}
			
			if(pad.length >2){
				   if(parseFloat(pad) <=0.0 ){
			        	swpad=false;
	   				alert("el pad de la valvula mitral no puede tener magnitud 0");
	   				reemplazarinfotextbox("insuficiencia_pad_valvula_mitral", "");
	   				reemplazarinfotextbox("insuficiencia_rvol_valvula_mitral", "");
	   				reemplazarinfotextbox("insuficiencia_fr_valvula_mitral", "");
	   		   	  insuficiencia_mitral[opcion]="1";
			   	  insuficiencia_mitral[opcion+1]="1";
	   				
	   		   }else{
	   		 	swpad=true;
	   		   }
				
				
			}
			
		}else{
 	    	reemplazarinfotextbox("insuficiencia_rvol_valvula_mitral", "");
 			reemplazarinfotextbox("insuficiencia_fr_valvula_mitral", "");
 		   	  insuficiencia_mitral[opcion]="1";
		   	  insuficiencia_mitral[opcion+1]="1";
		}
		
		//padmm
		
		if(padmm.length > 0){
			swpadmm=/^\d+\.?\d*$/.test(padmm);
			if(swpadmm == false){
				//alert("caracter invalido en el vtipa de la valvula mitral");
				reemplazarinfotextbox("insuficiencia_pad_valvula_mitral_mm", "");

			}
			
			if(padmm.length >2){
				   if(parseFloat(padmm) <=0.0 ){
			        	swpadmm=false;
	   				alert("el pad de la valvula mitral no puede tener magnitud 0");
	   				reemplazarinfotextbox("insuficiencia_pad_valvula_mitral_mm", "");
	   				reemplazarinfotextbox("insuficiencia_rvol_valvula_mitral", "");
	   				reemplazarinfotextbox("insuficiencia_fr_valvula_mitral", "");
	   		   	  insuficiencia_mitral[opcion]="1";
			   	  insuficiencia_mitral[opcion+1]="1";
	   				
	   		   }else{
	   		 	swpadmm=true;
	   		   }
				
				
			}
			
		}else{
 	    	reemplazarinfotextbox("insuficiencia_rvol_valvula_mitral", "");
 			reemplazarinfotextbox("insuficiencia_fr_valvula_mitral", "");
 		   	  insuficiencia_mitral[opcion]="1";
		   	  insuficiencia_mitral[opcion+1]="1";
		}
		
		//fin padmm
		
	    if((vtipa.length >0)){
		
	    	swvtipa=/^\d+\.?\d*$/.test(vtipa);
	   	         if(swvtipa == false){
	   	      	//alert("caracter invalido en el vtipa de la valvula mitral");
				reemplazarinfotextbox("insuficiencia_vtipa_valvula_mitral","");

		        }
	   	         
	   	      if((vtipa.length >2)){
		   	    	 if(parseFloat(vtipa) <=0.0 ){
				        swvtipa=false;
						alert("el vtipa de la valvula mitral no puede tener magnitud 0");
	    				reemplazarinfotextbox("insuficiencia_vtipa_valvula_mitral", "");
	    				reemplazarinfotextbox("insuficiencia_rvol_valvula_mitral", "");
	    				reemplazarinfotextbox("insuficiencia_fr_valvula_mitral", "");
	    			   	  insuficiencia_mitral[opcion]="1";
	    			   	  insuficiencia_mitral[opcion+1]="1";
				   }else{
					   swvtipa==true
				   }
	   	      }
	    }
	    else{
 	    	reemplazarinfotextbox("insuficiencia_rvol_valvula_mitral", "");
 			reemplazarinfotextbox("insuficiencia_fr_valvula_mitral", "");
			
	    }
	    
	    //vtipamm
	    if((vtipamm.length >0)){
			
	    	swvtipamm=/^\d+\.?\d*$/.test(vtipamm);
	   	         if(swvtipamm == false){
	   	      	//alert("caracter invalido en el vtipa de la valvula mitral");
				reemplazarinfotextbox("insuficiencia_vtipa_valvula_mitral_mm", "");

		        }
	   	         
	   	      if((vtipamm.length >2)){
		   	    	 if(parseFloat(vtipamm) <=0.0 ){
				        swvtipamm=false;
						alert("el vtipa mm de la valvula mitral no puede tener magnitud 0");
	    				reemplazarinfotextbox("insuficiencia_vtipa_valvula_mitral_mm", "");
	    				reemplazarinfotextbox("insuficiencia_rvol_valvula_mitral", "");
	    				reemplazarinfotextbox("insuficiencia_fr_valvula_mitral", "");
	    			   	  insuficiencia_mitral[opcion]="1";
	    			   	  insuficiencia_mitral[opcion+1]="1";
				   }else{
					   swvtipamm=true;
				   }
	   	      }
	    }
	    else{
 	    	reemplazarinfotextbox("insuficiencia_rvol_valvula_mitral", "");
 			reemplazarinfotextbox("insuficiencia_fr_valvula_mitral", "");
			
	    }

	    

	    
    //fin vtipamm
	
   
   if(swmad==true){
       if(swvtima==true){
    	   if(swpad ==true){
    		   if(swvtipa==true){
    				
    						   var rvolmitral = parseFloat((Math.PI*(parseFloat(mad))*(parseInt(mad)) *parseInt(vtima)) -(Math.PI*(parseFloat(pad))*(parseFloat(pad)) *parseInt(vtipa)));
        			    	   var rfporcentaje= parseFloat(rvolmitral /(Math.PI*(parseFloat(mad))*(parseFloat(mad)) *parseInt(vtima)));
                               
                               //condiciones de severidad
        			    	   
        			    	   if(parseFloat(rvolmitral)<30){
        			    		   insuficiencia_mitral[opcion]="2";
        			    		   
        			    		   
        			    	   }else if((parseFloat(rvolmitral)>=30)&&((parseFloat(rvolmitral)<59))){
        			    		   insuficiencia_mitral[opcion]="3";
        			    	   }
        			    	   else{
        			    		   insuficiencia_mitral[opcion]="4";
        			    	   }
        			    	   
        			    	   
        			    	   if(parseFloat(rfporcentaje)<30){
        			    		   insuficiencia_mitral[opcion+1]="2";
        			    		   
        			    		   
        			    	   }else if((parseFloat(rvolmitral)>=30)&&((parseFloat(rvolmitral)<49))){
        			    		   insuficiencia_mitral[opcion+1]="3";
        			    	   }
        			    	   else{
        			    		   insuficiencia_mitral[opcion+1]="4";
        			    	   }
        			    	   
        			    	   reemplazarinfotextbox("insuficiencia_rvol_valvula_mitral", Math.round(rvolmitral * 100) / 100);
        					   reemplazarinfotextbox("insuficiencia_fr_valvula_mitral", Math.round(rfporcentaje * 100) / 100);
    		  
    		  }
    	   }

       }

    }
   
   
		
		break;

		
		
		
		
	}
	
	
	
	valvulas_generar_informe();
	
	
	
	
	
}




function valvulas_control_formulario_insuficiencia_tricuspidea(opcion){
switch(opcion){
	case 0:
		insuficiencia_tricuspidea[opcion]= recopilarValueCombobox("insuficiencia_morfologia_valvula_tricuspidea");
		break;
	case 1:
		insuficiencia_tricuspidea[opcion]= recopilarValueCombobox("insuficiencia_tamanocavidades_valvula_tricuspidea");
		break;
	case 2:
		insuficiencia_tricuspidea[opcion]= recopilarValueCombobox("insuficiencia_areajetcentral_valvula_tricuspidea");
		break;
	case 3:
		insuficiencia_tricuspidea[opcion]= recopilarValueCombobox("insuficiencia_densidadjet_valvula_tricuspidea");
		break;
	case 4:
		insuficiencia_tricuspidea[opcion]= recopilarValueCombobox("insuficiencia_contornojet_valvula_tricuspidea");
		break;
	case 5:
		insuficiencia_tricuspidea[opcion]= recopilarValueCombobox("insuficiencia_diavenacontracta_valvula_tricuspidea");
		break;
	case 6:
		insuficiencia_tricuspidea[opcion]= recopilarValueCombobox("insuficiencia_radiopisa_valvula_tricuspidea");
		break;
	case 7:
		insuficiencia_tricuspidea[opcion]= recopilarValueCombobox("insuficiencia_flujohepatico_valvula_tricuspidea");
		break;
}
valvulas_generar_informe();
	
}

function valvulas_control_formulario_insuficiencia_pulmonal(opcion){
switch(opcion){
	case 0:
		insuficiencia_pulmonal[opcion]= recopilarValueCombobox("insuficiencia_morfologia_valvula_pulmonal");
		break;
	case 1:
		insuficiencia_pulmonal[opcion]= recopilarValueCombobox("insuficiencia_tamventriculoderecho_valvula_pulmonal");
		break;
	case 2:
		insuficiencia_pulmonal[opcion]= recopilarValueCombobox("insuficiencia_tamjet_valvula_pulmonal");
		break;
	case 3:
		insuficiencia_pulmonal[opcion]= recopilarValueCombobox("insuficiencia_densidadjet_valvula_pulmonal");
		break;
	case 4:
		insuficiencia_pulmonal[opcion]= recopilarValueCombobox("insuficiencia_flupulcomflusis_valvula_pulmonal");
		break;

}
valvulas_generar_informe();
}


function valvulas_control_formulario_estenosis_aorta(opcion){
	
	
	switch (opcion) {
	case 0:
		var swgradientepico=false;
		var gradientepico=recopilarinfotextbox('estenosis_gradientepico_valvula_aorta');
		if(gradientepico.length > 0){
			swgradientepico=/^\d+\.?\d*$/.test(gradientepico);
			if(swgradientepico == false){
				alert("caracter invalido en el gradiente pico de la valvula aorta ");
				reemplazarinfotextbox("estenosis_gradientepico_valvula_aorta","");
			}
			
			   if((gradientepico.length >2)){
		   	    	 if(parseFloat(gradientepico) <=0.0 ){
				        swgradientepico=false;
				        alert("el gradientepico de la valvula aorta no puede tener magnitud 0.0");
						reemplazarinfotextbox("estenosis_gradientepico_valvula_aorta","");
		   	    	 }
			   }
				   }else{
					   swvtipamm=true;
				   
	   	      
			
	
		}
	
		break;
	case 1:
		var swgradientemedio=false;
		var gradientemedio=recopilarinfotextbox('estenosis_gradientemedio_valvula_aorta');
		if(gradientemedio.length > 0){
			swgradientemedio=/^\d+\.?\d*$/.test(gradientemedio);
			if(swgradientemedio == false){
				alert("caracter invalido en el gradiente medio de la valvula aorta ");
				reemplazarinfotextbox("estenosis_gradientemedio_valvula_aorta","");
			}
			if((gradientemedio.length >2)){
	   	    	 if(parseFloat(gradientemedio) <=0.0 ){
				alert("el gradiente medio de la valvula aorta no puede tener magnitud 0.0 ");
				swgradientemedio =false;
				reemplazarinfotextbox("estenosis_gradientemedio_valvula_aorta", "");
				estenosis_aorta[0]="1";
			}
			}
			
		
		}else{
			 estenosis_aorta[0]="1";
		}
		
		 if(swgradientemedio==true){
			
			 if(parseInt(gradientemedio)< 20){
				 estenosis_aorta[0]="2";
			 }
			 else if ((parseInt(gradientemedio)>= 20) && (parseInt(gradientemedio)<= 40)){
				 estenosis_aorta[0]="3";
				 
			 }
			 
			 else{//> 40
				 
				 estenosis_aorta[0]="4";
				 
			 }
    	 }
		break;

	case 2:
		var swvelpico = false;
		var swvelpicotsvi =false;
		var velpico=recopilarinfotextbox('estenosis_velocidadpico_valvula_aorta');
		var velpicotsvi=recopilarinfotextbox('estenosis_velpicotsvi_valvula_aorta');
		
		if(velpico.length > 0){
			swvelpico=/^\d+\.?\d*$/.test(velpico);
			if(swvelpico == false){
				alert("caracter invalido en la velocidad pico de la valvula aorta");
				reemplazarinfotextbox("estenosis_velocidadpico_valvula_aorta", recopilarinfotextbox("estenosis_velocidadpico_valvula_aorta").substring(0, recopilarinfotextbox("estenosis_velocidadpico_valvula_aorta").length -1));
			}
			if(velpico.length > 2){
				if(parseFloat(velpico)<=0.0){
					alert("la velocidad pico de la valvula aorta no puede tener maginutd de 0.0");
					reemplazarinfotextbox("estenosis_velocidadpico_valvula_aorta", "");
					reemplazarinfotextbox("estenosis_velradio_valvula_aorta", "");
					estenosis_aorta[1]="1";
				    estenosis_aorta[2]="1";
					swvelpico=false;
				} 
			}

		}else{
			 estenosis_aorta[1]="1";
		     estenosis_aorta[2]="1";
			reemplazarinfotextbox("estenosis_velradio_valvula_aorta", "");
		}
		
	    if((velpicotsvi.length >0)){
	    	swvelpicotsvi=/^\d+\.?\d*$/.test(velpicotsvi);
	   	         if(swvelpicotsvi == false){
	   	      	alert("caracter invalido en la velocidad pico del tracto de salida de la valvula aorta");
				reemplazarinfotextbox("estenosis_velpicotsvi_valvula_aorta", recopilarinfotextbox("estenosis_velpicotsvi_valvula_aorta").substring(0, recopilarinfotextbox("estenosis_velpicotsvi_valvula_aorta").length -1));
			
		        }
	   	      if(velpicotsvi.length > 2){
					if(parseFloat(velpicotsvi)<=0.0){
	  	    	
	    			alert("la velpicotsvi de la valvula aorta no puede tener magnitud 0.0");
	    			reemplazarinfotextbox("estenosis_velpicotsvi_valvula_aorta", "");
	    			reemplazarinfotextbox("estenosis_velradio_valvula_aorta", "");
		    		estenosis_aorta[2]="1";
		    		swvelpicotsvi=false;
		    		
	    		}
	   	      }   
	   	         
	    }
	    else{
	    	reemplazarinfotextbox("estenosis_velradio_valvula_aorta", "");
	   		estenosis_aorta[2]="1";
	    }
	    
		    

	    if(swvelpico==true){
	
	    	if((parseFloat(velpico)>=2.6)&&(parseFloat(velpico)<3.0)){
	    		 estenosis_aorta[1]="2";
	    		
	    	}else if ((parseFloat(velpico)>=3.0)&&(parseFloat(velpico)<=4.0)){
	    		
	    		 estenosis_aorta[1]="3";
	    	}
	    	
	    	else if((parseFloat(velpico)>4.0)){
	    		 estenosis_aorta[1]="4";
	    	}else{
	    		
	    	  	alert("la velocidad pico debe ser mayor de 2.6");
	    		swvelpico=false;
	    		estenosis_aorta[1]="1";
	    	    estenosis_aorta[2]="1";
	  			reemplazarinfotextbox("estenosis_velradio_valvula_aorta", "");
	    	}
   	
	    }
	    

	    if(swvelpico==true){
	    	if(swvelpicotsvi==true){
	    			if(parseFloat(velpico)>0.0){
	    				var velradio =  Math.round(((parseFloat(velpicotsvi)/parseFloat(velpico)) * 100) / 100);
		    			reemplazarinfotextbox("estenosis_velradio_valvula_aorta",velradio);
		    			if((parseFloat(velradio)>0.50)){
		   	    		 estenosis_aorta[2]="2"; //
		   	    	}else if ((parseFloat(velpico)>=0.25)&&(parseFloat(velpico)<=0.50)){
		   	    		 estenosis_aorta[2]="3";
		   	    	}
		   	    	else {//if((parseFloat(velpico)<0.25)){
		   	    		 estenosis_aorta[2]="4";
		   	    	}
	    			}
	    			
	    			
	    			
	    		
	    		
	    	}
	    }
	    	
	
		
		
		
		
		break;

	case 3:
		var swvelmedio=false;
		var velmedio=recopilarinfotextbox('estenosis_velocidadmedio_valvula_aorta');
		if(velmedio.length > 0){
			swvelmedio=/^\d+\.?\d*$/.test(velmedio);
			if(swvelmedio == false){
				alert("caracter invalido en la velocidad medio de la valvula aorta ");
				reemplazarinfotextbox("estenosis_velocidadmedio_valvula_aorta", recopilarinfotextbox("estenosis_velocidadmedio_valvula_aorta").substring(0, recopilarinfotextbox("estenosis_velocidadmedio_valvula_aorta").length -1));
			}
			
		
		}
		
		 if(swvelmedio==true){
			
			  if((velmedio.length >2)){
		   	    	 if(parseFloat(velmedio) <=0.0 ){
		
					alert(" la velocidad medio de la valvula aorta no puede tener magnitud 0.0");
					reemplazarinfotextbox("estenosis_velocidadmedio_valvula_aorta","");
		   	    	 }
			 }
			 
		 }
		break;

	case 4:
		var swvti=false;
		var swtsvi=false;
		var swtsvimm=false;
		var swvtitsvi=false;
		var vti=recopilarinfotextbox('estenosis_vti_valvula_aorta');
		var tsvi=recopilarinfotextbox('estenosis_tsvi_valvula_aorta');
		var tsvimm=recopilarinfotextbox('estenosis_tsvi_valvula_aorta_mm');
		var vtitsvi=recopilarinfotextbox('estenosis_vtitsvi_valvula_aorta');
		if(vti.length > 0){
			swvti=/^\d+\.?\d*$/.test(vti);
			if(swvti == false){
				alert("caracter invalido en el vti de la valvula aorta");
				reemplazarinfotextbox("estenosis_vti_valvula_aorta", recopilarinfotextbox("estenosis_vti_valvula_aorta").substring(0, recopilarinfotextbox("estenosis_vti_valvula_aorta").length -1));
			}
			  if((vti.length >2)){
		   	    	 if(parseFloat(vti) <=0.0 ){
			 
			   alert("el vti de la valvula aorta no puede tener magnitud 0.0");
  				reemplazarinfotextbox("estenosis_vti_valvula_aorta", "");
  				reemplazarinfotextbox("estenosis_ava_valvula_aorta", "");
  				reemplazarinfotextbox("estenosis_avaindexado_valvula_aorta", "");
  				
  				  estenosis_aorta[3]="1";
  				  estenosis_aorta[4]="1";
  				swvti=false;
  				
  		   }
	
		}
		}else{
			reemplazarinfotextbox("estenosis_ava_valvula_aorta", "");
			reemplazarinfotextbox("estenosis_avaindexado_valvula_aorta", "");
			
			  estenosis_aorta[3]="1";
			  estenosis_aorta[4]="1";
		}
		
	    if((tsvi.length >0)){
		
	    	swtsvi=/^\d+\.?\d*$/.test(tsvi);
	   	         if(swtsvi == false){
	   	      	//alert("caracter invalido en el tsvi de la valvula aorta");
				reemplazarinfotextbox("estenosis_tsvi_valvula_aorta", "");
	        }
	   	      if(tsvi.length > 2){
					if(parseFloat(tsvi)<=0.0){
	   	   	alert("el tsvi de la valvula aorta no puede tener magnitud 0");
			reemplazarinfotextbox("estenosis_tsvi_valvula_aorta", "");
			reemplazarinfotextbox("estenosis_ava_valvula_aorta", "");
			reemplazarinfotextbox("estenosis_avaindexado_valvula_aorta", "");
			
			  estenosis_aorta[3]="1";
			  estenosis_aorta[4]="1";
			  tsvi=false;
	   	      }
	   	      }
	   	         
	   	         
	    }
	    else{
			reemplazarinfotextbox("estenosis_ava_valvula_aorta", "");
			reemplazarinfotextbox("estenosis_avaindexado_valvula_aorta", "");
			
			  estenosis_aorta[3]="1";
			  estenosis_aorta[4]="1";
	    }
	    
	    
	    //tsvimm
	    if((tsvimm.length >0)){
			
	    	swtsvimm=/^\d+\.?\d*$/.test(tsvimm);
	   	         if(swtsvimm == false){
	   	      	//alert("caracter invalido en el tsvi mm de la valvula aorta ");
				reemplazarinfotextbox("estenosis_tsvi_valvula_aorta_mm", "");
	        }
	   	      if(tsvimm.length > 2){
					if(parseFloat(tsvimm)<=0.0){
	   	   	alert("el tsvi mm de la valvula aorta no puede tener magnitud de 0");
			reemplazarinfotextbox("estenosis_tsvi_valvula_aorta_mm", "");
			reemplazarinfotextbox("estenosis_ava_valvula_aorta", "");
			reemplazarinfotextbox("estenosis_avaindexado_valvula_aorta", "");
			
			  estenosis_aorta[3]="1";
			  estenosis_aorta[4]="1";
			  tsvi=false;
	   	      }
	 
	   	      }     
	   	         
	    }
	    else{
			reemplazarinfotextbox("estenosis_ava_valvula_aorta", "");
			reemplazarinfotextbox("estenosis_avaindexado_valvula_aorta", "");
			
			  estenosis_aorta[3]="1";
			  estenosis_aorta[4]="1";
	    }
	    //

	    
	    if((vtitsvi.length >0)){
			
	    	swvtitsvi=/^\d+\.?\d*$/.test(vtitsvi);
	   	         if(swvtitsvi == false){
	   	      	alert("caracter invalido en el vtitsvi de la valvula aorta");
				reemplazarinfotextbox("estenosis_vtitsvi_valvula_aorta", recopilarinfotextbox("estenosis_vtitsvi_valvula_aorta").substring(0, recopilarinfotextbox("estenosis_vtitsvi_valvula_aorta").length -1));
			
		        }
	   	         
	   	      if((vtitsvi.length >2)){
		   	    	 if(parseFloat(vtitsvi) <=0.0 ){
   				alert("el vtitsvi de la valvula aorta no puede tener magnitud 0.0");
				reemplazarinfotextbox("estenosis_vtitsvi_valvula_aorta", "");
				reemplazarinfotextbox("estenosis_ava_valvula_aorta", "");
				reemplazarinfotextbox("estenosis_avaindexado_valvula_aorta", "");
				
				  estenosis_aorta[3]="1";
				  estenosis_aorta[4]="1";
				  vtitsvi=false;
	   		   }
	    }
	}
	    else{
			reemplazarinfotextbox("estenosis_ava_valvula_aorta", "");
			reemplazarinfotextbox("estenosis_avaindexado_valvula_aorta", "");
			
			  estenosis_aorta[3]="1";
			  estenosis_aorta[4]="1";
	    }
	    
	    
	    
       if(swvti==true){
	       if(swtsvi==true){
	    	   if(swvtitsvi ==true){
	    		  
	    			
	    			
	    					  
	    					   var ava = parseFloat((Math.PI*(parseInt(tsvi)/2) *(parseInt(tsvi)/2)*parseInt(vtitsvi))/(parseInt(vti)));
	    						   
	    						   if(parseFloat(ava)>1.5){
	    							   estenosis_aorta[3]="2";
	    						   }else if((parseFloat(ava)<=1.5)&&(parseFloat(ava)>=1.0)){
	    							   estenosis_aorta[3]="3";
	    						   }else{ //< 1.0 
	    							   estenosis_aorta[3]="4";
	    						   }
	    						   
	    							reemplazarinfotextbox("estenosis_ava_valvula_aorta", ava);
	    						   
	    						   var bsa = recopilarinfotextbox("txt_sup_corp");
	    						   if(bsa.length > 0){
	    							
	    							   var vsaindexado = parseFloat(ava/parseFloat(bsa));
	    							   if(vsaindexado > 0.50 ){
	    								   estenosis_aorta[4]="2";
	    								   
	    							   }else if ((vsaindexado >= 0.25 )&&(vsaindexado<0.50)){
	    								   estenosis_aorta[4]="3";
	    							   }else{ // < 0.25
	    								   estenosis_aorta[4]="4";
	    								   
	    							   }
	    							   
	    								reemplazarinfotextbox("estenosis_avaindexado_valvula_aorta", vsaindexado);
	    							   
	    							   
	    							   
	    						   }else{
	    							   
	    							   reemplazarinfotextbox("estenosis_avaindexado_valvula_aorta", "");
	    							   estenosis_aorta[4]="1";
	    						   }
	    	   }

	       }

	    }
		break;

	case 5:
		
		var swthp=false;
		var thp=recopilarinfotextbox('estenosis_thp_valvula_aorta');
		if(thp.length > 0){
			swthp=/^\d+\.?\d*$/.test(thp);
			if(swthp == false){
				alert("caracter invalido en el THP de la valvula aorta ");
				reemplazarinfotextbox("estenosis_thp_valvula_aorta", recopilarinfotextbox("estenosis_thp_valvula_aorta").substring(0, recopilarinfotextbox("estenosis_thp_valvula_aorta").length -1));
			}
			
		
		}
		
		 if(swthp==true){
			
			 if((thp.length >2)){
	   	    	 if(parseFloat(thp) <=0.0 ){
					alert("el THP de la valvula aorta no puede tener magnitud 0.0");
					reemplazarinfotextbox("estenosis_thp_valvula_aorta","");
			 }
			 
		 }
	}
		
		break;
	}
	valvulas_generar_informe();
}



function valvulas_control_formulario_estenosis_mitral(opcion){
	
	switch(opcion){
	/*

	 */
	case 0:
		var swgradientepico=false;
		var gradientepico=recopilarinfotextbox('estenosis_gradientepico_valvula_mitral');
		if(gradientepico.length > 0){
			swgradientepico=/^\d+\.?\d*$/.test(gradientepico);
			if(swgradientepico == false){
				alert("caracter invalido en el gradiente pico de la valvula mitral ");
				reemplazarinfotextbox("estenosis_gradientepico_valvula_mitral", recopilarinfotextbox("estenosis_gradientepico_valvula_mitral").substring(0, recopilarinfotextbox("estenosis_gradientepico_valvula_mitral").length -1));
			}
			
		
		}
		
		 if((gradientepico.length >2)){
   	    	 if(parseFloat(gradientepico) <=0.0 ){
			
					alert("el gradientepico de la valvula mitral no puede tener magnitud 0.0");
					reemplazarinfotextbox("estenosis_gradientepico_valvula_mitral","");
			 
			 
		 }
		
	}
		break;
	
	case 1:
		var swgradientemedio=false;
		var gradientemedio=recopilarinfotextbox('estenosis_gradientemedio_valvula_mitral');
		if(gradientemedio.length > 0){
			swgradientemedio=/^\d+\.?\d*$/.test(gradientemedio);
			if(swgradientemedio == false){
				alert("caracter invalido en el gradiente pico de la valvula mitral ");
				reemplazarinfotextbox("estenosis_gradientemedio_valvula_mitral", recopilarinfotextbox("estenosis_gradientemedio_valvula_mitral").substring(0, recopilarinfotextbox("estenosis_gradientemedio_valvula_mitral").length -1));
			}
			 if((gradientemedio.length >2)){
	   	    	 if(parseFloat(gradientemedio) <=0.0 ){
				alert("caracter invalido en el gradiente pico de la valvula mitral ");
				 estenosis_mitral[0]="1";
				reemplazarinfotextbox("estenosis_gradientemedio_valvula_mitral","");
				swgradientemedio=false;
				
			}
			 }
		
		}else{
			 estenosis_mitral[0]="1";
		}
		
		 if(swgradientemedio==true){
			
			 if(parseInt(gradientemedio)< 5){
				 estenosis_mitral[0]="2";
			 }
			 else if ((parseInt(gradientemedio)>= 5) && (parseInt(gradientemedio)<= 10)){
				 estenosis_mitral[0]="3";
				 
			 }
			 
			 else{//> 10
				 
				 estenosis_mitral[0]="4";
				 
			 }
		 
		 }
		
		break;
	case 2:
		var swvelpico=false;
		var velpico=recopilarinfotextbox('estenosis_velocidadpico_valvula_mitral');
		if(velpico.length > 0){
			swvelpico=/^\d+\.?\d*$/.test(velpico);
			if(swvelpico == false){
				alert("caracter invalido en la velocidad pico de la valvula mitral ");
				reemplazarinfotextbox("estenosis_velocidadpico_valvula_mitral", recopilarinfotextbox("estenosis_velocidadpico_valvula_mitral").substring(0, recopilarinfotextbox("estenosis_velocidadpico_valvula_mitral").length -1));
			}
			
		
		}
		
		 if(swvelpico==true){
			
			 if((velpico.length >2)){
	   	    	 if(parseFloat(velpico) <=0.0 ){
					alert("la velocidad pico de la valvula mitral no puede tener magnitud 0.0");
					reemplazarinfotextbox("estenosis_velocidadpico_valvula_mitral","");
			 }
			 }
		 }
		
		break;
		
	case 3:
		var swvelmedio=false;
		var velmedio=recopilarinfotextbox('estenosis_velocidadmedio_valvula_mitral');
		if(velmedio.length > 0){
			swvelmedio=/^\d+\.?\d*$/.test(velmedio);
			if(swvelmedio == false){
				alert("caracter invalido en la velocidad medio de la valvula mitral ");
				reemplazarinfotextbox("estenosis_velocidadmedio_valvula_mitral", recopilarinfotextbox("estenosis_velocidadmedio_valvula_mitral").substring(0, recopilarinfotextbox("estenosis_velocidadmedio_valvula_mitral").length -1));
			}
			
		
		}
		
		 if(swvelmedio==true){
			
			 if((velmedio.length >2)){
	   	    	 if(parseFloat(velmedio) <=0.0 ){

					alert("la velocidad medio de la valvula mitral no puede tener magnitud 0.0");
					reemplazarinfotextbox("estenosis_velocidadmedio_valvula_mitral","");
			 }
			 
		 }
		
		 }
		
		break;
		 
	case 4:
		var swvti=false;
		var vti=recopilarinfotextbox('estenosis_vti_valvula_mitral');
		if(vti.length > 0){
			swvti=/^\d+\.?\d*$/.test(vti);
			if(swvti == false){
				alert("caracter invalido en el vti de la valvula mitral ");
				reemplazarinfotextbox("estenosis_vti_valvula_mitral", recopilarinfotextbox("estenosis_vti_valvula_mitral").substring(0, recopilarinfotextbox("estenosis_vti_valvula_mitral").length -1));
			}
			
		
		}
		
		 if(swvti==true){
			
			 if((vti.length >2)){
	   	    	 if(parseFloat(vti) <=0.0 ){
					alert("el vti de la valvula mitral no puede tener magnitud 0.0");
					reemplazarinfotextbox("estenosis_vti_valvula_mitral","");
			 }
			 }
		 }
	case 5:
		
		var swthp=false;
		var thp=recopilarinfotextbox('estenosis_thp_valvula_mitral');
		if(thp.length > 0){
			swthp=/^\d+\.?\d*$/.test(thp);
			if(swthp == false){
				alert("caracter invalido en el thp de la valvula mitral ");
				reemplazarinfotextbox("estenosis_thp_valvula_mitral", "");
			}
			if(thp.length > 2){
				if(parseFloat(thp)<=0.0){
			
				    swthp=false;
					alert("el thp de la valvula mitral no puede tener magnitud 0");
					reemplazarinfotextbox("estenosis_thp_valvula_mitral","");
					reemplazarinfotextbox("estenosis_area_valvula_mitral","");
					estenosis_mitral[1]="1";
					
					
			 }
			}
		
		}else{
			 reemplazarinfotextbox("estenosis_area_valvula_mitral","");
			 estenosis_mitral[1]="1";
			
		}
		

	
		 if(swthp==true){
         		var areavalvular =  parseFloat(220 / parseFloat(thp));
         		
         		if (parseFloat(areavalvular)>1.5){
         			 estenosis_mitral[1]="2";
         		}else if((parseFloat(areavalvular)>=1.0)&&(parseFloat(areavalvular)<=1.5)){
         			
         			 estenosis_mitral[1]="3";
         		}
         		else{
         			 estenosis_mitral[1]="4";
         		}

         		reemplazarinfotextbox("estenosis_area_valvula_mitral", areavalvular);
			
			 
		 }

		
		
		break;
		
	case 6:
		// pap
		break;
		
	}
	valvulas_generar_informe();
	
}

function valvulas_control_formulario_estenosis_tricuspidea(opcion){
	
	switch(opcion){

	case 0:
		var swgradientepico=false;
		var gradientepico=recopilarinfotextbox('estenosis_gradientepico_valvula_tricuspidea');
		if(gradientepico.length > 0){
			swgradientepico=/^\d+\.?\d*$/.test(gradientepico);
			if(swgradientepico == false){
				alert("caracter invalido en el gradiente pico de la valvula tricuspidea ");
				reemplazarinfotextbox("estenosis_gradientepico_valvula_tricuspidea", recopilarinfotextbox("estenosis_gradientepico_valvula_tricuspidea").substring(0, recopilarinfotextbox("estenosis_gradientepico_valvula_tricuspidea").length -1));
			}
			
		
		}
		
		 if(swgradientepico==true){
			
			 if((gradientepico.length >2)){
	   	    	 if(parseFloat(gradientepico) <=0.0 ){
					alert("el gradientepico de la valvula tricuspidea no puede tener magnitud 0.0");
					reemplazarinfotextbox("estenosis_gradientepico_valvula_tricuspidea","");
			 }
			 
		 }
		
		 }
		break;
	
	case 1:
		var swgradientemedio=false;
		var gradientemedio=recopilarinfotextbox('estenosis_gradientemedio_valvula_tricuspidea');
		if(gradientemedio.length > 0){
			swgradientemedio=/^\d+\.?\d*$/.test(gradientemedio);
			if(swgradientemedio == false){
				alert("caracter invalido en el gradiente medio de la valvula tricuspidea ");
				reemplazarinfotextbox("estenosis_gradientemedio_valvula_tricuspidea", recopilarinfotextbox("estenosis_gradientemedio_valvula_tricuspidea").substring(0, recopilarinfotextbox("estenosis_gradientemedio_valvula_tricuspidea").length -1));
			}
			
			if((gradientemedio.length >2)){
	   	    	 if(parseFloat(gradientemedio) <=0.0 ){
				 alert("el gradiente medio de la valvula tricuspidea no puede tener magnitud 0.0 ");
				 reemplazarinfotextbox("estenosis_gradientemedio_valvula_tricuspidea","");
				 estenosis_tricuspidea[0]="1";
				 swgradientemedio = false;
			}
			
		}
		}else{
			 estenosis_tricuspidea[0]="1";
		}
		
		 if(swgradientemedio==true){
			
			 if(parseInt(gradientemedio)> 5){
				 estenosis_tricuspidea[0]="5";
			 }
			 else{
				 estenosis_tricuspidea[0]="1";
			 }
		 }
		
		break;
	case 2:
		var swvelpico=false;
		var velpico=recopilarinfotextbox('estenosis_velocidadpico_valvula_tricuspidea');
		if(velpico.length > 0){
			swvelpico=/^\d+\.?\d*$/.test(velpico);
			if(swvelpico == false){
				alert("caracter invalido en la velocidad pico de la valvula tricuspidea ");
				reemplazarinfotextbox("estenosis_velocidadpico_valvula_tricuspidea", recopilarinfotextbox("estenosis_velocidadpico_valvula_tricuspidea").substring(0, recopilarinfotextbox("estenosis_velocidadpico_valvula_tricuspidea").length -1));
			}
			
		
		}
		
		 if(swvelpico==true){
			
			 if((velpico.length >2)){
	   	    	 if(parseFloat(velpico) <=0.0 ){
			    	alert("la velocidad pico de la valvula tricuspidea no puede tener magnitud 0.0");
					reemplazarinfotextbox("estenosis_velocidadpico_valvula_tricuspidea","");
			 }
		 }
	}
		break;
	
	case 3:
		var swvelmedio=false;
		var velmedio=recopilarinfotextbox('estenosis_velocidadmedio_valvula_tricuspidea');
		if(velmedio.length > 0){
			swvelmedio=/^\d+\.?\d*$/.test(velmedio);
			if(swvelmedio == false){
				alert("caracter invalido en la velocidad medio de la valvula tricuspidea ");
				reemplazarinfotextbox("estenosis_velocidadmedio_valvula_tricuspidea", recopilarinfotextbox("estenosis_velocidadmedio_valvula_tricuspidea").substring(0, recopilarinfotextbox("estenosis_velocidadmedio_valvula_tricuspidea").length -1));
			}
			
		
		}
		 if(swvelmedio==true){
			 if((velmedio.length >2)){
	   	    	 if(parseFloat(velmedio) <=0.0 ){
				 alert("la velocidad medio de la valvula tricuspidea no puede tener magnitud 0.0");
					reemplazarinfotextbox("estenosis_velocidadmedio_valvula_tricuspidea","");
			 }

		 }
	}
		break;
	
		
	case 4:
		
		var swthp=false;
		var thp=recopilarinfotextbox('estenosis_thp_valvula_tricuspidea');
		if(thp.length > 0){
			swthp=/^\d+\.?\d*$/.test(thp);
			if(swthp == false){
				alert("caracter invalido en el vti de la valvula tricuspidea ");
				reemplazarinfotextbox("estenosis_thp_valvula_tricuspidea", recopilarinfotextbox("estenosis_thp_valvula_tricuspidea").substring(0, recopilarinfotextbox("estenosis_thp_valvula_tricuspidea").length -1));
			}
			if((thp.length >2)){
	   	    	 if(parseFloat(thp) <=0.0 ){
				 alert("el thp no puede tener magnitud 0.0 ");
				 reemplazarinfotextbox("estenosis_thp_valvula_tricuspidea","");
				 estenosis_tricuspidea[2]="1";
				 swthp = false;
			}
		}
		}else{
			 estenosis_tricuspidea[2]="1";
		}
		
		 if(swthp==true){
			
			 if(parseInt(thp)>= 190){
				 estenosis_tricuspidea[2]="5";
			 }
			 else{
				 estenosis_tricuspidea[2]="1";
			 }
		 }
		
		break;
		
	case 5:
		
		var swvtipulmonal = false;
		var swdiametropulmonal =false;
		var swvti=false;
		
		var vtipulmonal=recopilarinfotextbox('estenosis_vtipulmonal_valvula_tricuspidea');
		reemplazarinfotextbox("estenosis_vti_valvula_pulmonal",vtipulmonal);
		var diametropulmonal=recopilarinfotextbox('estenosis_diametropulmonal_valvula_tricuspidea');
		var vti=recopilarinfotextbox('estenosis_vti_valvula_tricuspidea');

		
		if(vtipulmonal.length > 0){
			swvtipulmonal=/^\d+\.?\d*$/.test(vtipulmonal);
			if(swvtipulmonal == false){
				alert("caracter invalido en el vti pulmonal");
				reemplazarinfotextbox("estenosis_vtipulmonal_valvula_tricuspidea", recopilarinfotextbox("estenosis_vtipulmonal_valvula_tricuspidea").substring(0, recopilarinfotextbox("estenosis_vtipulmonal_valvula_tricuspidea").length -1));
				reemplazarinfotextbox("estenosis_vti_valvula_pulmonal",recopilarinfotextbox("estenosis_vti_valvula_pulmonal").substring(0, recopilarinfotextbox("estenosis_vti_valvula_pulmonal").length -1));
			}
			
			if((vtipulmonal.length >2)){
	   	    	 if(parseFloat(vtipulmonal) <=0.0 ){
				alert("el vti pulmonal no puede tener magnitud 0.0");
				reemplazarinfotextbox("estenosis_vtipulmonal_valvula_tricuspidea", "");
		    	reemplazarinfotextbox("estenosis_areavalvular_valvula_tricuspidea","");
		    	reemplazarinfotextbox("estenosis_vti_valvula_pulmonal","");
				estenosis_tricuspidea[2]="1";
				swvtipulmonal=false;
			}
		}
		}else{
			reemplazarinfotextbox("estenosis_areavalvular_valvula_tricuspidea", "");
			 estenosis_tricuspidea[2]="1";
		}
		
	    if((diametropulmonal.length >0)){
	    	swdiametropulmonal=/^\d+\.?\d*$/.test(diametropulmonal);
	   	         if(swdiametropulmonal == false){
	   	      	alert("caracter invalido en el diametro pulmonal");
				reemplazarinfotextbox("estenosis_diametropulmonal_valvula_tricuspidea", recopilarinfotextbox("estenosis_diametropulmonal_valvula_tricuspidea").substring(0, recopilarinfotextbox("estenosis_diametropulmonal_valvula_tricuspidea").length -1));
			
		        }
	   	      if((diametropulmonal.length >2)){
		   	    	 if(parseFloat(diametropulmonal) <=0.0 ){
	 				alert("el diametro pulmonal no puede tener magnitud 0.0");
	 				reemplazarinfotextbox("estenosis_diametropulmonal_valvula_tricuspidea", "");
	 		    	reemplazarinfotextbox("estenosis_areavalvular_valvula_tricuspidea","");
	 				estenosis_tricuspidea[2]="1";
	 				swvtipulmonal=false;
	 			}
	    }
	    }
	    else{
	    	reemplazarinfotextbox("estenosis_areavalvular_valvula_tricuspidea", "");
	    	estenosis_tricuspidea[2]="1";
	    }
		
		if(vti.length > 0){
			swvti=/^\d+\.?\d*$/.test(vti);
			if(swvti == false){
				alert("caracter invalido en el vti de la valvula tricuspidea ");
				reemplazarinfotextbox("estenosis_vti_valvula_tricuspidea", recopilarinfotextbox("estenosis_vti_valvula_tricuspidea").substring(0, recopilarinfotextbox("estenosis_vti_valvula_tricuspidea").length -1));
			}
			if((vti.length >2)){
	   	    	 if(parseFloat(vti) <=0.0 ){
				alert("el vti de la valvula tricuspidea no puede tener magnitud 0.0");
				reemplazarinfotextbox("estenosis_vti_valvula_tricuspidea", "");
		    	reemplazarinfotextbox("estenosis_areavalvular_valvula_tricuspidea","");
		    	 estenosis_tricuspidea[1]="1";
		    	estenosis_tricuspidea[2]="1";
		    	swvti=false;
			}
		}
		}else{
	    	reemplazarinfotextbox("estenosis_areavalvular_valvula_tricuspidea", "");
			 estenosis_tricuspidea[1]="1";
			 estenosis_tricuspidea[2]="1";
		}
		
		 if(swvti==true){
		
				 if(parseInt(vti)> 60){
					 estenosis_tricuspidea[1]="5";
				 }
				 else{
					 estenosis_tricuspidea[1]="1";
				 }
		
		 }
		 

	    if(swvtipulmonal==true){
	    	
	    	
	    	if(swdiametropulmonal==true){
	    		if(swvti==true){
	    					var areavalvular =Math.round((parseFloat(parseInt(vtipulmonal)*Math.PI*(parseInt(diametropulmonal)/2)*(parseInt(diametropulmonal)/2)/parseInt(vti)) * 100) / 100) ;
	    					if(parseInt(areavalvular)<1){
	    						estenosis_tricuspidea[2]="5";
	    					}
	    					else{
	    						estenosis_tricuspidea[2]="1";
	    					}
	    					reemplazarinfotextbox("estenosis_areavalvular_valvula_tricuspidea",areavalvular);
	    		}
	    	}
	    }
		
		
		break;
		
		
		
	}
	valvulas_generar_informe();
	
}



function valvulas_control_formulario_estenosis_pulmonal(opcion){
	switch(opcion){
	
	case 0:
		var swgradientepico=false;
		var gradientepico=recopilarinfotextbox('estenosis_gradientepico_valvula_pulmonal');
		if(gradientepico.length > 0){
			swgradientepico=/^\d+\.?\d*$/.test(gradientepico);
			if(swgradientepico == false){
				alert("caracter invalido en el gradiente pico de la valvula pulmonal ");
				reemplazarinfotextbox("estenosis_gradientepico_valvula_pulmonal", recopilarinfotextbox("estenosis_gradientepico_valvula_pulmonal").substring(0, recopilarinfotextbox("estenosis_gradientepico_valvula_pulmonal").length -1));
			}
			if((gradientepico.length >2)){
	   	    	 if(parseFloat(gradientepico) <=0.0 ){
				alert("el gradiente pico de la valvula pulmonal no puede tener magnitud 0.0");
				reemplazarinfotextbox("estenosis_gradientepico_valvula_pulmonal", "");
				swgradientepico=false;
			}
		}
		}else{
			 estenosis_pulmonal[0]="1";
		}
		
		 if(swgradientepico==true){
			
			 if(parseInt(gradientepico)< 36){
				 estenosis_pulmonal[0]="2";
			 }
			 else if ((parseInt(gradientepico)>= 36) && (parseInt(gradientepico)<= 64)){
				 estenosis_pulmonal[0]="3";
				 
			 }
			 
			 else{//> 64
				 
				 estenosis_pulmonal[0]="4";
				 
			 }
		 
		 }
		break;
	
	case 1:
		
		var swgradientemedio=false;
		var gradientemedio=recopilarinfotextbox('estenosis_gradientemedio_valvula_pulmonal');
		if(gradientemedio.length > 0){
			swgradientemedio=/^\d+\.?\d*$/.test(gradientemedio);
			if(swgradientemedio == false){
				alert("caracter invalido en el gradiente pico de la valvula pulmonal ");
				reemplazarinfotextbox("estenosis_gradientemedio_valvula_pulmonal", recopilarinfotextbox("estenosis_gradientemedio_valvula_pulmonal").substring(0, recopilarinfotextbox("estenosis_gradientemedio_valvula_pulmonal").length -1));
			}
			
		
		}
		
		 if(swgradientemedio==true){
			
			 if((gradientemedio.length >2)){
	   	    	 if(parseFloat(gradientemedio) <=0.0 ){
					alert("el gradientepico de la valvula pulmonal no puede tener magnitud 0.0");
					reemplazarinfotextbox("estenosis_gradientemedio_valvula_pulmonal","");
			 }
		 }
		 }
		
		break;
		
		
	case 2:
		var swvelpico=false;
		var velpico=recopilarinfotextbox('estenosis_velocidadpico_valvula_pulmonal');
		if(velpico.length > 0){
			swvelpico=/^\d+\.?\d*$/.test(velpico);
			if(swvelpico == false){
				alert("caracter invalido en la velocidad pico de la valvula pulmonal ");
				reemplazarinfotextbox("estenosis_velocidadpico_valvula_pulmonal", recopilarinfotextbox("estenosis_velocidadpico_valvula_pulmonal").substring(0, recopilarinfotextbox("estenosis_velocidadpico_valvula_pulmonal").length -1));
			}
			
			if((velpico.length >2)){
	   	    	 if(parseFloat(velpico) <=0.0 ){
				alert("la velocidad pico de la valvula pulmonal no puede tener magnitud 0.0 ");
				 estenosis_pulmonal[1]="1";
				 reemplazarinfotextbox("estenosis_velocidadpico_valvula_pulmonal","");
				 swvelpico=false;
		   }
		}
		}else{
			 estenosis_pulmonal[1]="1";
		}
		
		 if(swvelpico==true){
			
			 if(parseInt(velpico)< 3){
				 estenosis_pulmonal[1]="2";
			 }
			 else if ((parseInt(velpico)>= 3) && (parseInt(velpico)<= 4)){
				 estenosis_pulmonal[1]="3";
				 
			 }
			 
			 else{//> 4
				 
				 estenosis_pulmonal[1]="4";
				 
			 }
		 
		 }
		break;
		
	case 3:
		var swvelmedio=false;
		var velmedio=recopilarinfotextbox('estenosis_velocidadmedio_valvula_pulmonal');
		if(velmedio.length > 0){
			swvelmedio=/^\d+\.?\d*$/.test(velmedio);
			if(swvelmedio == false){
				alert("caracter invalido en la velocidad medio de la valvula pulmonal ");
				reemplazarinfotextbox("estenosis_velocidadmedio_valvula_pulmonal", recopilarinfotextbox("estenosis_velocidadmedio_valvula_pulmonal").substring(0, recopilarinfotextbox("estenosis_velocidadmedio_valvula_pulmonal").length -1));
			}
			
		
		}
		
		 if(swvelmedio==true){
			
			 if((velmedio.length >2)){
	   	    	 if(parseFloat(velmedio) <=0.0 ){
					alert("la velocidad medio de la valvula pulmonal no puede tener magnitud 0.0");
					reemplazarinfotextbox("estenosis_velocidadmedio_valvula_pulmonal","");
			 }
		 }
		 }
		break;
		
		
	case 4:
		var swvti=false;
		var vti=recopilarinfotextbox('estenosis_vti_valvula_pulmonal');
		if(vti.length > 0){
			swvti=/^\d+\.?\d*$/.test(vti);
			if(swvti == false){
				alert("caracter invalido en el vti de la valvula pulmonal ");
				reemplazarinfotextbox("estenosis_vti_valvula_pulmonal", recopilarinfotextbox("estenosis_vti_valvula_pulmonal").substring(0, recopilarinfotextbox("estenosis_vti_valvula_pulmonal").length -1));
				 valvulas_control_formulario_estenosis_tricuspidea(5);
			}
			
		
		}else{
			 valvulas_control_formulario_estenosis_tricuspidea(5);
		}
		
		 if(swvti==true){
			
			 if((vti.length >2)){
	   	    	 if(parseFloat(vti) <=0.0 ){
					alert("el vti de la valvula pulmonal no puede tener magnitud 0.0");
					reemplazarinfotextbox("estenosis_vti_valvula_pulmonal","");
			 }
			 }else{
				 reemplazarinfotextbox("estenosis_vtipulmonal_valvula_tricuspidea", vti);
				 valvulas_control_formulario_estenosis_tricuspidea(5);
			 }
			 
		 }
		break;
		
	case 5:
		var swthp=false;
		var thp=recopilarinfotextbox('estenosis_thp_valvula_pulmonal');
		if(thp.length > 0){
			swthp=/^\d+\.?\d*$/.test(thp);
			if(swthp == false){
				alert("caracter invalido en el thp de la valvula pulmonal ");
				reemplazarinfotextbox("estenosis_thp_valvula_pulmonal", recopilarinfotextbox("estenosis_thp_valvula_pulmonal").substring(0, recopilarinfotextbox("estenosis_thp_valvula_pulmonal").length -1));
			}
			
		
		}
		
		 if(swthp==true){
			
			 if((thp.length >2)){
	   	    	 if(parseFloat(thp) <=0.0 ){
					alert("el thp de la valvula pulmonal no puede tener magnitud 0.0");
					reemplazarinfotextbox("estenosis_thp_valvula_pulmonal","");
			 }
		 }
		 }
		break;
	}
	
	valvulas_generar_informe();
}

function ver_severidad_insuficiencias_estenosis(arreglo, tipoValvula){
	
	var i=0;
	var arreglonumeroseveridades = new Array();
	arreglonumeroseveridades.push("0");//no tiene
	arreglonumeroseveridades.push("0");//leve
	arreglonumeroseveridades.push("0");//moderado
	arreglonumeroseveridades.push("0");//severo
	arreglonumeroseveridades.push("0");//significativo
	
	for(i =0; i < arreglo.length; i++){
		
		switch(parseInt(arreglo[i])){
		case 1:
			
			arreglonumeroseveridades[0]= parseInt(arreglonumeroseveridades[0]) + 1;
			break;
		
	      case 2:
			
			arreglonumeroseveridades[1]= parseInt(arreglonumeroseveridades[1]) + 1;
			break;
			
	      case 3:
       	    arreglonumeroseveridades[2]= parseInt(arreglonumeroseveridades[2]) + 1;
				break;
				
				
	      case 4:
       	    arreglonumeroseveridades[3]= parseInt(arreglonumeroseveridades[3]) + 1;
				break;
				
	      case 5:
	       	    arreglonumeroseveridades[4]= parseInt(arreglonumeroseveridades[4]) + 1;
					break;
		
		}
		
		
		
	}
	

	var auxcantidad1=0;
	var auxcantidad2=0;
	var idseveridad=0;
	var j=arreglonumeroseveridades.length-1;
	while(j > 0){
		auxcantidad1 = arreglonumeroseveridades[j];
		
		if(auxcantidad1 > auxcantidad2 ){
			auxcantidad2=auxcantidad1;
			idseveridad = j;
		}
		
		j--;
	}
	if(auxcantidad2 ==0){
		idseveridad = 0;
	}
	
	if(tipoValvula == "natural"){
		
		switch(idseveridad){
		
		case 0:
			return ""; //no hay ninguna severidad
			break;
		case 1:
			return "leve";
			break;
		case 2:
			return "moderado";
			break;
		case 3:
			return "severo";
			break;
		case 4:
			return "significativa";
			break;
		}
		
	}
	else{

		
		switch(idseveridad){
		
		case 0:
			return "normal";
			break;
		case 1:
			return "normal";
			break;
		case 2:
			return "posible estenosis";
			break;
		case 3:
			return "sugestivos de estenosis";
			break;
		case 4:
			return "sugestivos de estenosis";
			break;
		}
	}
	
	
	
	
	
}




function valvulas_generar_informe(){
//	alert("analisis_observaciones_"+nombre_tecnico_valvulas[indice_clave_sector_valvula]);
	
	var contenido_informe_valvula="De aspecto "+recopilarTextCombobox("tipo_aspecto_"+nombre_valvulas[indice_clave_sector_valvula]);
		if(parseInt(recopilarValueCombobox("tipo_aspecto_"+nombre_valvulas[indice_clave_sector_valvula]))>1){
		//	if(parseInt(recopilarValueCombobox("aspecto_"+nombres_aspectos_valvulas[nombres_aspectos_valvulas.length-1]+"_"+nombre_valvulas[indice_clave_sector_valvula]))>1){// obtener valor de la protesis
		//		contenido_informe_valvula += " en presencia de protesis se observa protesis "+recopilarTextCombobox("aspecto_"+nombres_aspectos_valvulas[nombres_aspectos_valvulas.length-1]+"_"+nombre_valvulas[indice_clave_sector_valvula]) +" en posicion "+nombre_tecnico_valvulas[indice_clave_sector_valvula] ;
		//	}else{
				var aspectos_encontrados = analisis_aspectos_valvulas[indice_clave_sector_valvula].split("-");
	         	var cont_aspectos_encontrados = "";
			    var i=0;
		        	for(i=0; i< aspectos_encontrados.length; i++){
						if (aspectos_encontrados[i]>0){
				        	cont_aspectos_encontrados += nombres_tecnicos_aspectos_valvulas[i]+", ";
						}
					}
			        if(cont_aspectos_encontrados.length > 0){
					cont_aspectos_encontrados = " dado por "+cont_aspectos_encontrados.substring(0,cont_aspectos_encontrados.length-2);
			        }
		        	contenido_informe_valvula += cont_aspectos_encontrados;
		//	}
		}else{
		contenido_informe_valvula += " sin alteraci\u00F3n funcional";
	}
		
		var resultadoseveridadInsuficiencia ="";
		var resultadoseveridadEstenosis ="";
		
		
		
		
		switch(indice_clave_sector_valvula){
		
		case 0:
	
			resultadoseveridadInsuficiencia= ver_severidad_insuficiencias_estenosis(insuficiencia_aorta,"natural");
			resultadoseveridadEstenosis= ver_severidad_insuficiencias_estenosis(estenosis_aorta,"natural");
	    break;
		
		case 1:
			resultadoseveridadInsuficiencia= ver_severidad_insuficiencias_estenosis(insuficiencia_mitral,"natural");
			resultadoseveridadEstenosis= ver_severidad_insuficiencias_estenosis(estenosis_mitral,"natural");
			
			
			break;
	    case 2:
	    	resultadoseveridadInsuficiencia= ver_severidad_insuficiencias_estenosis(insuficiencia_tricuspidea,"natural");
			resultadoseveridadEstenosis= ver_severidad_insuficiencias_estenosis(estenosis_tricuspidea,"natural");
			
			break;
	    
	    case 3:
	      	resultadoseveridadInsuficiencia= ver_severidad_insuficiencias_estenosis(insuficiencia_pulmonal,"natural");
			resultadoseveridadEstenosis= ver_severidad_insuficiencias_estenosis(estenosis_pulmonal,"natural");
		break;
    
	    
		}
		
		
		if(resultadoseveridadInsuficiencia.length > 0){
			
			contenido_informe_valvula += " , con un jet de regurgitaci\u00f3n central el cual por diferentes modalidades doppler es catalogado como "+resultadoseveridadInsuficiencia;
			
		}
		
	    if(resultadoseveridadEstenosis.length > 0){
			
			contenido_informe_valvula += " , se observa un aumento en los gradientes el cual es dado por una estenosis "+resultadoseveridadEstenosis;
			
		}
	    contenido_informe_valvula +=".";
    	reemplazarinfotextbox("analisis_observaciones_"+nombre_tecnico_valvulas[indice_clave_sector_valvula], contenido_informe_valvula);
    	vistapreviaFormularios();
}


/************************************************************/
/********FUNCIONES INFORME VENTRICULO IZQUIERDO****************/
/************************************************************/
var grosorseptumnormalaumentadodiastole =0;
var grosorparednormalaumentadodiastole =0;
var swgradodisfuncion=false;
var selectordisfuncion =0;
var selectorgradodisfuncion =0;
var tipodisfunction = new Array();
var tipogradoDisfuncion = new Array();


function ventriculo_izquierdo_control_formulario(opcion){
	switch(opcion){

	case 0:
		var swgrosorseptumdiastole= false;
		var grosorseptumdiastole=recopilarinfotextbox('grosor_septum_diastole');
		if(grosorseptumdiastole.length > 0){
			swgrosorseptumdiastole=/^\d+\.?\d*$/.test(grosorseptumdiastole);
			if(swgrosorseptumdiastole == false){
				alert("caracter invalido en el grosor septum en diastole del ventriculo izquierdo");
				reemplazarinfotextbox("grosor_septum_diastole", recopilarinfotextbox("grosor_septum_diastole").substring(0, recopilarinfotextbox("grosor_septum_diastole").length -1));
			}
			if(grosorseptumdiastole.length > 2){
				if(parseFloat(grosorseptumdiastole)<=0.0){
					alert("el grosor septum en diastole del ventriculo izquierdo no puede tener magnitud 0.0");
					reemplazarinfotextbox("grosor_septum_diastole", recopilarinfotextbox("grosor_septum_diastole").substring(0, recopilarinfotextbox("grosor_septum_diastole").length -1));
					reemplazarinfotextbox("diametro_medio_ventriculo_derecho", "");
					reemplazarinfotextbox("lvmass", "");
					reemplazarinfotextbox("grosorrelativo", "");
					reemplazarindexCombobox("hipertrofia_ventriculo_izquierdo", 0);
		
					swgrosorseptumdiastole=false;
				} 
			}

		}else{
	    	reemplazarinfotextbox("lvmass", "");
			reemplazarinfotextbox("grosorrelativo", "");
			reemplazarindexCombobox("hipertrofia_ventriculo_izquierdo", 0);
		}
		
		
		//VFD
		
		var swvfd= false;
		var vfd=recopilarinfotextbox('vfd_diastole');
		if(vfd.length > 0){
			swvfd=/^\d+\.?\d*$/.test(vfd);
			if(swvfd == false){
				alert("caracter invalido en vfd diastole del ventriculo izquierdo");
				reemplazarinfotextbox("vfd_diastole", "");
			}
			if(vfd.length > 2){
				if(parseFloat(vfd)<=0.0){
					alert("el vfd en diastole del ventriculo izquierdo no puede tener magnitud 0.0");
					reemplazarinfotextbox("vfd_diastole", "");
					swvfd=false;
				} 
			}

		}else{
			
			reemplazarinfotextbox("fevi", "");
			
		}
		
		//fin VFD
		
		
		//VFS
		
		var swvfs= false;
		var vfs=recopilarinfotextbox('vfs_sistole');
		if(vfs.length > 0){
			swvfs=/^\d+\.?\d*$/.test(vfs);
			if(swvfs == false){
				alert("caracter invalido en vfs sistole del ventriculo izquierdo");
				reemplazarinfotextbox("vfs_sistole", "");
			}
			if(vfs.length > 2){
				if(parseFloat(vfs)<=0.0){
					alert("el vfs en sistole del ventriculo izquierdo no puede tener magnitud 0.0");
					reemplazarinfotextbox("vfs_sistole", "");
					swvfs=false;
				} 
			}

		}else{
			
			reemplazarinfotextbox("fevi", "");
			
		}
		
		
		//fin VFS
		
		
		//calculo fe fevi
		
		if (swvfd==true){
			if(swvfs==true){
				
				var fevi = ((vfd - vfs)/vfd)*100;
				fevi = fevi.toFixed(0);
				reemplazarinfotextbox("fevi", fevi);
				
			}
		}
		
		//fin calculo fe fevi
		
		
	var swdiametrodiastole= false;
		var diametrodiastole=recopilarinfotextbox('diametro_ventriculo_izquierdo_diastole');
		if(diametrodiastole.length > 0){
			swdiametrodiastole=/^\d+\.?\d*$/.test(diametrodiastole);
			if(swdiametrodiastole == false){
				alert("caracter invalido en el diametro en diastole del ventriculo izquierdo");
				reemplazarinfotextbox("diametro_ventriculo_izquierdo_diastole", recopilarinfotextbox("diametro_ventriculo_izquierdo_diastole").substring(0, recopilarinfotextbox("diametro_ventriculo_izquierdo_diastole").length -1));
			}
			if(diametrodiastole.length > 2){
				if(parseFloat(diametrodiastole)<=0.0){
					alert("el diametro en diastole del ventriculo izquierdo no puede tener magnitud 0.0");
					reemplazarinfotextbox("diametro_ventriculo_izquierdo_diastole", "");
					reemplazarinfotextbox("lvmass", "");
					reemplazarinfotextbox("grosorrelativo", "");
					reemplazarindexCombobox("hipertrofia_ventriculo_izquierdo", 0);
		
					swdiametrodiastole=false;
				} 
			}

		}else{
			reemplazarinfotextbox("lvmass", "");
			reemplazarinfotextbox("grosorrelativo", "");
			reemplazarindexCombobox("hipertrofia_ventriculo_izquierdo", 0);
		}
		
		
	
	
	
		var swgrosorpareddiastole= false;
		var grosorpareddiastole=recopilarinfotextbox('grosor_pared_posterior_diastole');
		if(grosorpareddiastole.length > 0){
			swgrosorpareddiastole=/^\d+\.?\d*$/.test(grosorpareddiastole);
			if(swgrosorpareddiastole == false){
				alert("caracter invalido en el grosor de la pared posterior en diastole del ventriculo izquierdo");
				reemplazarinfotextbox("grosor_pared_posterior_diastole", recopilarinfotextbox("grosor_pared_posterior_diastole").substring(0, recopilarinfotextbox("grosor_pared_posterior_diastole").length -1));
			}
			if(grosorpareddiastole.length > 2){
				if(parseFloat(grosorpareddiastole)<=0.0){
					alert("el grosor de la pared posterio en diastole del ventriculo izquierdo no puede tener magnitud 0.0");
					reemplazarinfotextbox("grosor_pared_posterior_diastole", "");
					reemplazarinfotextbox("lvmass", "");
					reemplazarinfotextbox("grosorrelativo", "");
					reemplazarindexCombobox("hipertrofia_ventriculo_izquierdo", 0);
		
					swgrosorpareddiastole=false;
				} 
			}

		}else{
			reemplazarinfotextbox("lvmass", "");
			reemplazarinfotextbox("grosorrelativo", "");
			reemplazarindexCombobox("hipertrofia_ventriculo_izquierdo", 0);
		}
		
		
	/*	alert(swgrosorseptumdiastole);
		alert(swgrosorpareddiastole);
		alert(swdiametrodiastole);*/
		
		if(swgrosorseptumdiastole==true){
		
			if (generopaciente =="Masculino"){
			  if(grosorseptumdiastole <= 1.0){
    			  grosorseptumnormalaumentadodiastole=0;
    		  }else{
    			  grosorseptumnormalaumentadodiastole=1;
    		  }
    		  
             
			}else{
				  if(grosorseptumdiastole <= 0.9){
	    			  grosorseptumnormalaumentadodiastole=0;
	    		  }else{
	    			  grosorseptumnormalaumentadodiastole=1;
	    		  }
			}
			
			if(swgrosorpareddiastole==true){
				
	
				if (generopaciente =="Masculino"){
					 if(grosorpareddiastole <= 1.0){
		            	  grosorparednormalaumentadodiastole=0;
		    		  }else{
		    			  grosorparednormalaumentadodiastole=1;
		    		  }
				}
				else{
					 if(grosorpareddiastole <= 0.9){
		            	  grosorparednormalaumentadodiastole=0;
		    		  }else{
		    			  grosorparednormalaumentadodiastole=1;
		    		  }
				}
				 
				 
				 
				if(swdiametrodiastole==true){
					grosorseptumdiastolecm=grosorseptumdiastole;
					grosorseptumdiastolecm = 0.1*parseFloat(grosorseptumdiastolecm) ;
					grosorpareddiastolecm = grosorpareddiastole;
					grosorpareddiastolecm= 0.1*parseFloat(grosorpareddiastolecm);
					diametrodiastolecm=diametrodiastole;
					diametrodiastolecm=0.1*parseFloat(diametrodiastolecm);
					 var lvmass = 0.80*( 1.04 * ((Math.pow((parseFloat(grosorseptumdiastolecm)+parseFloat(grosorpareddiastolecm)+parseFloat(diametrodiastolecm)),3))-Math.pow(parseFloat(diametrodiastolecm),3)))+0.6;
			    //     alert("*****"+lvmass);
					
					 var bsa = parseFloat(recopilarinfotextbox("txt_sup_corp"));
			    //     alert("-----"+bsa);
					 var lvmassbsa= 0;
					 
			         if(bsa > 0){
			        	 
			        	 lvmassbsa = lvmass /bsa;
			        	 
			         }
	
			         
			         
					 var rwt = parseFloat(2*parseFloat(grosorpareddiastolecm)/parseFloat(diametrodiastolecm));
					 rwt = rwt.toFixed(2);
					 reemplazarinfotextbox("grosorrelativo", rwt);
					 
					 
					 
				     var rangolvmass = 0; // 0 es normal 1 es incrementado
				     var rangorwt =0;
				    // alert(""+generopaciente);
				     if (lvmassbsa > 0){
				    	 lvmassbsa=lvmassbsa.toFixed(2);
				    	 reemplazarinfotextbox("lvmass", lvmassbsa);
				    	 
				    	  if (generopaciente =="Masculino"){
					        	
				    		
				    		
				    	
				    		  
				    		  if (lvmassbsa <= 115){
				    			  rangolvmass=0;
				    		  }else{
				    			  rangolvmass=1;
				    		  }
				    		  
				    		  if (rwt <= 0.42){
				    			  rangorwt=0;
				    		  }else{
				    			  rangorwt=1;
				    		  }
				    		  
					         }else{
					        	  if (lvmassbsa <= 95){
					    			  rangolvmass=0;
					    		  }else{
					    			  rangolvmass=1;
					    		  }
					        	  if (rwt <= 0.42){
					        		  rangorwt=0;
					    		  }else{
					    			  rangorwt=1;
					    		  }
					         }
				    	  
				      if (rangolvmass ==0){
				    		  if (rangorwt ==0){
				    				reemplazarindexCombobox("hipertrofia_ventriculo_izquierdo", 1);
					    	  }else{
					    		  
					    			reemplazarindexCombobox("hipertrofia_ventriculo_izquierdo", 2);
					    	  }
				    		  
				    	  }else{
                              if (rangorwt ==0){
                          	  	reemplazarindexCombobox("hipertrofia_ventriculo_izquierdo", 3);
					    	  }else{
					    		  reemplazarindexCombobox("hipertrofia_ventriculo_izquierdo", 4);
					    		  
					    	  }
				    		  
				    	  }
				    	  
     			     }else{
     			   	 reemplazarinfotextbox("lvmass", "");
     			     }
				}
			}else{
				  grosorparednormalaumentadodiastole=0;
			}
		}else{
			  grosorseptumnormalaumentadodiastole=0;
		}
		
		
		break;
		
		
	case 1:
		var swlvmassbsa=false;
		var swrwt=false;
		var lvmassbsa=recopilarinfotextbox("lvmass") ;
		var rwt =recopilarinfotextbox("grosorrelativo");
		
		if(lvmassbsa.length > 0){
			swlvmassbsa=/^\d+\.?\d*$/.test(lvmassbsa);
			if(swlvmassbsa == false){
				alert("caracter invalido en el lvmass del ventriculo izquierdo");
				reemplazarinfotextbox("lvmass", recopilarinfotextbox("lvmass").substring(0, recopilarinfotextbox("lvmass").length -1));
			}
			if(lvmassbsa.length > 2){
				if(parseFloat(lvmassbsa)<=0.0){
					alert("el lvmass del ventriculo izquierdo no puede tener magnitud 0.0");
					reemplazarinfotextbox("lvmass", "");
					reemplazarindexCombobox("hipertrofia_ventriculo_izquierdo", 0);
		
					swlvmassbsa=false;
				} 
			}

		}
		
		if(rwt.length > 0){
			swrwt=/^\d+\.?\d*$/.test(rwt);
			if(swrwt == false){
				alert("caracter invalido en el rwt del ventriculo izquierdo");
				reemplazarinfotextbox("grosorrelativo", recopilarinfotextbox("grosorrelativo").substring(0, recopilarinfotextbox("grosorrelativo").length -1));
			}
			if(rwt.length > 2){
				if(parseFloat(rwt)<=0.0){
					alert("el rwt del ventriculo izquierdo no puede tener magnitud 0.0");
					reemplazarinfotextbox("grosorrelativo", "");
					reemplazarindexCombobox("hipertrofia_ventriculo_izquierdo", 0);
					swrwt=false;
				} 
			}

		}
		 
		 
	     var rangolvmass = 0; // 0 es normal 1 es incrementado
	     var rangorwt =0;

	     
	     
	     if(swlvmassbsa==true){
	    	 if(swrwt==true){
	   	    	  if (generopaciente =="Masculino"){
	   	    		  if (lvmassbsa <= 115){
	   	    			  rangolvmass=0;
	   	    		  }else{
	   	    			  rangolvmass=1;
	   	    		  }
	   	    		  
	   	    		  if (rwt <= 0.42){
	   	    			  rangorwt=0;
	   	    		  }else{
	   	    			  rangorwt=1;
	   	    		  }
	   	    		  
	   		         }else{
	   		        	  if (lvmassbsa <= 95){
	   		    			  rangolvmass=0;
	   		    		  }else{
	   		    			  rangolvmass=1;
	   		    		  }
	   		        	  if (rwt <= 0.42){
	   		        		  rangorwt=0;
	   		    		  }else{
	   		    			  rangorwt=1;
	   		    		  }
	   		         }
	   	    	  
	   	      if (rangolvmass ==0){
	   	    		  if (rangorwt ==0){
	   	    				reemplazarindexCombobox("hipertrofia_ventriculo_izquierdo", 1);
	   		    	  }else{
	   		    		  
	   		    			reemplazarindexCombobox("hipertrofia_ventriculo_izquierdo", 2);
	   		    	  }
	   	    		  
	   	    	  }else{
	                     if (rangorwt ==0){
	                 	  	reemplazarindexCombobox("hipertrofia_ventriculo_izquierdo", 3);
	   		    	  }else{
	   		    		  reemplazarindexCombobox("hipertrofia_ventriculo_izquierdo", 4);
	   		    		  
	   		    	  }
	   	    		  
	   	    	  }
	    	 }else{
	 			reemplazarindexCombobox("hipertrofia_ventriculo_izquierdo", 0);
	    	 }
	     }else{
				reemplazarindexCombobox("hipertrofia_ventriculo_izquierdo", 0);
	     }
		break;
		

	}
	
	ventriculo_izquierdo_generar_informe();
}

/************************************************************/
/********FUNCION DISTOLICA **********************************/
/************************************************************/




function funcion_diastolica_control(opcion){
	tipodisfunction = new Array(0,0,0);
	tipogradoDisfuncion = new Array(0,0,0);
	switch(opcion){
	
	case 0:

		var swseptal=false;
		var septal=recopilarinfotextbox('eprima_septal_funciondiastolica');
		if(septal.length > 0){
			swseptal=/^\d+$/.test(septal);
			if(swseptal == false){
				alert("caracter invalido en la eprima septal de la funcion diastolica ");
				reemplazarinfotextbox("eprima_septal_funciondiastolica", recopilarinfotextbox("eprima_septal_funciondiastolica").substring(0, recopilarinfotextbox("eprima_septal_funciondiastolica").length -1));
				 if(septal.length> 0){
					 swlateral=true;
				    }
			}
			if(parseInt(septal)<=0){
				swseptal = false;
				alert("la eprima septal de la funcion diastolica no puede tener magnitud 0");
				reemplazarinfotextbox("eprima_septal_funciondiastolica","");
				
		   }
		
		}
		
		var swlateral=false;
		var lateral=recopilarinfotextbox('eprima_lateral_funciondiastolica');
		if(lateral.length > 0){
			swlateral=/^\d+$/.test(lateral);
			if(swlateral == false){
				alert("caracter invalido en la eprima lateral de la funcion diastolica ");
				reemplazarinfotextbox("eprima_lateral_funciondiastolica", recopilarinfotextbox("eprima_lateral_funciondiastolica").substring(0, recopilarinfotextbox("eprima_lateral_funciondiastolica").length -1));
				 if(lateral.length> 0){
					 swlateral=true;
				    }
			
			}
			if(parseInt(lateral)<=0){
				swlateral = false;
				alert("la aprima lateral de la funcion diastolica no puede tener magnitud 0");
				reemplazarinfotextbox("eprima_lateral_funciondiastolica","");
				
		   }
		
		}
		
		
		var swvolauricula=false;
		var volauricula=recopilarinfotextbox('volauricula_funciondiastolica');
		if(volauricula.length > 0){
			swvolauricula=/^\d+$/.test(volauricula);
			if(swvolauricula == false){
				alert("caracter invalido en el volumen de la auricula izquierda de la funcion diastolica ");
				reemplazarinfotextbox("volauricula_funciondiastolica", recopilarinfotextbox("volauricula_funciondiastolica").substring(0, recopilarinfotextbox("volauricula_funciondiastolica").length -1));
			    if(volauricula.length> 0){
			    	swvolauricula=true;
			    }
			 
			
			}
			if(parseInt(volauricula)<=0){
				swvolauricula = false;
				alert("el volumen de la auricula izquierda de la funcion diastolica no puede tener magnitud 0");
				reemplazarinfotextbox("volauricula_funciondiastolica","");
				
		   }
		
		}
		
		
		 if(swseptal==true){
			
			if(parseInt(septal)>= 8){
				tipodisfunction[0]= parseInt(tipodisfunction[0])+1;
				tipodisfunction[1]= parseInt(tipodisfunction[1])+1;	
		     
		
				
				
			}
		 	else{
				
				tipodisfunction[2]= parseInt(tipodisfunction[2])+1;		

			}
		 }
			
		 
		 if(swlateral==true){
				
				if(parseInt(lateral)>= 10){
					tipodisfunction[0]= parseInt(tipodisfunction[0])+1;
					tipodisfunction[1]= parseInt(tipodisfunction[1])+1;	

					
					
				}
			 	else{
					
					tipodisfunction[2]= parseInt(tipodisfunction[2])+1;		

				}
			 }
			
		 if(swvolauricula==true){
				
				if(parseInt(volauricula)>= 34){
					tipodisfunction[1]= parseInt(tipodisfunction[1])+1;
					tipodisfunction[2]= parseInt(tipodisfunction[2])+1;	
			     
	
					
					
				}
			 	else{
					
					tipodisfunction[0]= parseInt(tipodisfunction[0])+1;		
					
	
				}
			 }
			
//alert(""+tipodisfunction.toString());
		 
			var auxcantidad1=0;
			var auxcantidad2=0;
			var tipodisfuncion=0;
			var j=tipodisfunction.length-1;
			while(j >= 0){
				auxcantidad1 = tipodisfunction[j];
				
				if(auxcantidad1 > auxcantidad2 ){
					auxcantidad2=auxcantidad1;
					tipodisfuncion = j;
				}
				
				j--;
			}
			
			
			// alert(j);
			if(auxcantidad2 ==0){
				tipodisfuncion = -1;
			}
			
			selectordisfuncion = tipodisfuncion;
			if(selectordisfuncion >1){
				
				swgradodisfuncion=true;
				aparecerElemento("gradofunciondiastolica");
			}
			else{
				swgradodisfuncion=false;
				desaparecerElemento("gradofunciondiastolica");
			}
	
		
		break;
	case 1:
		var swe=false;
		var e=recopilarinfotextbox('e_funciondiastolica');
		if(e.length > 0){
			swe=/^\d+$/.test(e);
			if(swe == false){
				alert("caracter invalido en el E de la funcion diastolica ");
				reemplazarinfotextbox("e_funciondiastolica", recopilarinfotextbox("e_funciondiastolica").substring(0, recopilarinfotextbox("e_funciondiastolica").length -1));
		
			}
			if(parseInt(e)<=0){
				swe = false;
				alert("el E de la funcion diastolica no puede tener magnitud 0");
				reemplazarinfotextbox("e_funciondiastolica","");
				
		   }
		
		}
		
		var swa=false;
		var a=recopilarinfotextbox('a_funciondiastolica');
		if(a.length > 0){
			swa=/^\d+$/.test(a);
			if(swa == false){
				alert("caracter invalido en el A de la funcion diastolica");
				reemplazarinfotextbox("a_funciondiastolica", recopilarinfotextbox("a_funciondiastolica").substring(0, recopilarinfotextbox("a_funciondiastolica").length -1));
			
			
			}
			if(parseInt(a)<=0){
				swa = false;
				alert("el A de la funcion diastolica no puede tener magnitud 0");
				reemplazarinfotextbox("a_funciondiastolica","");
				
		   }
		
		}
		
		
		var swdt=false;
		var dt=recopilarinfotextbox('dt_funciondiastolica');
		if(dt.length > 0){
			swdt=/^\d+$/.test(dt);
			if(swdt == false){
				alert("caracter invalido en el Tiempo de Desaceleracion de la funcion diastolica ");
				reemplazarinfotextbox("dt_funciondiastolica", recopilarinfotextbox("dt_funciondiastolica").substring(0, recopilarinfotextbox("dt_funciondiastolica").length -1));
			    if(dt.length> 0){
			    	swdt=true;
			    }
			 
			
			}
			if(parseInt(dt)<=0){
				swdt = false;
				alert("el Tiempo de Desaceleracion de la funcion diastolicaa no puede tener magnitud 0");
				reemplazarinfotextbox("dt_funciondiastolica","");
				
		   }
		
		}
		
		
		 if(swe==true){
				if(swa==true){
					var divae = parseInt(e)/parseInt(a);
					
					if(parseFloat(divae)<0.8){
						tipogradoDisfuncion[0]= parseInt(tipogradoDisfuncion[0])+1;
				
					}
				 	else if((parseFloat(divae)>=0.8)&&(parseFloat(divae)<2)){
						
				 		tipogradoDisfuncion[1]= parseInt(tipogradoDisfuncion[1])+1;

					}
				 	else{
				 		tipogradoDisfuncion[2]= parseInt(tipogradoDisfuncion[2])+1;
				 	}
					
				}
		
			 }
		
		 
		 if(swdt ==true){
			 
			 if(parseInt(dt)>200){
				 tipogradoDisfuncion[0]= parseInt(tipogradoDisfuncion[0])+1;
			 }else if((parseInt(dt)<=200)&&(parseInt(dt)>160)){
					tipogradoDisfuncion[1]= parseInt(tipogradoDisfuncion[1])+1;
				 
			 }else{
					tipogradoDisfuncion[2]= parseInt(tipogradoDisfuncion[2])+1;
			 }
			 
		 }
		 
		 
		 var auxcantidad1=0;
			var auxcantidad2=0;
			var gradodisfuncion=0;
			var j=tipogradoDisfuncion.length-1;
			while(j >= 0){
				auxcantidad1 = tipogradoDisfuncion[j];
				
				if(auxcantidad1 > auxcantidad2 ){
					auxcantidad2=auxcantidad1;
					gradodisfuncion = j;
				}
				
				j--;
			}
			
			
			// alert(j);
			if(auxcantidad2 ==0){
				gradodisfuncion = -1;
			}
			
			selectorgradodisfuncion = gradodisfuncion;
		 
		
		break;
	}
	
	
	ventriculo_izquierdo_generar_informe();
	// funcion_diastolica_generar_informe();
	
}

/*function funcion_diastolica_generar_informe(){

	
}*/

function ventriculo_izquierdo_generar_informe(){
	
	var cadena="";

	cadena ="De forma "+recopilarTextCombobox("forma_ventriculo_izquierdo");
	
    if((grosorseptumnormalaumentadodiastole==1)||(grosorparednormalaumentadodiastole==1)){
    	cadena += " con aumento del grosor en sus paredes";
    }else{
    	cadena += " sin aumento del grosor en sus paredes";
    }

	switch(selectordisfuncion){
	
	
	case 0:
		cadena += " ,funci\u00F3n diast\u00F3lica normal.";
		break;
		
	case 1:
		cadena += " ,funci\u00F3n diast\u00F3lica normal, coraz\u00F3n de atleta, o Constricci\u00F3n.";
		break;
		
	case 2:
		cadena += " ,disfunci\u00F3n diast\u00F3lica";
		break;
	
	}
	
	if(swgradodisfuncion==true){
		switch(selectorgradodisfuncion){
		case 0:
			cadena += " grado I.";
			break;
			
		case 1:
			cadena += " grado II.";
			break;
			
		case 2:
			cadena += " grado III.";
			break;
		}
		
	}

	if (tamanoinfotextbox("spinner")>0){
		
		cadena += "FEVI "+recopilarinfotextbox("spinner") +"%.";
	}
	
	
    reemplazarinfotextbox("observaciones_ventriculo_izquierdo", cadena);
	vistapreviaFormularios();
}


/************************************************************/
/********FUNCIONES INFORME VENTRICULO DERECHO****************/
/************************************************************/
var datos_diametrosdilatadosnormales_ventriculo_derecho = new Array();
var diametrosdilatadosnormales = new Array();
var funcion_sistolica = 0;

/************************************/
/********* VARIABLES ****************/
/************************************/

function iniciar_valores_ventriculo_derecho(){
	
	datos_diametrosdilatadosnormales_ventriculo_derecho = new Array("diametro basal","diametro medio","longitud base a apex","diametro arteria pulmonar","diametro valvula pulmonar","diametro tracto de salida");
	var i =0;
	for (i=0; i < datos_diametrosdilatadosnormales_ventriculo_derecho.length; i++){
		diametrosdilatadosnormales[i]=0;// 0 es normal
		
		
	}
	
	funcion_sistolica = 0;
	
}



function ventriculo_derecho_control_formulario(opcion){
	
	switch(opcion){

	case 1:
		var swtapse=false;
		var tapse=recopilarinfotextbox('tapse_ventriculo_derecho');
		if(tapse.length > 0){
			swtapse=/^\d+$/.test(tapse);
			if(swtapse == false){
				alert("caracter invalido en el tapse del ventriculo derecho ");
				reemplazarinfotextbox("tapse_ventriculo_derecho", recopilarinfotextbox("tapse_ventriculo_derecho").substring(0, recopilarinfotextbox("tapse_ventriculo_derecho").length -1));
			}
			
		   if(parseInt(tapse)<=0){
				alert("el tapse del ventriculo derecho no puede tener magnitud 0 ");
				funcion_sistolica=0;
				 reemplazarinfotextbox("tapse_ventriculo_derecho","");
				 swtapse=false;
		   }
		   
		}else{
			funcion_sistolica=0;
		}
		
		 if(swtapse==true){
			
			 if(parseInt(tapse) < 19){
				 funcion_sistolica=1;
			 }
			 else{
				 funcion_sistolica=0;
			 }
			
			 
			
		 
		 }
		break;
	
	case 2:
		var swdiametrobasal = false;
		var diametrobasal=recopilarinfotextbox('diametro_basal_ventriculo_derecho');
		if(diametrobasal.length > 0){
			swdiametrobasal=/^\d+\.?\d*$/.test(diametrobasal);
			if(swdiametrobasal == false){
				alert("caracter invalido en el diametro basal del ventriculo derecho");
				reemplazarinfotextbox("diametro_basal_ventriculo_derecho", recopilarinfotextbox("diametro_basal_ventriculo_derecho").substring(0, recopilarinfotextbox("diametro_basal_ventriculo_derecho").length -1));
			}
		//	if(diametrobasal.length > 3){
				if(parseFloat(diametrobasal)<2.0){
					alert("el diametro basal del ventriculo derecho no puede tener valores inferiores a 2.0");
					reemplazarinfotextbox("diametro_basal_ventriculo_derecho", "");
					diametrosdilatadosnormales[0] =0;
					swdiametrobasal=false;
				} 
			//}

		}else{
			diametrosdilatadosnormales[0] =0;
		}

	    if(swdiametrobasal==true){

	    	if(parseFloat(diametrobasal)>=2.9){

	    		diametrosdilatadosnormales[0]=1;
	    		
	    	}else{
	    		diametrosdilatadosnormales[0]=0;
	    	}
	    	
	    	   	
	    }
		break;
		
		
	case 3:
		var swdiametromedio = false;
		var diametromedio=recopilarinfotextbox('diametro_medio_ventriculo_derecho');
		if(diametromedio.length > 0){
			swdiametromedio=/^\d+\.?\d*$/.test(diametromedio);
			if(swdiametromedio == false){
				alert("caracter invalido en el diametro medio del ventriculo derecho");
				reemplazarinfotextbox("diametro_medio_ventriculo_derecho", recopilarinfotextbox("diametro_medio_ventriculo_derecho").substring(0, recopilarinfotextbox("diametro_medio_ventriculo_derecho").length -1));
			}
			if(diametromedio.length > 2){
				if(parseFloat(diametromedio)<2.7){
					alert("el diametro medio del ventriculo derecho no puede tener valores inferiores a 2.7");
					reemplazarinfotextbox("diametro_medio_ventriculo_derecho", "");
					diametrosdilatadosnormales[1] =0;
					swdiametromedio=false;
				} 
			}

		}else{
			diametrosdilatadosnormales[1] =0;
		}

	    if(swdiametromedio==true){
	
	    	if(parseFloat(diametromedio)>=3.4){
	    		
	    		diametrosdilatadosnormales[1]=1;
	    		
	    	}else{
	    		diametrosdilatadosnormales[1]=0;
	    	}
	    	
	    	   	
	    }
		break;
		
	case 4:
		var swapex = false;
		var apex=recopilarinfotextbox('longitud_base_apex_ventriculo_derecho');
		if(apex.length > 0){
			swapex=/^\d+\.?\d*$/.test(apex);
			if(swapex == false){
				alert("caracter invalido en la longitud base apex del ventriculo derecho");
				reemplazarinfotextbox("longitud_base_apex_ventriculo_derecho", recopilarinfotextbox("longitud_base_apex_ventriculo_derecho").substring(0, recopilarinfotextbox("longitud_base_apex_ventriculo_derecho").length -1));
			}
			if(apex.length > 2){
				if(parseFloat(apex)<7.1){
					alert("la longitud base apex del ventriculo derecho no puede tener valores inferiores a 7.1");
					reemplazarinfotextbox("longitud_base_apex_ventriculo_derecho", "");
					diametrosdilatadosnormales[2] =0;
					swapex=false;
				} 
			}

		}else{
			diametrosdilatadosnormales[2] =0;
		}

	    if(swapex==true){
	
	    	if(parseFloat(apex)>=8.0){
	    		
	    		diametrosdilatadosnormales[2]=1;
	    		
	    	}else{
	    		diametrosdilatadosnormales[2]=0;
	    	}
	    	
	    	   	
	    }
		break;
		
	case 5:
		var swdiametroarteriapulmonal = false;
		var diametroarteriapulmonal=recopilarinfotextbox('diametro_arteria_pulmonal_ventriculo_derecho');
		if(diametroarteriapulmonal.length > 0){
			swdiametroarteriapulmonal=/^\d+\.?\d*$/.test(diametroarteriapulmonal);
			if(swdiametroarteriapulmonal == false){
				alert("caracter invalido en el diametro de arteria pulmonar");
				reemplazarinfotextbox("diametro_arteria_pulmonal_ventriculo_derecho", recopilarinfotextbox("diametro_arteria_pulmonal_ventriculo_derecho").substring(0, recopilarinfotextbox("diametro_arteria_pulmonal_ventriculo_derecho").length -1));
			}
			if(diametroarteriapulmonal.length > 2){
				if(parseFloat(diametroarteriapulmonal)<2.5){
					alert("el diametro de arteria pulmonar no puede tener valores inferiores a 2.5");
					reemplazarinfotextbox("diametro_arteria_pulmonal_ventriculo_derecho", "");
					diametrosdilatadosnormales[3] =0;
					swdiametroarteriapulmonal=false;
				} 
			}

		}else{
			diametrosdilatadosnormales[3] =0;
		}

	    if(swdiametroarteriapulmonal==true){
	
	    	if(parseFloat(diametroarteriapulmonal)>=3.0){
	    		
	    		diametrosdilatadosnormales[3]=1;
	    		
	    	}else{
	    		diametrosdilatadosnormales[3]=0;
	    	}
	    	
	    	   	
	    }
		break;
		

	case 6:
		var swdiametrovalvulapulmonal = false;
		var diametrovalvulapulmonal=recopilarinfotextbox('diametro_valvula_pulmonal_ventriculo_derecho');
		if(diametrovalvulapulmonal.length > 0){
			swdiametrovalvulapulmonal=/^\d+\.?\d*$/.test(diametrovalvulapulmonal);
			if(swdiametrovalvulapulmonal == false){
				alert("caracter invalido en el diametro de la valvula pulmonar");
				reemplazarinfotextbox("diametro_valvula_pulmonal_ventriculo_derecho", recopilarinfotextbox("diametro_valvula_pulmonal_ventriculo_derecho").substring(0, recopilarinfotextbox("diametro_valvula_pulmonal_ventriculo_derecho").length -1));
			}
			if(diametrovalvulapulmonal.length > 2){
				if(parseFloat(diametrovalvulapulmonal)<1.7){
					alert("el diametro de la valvula pulmonar no puede tener valores inferiores a 1.7");
					reemplazarinfotextbox("diametro_arteria_pulmonal_ventriculo_derecho", "");
					diametrosdilatadosnormales[4] =0;
					swdiametrovalvulapulmonal=false;
				} 
			}

		}else{
			diametrosdilatadosnormales[4] =0;
		}

	    if(swdiametrovalvulapulmonal==true){
	
	    	if(parseFloat(diametrovalvulapulmonal)>=2.4){
	    		
	    		diametrosdilatadosnormales[4]=1;
	    		
	    	}else{
	    		diametrosdilatadosnormales[4]=0;
	    	}
	    	
	    	   	
	    }
		break;
	case 7:
		var swdtds = false;
		var dtds =recopilarinfotextbox('diametro_tracto_salida_ventriculo_derecho_ventriculo_derecho');
		if(dtds.length > 0){
			swdtds=/^\d+\.?\d*$/.test(dtds);
			if(swdtds == false){
				alert("caracter invalido en el diametro de tracto de salida del ventriculo derecho");
				reemplazarinfotextbox("diametro_valvula_pulmonal_ventriculo_derecho", recopilarinfotextbox("diametro_valvula_pulmonal_ventriculo_derecho").substring(0, recopilarinfotextbox("diametro_valvula_pulmonal_ventriculo_derecho").length -1));
			}
			if(dtds.length > 2){
				if(parseFloat(dtds)<1.5){
					alert("el diametro de tracto de salida del ventriculo derecho puede tener valores inferiores a 1.5");
					reemplazarinfotextbox("diametro_arteria_pulmonal_ventriculo_derecho", "");
					diametrosdilatadosnormales[5] =0;
					swdtds=false;
				} 
			}

		}else{
			diametrosdilatadosnormales[5] =0;
		}

	    if(swdtds==true){
	
	    	if(parseFloat(dtds)>=2.2){
	    		
	    		diametrosdilatadosnormales[5]=1;
	    		
	    	}else{
	    		diametrosdilatadosnormales[5]=0;
	    	}
	    	
	    	   	
	    }
		break;
	
	
	}
	
	
	
	
	 ventriculo_derecho_generar_informe();
}


function ventriculo_derecho_generar_informe(){
	
	
	var i =0;
	var swanormalidaddiametros=false;
	var cadenadiametros = "De tama\u00f1o normal";
	var cadenafuncionsistolica = "normal";
	for (i=0; i < diametrosdilatadosnormales.length; i++){
		
		if(parseInt(diametrosdilatadosnormales[i])==1){
			swanormalidaddiametros=true;
			i = diametrosdilatadosnormales.length -1;
		}
	}
	
	if(swanormalidaddiametros==true){
		
		cadenadiametros="dilatado";
	}
	
	
	if(funcion_sistolica==1){
		cadenafuncionsistolica="disminuida";
	}
	
	
	
	reemplazarinfotextbox("observaciones_ventriculo_derecho", cadenadiametros + " con funci\u00F3n sist\u00F3lica "+cadenafuncionsistolica+".");
	
	vistapreviaFormularios();
	
}


/************************************************************/
/********FUNCIONES INFORME AURICULA DERECHA******************/
/************************************************************/

var tamanoarea=0;

function auricula_derecha_control(opcion){

	switch(opcion){
	
	case 0:
		
		
		var swarea=false;
		var area=recopilarinfotextbox('area_auricula_derecha');
		if(area.length > 0){
			swarea=/^\d+$/.test(area);
			if(swarea == false){
				alert("caracter invalido en la area de la auricula derecha ");
				reemplazarinfotextbox("area_auricula_derecha", recopilarinfotextbox("area_auricula_derecha").substring(0, recopilarinfotextbox("area_auricula_derecha").length -1));
			}
			if(parseInt(area)<=0){
				swarea = false;
				alert("la area de la auricula derecha no puede tener magnitud 0");
				reemplazarinfotextbox("area_auricula_derecha","");
				
		   }
		
		}
		
		 if(swarea==true){
			
			 if(parseInt(area)<20){
				 tamanoarea=0;
			 }else{
				 tamanoarea=1;
			 }
			 
		 }
		
		break;
	
	}
	auricula_derecha_generar_informe();
	
}


function auricula_derecha_generar_informe(){

	if (tamanoarea > 0){
		
		reemplazarinfotextbox("observaciones_auricula_derecha", "Aur\u00edcula dilatada.");
	}else{

		reemplazarinfotextbox("observaciones_auricula_derecha", "De tama\u00f1o normal.");
		
	}
	
	vistapreviaFormularios();
}
	




/************************************************************/
/********FUNCIONES INFORME AURICULA IZQUIERDA****************/
/************************************************************/

var volauriculaizquierda=0;

function auricula_izquierda_control(opcion){

	switch(opcion){
	
	case 0:
		
		
		var swarea4c=false;
		var swarea2c=false;
		var swlon4c = false;
		var swlon2c = false;
		var swdap = false;
		
		var area4c=recopilarinfotextbox('area_auricula_izquierda_4C');
		var area2c=recopilarinfotextbox('area_auricula_izquierda_2C');
		var lon4c = recopilarinfotextbox('longitud_auricula_izquierda_4C');
		var lon2c = recopilarinfotextbox('longitud_auricula_izquierda_2C');
		var dap = recopilarinfotextbox('dap_auricula_izquierda');
		
		
		
		
		if(area4c.length > 0){
			swarea4c=/^\d+$/.test(area4c);
			if(swarea4c == false){
				alert("caracter invalido en el area 4C de la auricula izquierda ");
				reemplazarinfotextbox("area_auricula_izquierda_4C", recopilarinfotextbox("area_auricula_izquierda_4C").substring(0, recopilarinfotextbox("area_auricula_izquierda_4C").length -1));
			}
			if(parseInt(area4c)<=0){
				swarea4c = false;
				alert("el area 4C de la auricula izquierda tener magnitud 0");
				reemplazarinfotextbox("area_auricula_izquierda_4C","");
				reemplazarinfotextbox("volumen_auricula_izquierda","");
		   }
		
		}
		
		
		if(area2c.length > 0){
			swarea2c=/^\d+$/.test(area2c);
			if(swarea2c == false){
				alert("caracter invalido en el area 2C de la auricula izquierda ");
				reemplazarinfotextbox("area_auricula_izquierda_2C", recopilarinfotextbox("area_auricula_izquierda_2C").substring(0, recopilarinfotextbox("area_auricula_izquierda_2C").length -1));
			}
			if(parseInt(area2c)<=0){
				swarea2c = false;
				alert("el area 2C de la auricula izquierda tener magnitud 0");
				reemplazarinfotextbox("area_auricula_izquierda_2C","");
				reemplazarinfotextbox("volumen_auricula_izquierda","");
				
		   }
		
		}
		
		if(lon2c.length > 0){
			swlon2c=/^\d+$/.test(lon2c);
			if(swlon2c == false){
				alert("caracter invalido en la longitud del area 2C de la auricula izquierda ");
				reemplazarinfotextbox("longitud_auricula_izquierda_2C", recopilarinfotextbox("longitud_auricula_izquierda_2C").substring(0, recopilarinfotextbox("longitud_auricula_izquierda_2C").length -1));
			}
			if(parseInt(lon2c)<=0){
				swlon2c = false;
				alert(" la longitud del area 2C de la auricula izquierda tener magnitud 0");
				reemplazarinfotextbox("longitud_auricula_izquierda_2C","");
				
		   }
		
		}
		
		
		if(lon4c.length > 0){
			swlon4c=/^\d+$/.test(lon4c);
			if(swlon4c == false){
				alert("caracter invalido en la longitud del area 4C de la auricula izquierda ");
				reemplazarinfotextbox("longitud_auricula_izquierda_4C", recopilarinfotextbox("longitud_auricula_izquierda_4C").substring(0, recopilarinfotextbox("longitud_auricula_izquierda_4C").length -1));
			}
			if(parseInt(lon4c)<=0){
				swlon4c = false;
				alert(" la longitud del area 2C de la auricula izquierda tener magnitud 0");
				reemplazarinfotextbox("longitud_auricula_izquierda_4C","");
				
		   }
		
		}
		
		if(dap.length > 0){
			swdap=/^\d+$/.test(dap);
			if(swdap == false){
				alert("caracter invalido en DAP de la auricula izquierda ");
				reemplazarinfotextbox("dap_auricula_izquierda", "");
			}
			if(parseInt(dap)<=0){
				swdap = false;
				alert("el DAP de la auricula izquierda tener magnitud 0");
				reemplazarinfotextbox("dap_auricula_izquierda","");
				
		   }
		
		}
		
		
		 if(swarea4c==true){
			 if(swarea2c==true){
				 
				 var num1=0;
				 var num2=0;
					if(swlon4c==true){
						
						num1 =parseInt(lon4c);
						
					}
	                if(swlon2c==true){
						
						num2 =parseInt(lon2c);
						
					}
	                
	                if((num1>0 )||(num2>0)){
	                	var longitudescogida =0;
	                      if(num1 == num2){
	                    	  longitudescogida =num1;
	                      }
	                      else if(num1 > num2 ){
	                    	  
	                    	  if(num2 ==0){
	                    		  longitudescogida = num1;
	                    	  }else{
	                    		  longitudescogida = num2;
	                    	  }
	                      }
	                      else{
	                    	  if(num1 ==0){
	                    		  longitudescogida = num2;
	                    	  }else{
	                    		  longitudescogida = num1;
	                    	  }
	                      }
	                
	                      var calculovolumen = parseFloat(8/3 * Math.PI * (parseInt(area2c)*parseInt(area4c)/longitudescogida));
	                  
	                     if(calculovolumen < 28){
	                    	 volauriculaizquierda=0;
	                    	 
	                     }else if((calculovolumen >= 28)&&(calculovolumen < 34)){
	                    	 volauriculaizquierda=1;
	                     }else if((calculovolumen >= 34)&&(calculovolumen < 40)){
	                    	 volauriculaizquierda=2;
	                     }else{
	                    	 volauriculaizquierda=3;
	                     }
	                      
	                      reemplazarinfotextbox("volumen_auricula_izquierda",calculovolumen);
	                      
	                }else{
	                	 reemplazarinfotextbox("volumen_auricula_izquierda","");
	                	 volauriculaizquierda=0;
	                }
				 
			 }
		 }
		
		break;
		
	case 1:
		
		var swvolaurizq = false;
		var volaurizq =recopilarinfotextbox('volumen_auricula_izquierda');
		if(volaurizq.length > 0){
			swvolaurizq=/^\d+\.?\d*$/.test(volaurizq);
			if(swvolaurizq == false){
				alert("caracter invalido en el volumen auricula izquierda");
				reemplazarinfotextbox("volumen_auricula_izquierda", recopilarinfotextbox("volumen_auricula_izquierda").substring(0, recopilarinfotextbox("volumen_auricula_izquierda").length -1));
			}
			if(volaurizq > 2){
				if(parseFloat(volaurizq)<0.0){
					alert("el volumen auricula izquierda no puede tener magnitud 0.0");
					reemplazarinfotextbox("volumen_auricula_izquierda", "");
					swvolaurizq=false;
				} 
			}

		}
		
		if(swvolaurizq==true){
			
			if(volaurizq < 28){
	        	 volauriculaizquierda=0;
	        	 
	         }else if((volaurizq >= 28)&&(volaurizq < 34)){
	        	 volauriculaizquierda=1;
	         }else if((volaurizq >= 34)&&(volaurizq < 40)){
	        	 volauriculaizquierda=2;
	         }else{
	        	 volauriculaizquierda=3;
	         }
			
		}else{
			 volauriculaizquierda=0;
		}
		 
          
		
		
		break;
	
	}
	auricula_izquierda_generar_informe();
	
}


function auricula_izquierda_generar_informe(){
	switch(volauriculaizquierda){
	
	case 0:
		reemplazarinfotextbox("observaciones_auricula_izquierda", "Con tama\u00f1o y forma normal.");
		break;
	case 1:
		reemplazarinfotextbox("observaciones_auricula_izquierda", "Con dilataci\u00F3n leve.");
		break;
	case 2:
		reemplazarinfotextbox("observaciones_auricula_izquierda", "Con dilataci\u00F3n moderada.");
		break;
	case 3:
		reemplazarinfotextbox("observaciones_auricula_izquierda", "Con dilataci\u00F3n severa.");
		break;
	
	}
	vistapreviaFormularios();
}
	
var presion_rap;
var estado_diametro;
var estado_colapso;

function iniciar_valores_vena_cava(){
	 presion_rap=3;
	 estado_diametro="normal";
	 estado_colapso="con adecuado";
}

function control_vena_cava(opcion){
	
	switch (opcion){
	case 0:
		var diametro = recopilarValueCombobox("diametro_venacava");
		var colapso = recopilarValueCombobox("colpso_venacava");
		
		if(parseInt(diametro)<=1){
			estado_diametro ="normal";
			
			if(parseInt(colapso)<=1){
				presion_rap=3;
				estado_colapso= "con adecuado";
			}else{
				presion_rap=8;
				estado_colapso= "sin";
			}
			
			
		}else{
			estado_diametro ="aumentado";
			if(parseInt(colapso)<=1){
				presion_rap=8;
				estado_colapso= "con adecuado";
			}else{
				presion_rap=15;
				estado_colapso= "sin";
			}
			
		}
		
		calcular_psap_venacava();
		
		
	break;
	}
	
	vena_cava_generar_Informe();
}

function calcular_psap_venacava(){
	reemplazarinfotextbox("insuficiencia_velregurgitacion_valvula_tricuspidea","");
	var diametro = recopilarValueCombobox("diametro_venacava");
	var colapso = recopilarValueCombobox("colpso_venacava");
	var vel = recopilarinfotextbox("velregurgitacion_venacava");
	//var vel_valvula_tricuspidea= recopilarinfotextbox("insuficiencia_velregurgitacion_valvula_tricuspidea";
	var psap;
	//swtricuspidea = validar_campos_num ("insuficiencia_velregurgitacion_valvula_tricuspidea");
	 sw = validar_campos_num ("velregurgitacion_venacava");
	if ((vel.length!=0)&&(sw==true)){
		 reemplazarinfotextbox("insuficiencia_velregurgitacion_valvula_tricuspidea",vel);
		var v=Math.pow(vel,2);
	        if((diametro==1)&&(colapso==1)){
	        	psap= (4*v+3);
		
	        }else{
	        	if((diametro==2)&&(colapso==1)){
		        	psap= (4*v+8);
			
		        }else{
		        	if((diametro==2)&&(colapso==2)){
			        	psap= (4*v+15);
				
			        }else{
			        	if((diametro==1)&&(colapso==2)){
				        	psap= (4*v+3);
					
				        }
			        }
		        }
	        }
	}
	//alert(psap);
	
	if (psap!=undefined){
		reemplazarinfotextbox("psap_venacava", psap);
		reemplazarinfotextbox("psap_valvula_tricuspidea",psap);
	}else{
		reemplazarinfotextbox("psap_venacava", "");
		reemplazarinfotextbox("psap_valvula_tricuspidea","");
	}
	
}

function calcular_psap_venacava2(){
	reemplazarinfotextbox("velregurgitacion_venacava","");
	var diametro = recopilarValueCombobox("diametro_venacava");
	var colapso = recopilarValueCombobox("colpso_venacava");
	var vel = recopilarinfotextbox("insuficiencia_velregurgitacion_valvula_tricuspidea");
	//var vel_valvula_tricuspidea= recopilarinfotextbox("insuficiencia_velregurgitacion_valvula_tricuspidea";
	var psap;
	//swtricuspidea = validar_campos_num ("insuficiencia_velregurgitacion_valvula_tricuspidea");
	 sw = validar_campos_num ("insuficiencia_velregurgitacion_valvula_tricuspidea");
	if ((vel.length!=0)&&(sw==true)){
		 reemplazarinfotextbox("velregurgitacion_venacava",vel);
		var v=Math.pow(vel,2);
	        if((diametro==1)&&(colapso==1)){
	        	psap= (4*v+5);
		
	        }else{
	        	if((diametro==2)&&(colapso==1)){
		        	psap= (4*v+10);
			
		        }else{
		        	if((diametro==2)&&(colapso==2)){
			        	psap= (4*v+15);
				
			        }
		        }
	        }
	}
	//alert(psap);
	
	if (psap!=undefined){
		reemplazarinfotextbox("psap_venacava", psap);
		reemplazarinfotextbox("psap_valvula_tricuspidea",psap);
	}else{
		reemplazarinfotextbox("psap_venacava", "");
		reemplazarinfotextbox("psap_valvula_tricuspidea","");
	}
	
}

function vena_cava_generar_Informe(){
	
	
	var cadena_resultado = "De di\u00E1metro "+estado_diametro +" "+estado_colapso+" colapso inspiratorio.";
	reemplazarinfotextbox("observaciones_venacava", cadena_resultado);
}

/****************/
/*Funcion Vista Previa*/

var nombresFormularios = new Array("Justificaci\u00F3n:-Indicaci\u00F3n:","Aorta:","V\u00E1lvula Aorta:-V\u00E1lvula prot\u00E9sica A\u00F3rtica:","V\u00E1lvula Mitral:-V\u00E1lvula prot\u00E9sica Mitral:","V\u00E1lvula Tricusp\u00EDdea-V\u00E1lvula  Prot\u00E9sica Tricusp\u00EDdea:","V\u00E1lvula Pulmonar:-V\u00E1lvula  Prot\u00E9sica Pulmonar:","Ventr\u00EDculo Izquierdo:","Ventr\u00EDculo Derecho:","Aur\u00EDcula Izquierda:","Aur\u00EDcula Derecha:","Vena Cava:","Pericardio:");



function vistapreviaFormularios(){
	var i =0;
	var cadenaInformeGeneral = "";
	
	var arrayinfovalvulas= new Array();
	
	/*analisis_observaciones_aorta
	analisis_observaciones_mitral
	analisis_observaciones_tricuspidea
	analisis_observaciones_pulmonal*/
	
	for(i=0; i < nombresFormularios.length ; i++){
		
		switch(i){
		
		case 0:
			var encabezado = nombresFormularios[i].split("-");
			
			
			cadenaInformeGeneral += encabezado[0]+"\n";
			cadenaInformeGeneral += recopilarinfotextbox("justificacion")+"\n\n";
			cadenaInformeGeneral += encabezado[1]+"\n";
			cadenaInformeGeneral += recopilarTextCombobox("indicacion_informe");
			cadenaInformeGeneral += "\n\n";
			
			
	    break;
	    
		case 1:
			cadenaInformeGeneral +=  nombresFormularios[i]+"\n";
			cadenaInformeGeneral += recopilarinfotextbox("analisis_aorta_observaciones");
			cadenaInformeGeneral += "\n\n";
			break;
			
		case 2:
			arrayinfovalvulas = nombresFormularios[i].split("-");
			
			if (swProtesisValvulaAorta == false){
				cadenaInformeGeneral +=  arrayinfovalvulas[0]+"\n";
				cadenaInformeGeneral += recopilarinfotextbox("analisis_observaciones_aorta");
				cadenaInformeGeneral += "\n\n";
				
			}else{
				cadenaInformeGeneral +=  arrayinfovalvulas[1]+"\n";
				cadenaInformeGeneral += recopilarinfotextbox("analisis_observaciones_aorta_protesica");
				cadenaInformeGeneral += "\n\n";
			}
			
			

			break;
			
			
			
		case 3:
	arrayinfovalvulas = nombresFormularios[i].split("-");
			
			if (swProtesisValvulaMitral == false){
				cadenaInformeGeneral +=  arrayinfovalvulas[0]+"\n";
				cadenaInformeGeneral += recopilarinfotextbox("analisis_observaciones_mitral");
				cadenaInformeGeneral += "\n\n";
				
			}else{
				cadenaInformeGeneral +=  arrayinfovalvulas[1]+"\n";
				cadenaInformeGeneral += recopilarinfotextbox("analisis_observaciones_mitral_protesica");
				cadenaInformeGeneral += "\n\n";
			}
		break;
		case 4:
	        arrayinfovalvulas = nombresFormularios[i].split("-");
			
			if (swProtesisValvulaTricuspidea == false){
				cadenaInformeGeneral +=  arrayinfovalvulas[0]+"\n";
				cadenaInformeGeneral += recopilarinfotextbox("analisis_observaciones_tricuspidea");
				cadenaInformeGeneral += "\n\n";
				
			}else{
				cadenaInformeGeneral +=  arrayinfovalvulas[1]+"\n";
				cadenaInformeGeneral += recopilarinfotextbox("analisis_observaciones_tricuspidea_protesica");
				cadenaInformeGeneral += "\n\n";
			}
			
			break;
		case 5:
	        arrayinfovalvulas = nombresFormularios[i].split("-");
			
			if (swProtesisValvulaPulmonal == false){
				cadenaInformeGeneral +=  arrayinfovalvulas[0]+"\n";
				cadenaInformeGeneral += recopilarinfotextbox("analisis_observaciones_pulmonal");
				cadenaInformeGeneral += "\n\n";
				
			}else{
				cadenaInformeGeneral +=  arrayinfovalvulas[1]+"\n";
				cadenaInformeGeneral += recopilarinfotextbox("analisis_observaciones_pulmonal_protesica");
				cadenaInformeGeneral += "\n\n";
			}
			
			break;
			
		case 6:
			cadenaInformeGeneral +=  nombresFormularios[i]+"\n";
			cadenaInformeGeneral += recopilarinfotextbox("observaciones_ventriculo_izquierdo");
			cadenaInformeGeneral += "\n\n";
			
			
			break;
		case 7:
			cadenaInformeGeneral +=  nombresFormularios[i]+"\n";
			cadenaInformeGeneral += recopilarinfotextbox("observaciones_ventriculo_derecho");
			cadenaInformeGeneral += "\n\n";
			
			
			break;
		case 8:
			cadenaInformeGeneral +=  nombresFormularios[i]+"\n";
			cadenaInformeGeneral += recopilarinfotextbox("observaciones_auricula_izquierda");
			cadenaInformeGeneral += "\n\n";
			
			
			break;

		case 9:
			cadenaInformeGeneral +=  nombresFormularios[i]+"\n";
			cadenaInformeGeneral += recopilarinfotextbox("observaciones_auricula_derecha");
			cadenaInformeGeneral += "\n\n";
			
			
			break;
			
		case 10:
			
			
			cadenaInformeGeneral +=  nombresFormularios[i]+"\n";
			cadenaInformeGeneral += recopilarinfotextbox("observaciones_venacava");
			cadenaInformeGeneral += "\n\n";

			break;
			
	case 11:
			
			
			cadenaInformeGeneral +=  nombresFormularios[i]+"\n";
			cadenaInformeGeneral += recopilarinfotextbox("observaciones_pericardio");
			cadenaInformeGeneral += "\n\n";
					
			
			break;
			
		}
		
		
	}
	
	reemplazarinfotextbox("vista_previa",cadenaInformeGeneral);
	
	
	
}
function iniciar_valores_pericardio(){
	grado_derrame_pericardio="";
}



var grado_derrame_pericardio="";
function control_pericardio(opcion){

	switch (opcion) {
	case 0:
		
		if(parseInt(recopilarinfoRadios("efusion_pericardio"))>0){
			
			aparecerElemento("analisis_loculada_pericardio");
			aparecerElemento("analisis_loculada_opcionno_pericardio");
		
			
		}else{
			desaparecerElemento("analisis_loculada_pericardio");
			desaparecerElemento("analisis_loculada_opcionsi_pericardio");	
			desaparecerElemento("analisis_loculada_opcionno_pericardio");
			reiniciarRadiosButtons("loculada_pericardio", "0");
			
		}
		
		break;

	case 1:
		
	if(parseInt(recopilarinfoRadios("loculada_pericardio"))>0){
			
			aparecerElemento("analisis_loculada_opcionsi_pericardio");
			desaparecerElemento("analisis_loculada_opcionno_pericardio");
		
			
		}else{
			aparecerElemento("analisis_loculada_opcionno_pericardio");
			desaparecerElemento("analisis_loculada_opcionsi_pericardio");
			
		}
		
		
		
		
		break;
		
		
	case 2:
		
		var swmedicionpericardio= false;
		var medicionpericardio=recopilarinfotextbox('medicion_pericardio');
		if(medicionpericardio.length > 0){
			swmedicionpericardio=/^\d+\.?\d*$/.test(medicionpericardio);
			if(swmedicionpericardio == false){
				alert("caracter invalido en medicion del derrame del pericardico ");
				reemplazarinfotextbox("medicion_pericardio", recopilarinfotextbox("medicion_pericardio").substring(0, recopilarinfotextbox("medicion_pericardio").length -1));
			}
			if(medicionpericardio.length > 2){
				if(parseFloat(medicionpericardio)<=0.0){
					alert("la medicion del derrame del pericardico no puede tener magnitud 0.0");
					reemplazarinfotextbox("medicion_pericardio", "");
				
					grado_derrame_pericardio="";
					swmedicionpericardio=false;
				} 
			}

		}else{
			grado_derrame_pericardio="";
		}
		
		
		if (swmedicionpericardio==true){
			
			if(parseFloat(medicionpericardio)< 1.0){
				grado_derrame_pericardio="leve";
			}else if((parseFloat(medicionpericardio)>= 1.0)&&(parseFloat(medicionpericardio)< 2.0)){
				grado_derrame_pericardio="moderado";
			}else{
				grado_derrame_pericardio="severo";
			}
			
		}
		
			
			
			break;
	}
	
	pericardio_generar_informe();
}



function pericardio_generar_informe(){
	
	
   var cadena_informe_pericadio= "De grosor "+recopilarTextCombobox("grosor_pericardio") + " y de aspecto "+recopilarTextCombobox("apariencia_pericardio");
	if(parseInt(recopilarinfoRadios("efusion_pericardio"))>0){
		cadena_informe_pericadio+= " con evidencia de derrame";
		
		if(parseInt(recopilarinfoRadios("loculada_pericardio"))>0){

			if(tamanoinfotextbox("localizacion_loculado_pericardio")>0){
				cadena_informe_pericadio+= " localizado en " + recopilarinfotextbox("localizacion_loculado_pericardio");
				
			}
	        if(tamanoinfotextbox("grosor_loculado_pericardio")>0){
	        	cadena_informe_pericadio+= " con un grosor de " +recopilarinfotextbox("grosor_loculado_pericardio");
			}
		
		}else{
			
			if (grado_derrame_pericardio!=""){
				
				cadena_informe_pericadio+= " de grado "+grado_derrame_pericardio;
			}
			
		}
		
		
	}else{
		cadena_informe_pericadio += " sin evidencia de derrame";
	}
	cadena_informe_pericadio +=".";
	
	reemplazarinfotextbox("observaciones_pericardio", cadena_informe_pericadio);
	vistapreviaFormularios();
}


/****************/

function enviar_data(){
	alert("generando informe de ecocardiograma...");
    /*datos encabezado*/
	var indicacion_DATA= recopilarValueCombobox("indicacion_informe");
	var justificacion = recopilarinfotextbox("justificacion");
	var conclusiones = recopilarinfotextbox("conclusiones");
	
	var recomendaciones = recopilarinfotextbox("recomendaciones");
	if(conclusiones.length >0){
		desactivarelementoFormulario("envio");	
		desactivarelementoFormulario("anular");	
	/*
	if (recomendaciones.length ==0){
		recomendaciones = "null";
	}
	*/
	/*
	//if(justificacion.length >0){
		if(conclusiones.length >0){
		desactivarelementoFormulario("envio");	
		desactivarelementoFormulario("anular");	
		
		
		//nombre_valvulas
		/*Valvulas Recopilacion Insuficiencias Aorta y Mitral*/

	/*	var Aspecto_valvula_Aorta_DATA = new Array();
		var Aspecto_valvula_Mitral_DATA = new Array();
		var Aspecto_valvula_Tricuspidea_DATA = new Array();
		var Aspecto_valvula_Pulmonal_DATA = new Array();*/
		
		var	Aspecto_valvulas_DATA = new Array();
		var Insuficiencias_valvula_Aorta_DATA = new Array();
		var Insuficiencias_valvula_Mitral_DATA = new Array();
		var Insuficiencias_valvula_Tricuspidea_DATA = new Array();
		var Insuficiencias_valvula_Pulmonal_DATA = new Array();
		var Estenosis_valvula_Aorta_DATA = new Array();
		var Estenosis_valvula_Mitral_DATA = new Array();
		var Estenosis_valvula_Tricuspidea_DATA = new Array();
	    var Estenosis_valvula_Pulmonal_DATA = new Array(); 
	    
	    
	    
	    
	    var Datos_valvula_Protesica_Aorta_DATA = new Array();
	    var Datos_valvula_Protesica_Mitral_DATA = new Array();
	    var Datos_valvula_Protesica_Tricuspidea_DATA = new Array();
	    var Datos_valvula_Protesica_Pulmonal_DATA = new Array();
	    
	    var i =0;
	    var k =0;
	    
	    
	
	
	    for (i =0; i <nombre_tecnico_valvulas.length ; i++){
	    	
	    	switch(i){
	    	
	    	case 0:
	    	    
	    		if (swProtesisValvulaAorta== false){
	    	
	    			Aspecto_valvulas_DATA[0]= recopilarValueCombobox("tipo_aspecto_valvula_aorta") +"-"+analisis_aspectos_valvulas[0];
	    			
	    			// datos cualitativos
	    			Insuficiencias_valvula_Aorta_DATA[0]=recopilarValueCombobox("insuficiencia_jetcentrallvot_valvula_aorta");
	    			Insuficiencias_valvula_Aorta_DATA[1]=recopilarValueCombobox("insuficiencia_venacontracta_valvula_aorta");
	    			Insuficiencias_valvula_Aorta_DATA[2]=recopilarValueCombobox("insuficiencia_revflujodiastolico_valvula_aorta");
	    			Insuficiencias_valvula_Aorta_DATA[3]=recopilarValueCombobox("insuficiencia_tiempohemipresion_valvula_aorta");
	    			//datos cuantitativos
	    			//eroa
	    			Insuficiencias_valvula_Aorta_DATA[4]=recopilarinfotextbox('insuficiencia_radiopisa_valvula_aorta');
	    			Insuficiencias_valvula_Aorta_DATA[5]=recopilarinfotextbox('insuficiencia_velaliasing_valvula_aorta');
	    			Insuficiencias_valvula_Aorta_DATA[6]=recopilarinfotextbox('insuficiencia_velpicojetregurgitacion_valvula_aorta');
	    			Insuficiencias_valvula_Aorta_DATA[7]=recopilarinfotextbox('insuficiencia_eroa_valvula_aorta');
	    	    	// rvol y fr	
	    			Insuficiencias_valvula_Aorta_DATA[8]= recopilarinfotextbox("insuficiencia_lvotd_valvula_aorta");
	    			Insuficiencias_valvula_Aorta_DATA[9]= recopilarinfotextbox("insuficiencia_vtilvot_valvula_aorta");
	    			Insuficiencias_valvula_Aorta_DATA[10]= recopilarinfotextbox("insuficiencia_mad_valvula_aorta");
	    			Insuficiencias_valvula_Aorta_DATA[11]= recopilarinfotextbox("insuficiencia_vtima_valvula_aorta");
	    			Insuficiencias_valvula_Aorta_DATA[12]= recopilarinfotextbox("insuficiencia_rvol_valvula_aorta");
	    			Insuficiencias_valvula_Aorta_DATA[13]= recopilarinfotextbox("insuficiencia_fr_valvula_aorta");
	    			
	    			
	    			
	    			Estenosis_valvula_Aorta_DATA[0]=recopilarinfotextbox("estenosis_gradientepico_valvula_aorta");
	    			Estenosis_valvula_Aorta_DATA[1]=recopilarinfotextbox("estenosis_gradientemedio_valvula_aorta");
	    			Estenosis_valvula_Aorta_DATA[2]=recopilarinfotextbox("estenosis_velocidadpico_valvula_aorta");
	    			Estenosis_valvula_Aorta_DATA[3]=recopilarinfotextbox("estenosis_velpicotsvi_valvula_aorta");
	    			Estenosis_valvula_Aorta_DATA[4]=recopilarinfotextbox("estenosis_vti_valvula_aorta");
	    			Estenosis_valvula_Aorta_DATA[5]=recopilarinfotextbox("estenosis_tsvi_valvula_aorta");
	    			Estenosis_valvula_Aorta_DATA[6]=recopilarinfotextbox("estenosis_vtitsvi_valvula_aorta");
	    			Estenosis_valvula_Aorta_DATA[7]=recopilarinfotextbox("estenosis_ava_valvula_aorta");
	    			Estenosis_valvula_Aorta_DATA[8]=recopilarinfotextbox("estenosis_avaindexado_valvula_aorta");
	    			Estenosis_valvula_Aorta_DATA[9]=recopilarinfotextbox("estenosis_velpicotsvi_valvula_aorta");
	    			Estenosis_valvula_Aorta_DATA[10]=recopilarinfotextbox("estenosis_velradio_valvula_aorta");
	    			
	    		}else{
	    			
	    			
	    		    	Datos_valvula_Protesica_Aorta_DATA[0]=recopilarValueCombobox("protesis_valvula_protesica_aorta");
	    				Datos_valvula_Protesica_Aorta_DATA[1]=recopilarinfoRadios("regurgitacion_paravalvular_valvula_aorta_protesica");
	    				Datos_valvula_Protesica_Aorta_DATA[2]=recopilarValueCombobox("contorno_jet_valvula_aorta_protesica");
	    				Datos_valvula_Protesica_Aorta_DATA[3]=recopilarValueCombobox("tiempo_de_aceleracion_valvula_aorta_protesica");
	    				Datos_valvula_Protesica_Aorta_DATA[4]=recopilarinfotextbox("velocidad_pico_valvula_aorta_protesica");
	    				Datos_valvula_Protesica_Aorta_DATA[5]=recopilarinfotextbox("gradiente_medio_valvula_aorta_protesica");
	    				Datos_valvula_Protesica_Aorta_DATA[6]=recopilarinfotextbox("vtits_valvula_aorta_protesica");
	    				Datos_valvula_Protesica_Aorta_DATA[7]=recopilarinfotextbox("vti_valvula_aorta_protesica");
	    				Datos_valvula_Protesica_Aorta_DATA[8]=recopilarinfotextbox("radio_valvula_aorta_protesica");
	    				Datos_valvula_Protesica_Aorta_DATA[9]=recopilarinfotextbox("dvi_valvula_aorta_protesica");
	    				Datos_valvula_Protesica_Aorta_DATA[10]=recopilarinfotextbox("csa_valvula_aorta_protesica");
	    				Datos_valvula_Protesica_Aorta_DATA[11]=recopilarinfotextbox("area_efectiva_valvula_aorta_protesica");
	    			
	    		}
	    		
	    	
	    		
	    		break;
	    		
	    		
	    	case 1:
	    	
	    	if(swProtesisValvulaMitral ==false){

    			Aspecto_valvulas_DATA[1]= recopilarValueCombobox("tipo_aspecto_valvula_mitral") +"-"+analisis_aspectos_valvulas[1];
	    		// datos cualitativos
	    		Insuficiencias_valvula_Mitral_DATA[0]=recopilarValueCombobox("insuficiencia_venacontracta_valvula_mitral");
	    		Insuficiencias_valvula_Mitral_DATA[1]=recopilarValueCombobox("insuficiencia_jetcentral_valvula_mitral");
	    		Insuficiencias_valvula_Mitral_DATA[2]=recopilarValueCombobox("insuficiencia_prolapso_valvula_mitral");
	    		Insuficiencias_valvula_Mitral_DATA[3]=recopilarValueCombobox("insuficiencia_flujovenas_valvula_mitral");
	    		Insuficiencias_valvula_Mitral_DATA[4]=recopilarValueCombobox("insuficiencia_flujotrans_valvula_mitral");
	    		Insuficiencias_valvula_Mitral_DATA[5]=recopilarValueCombobox("insuficiencia_densidadcwdoppler_valvula_mitral");
	    		Insuficiencias_valvula_Mitral_DATA[6]=recopilarValueCombobox("insuficiencia_formajetcwdoppler_valvula_mitral");
	    		Insuficiencias_valvula_Mitral_DATA[7]=recopilarValueCombobox("insuficiencia_tamventriculo_valvula_mitral");
	    		//datos cuantitativos
	    		//eroa
	    		Insuficiencias_valvula_Mitral_DATA[8]=recopilarinfotextbox('insuficiencia_radiopisa_valvula_mitral');
	    		Insuficiencias_valvula_Mitral_DATA[9]=recopilarinfotextbox('insuficiencia_velaliasing_valvula_mitral');
	    		Insuficiencias_valvula_Mitral_DATA[10]=recopilarinfotextbox('insuficiencia_velpicojetregurgitacion_valvula_mitral');
	    		Insuficiencias_valvula_Mitral_DATA[11]=recopilarinfotextbox('insuficiencia_eroa_valvula_mitral');
	    		// rvol y fr	
	    		Insuficiencias_valvula_Mitral_DATA[12]= recopilarinfotextbox("insuficiencia_mad_valvula_mitral");
	    		Insuficiencias_valvula_Mitral_DATA[13]= recopilarinfotextbox("insuficiencia_vtima_valvula_mitral");
	    		Insuficiencias_valvula_Mitral_DATA[14]= recopilarinfotextbox("insuficiencia_pad_valvula_mitral");
	    		Insuficiencias_valvula_Mitral_DATA[15]= recopilarinfotextbox("insuficiencia_vtipa_valvula_mitral");
	    		Insuficiencias_valvula_Mitral_DATA[16]= recopilarinfotextbox("insuficiencia_rvol_valvula_mitral");
	    		Insuficiencias_valvula_Mitral_DATA[17]=	recopilarinfotextbox("insuficiencia_fr_valvula_mitral");
	    		
	    		
	    		Estenosis_valvula_Mitral_DATA[0]=recopilarinfotextbox("estenosis_gradientepico_valvula_mitral");
	    		Estenosis_valvula_Mitral_DATA[1]=recopilarinfotextbox("estenosis_gradientemedio_valvula_mitral");
	    		Estenosis_valvula_Mitral_DATA[2]=recopilarinfotextbox("estenosis_velocidadpico_valvula_mitral");
	    		Estenosis_valvula_Mitral_DATA[3]=recopilarinfotextbox("estenosis_velocidadmedio_valvula_mitral");
	    		Estenosis_valvula_Mitral_DATA[4]=recopilarinfotextbox("estenosis_vti_valvula_mitral");
	    		Estenosis_valvula_Mitral_DATA[5]=recopilarinfotextbox("estenosis_thp_valvula_mitral");
	    		Estenosis_valvula_Mitral_DATA[6]=recopilarinfotextbox("estenosis_area_valvula_mitral");
	    									
	    	}else{
	    		Datos_valvula_Protesica_Mitral_DATA[0]= recopilarValueCombobox("protesis_valvula_protesica_mitral");
	    		Datos_valvula_Protesica_Mitral_DATA[1]=recopilarinfoRadios("regurgitacion_paravalvular_valvula_mitral_protesica");
	    		Datos_valvula_Protesica_Mitral_DATA[2]=recopilarValueCombobox("tiempo_de_hemipresion_valvula_mitral_protesica");
	    		Datos_valvula_Protesica_Mitral_DATA[3]=recopilarinfotextbox("velocidad_pico_valvula_mitral_protesica");
	    		Datos_valvula_Protesica_Mitral_DATA[4]=recopilarinfotextbox("gradiente_medio_valvula_mitral_protesica");
	    		Datos_valvula_Protesica_Mitral_DATA[5]=recopilarinfotextbox("vtits_valvula_mitral_protesica");
	    		Datos_valvula_Protesica_Mitral_DATA[6]=recopilarinfotextbox("vti_valvula_mitral_protesica");
	    		Datos_valvula_Protesica_Mitral_DATA[7]=recopilarinfotextbox("radio_valvula_mitral_protesica");
	    		Datos_valvula_Protesica_Mitral_DATA[8]=recopilarinfotextbox("dvi_valvula_mitral_protesica");
	    		Datos_valvula_Protesica_Mitral_DATA[9]=recopilarinfotextbox("csa_valvula_mitral_protesica");
	    		Datos_valvula_Protesica_Mitral_DATA[10]=recopilarinfotextbox("eoa_valvula_mitral_protesica");
	    	}
	    		
	    		break;
	    		
	    		
	    	case 2:
	    		
	    		if(swProtesisValvulaTricuspidea == false){
	    			Aspecto_valvulas_DATA[2]= recopilarValueCombobox("tipo_aspecto_valvula_tricuspidea") +"-"+analisis_aspectos_valvulas[2];

	    			for (k=0;k < datos_insuficiencia_valvula_tricuspidea.length;k++){
	    				Insuficiencias_valvula_Tricuspidea_DATA[k]= recopilarinfotextbox("insuficiencia_"+datos_insuficiencia_valvula_tricuspidea[k]+"_"+"valvula_tricuspidea");
	    			}
	    			Estenosis_valvula_Tricuspidea_DATA[0]=recopilarinfotextbox("estenosis_gradientepico_valvula_tricuspidea");
	    			Estenosis_valvula_Tricuspidea_DATA[1]=recopilarinfotextbox("estenosis_gradientemedio_valvula_tricuspidea");
	    			Estenosis_valvula_Tricuspidea_DATA[2]=recopilarinfotextbox("estenosis_velocidadpico_valvula_tricuspidea");
	    			Estenosis_valvula_Tricuspidea_DATA[3]=recopilarinfotextbox("estenosis_velocidadmedio_valvula_tricuspidea");
	    			Estenosis_valvula_Tricuspidea_DATA[4]=recopilarinfotextbox("estenosis_thp_valvula_tricuspidea");
	    			Estenosis_valvula_Tricuspidea_DATA[5]=recopilarinfotextbox("estenosis_vtipulmonal_valvula_tricuspidea");
	    			Estenosis_valvula_Tricuspidea_DATA[6]=recopilarinfotextbox("estenosis_diametropulmonal_valvula_tricuspidea");
	    			Estenosis_valvula_Tricuspidea_DATA[6]=recopilarinfotextbox("estenosis_areavalvular_valvula_tricuspidea");

	    		}
	    		else{
	    			
		    		Datos_valvula_Protesica_Tricuspidea_DATA[0]=recopilarValueCombobox("protesis_valvula_protesica_tricuspidea");
		    		Datos_valvula_Protesica_Tricuspidea_DATA[1]=recopilarinfoRadios("regurgitacion_paravalvular_valvula_tricuspidea_protesica");
		    		Datos_valvula_Protesica_Tricuspidea_DATA[2]=recopilarinfotextbox("velocidad_pico_valvula_tricuspidea_protesica");
		    		Datos_valvula_Protesica_Tricuspidea_DATA[3]=recopilarinfotextbox("gradiente_medio_valvula_tricuspidea_protesica");
		    		Datos_valvula_Protesica_Tricuspidea_DATA[4]=recopilarinfotextbox("tiempo_de_hemipresion_valvula_tricuspidea_protesica");
		    		
	    		}
	    		
	    	
	    	break;
	    	
	    	case 3:
	    	if(swProtesisValvulaPulmonal == false){
	   
    	
    			Aspecto_valvulas_DATA[3]= recopilarValueCombobox("tipo_aspecto_valvula_pulmonal") +"-"+analisis_aspectos_valvulas[3];
    	
	    		for (k=0;k < datos_insuficiencia_valvula_pulmonal.length;k++){
	    			Insuficiencias_valvula_Pulmonal_DATA[k]= recopilarinfotextbox("insuficiencia_"+datos_insuficiencia_valvula_pulmonal[k]+"_"+"valvula_pulmonal");
	    		}
	    		    Estenosis_valvula_Pulmonal_DATA[0]=recopilarinfotextbox("estenosis_gradientepico_valvula_pulmonal");
	    		    Estenosis_valvula_Pulmonal_DATA[1]=recopilarinfotextbox("estenosis_gradientemedio_valvula_pulmonal");
	    		    Estenosis_valvula_Pulmonal_DATA[2]=recopilarinfotextbox("estenosis_velocidadpico_valvula_pulmonal");
	    		    Estenosis_valvula_Pulmonal_DATA[3]=recopilarinfotextbox("estenosis_velocidadmedio_valvula_pulmonal");
	    		    Estenosis_valvula_Pulmonal_DATA[4]=recopilarinfotextbox("estenosis_vti_valvula_pulmonal");
	    		    Estenosis_valvula_Pulmonal_DATA[5]=recopilarinfotextbox("estenosis_thp_valvula_pulmonal");
	    	}
	    		
	    	else{
	    		Datos_valvula_Protesica_Pulmonal_DATA[0]= recopilarValueCombobox("protesis_valvula_protesica_pulmonal");
	    		Datos_valvula_Protesica_Pulmonal_DATA[1]= recopilarinfoRadios("regurgitacion_paravalvular_valvula_pulmonal_protesica");
	    		Datos_valvula_Protesica_Pulmonal_DATA[2]= recopilarinfotextbox("velocidad_pico_valvula_pulmonal_protesica");
	    		Datos_valvula_Protesica_Pulmonal_DATA[3]=recopilarinfoRadios("engrosado_valvula_pulmonal_protesica");
	    		Datos_valvula_Protesica_Pulmonal_DATA[4]=recopilarinfoRadios("estrechamiento_valvula_pulmonal_protesica");
	    		Datos_valvula_Protesica_Pulmonal_DATA[5]=recopilarinfoRadios("estudios_seriados_valvula_pulmonal_protesica");
	    		Datos_valvula_Protesica_Pulmonal_DATA[6]=recopilarinfoRadios("disfuncion_seriados_valvula_pulmonal_protesica");
	    	}
	    		
	    		
	    		
	    		break;
	    	
	    	
	    	}
	    	
	    }
	    
	   var Ventriculo_Izquierdo_Data = new Array();
	   Ventriculo_Izquierdo_Data[0]=recopilarValueCombobox("forma_ventriculo_izquierdo");
	   Ventriculo_Izquierdo_Data[1]=recopilarinfotextbox("spinner") ;
	   Ventriculo_Izquierdo_Data[2]=recopilarinfotextbox('grosor_septum_diastole');
	   Ventriculo_Izquierdo_Data[3]=recopilarinfotextbox('diametro_ventriculo_izquierdo_diastole');
	   Ventriculo_Izquierdo_Data[4]=recopilarinfotextbox('diametro_ventriculo_derecho_diastole');
	   Ventriculo_Izquierdo_Data[5]=recopilarinfotextbox('grosor_pared_posterior_diastole');
	   Ventriculo_Izquierdo_Data[6]=recopilarinfotextbox('grosor_septum_sistole');
	   Ventriculo_Izquierdo_Data[7]=recopilarinfotextbox('diametro_ventriculo_izquierdo_sistole');
	   Ventriculo_Izquierdo_Data[8]=recopilarinfotextbox('diametro_ventriculo_derecho_diastole');
	   Ventriculo_Izquierdo_Data[9]=recopilarinfotextbox('grosor_pared_posterior_sistole');
	   Ventriculo_Izquierdo_Data[10]=recopilarinfotextbox('lvmass');
	   Ventriculo_Izquierdo_Data[11]=recopilarinfotextbox('grosorrelativo');
	   Ventriculo_Izquierdo_Data[12]=recopilarinfotextbox('hipertrofia_ventriculo_izquierdo');
	   Ventriculo_Izquierdo_Data[13]=recopilarinfotextbox('eprima_septal_funciondiastolica');
	   Ventriculo_Izquierdo_Data[14]=recopilarinfotextbox('eprima_lateral_funciondiastolica');
	   Ventriculo_Izquierdo_Data[15]=recopilarinfotextbox('volauricula_funciondiastolica');
	   Ventriculo_Izquierdo_Data[16]=recopilarinfotextbox('e_funciondiastolica');
	   Ventriculo_Izquierdo_Data[17]=recopilarinfotextbox('a_funciondiastolica');
	   Ventriculo_Izquierdo_Data[18]=recopilarinfotextbox('dt_funciondiastolica');
	   Ventriculo_Izquierdo_Data[19]=recopilarinfotextbox('vfd_diastole');
	   Ventriculo_Izquierdo_Data[20]=recopilarinfotextbox('vfs_sistole');
	    
	   
	   
	   var Ventriculo_Derecho_Data = new Array();
	   Ventriculo_Derecho_Data[0]=recopilarinfotextbox("diametro_basal_ventriculo_derecho");
	   Ventriculo_Derecho_Data[1]=recopilarinfotextbox("diametro_medio_ventriculo_derecho");
	   Ventriculo_Derecho_Data[2]=recopilarinfotextbox("longitud_base_apex_ventriculo_derecho");
	   Ventriculo_Derecho_Data[3]=recopilarinfotextbox("diametro_arteria_pulmonal_ventriculo_derecho");
	   Ventriculo_Derecho_Data[4]=recopilarinfotextbox("diametro_valvula_pulmonal_ventriculo_derecho");
	   Ventriculo_Derecho_Data[5]=recopilarinfotextbox("diametro_tracto_salida_ventriculo_derecho_ventriculo_derecho");
	   Ventriculo_Derecho_Data[6]=recopilarinfotextbox("tapse_ventriculo_derecho");
	   
	   
	   var Auricula_Izquierda_DATA = new Array();
		
		  
	   Auricula_Izquierda_DATA[0]=recopilarinfotextbox("area_auricula_izquierda_4C");
	   Auricula_Izquierda_DATA[1]= recopilarinfotextbox("area_auricula_izquierda_2C");
	   Auricula_Izquierda_DATA[2]=recopilarinfotextbox("longitud_auricula_izquierda_4C");
	   Auricula_Izquierda_DATA[3]=recopilarinfotextbox("longitud_auricula_izquierda_2C");
	   Auricula_Izquierda_DATA[4]=recopilarinfotextbox("volumen_auricula_izquierda");
	   Auricula_Izquierda_DATA[5]=recopilarinfotextbox("dap_auricula_izquierda");
	   
	   
	   var Auricula_Derecha_DATA = new Array();
	   Auricula_Derecha_DATA[0]=recopilarinfotextbox("area_auricula_derecha"); 
		 
    	var Vena_Cava_DATA= new Array();
    	Vena_Cava_DATA[0]=recopilarValueCombobox("diametro_venacava");
    	Vena_Cava_DATA[1]=recopilarValueCombobox("colpso_venacava");
    	Vena_Cava_DATA[2]= presion_rap;
    	Vena_Cava_DATA[3]= recopilarinfotextbox("velregurgitacion_venacava");
    	Vena_Cava_DATA[4]= recopilarinfotextbox("psap_venacava");
    	
    	var Pericardio_DATA= new Array();
    	Pericardio_DATA[0]=recopilarValueCombobox("grosor_pericardio");
    	Pericardio_DATA[1]=recopilarValueCombobox("apariencia_pericardio");
    	Pericardio_DATA[2]=recopilarinfoRadios("efusion_pericardio");
    	Pericardio_DATA[3]=recopilarinfoRadios("loculada_pericardio");
    	Pericardio_DATA[4]=recopilarinfotextbox("localizacion_loculado_pericardio");
    	Pericardio_DATA[5]=recopilarinfotextbox("grosor_loculado_pericardio");
    	Pericardio_DATA[6]=recopilarinfotextbox('medicion_pericardio');

    	var observaciones_DATA= "";
    	
    	observaciones_DATA +=recopilarinfotextbox("txt_talla")+"&";
    	observaciones_DATA +=recopilarinfotextbox("txt_peso")+"&";
    	observaciones_DATA +=recopilarinfotextbox("txt_sup_corp")+"&";
    	observaciones_DATA +=justificacion+"&";
    	observaciones_DATA +=conclusiones+"&";
    	observaciones_DATA +=recomendaciones+"&";
    	observaciones_DATA +=recopilarinfotextbox("analisis_aorta_observaciones")+"&";
	    
	    if(swProtesisValvulaAorta==false){
	    	observaciones_DATA +=recopilarinfotextbox("analisis_observaciones_aorta")+"&";
	    	observaciones_DATA +=""+"&";
	    }else{
	    	observaciones_DATA +=""+"&";
	    	observaciones_DATA +=recopilarinfotextbox("analisis_observaciones_aorta_protesica")+"&";
	    }
    	
    	
    	if(swProtesisValvulaMitral==false){
    		observaciones_DATA +=recopilarinfotextbox("analisis_observaciones_mitral")+"&";
        	observaciones_DATA +=""+"&";
    	}else{
    		observaciones_DATA +=""+"&";
        	observaciones_DATA +=recopilarinfotextbox("analisis_observaciones_mitral_protesica")+"&";
    	}
    	
    	if(swProtesisValvulaTricuspidea==false){
    		observaciones_DATA +=recopilarinfotextbox("analisis_observaciones_tricuspidea")+"&";
        	observaciones_DATA +=""+"&";
    		
    	}else{
    		observaciones_DATA +=""+"&";
        	observaciones_DATA +=recopilarinfotextbox("analisis_observaciones_tricuspidea_protesica")+"&";
    	}
    	
    	if(swProtesisValvulaPulmonal==false){
    		observaciones_DATA +=recopilarinfotextbox("analisis_observaciones_pulmonal")+"&";
    		observaciones_DATA +=""+"&";
    	}else{
    		observaciones_DATA +=""+"&";
    		observaciones_DATA +=recopilarinfotextbox("analisis_observaciones_pulmonal_protesica")+"&";
    	}
    	
    	
    	
    	observaciones_DATA +=recopilarinfotextbox("observaciones_ventriculo_izquierdo")+"&";
    	observaciones_DATA +=recopilarinfotextbox("observaciones_ventriculo_derecho")+"&";
    	observaciones_DATA +=recopilarinfotextbox("observaciones_auricula_izquierda")+"&";
    	observaciones_DATA +=recopilarinfotextbox("observaciones_auricula_derecha")+"&";
    	observaciones_DATA +=recopilarinfotextbox("observaciones_venacava")+"&";
    	observaciones_DATA +=recopilarinfotextbox("observaciones_pericardio");
    	imagenSegmentacionVentricularIzquierda_DATA = ObtenerCanvasDecodificado64("segmentacion_ventricular_izquierda");
    	

    	ajax = getXMLObject();
					ajax.open("POST","Cardiologia_Datos", true);
					ajax.onreadystatechange = function() {
						if (ajax.readyState == 4) {
							var resultado = ajax.responseText.split(';');
							
							alert(resultado[1]);
							
							if (resultado[0]=="1"){
								alert("puedes visualizar tu informe aca");
								mostrarInformeCardiologia(resultado[2]);
							
								
							}else{
								alert("ERROR AL GENERAR INFORME");
							}
							window.location.reload();
						}						
					};
				    ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
						ajax.send(
					// Datos generales Informe
					"codpaciente=" + codpacientediagnostico
					+ "&codusuario=" +  recopilarinfotextbox("txtUsuario")
					+ "&indicacion="+ indicacion_DATA
					+ "&observaciones="+encodeURIComponent(observaciones_DATA)
					
					// Datos Analisis Aorta
					+ "&aspecto_aorta="+recopilarValueCombobox('analisis_aorta_aspecto')
					+ "&analisis_aorta_mediciones="+mediciones_aorta_DATA
					+ "&analisis_aorta_patologias="+patologias_aorta_DATA
					
					// Datos analisis valvulas
				    + "&analisis_valvulas_aspectos="+Aspecto_valvulas_DATA
					+ "&analisis_valvula_aorta_insuficiencia="+Insuficiencias_valvula_Aorta_DATA
					+ "&analisis_valvula_aorta_estenosis="+Estenosis_valvula_Aorta_DATA
					+ "&analisis_valvula_aorta_protesica="+Datos_valvula_Protesica_Aorta_DATA
	
					+ "&analisis_valvula_mitral_insuficiencia="+Insuficiencias_valvula_Mitral_DATA
					+ "&analisis_valvula_mitral_estenosis="+Estenosis_valvula_Mitral_DATA
					+ "&analisis_valvula_mitral_protesica="+Datos_valvula_Protesica_Mitral_DATA
		
					+ "&analisis_valvula_tricuspidea_insuficiencia="+Insuficiencias_valvula_Tricuspidea_DATA
					+ "&analisis_valvula_tricuspidea_estenosis="+Estenosis_valvula_Tricuspidea_DATA
					+ "&analisis_valvula_tricuspidea_protesica="+Datos_valvula_Protesica_Tricuspidea_DATA
	
					+ "&analisis_valvula_pulmonal_insuficiencia="+Insuficiencias_valvula_Pulmonal_DATA
					+ "&analisis_valvula_pulmonal_estenosis="+Estenosis_valvula_Pulmonal_DATA
					+ "&analisis_valvula_pulmonal_protesica="+Datos_valvula_Protesica_Pulmonal_DATA
					+ "&sw_analisis_valvula_aorta_protesica="+swProtesisValvulaAorta
					+ "&sw_analisis_valvula_mitral_protesica="+swProtesisValvulaMitral
					+ "&sw_analisis_valvula_tricuspidea_protesica="+swProtesisValvulaTricuspidea
					+ "&sw_analisis_valvula_pulmonal_protesica="+swProtesisValvulaPulmonal
					
					// Datos analisis Ventriculo Izquierdo
					+ "&analisis_ventriculo_izquierdo="+Ventriculo_Izquierdo_Data   
					+ "&imagen_segmentacion_ventricular="+encodeURIComponent(imagenSegmentacionVentricularIzquierda_DATA)
					+ "&generalidades_segmento_basal="+tipo_generalidades_asignadas_segmento_basal
					+ "&generalidades_segmento_medio="+ tipo_generalidades_asignadas_segmento_medio    
					+ "&generalidades_segmento_apical="+ tipo_generalidades_asignadas_segmento_apical   
					// Datos analisis Ventriculo Derecho    
					+ "&analisis_ventriculo_derecho="+Ventriculo_Derecho_Data   
					// Datos analisis Auricula Izquierda
					+ "&analisis_auricula_izquierda="+Auricula_Izquierda_DATA
					// Datos analisis Auricula Derecha
					+ "&analisis_auricula_derecha="+Auricula_Derecha_DATA
					// Datos analisis Vena Cava
					+ "&analisis_vena_cava="+Vena_Cava_DATA
					// Datos analisis Pericardio
					+ "&analisis_pericardio="+Pericardio_DATA
					// Dato opcion envio
					+ "&opcion=1"
				    );
    	  
    	 
    	  
    	 
    	
    	
	}else{
			alert("Realice la Conclusi\u00f3n del Informe");
		}
/*
		
    }else{
		alert("Realice la Justificaci\u00f3n del Informe");
	}

	*/
	
	
	
	
	
	

	
	
	
}



function mostrarInformeCardiologia(idcodInforme){
	pagina="eco_reporte_cardiologia.jsp?CodInformeCardiologia="+idcodInforme;			
   	var opciones="toolbar=no, location=no, directories=no, status=no, menubar=no,";
 	opciones =opciones+"scrollbars=si, resizable=yes, width=800, height=600, top=85, left=140";
   	window.open(pagina,"Informe_Cardiologia",opciones);
}

//comprobar navegador si soporta canvas

function ObtenerCanvasDecodificado64(nombreCanvas) {
	var minavegador =  new Browser();
    var propiedad = true; 
 //   alert('entra '+minavegador.name +' '+minavegador.version);
if (minavegador.name =='iexplorer'){
	
	if(minavegador.version =='6'){
		propiedad = false;
	}
    if(minavegador.version =='7'){
		propiedad= false;
	}
    if(minavegador.version =='8'){
    	propiedad= false;
    }
}

if (propiedad== true){
	
	var canvas = document.getElementById(nombreCanvas);
    if (canvas.getContext) {
    	 // var dataURL = canvas.toDataURL("image/png");
    	 var dataURL = canvas.toDataURL();
    	 dataURL = dataURL.replace(/^data:image\/(png|jpeg);base64,/, "") ;    
	     return dataURL;            // Get the data as an image.
    }
	
}
	else{
		alert("tu navegador no puede guardar la imagen "+nombreCanvas+" por favor actualice su navegador");
		return "";
	}

}

//colocar la imagen en el canvas
function cargar_canvas_ventriculo_izquierdo(){

	var canvas = document.getElementById('segmentacion_ventricular_izquierda');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
	
		var img = new Image();
	
  	   //defino el evento onload del objeto imagen
		
		canvas.width = 280;
		canvas.height = 280;
		
		img.onload = function() {
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		};
		img.src = 'Imagenes/left_ventricular_segmentation.png';
		
		} else {
		alert('You need Safari or Firefox 1.5+ to see this demo.');
	}
}



var coordenadas_de_seleccion_segmento_basal = new Array();
var coordenadas_de_seleccion_segmento_medio = new Array();
var coordenadas_de_seleccion_segmento_apical = new Array();
var coordenadas_de_seleccion_segmento_apex = new Array();
var coordenadas_de_generalidades_segmento_basal = new Array();
var coordenadas_de_generalidades_segmento_medio = new Array();
var coordenadas_de_generalidades_segmento_apical = new Array();
var coordenadas_de_generalidades_segmento_apex = new Array();
var nombres_segmentos = new Array();
var nombres_caras = new Array();
var generalidad_cara = new Array();
var tipo_generalidades_asignadas_segmento_basal =new Array();
var tipo_generalidades_asignadas_segmento_medio =new Array();
var tipo_generalidades_asignadas_segmento_apical =new Array();
var tipo_generalidades_asignadas_segmento_apex =new Array();

function inicializar_valores_funcion_ventriculo_izquierdo(){
	
	//nombres_segmentos = new Array("Basal","Medio","Apical");
	nombres_segmentos = new Array("Basal","Medial","Apical","apex");
	//nombres_caras = new Array("Anterior", "Lateral","Posterior","Inferior","Septal","Septal Anterior");
	nombres_caras = new Array("Anterior", "Lateral","Posterior","Inferior","Septal","Septal Anterior","Anterolateral","Inferolateral","Septal Inferior");
	
	
	
	
	for(var i =0; i < nombres_segmentos.length; i++ ){
		
		switch(i){
		//basal
		case 0:
			coordenadas_de_seleccion_segmento_basal.push("117,9,165,33");
			coordenadas_de_seleccion_segmento_basal.push("23,72,45,97");
			coordenadas_de_seleccion_segmento_basal.push("22,185,47,207");
			coordenadas_de_seleccion_segmento_basal.push("111,245,166,269");
			coordenadas_de_seleccion_segmento_basal.push("230,185,256,210");
			coordenadas_de_seleccion_segmento_basal.push("233,73,257,99");
			
			
			  
			 
		
			coordenadas_de_generalidades_segmento_basal.push(" 131,10");
			coordenadas_de_generalidades_segmento_basal.push(" 25,72");
			coordenadas_de_generalidades_segmento_basal.push(" 25,181");
			coordenadas_de_generalidades_segmento_basal.push("127,249");
			coordenadas_de_generalidades_segmento_basal.push(" 241,177");
			coordenadas_de_generalidades_segmento_basal.push("236,70");

			tipo_generalidades_asignadas_segmento_basal = new Array("3","3","3","3","3","3");
			break;
			
			
			//medio
		case 1:
			coordenadas_de_seleccion_segmento_medio.push("117,47,164,69");
			coordenadas_de_seleccion_segmento_medio.push("53,85,81,110");
			coordenadas_de_seleccion_segmento_medio.push("52,164,80,189");
			coordenadas_de_seleccion_segmento_medio.push("113,208,165,231");
			coordenadas_de_seleccion_segmento_medio.push("198,165,226,190");
			coordenadas_de_seleccion_segmento_medio.push("200,92,228,117");
	
			
	
			coordenadas_de_generalidades_segmento_medio.push("132,43");
			coordenadas_de_generalidades_segmento_medio.push("54,89");
			coordenadas_de_generalidades_segmento_medio.push("56,165");
			coordenadas_de_generalidades_segmento_medio.push("131,214");
			coordenadas_de_generalidades_segmento_medio.push("205,162");
			coordenadas_de_generalidades_segmento_medio.push("201,87");
			tipo_generalidades_asignadas_segmento_medio = new Array("3","3","3","3","3","3");
			break;
			
			//apical
		case 2:
			coordenadas_de_seleccion_segmento_apical.push("122,81,161,104");
			coordenadas_de_seleccion_segmento_apical.push("78,125,106,150");
			coordenadas_de_seleccion_segmento_apical.push("117,172,160,194");
			coordenadas_de_seleccion_segmento_apical.push("172,126,200,152");
			
		
			
			coordenadas_de_generalidades_segmento_apical.push("132,82");
			coordenadas_de_generalidades_segmento_apical.push("83,123");
			coordenadas_de_generalidades_segmento_apical.push("131,176");
			coordenadas_de_generalidades_segmento_apical.push("177,125");
			tipo_generalidades_asignadas_segmento_apical = new Array("3","3","3","3");
			break;
			

			//apex
		case 3:
			//coordenadas_de_seleccion_segmento_apex.push("145, 144, 143, 159");
			coordenadas_de_seleccion_segmento_apex.push("129, 134, 153, 142");
			
			coordenadas_de_generalidades_segmento_apex.push("130,128");
			
			tipo_generalidades_asignadas_segmento_apex = new Array("3");
			tipo_fibrosis_segmento_apex  = new Array("0");
			tipo_edema_segmento_apex  = new Array("0");
			tipo_hemorragia_segmento_apex  = new Array("0");
			tipo_omv_segmento_apex  = new Array("0");
			
			
			break;
			
			
		}
	}
}

//colocan los 3 3 3 en la imagen
function cargar_generalidades_ventriculo_izquierdo(){

	cargar_canvas_ventriculo_izquierdo();
	
	var i = 0;
	var arreglo_posicion_dibujo = new Array();
	for(i=0; i < nombres_segmentos.length; i++){
		
		switch (i){
		//basal
		case 0:
			for(var j =0 ; j < tipo_generalidades_asignadas_segmento_basal.length ; j++){
				arreglo_posicion_dibujo =coordenadas_de_generalidades_segmento_basal[j].split(",");
				var img = new Image();
				img.src = 'Imagenes/tipo_funcion_ventricular_'+tipo_generalidades_asignadas_segmento_basal[j]+'.PNG';
				
				asignar_generalidad_ventriculo_izquierdo(arreglo_posicion_dibujo[0], arreglo_posicion_dibujo[1],img);
			}

			break;
			
			//medio
		case 1:
             for(var j =0 ; j < tipo_generalidades_asignadas_segmento_medio.length ; j++){
				
				arreglo_posicion_dibujo =coordenadas_de_generalidades_segmento_medio[j].split(",");
				var img = new Image();
				img.src = 'Imagenes/tipo_funcion_ventricular_'+tipo_generalidades_asignadas_segmento_medio[j]+'.PNG';
				asignar_generalidad_ventriculo_izquierdo(arreglo_posicion_dibujo[0], arreglo_posicion_dibujo[1], img);
			}
			break;
		
			//apical
		case 2:
            for(var j =0 ; j < tipo_generalidades_asignadas_segmento_apical.length ; j++){
				
				arreglo_posicion_dibujo =coordenadas_de_generalidades_segmento_apical[j].split(",");
				var img = new Image();
				img.src = 'Imagenes/tipo_funcion_ventricular_'+tipo_generalidades_asignadas_segmento_apical[j]+'.PNG';
				asignar_generalidad_ventriculo_izquierdo(arreglo_posicion_dibujo[0], arreglo_posicion_dibujo[1], img);
			}
			break;
			
		case 3:
			 for(var j =0 ; j < tipo_generalidades_asignadas_segmento_apex.length ; j++){
					
					arreglo_posicion_dibujo =coordenadas_de_generalidades_segmento_apex[j].split(",");
					var img = new Image();
					img.src = 'Imagenes/tipo_funcion_ventricular_'+tipo_generalidades_asignadas_segmento_apex[j]+'.PNG';
					asignar_generalidad_ventriculo_izquierdo(arreglo_posicion_dibujo[0], arreglo_posicion_dibujo[1], img);
				}
				break;
		
		
		}
		
		
		
	}
	

	
	
}

//dibuja lo 3 3 3 en el canvas
function asignar_generalidad_ventriculo_izquierdo(posx, posy, imagen){
	
	var canvas = document.getElementById('segmentacion_ventricular_izquierda');
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');
	

        imagen.onload = function() {
        	
	    ctx.drawImage(imagen,posx, posy);
	    
	    /*
	    ctx.strokeStyle = '#999'; // Gris
	    ctx.lineWidth   = 4; //Grosor
	    ctx.strokeRect(posx, posy, 20, 20);
	    */
		};
	
		
		} else {
		alert('You need Safari or Firefox 1.5+ to see this demo.');
	}
	
}


//captura el click que se hace sobre el canvas 1
function click_segmentacion_ventricular_izquierda(nombrecanvas, opcion,event) {
	var canvas = document.getElementById(nombrecanvas);
	
	 if (canvas.getContext) {
		switch (opcion) {
		    case 1:
		    var array = posicion_mouse_sobre_canvas(canvas,event);
			identificacion_sector_seleccionado(array[0], array[1]);
			break;
		}
		
	} else {
		alert('You need Safari or Firefox 1.5+ to see this demo.');
	}
}

function accion_seleccion (posx, posy){
	canvas1= 'segmentacion_ventricular_izquierda';
	var canvas = document.getElementById(canvas1);
	
	 if (canvas.getContext) {
		 var ctx = canvas.getContext('2d');
		    /*ctx.strokeStyle = 'blue'; // azul
		    ctx.lineWidth   = 2; //Grosor
		    ctx.strokeRect(posx, posy, 5, 5);*/
		    //ctx.fillStyle="rgb(255,255,0)";
		    ctx.globalAlpha=1; //Quitamos transparencia: valor 1
		    ctx.fillStyle="rgba(0,0,255,0.5)"; //color relleno semitransparente
		    ctx.beginPath();
		    ctx.arc(posx,posy,15,0,Math.PI*2,true);
		    ctx.fill();
	 }
	
}

//captura el click que se hace sobre el canvas 2
function posicion_mouse_sobre_canvas(canvas,e) {

	var curleft = 0, curtop = 0;
	var x;
    var y;
	var xTotal =0;
    var yTotal =0;
	var posiciones= new Array();
    if (canvas.offsetParent) {
        do {
            curleft += canvas.offsetLeft;
            curtop += canvas.offsetTop;
        } while (canvas = canvas.offsetParent);
        
     	      
        if (e.pageX || e.pageY)
        {
            x = e.pageX;
            y = e.pageY;
        }
        else {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        
        xTotal= x - curleft;
        yTotal= y - curtop;

posiciones[0]=xTotal;
posiciones[1]=yTotal;

	
}else{
	
	posiciones[0]=0;
	posiciones[1]=0;
}
 
    
return posiciones;
}
/*
var id_cara;
var id_segmento;
*/
var id_cara=new Array();
var id_segmento=new Array();
//captura el click que se hace sobre el canvas 3
function identificacion_sector_seleccionado(posx, posy){
	var array = new Array();
	var sw =false;
	
	
	
	for(var i=0; i < nombres_segmentos.length ; i++ ){
		switch(i){
		
		//basal
		case 0:
			var j =0;
			while ((j < coordenadas_de_seleccion_segmento_basal.length) && (sw == false)) {
				array = coordenadas_de_seleccion_segmento_basal[j].split(',');
				if ((posx >= array[0]) && (posx <= array[2])) {
					if ((posy >= array[1]) && (posy <= array[3])) {
						sw = true;
						id_cara[id_cara.length] = j;
						id_segmento[id_segmento.length] = i;
						accion_seleccion (posx, posy);
					}
				}
				j++;
			}
			
			
			
			
			break;
			
			//medio
		case 1:
			var j =0;
			while ((j < coordenadas_de_seleccion_segmento_medio.length) && (sw == false)) {
				array = coordenadas_de_seleccion_segmento_medio[j].split(',');
				if ((posx >= array[0]) && (posx <= array[2])) {
					if ((posy >= array[1]) && (posy <= array[3])) {
						sw = true;
						id_cara[id_cara.length] = j;
						id_segmento[id_segmento.length] = i;
						accion_seleccion (posx, posy);
						
					}
				}
				j++;
			}
			break;
			
			//apical
		case 2:
			var j =0;
			while ((j < coordenadas_de_seleccion_segmento_apical.length) && (sw == false)) {
				array = coordenadas_de_seleccion_segmento_apical[j].split(',');
				if ((posx >= array[0]) && (posx <= array[2])) {
					if ((posy >= array[1]) && (posy <= array[3])) {
						sw = true;
						id_cara[id_cara.length] = j;
						id_segmento[id_segmento.length] = i;
						accion_seleccion (posx, posy);
					}
				}
				j++;
			}
			break;
			
			//apex	
		case 3:
			var j =0;
			while ((j < coordenadas_de_seleccion_segmento_apex.length) && (sw == false)) {
				array = coordenadas_de_seleccion_segmento_apex[j].split(',');
				if ((posx >= array[0]) && (posx <= array[2])) {
					if ((posy >= array[1]) && (posy <= array[3])) {
						sw = true;
						id_cara[id_cara.length] = j;
						id_segmento[id_segmento.length] = i;
						accion_seleccion (posx, posy);
					}
				}
				j++;
			}
			break;
			
		
		}
		
		
		
	}
	

	//combo segun segmento
	//if(sw == true){
		//aparecerElemento("asignacion_tipos_generalidades");
		/*
		document.getElementById('nombre_segmentacion_vi').innerHTML= nombres_segmentos[id_segmento] +" "+ nombres_caras[id_cara];
		switch(id_segmento){
		
		case 0:
			
			reemplazarindexCombobox("tipos_generalidades", tipo_generalidades_asignadas_segmento_basal[id_cara]);
			
			break;
			
			
		case 1:
			
			reemplazarindexCombobox("tipos_generalidades", tipo_generalidades_asignadas_segmento_medio[id_cara]);
			break;
			
		case 2:
			reemplazarindexCombobox("tipos_generalidades", tipo_generalidades_asignadas_segmento_apical[id_cara]);
			break;
		
		
		}
		
		
		*/
		
		
		for (var i=0; i < id_segmento.length ; i++ ){
	     
			aparecerElemento("asignacion_tipos_generalidades");
			//console.log(nombres_segmentos[id_segmento[i]] +" "+ nombres_caras[id_cara[i]]);
			
			//document.getElementById('nombre_segmentacion_vi').innerHTML= nombres_segmentos[id_segmento[i]] +" "+ nombres_caras[id_cara[i]];
			//alert ("segmento= "+id_segmento[i]+" cara= "+id_cara[i]);
			//apical
			if (id_segmento[i]==2){
				if(id_cara[i]== 0){
					document.getElementById('nombre_segmentacion_vi').innerHTML= "Anterior Apical";
				}
				if(id_cara[i]== 3){
					document.getElementById('nombre_segmentacion_vi').innerHTML= "Lateral Apical";
				}
				
				if(id_cara[i]== 1){
					document.getElementById('nombre_segmentacion_vi').innerHTML= "Septal Apical";
				}
				
				if(id_cara[i]== 2){
					document.getElementById('nombre_segmentacion_vi').innerHTML= "Inferior Apical";
				}
			}else{
				//medial
				if (id_segmento[i]==1){
					if(id_cara[i]== 0){
						document.getElementById('nombre_segmentacion_vi').innerHTML= "Anterior Medial";
					}
					if(id_cara[i]== 1){
						document.getElementById('nombre_segmentacion_vi').innerHTML= "Septal Anterior Medial";
					}
					if(id_cara[i]== 2){
						document.getElementById('nombre_segmentacion_vi').innerHTML= "Septal Inferior Medial";
					}
					
					if(id_cara[i]== 3){
						document.getElementById('nombre_segmentacion_vi').innerHTML= "Inferior Medial";
					}
					
					if(id_cara[i]== 4){
						document.getElementById('nombre_segmentacion_vi').innerHTML= "Inferolateral Medial";
					}
					if(id_cara[i]== 5){
						document.getElementById('nombre_segmentacion_vi').innerHTML= "Anterolateral Medial";
					}
				
			}else{
				//basal
				if (id_segmento[i]==0){
					if(id_cara[i]== 0){
						document.getElementById('nombre_segmentacion_vi').innerHTML= "Medial Basal";
					}
					if(id_cara[i]== 1){
						document.getElementById('nombre_segmentacion_vi').innerHTML= "Septal Anterior Basal";
					}
					if(id_cara[i]== 2){
						document.getElementById('nombre_segmentacion_vi').innerHTML= "Septal Inferior Basal";
					}
					
					if(id_cara[i]== 3){
						document.getElementById('nombre_segmentacion_vi').innerHTML= "Inferior Basal";
					}
					
					if(id_cara[i]== 4){
						document.getElementById('nombre_segmentacion_vi').innerHTML= "Inferolateral Basal";
					}
					if(id_cara[i]== 5){
						document.getElementById('nombre_segmentacion_vi').innerHTML= "Anterolateral Basal";
					}
				}else{
					if ((id_segmento[i]==3) && (id_cara[i]== 0) ){
						document.getElementById('nombre_segmentacion_vi').innerHTML= "Casquete Apical";
				}
			}
			}
				
			}
			
			if (id_segmento[i]==0){
				
				reemplazarindexCombobox("tipos_generalidades", tipo_generalidades_asignadas_segmento_basal[id_cara[i]]);	
			}else{
			
			if (id_segmento[i]==1){
				reemplazarindexCombobox("tipos_generalidades", tipo_generalidades_asignadas_segmento_medio[id_cara[i]]);	
			}else{
				if (id_segmento[i]==2){
					
					reemplazarindexCombobox("tipos_generalidades", tipo_generalidades_asignadas_segmento_apical[id_cara[i]]);	
				}else{
					if (id_segmento[i]==3){
						reemplazarindexCombobox("tipos_generalidades", tipo_generalidades_asignadas_segmento_apex[id_cara[i]]);	
					}
				}
			}
			}
			
			
	}
	
	


}
function guardar_generalidad(){
	/*
	switch(id_segmento){
	case 0:
		tipo_generalidades_asignadas_segmento_basal[id_cara]=recopilarValueCombobox("tipos_generalidades");
		break;
	
	case 1:
		tipo_generalidades_asignadas_segmento_medio[id_cara]=recopilarValueCombobox("tipos_generalidades");
		break;
	case 2:
		tipo_generalidades_asignadas_segmento_apical[id_cara]=recopilarValueCombobox("tipos_generalidades");
		break;
	}
	*/
	
	for (var i=0; i < id_segmento.length ; i++ ){
		if (id_segmento[i]==0){
			tipo_generalidades_asignadas_segmento_basal[id_cara[i]]=recopilarValueCombobox("tipos_generalidades");
		}else{
		if (id_segmento[i]==1){
			 tipo_generalidades_asignadas_segmento_medio[id_cara[i]]=recopilarValueCombobox("tipos_generalidades");	
		}else{
			if (id_segmento[i]==2){
				 tipo_generalidades_asignadas_segmento_apical[id_cara[i]]=recopilarValueCombobox("tipos_generalidades");	
			}else{
				if (id_segmento[i]==3){
				 tipo_generalidades_asignadas_segmento_apex[id_cara[i]]=recopilarValueCombobox("tipos_generalidades");	
			}
		}
		}
		}
		
		
}
	
	cargar_generalidades_ventriculo_izquierdo();
	desaparecerElemento("asignacion_tipos_generalidades");
	id_cara.length=0;
	id_segmento.length=0;
	

}
/************************************/
/********* VARIABLES ****************/
/************************************/

//	validacion numero
	/*var myNum = 15;
	var bFound = /^\d+$/.test(myNum);
	document.write(bFound);*/
	
	
	
	// validacion numero y decimal
/*	var regexp= /^\d+\.?\d*$/;
	var e = parseFloat("-15.0");*/
	
//	alert(e);
	
	
	//alert(regexp.test('-15.0'));



/************************************************/
/*********  FUNCIONES DE SOPORTE ****************/
/************************************************/

function aparecerElemento(id) {

	document.getElementById(id).style.display = "inline";
}

function desaparecerElemento(id) {
	 document.getElementById(id).style.display = "none";
}

function activarelementoFormulario(idCombo) {
	document.getElementById(idCombo).disabled = false;
}

function desactivarelementoFormulario(idCombo) {

	document.getElementById(idCombo).disabled = true;
}

function reemplazarinfotextbox(idText, valor) {

	document.getElementById(idText).value = valor;
}

function recopilarinfotextbox(idText) {
	//alert(idText);
	return document.getElementById(idText).value;
}

function tamanoinfotextbox(idText) {
	return document.getElementById(idText).value.length;
}


function recopilarTextCombobox(idCombo) {
		var index = document.getElementById(idCombo).selectedIndex;
		var seleccion = document.getElementById(idCombo).options[index].text;
		return seleccion;
}

function recopilarValueCombobox(idCombo) {
    	//alert(idCombo);
		var index = document.getElementById(idCombo).selectedIndex;
		var seleccion = document.getElementById(idCombo).options[index].value;
		return seleccion;
}

function recopilarindexCombobox(idCombo) {
		var index = document.getElementById(idCombo).selectedIndex;
		return index;
}

function reemplazarindexCombobox(idCombo, valor) {
	document.getElementById(idCombo).selectedIndex = valor;
}


function verEstadoCheckbox(grupocheck) {
	for ( var i = 0; ele = document.getElementsByName(grupocheck)[i]; i++) {
		if (ele.checked == 1) {
			return true;
		}
	}
	return false;
}

function recopilarinfoRadios(grupoRadios) { 

	  var Cadena = "";
	  for (var i = 0; ele = document.getElementsByName(grupoRadios)[i]; i++) 
		  if (ele.checked == true) { 
			  Cadena = ele.value; 
	      } 
	 return Cadena;
}

function reiniciarRadiosButtons(grupoRadios, valor){ // reiniciar todos los radio buttons con su valor por default

	  var radList = document.getElementsByName(grupoRadios);
	  for (var i = 0; i < radList.length; i++) {
	  if(radList[i].value == valor){
		  radList[i].checked = true;  
    }
}
		 
}

//esta funcion valida que en un campo solo se ingresen numeros
function validar_campos_num (campo){
	var swcampo= false;
	obtener_campo = recopilarinfotextbox(campo);
	//alert (obtener_campo);
	if(obtener_campo.length > 0){
		swcampo=/^\d+\.?\d*$/.test(obtener_campo);
		if(swcampo == false){
			//alert("caracter invalido en "+campo);
			reemplazarinfotextbox(campo, "");
		}
		if(obtener_campo.length > 2){
			if(parseFloat(obtener_campo)==0.0){
				alert(campo+" no puede tener magnitud 0.0");
				reemplazarinfotextbox(campo, "");
	
				swcampo=false;
			}
		}

	}
	return swcampo;
}





	

