var peticion1 = null;
var elementoSeleccionado = -1;
var articulos1 = null;
var cachesugerencias1 = {};
var selPaciente = false;
var selPac = false;
/*funci�n utilizada para realizar la petici�n asincrona al servidor(AJAX)*/
	function inicializa_xhr() {
		if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
	}

	/*funci�n para autocompletar cunado se digite el codigo del presupuesto*/
	function autocompletaPacientes(idiv,itex) {    
		//alert("autocompletarPaciente");
		//Picture1.MousePointer = 99
		var texto = document.getElementById("desc"+itex).value;
		if(texto!=""){
		var elEvento =  window.event;  //arguments[0] ||
	    var tecla = elEvento.keyCode;
	        if(tecla == 40) { // Flecha Abajo
	        	//alert("presiono abajo");
	               if(elementoSeleccionado+1 < articulos1.length) {
	                    elementoSeleccionado++;
	                }
	            muestrasugerencias1(articulos1,idiv,itex);
	        }else 
	            if(tecla == 38) { // Flecha Arriba
	                //alert("presiono arriba");
	                    if(elementoSeleccionado > 0) {
	                        elementoSeleccionado--;
	                    }
	                muestrasugerencias1(articulos1, idiv, itex);
	            }else
	                if(tecla == 13) { // ENTER o Intro
	                	if(selPaciente){
	                		selPac = true;
	                	}
	                    seleccionaElementoArticulo(articulos1, idiv, itex);
	                	//clicksugerencia(choice);
	                }else {
	                	//var texto = txtTipoMe;
	                	//alert("txtTipoMe"+txtTipoMe);
	                    texto = document.getElementById("desc"+itex).value;
	                    // Si es la tecla de borrado y el texto es vac�o, ocultar la lista
	                    if(tecla == 8 && texto == "") {
	                    	selPaciente = false;
	                        borraLista1(articulos1);
	                        return;
	                    }
	                    if(cachesugerencias1[texto] == null) {
	                    	
	                        peticion1 = inicializa_xhr();
	                        peticion1.onreadystatechange = function() {
	                        	
	                                    if(peticion1.readyState == 4) {	                                    	
	                                        if(peticion1.status == 200) {	                                        	
	                                        	 articulos1 = eval('('+peticion1.responseText+')');
	                                                if(articulos1.length == 0) {
	                                                    sinResultadosArticulo(idiv);
	                                                   
	                                                   
	                                                }else {
	                                                    cachesugerencias1[texto] = articulos1;
	                                                    actualizasugerencias11(articulos1,idiv,itex);
	                                                }
	                                            }
	                                        }
	                                    };
	                                //var ee="epsh0";
	                               // var xx=document.getElementById(ee).value;  
	                               // alert("mbase: "+xx);
	                                peticion1.open("POST","ControlMovimientos?valor=autoinvCE&texto="+texto,true);                                 
	     	                        peticion1.send("");
	                    } else {
	                        articulos1 = cachesugerencias1[texto];
	                        actualizasugerencias11(articulos1,idiv,itex);
	                    }
	                }
		}
	}
	function sinResultadosArticulo(idiv) {
		var x="sugerencias"+idiv;
	    document.getElementById(x).innerHTML = "No existe registro";
	    document.getElementById(x).style.display = "block";
	}

	function actualizasugerencias11(articulos1,idiv,itex) {
		elementoSeleccionado = -1;
		muestrasugerencias1(articulos1,idiv,itex);
	}

	/*funci�n que muestra las sugerencias1 de codigos de referencia de presupuestos*/
	function muestrasugerencias1(articulos1,idiv,itex) {
		    var zonasugerencias1 = document.getElementById("sugerencias"+idiv);
		    var mostrar={};
			y=articulos1.length;
			var kittys=null;
			for(x=0; x<y-1; x=x+1){
			  kittys=articulos1[x];
			  z=kittys.split("|");
			  mostrar[x]=z[0]; 
			 }
	        zonasugerencias1.innerHTML = articulos1.formateaLista1(idiv,itex,mostrar);
	        zonasugerencias1.style.display = 'block';	
	}

	/*prototypo de la lista quesale en el div de sugerencias1*/
	Array.prototype.formateaLista1 = function(idiv,itex,mostrar) {
	    var codigoHtml = "";
	    codigoHtml = "<ul>";	    
	        for(var i=0; i<this.length-1; i++) {
	            if(i == elementoSeleccionado) {
	                codigoHtml += '<li class= \"seleccionado\">'+mostrar[i]+'<\/li>';
	            }else {
	                codigoHtml += '<li onclick="confirmarArticulo(this.innerHTML,'+itex+','+idiv+','+i+')">'+mostrar[i]+'<\/li>';
	            }
	        }
	    codigoHtml += "<\/ul>";
	    //div = document.getElementById('sugerencias1');
		//div.style.display='none';
	    return codigoHtml;
	};
	/*funci�n en el cual se le asigna a la caja de texto la opci�n selccionada de las sugerencias1*/
	function seleccionaElementoArticulo(articulos1,idiv, itex) {
	    if(articulos1[elementoSeleccionado]) {
	    	var kitty=articulos1[elementoSeleccionado];
		    var codigo;
		    var nombre;
		    var lot;
		    var inv;
		    var venc;
			var ca;
			var codAmb;
			
		    var y=kitty.split("|").length;
		    var z=kitty.split("|");		     	
		    for(x=0; x<y-1; x=x+1)
		    { 
		    	codigo=z[1];
		    	nombre=z[0];
		    	lot=z[2];
		    	inv=z[3];
		    	venc=z[4];
		    //	ca=z[5];
		    	codAmb = z[6];
		    }
		    
		    document.getElementById("desch"+itex).value = codigo;
			document.getElementById("desc"+itex).value = nombre;
			document.getElementById("eps"+itex).value = inv;
			document.getElementById("adm"+itex).value = venc;
			document.getElementById("epsh"+itex).value = lot;
			if(codAmb!=3){
				Detalle(venc,lot,"amb");
			}else{
				if(codAmb==3){
					Detalleh(venc,lot,"amb");
				}
			}
		//	document.getElementById("serv"+itex).options[0].text = ca;
	
    	    borraLista1(idiv);
		 //   document.getElementById("espe"+itex).focus();
    	    selPaciente = true;
	    }
	}
	function borraLista1(idiv) {
        document.getElementById("sugerencias"+idiv).innerHTML = "";
        document.getElementById("sugerencias"+idiv).style.display = "none";
	}

function confirmarArticulo(cf,itex,idiv){		
	  
		 var codigo;
		 var nombre;
		 var lot;
		 var inv;
		 var venc;
		 var ca;
		
		 var y=cf.split("|").length;
		 var z=cf.split("|");		     	
		 for(x=0; x<y-1; x=x+1)
		 { 
			 codigo=z[1];
			 nombre=z[0];
			 lot=z[2];
		     inv=z[3];
		     venc=z[4];
		  //   ca=z[5];
		 }
		  
		document.getElementById("desch"+itex).value = codigo;
		document.getElementById("desc"+itex).value = nombre;
		document.getElementById("eps"+itex).value = inv;
		document.getElementById("adm"+itex).value = venc;
		document.getElementById("epsh"+itex).value = lot;
		// document.getElementById("serv"+itex).options[0].text = ca;
		
		Detalle(venc,lot);
		borraLista1(idiv);
		// document.getElementById("espe"+itex).focus();	
	}
	
	
	