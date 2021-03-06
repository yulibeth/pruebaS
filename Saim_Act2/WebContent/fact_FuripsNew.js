function getXMLObject() { // XML OBJECT
	var xmlHttp = false;
	try {
		xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); // For Old Microsoft Browsers
	} catch (e) {
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); // For Microsoft IE 6.0+
		} catch (e2) {
			xmlHttp = false; // No Browser accepts the XMLHTTP Object then false
		}
	}
	if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
		xmlHttp = new XMLHttpRequest(); // For Mozilla, Opera Browsers
	}
	return xmlHttp; // Mandatory Statement returning the ajax object created
}

var xmlhttp = new getXMLObject(); // xmlhttp holds the ajax object
// ////////////////////////////////

function Rips() {
	ajax = getXMLObject();
	ajax.open("POST", "ControlFuripsNew", true); // getname will be the servlet name
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			document.getElementById('form1').innerHTML = ajax.responseText;
		}
	}
	ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
	ajax.send("valor=2"); // Posting txtname to Servle
}


function CambTipoRips() {
	var cmbTipoRips = document.getElementById("cmbTipoRips").value;
	if (cmbTipoRips == "Seleccione") {
		alert("Seleccione Tipo Rips");
		var p1 = "<table width='100%' class='style6'  border='0'><tr><td width='7%'></td><td width='15%'><label></label></td><td width='7%'></td><td width='15%' ><label></label></td><td width='5%'></td></tr></table>";
		document.getElementById('RipsCam').innerHTML = p1;
	} else {
		if (cmbTipoRips == "CuentaC") {
			// por cuenta de cobro
			var p2 = "<table width='100%' class='style6'  border='0'><tr><td width='7%'>Numero Cta Cobro</td><td width='15%'><label><input type='text' id='txtNumCtaCobro' onBlur='BuscarF()'></label></td><td width='5%'>Nombre:</td><td width='15%'><label><input name='txtNombre' type='text' id='txtNombre' size='10' maxlength=6 /></label></td><td width='5%'><input name='btnCrearConvenio' type='button' id='btnCrearConvenio' value='Consultar' onclick='BuscarF()' /></td></tr></table>";
			document.getElementById('RipsCam').innerHTML = p2;
		}

		if (cmbTipoRips == "BusGen") {
			// busca todas las facturas
			var p = "<table width='100%' class='style6'  border='0'><tr><td width='7%'>Fecha Inicial:</td><td width='15%'><label><input name='FI' type='text' id='FI' size='10'  onKeyup='masca(this,patron,true,0,0,0)' /></label></td><td width='7%'>Fecha Final:</td><td width='15%' ><label><input name='FF' type='text' id='FF' size='10' onKeyup='masca(this,patron,true,0,0,0)' onBlur='BuscarF()'  /></label></td><td width='5%'><input name='btnCrearConvenio' type='button' id='btnCrearConvenio' value='Consultar' onclick='BuscarF()' /></td></tr></table>";
			document.getElementById('RipsCam').innerHTML = p;
		}
	}
}

function BuscarF() {
	var eps = document.getElementById("cmbE").value;
	var cmbTipoRips = document.getElementById("cmbTipoRips").value;
	var contenidos = document.getElementById('DFD');
	if (cmbTipoRips == "BusGen") {
		var fi = document.getElementById("FI").value;
		var ff = document.getElementById("FF").value;

		if ((fi == "") || (ff == "")) {
			alert("Debe seleccionar un rango de busqueda");
		} else {
			ajax = getXMLObject();
			ajax.open("POST", "ControlFuripsNew", true); // getname will be the servlet name
			ajax.onreadystatechange = function() {
				if (ajax.readyState == 4) {
					contenidos.innerHTML = ajax.responseText;
				}
			}
			ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
			ajax.send("valor=3&fi=" + fi + "&eps=" + eps + "&ff=" + ff); // Posting txtname to Servle
		}
	}
/*	if (cmbTipoRips == "CuentaC") {
		var NumCtaCobro = document.getElementById("txtNumCtaCobro").value;
		if (NumCtaCobro == "") {
			alert("Debe Escribir Numero Cuenta de Cobro");
		} else {
			ajax = getXMLObject();
			ajax.open("POST", "ControlRipsNew", true); // getname will be the servlet name
			ajax.onreadystatechange = function() {
				if (ajax.readyState == 4) {
					contenidos.innerHTML = ajax.responseText;
				}
			}
			ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
			ajax.send("valor=C3&NumCtaCobro=" + NumCtaCobro + "&eps=" + eps); // Posting txtname to Servle
		}
	}***/
}


function MoverS() {
	var fd = document.getElementById("FD");
	var fs = document.getElementById("FS");

	for ( var i = 0; i < fd.length; i++) {
		if (fd[i].selected) {
			var options = document.createElement('option');
			options.value = fd[i].value;
			options.text = fd[i].text;
			document.getElementById("FS").add(options);
			fd[i] = null;
			i--;
		}
	}
}


function MoverD() {
	var fd = document.getElementById("FD");
	var fs = document.getElementById("FS");

	for ( var i = 0; i < fs.length; i++) {
		if (fs[i].selected) {
			var options = document.createElement('option');
			options.value = fs[i].value;
			options.text = fs[i].text;
			document.getElementById("FD").add(options);
			fs[i] = null;
			i--;
		}
	}
}


function Exportar() {
	var fs = document.getElementById("FS");
	var CodEnt = document.getElementById("cmbE").value;
	var cmbTipoRips = document.getElementById("cmbTipoRips").value;
	
		if (fs.length == 0) {
			alert("Seleccione las Facturas de las cuales desea Generar los FURIPS");
		} else {
			var datos = "";
			var fsl = fs.length;
			for ( var i = 0; i < fsl; i++) {
				datos = datos + fs.options[i].text;
				datos = datos + "|";
			}
			
			var ctac = 0;
			var fi="";
			var ff="";
			if (cmbTipoRips == "BusGen") {
				fi = document.getElementById("FI").value;
				ff = document.getElementById("FF").value;

				if ((fi == "") || (ff == "")) {
					alert("Debe seleccionar un rango de busqueda");
				} else {
					/** * Archivo de Consultas** */
					ajax = getXMLObject();
					ajax.open("POST", "ControlFuripsNew", true); // getname will be the servlet name
					ajax.onreadystatechange = function() {
						if (ajax.readyState == 4) {
							// ctac la cantidad de registros encontrados en AC
							//ctac = ajax.responseText;
							// Realiza el llamado de la funcion AF
							//AF(fi, ff, fsl, datos, CodEnt, ctac);
						}
					}
					ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
					ajax.send("valor=5&fi=" + fi + "&ff=" + ff+ "&fsl=" + fsl + "&datos=" + datos + "&CodEnt=" + CodEnt); // Posting txtname to Servle
				}
			}
			/*if (cmbTipoRips == "CuentaC") {
			/** * Archivo de Consultas** */
			/*		ajax = getXMLObject();
					ajax.open("POST", "ControlRipsNew", true); // getname will be the servlet name
					ajax.onreadystatechange = function() {
						if (ajax.readyState == 4) {
							// ctac la cantidad de registros encontrados en AC
							ctac = ajax.responseText;
							// Realiza el llamado de la funcion AF
							AF(nom, fi, ff, fsl, datos, CodEnt, ctac);
						}
					}
					ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
					ajax.send("valor=5&nom=" + nom + "&fi=" + fi + "&ff=" + ff+ "&fsl=" + fsl + "&datos=" + datos + "&CodEnt=" + CodEnt+ "&AR=1"); // Posting txtname to Servle
			}*/
			//document.getElementById('form1').innerHTML = '<p>Generando Archivos RIPS... No Cierre La Ventana...</p><img src="Imagenes/Uno.gif"> 1%';
		}
}


function AF(nom, fi, ff, fsl, datos, CodEnt, ctac) {
	/** * Archivo de Transacciones** */
	document.getElementById('form1').innerHTML = '<p>Generando Archivos RIPS... No Cierre La Ventana...</p><img src="Imagenes/Diez.gif"> 10%';

	var ctaf = 0;
	ajax = getXMLObject();
	ajax.open("POST", "ControlRipsNew", true); // getname will be the servlet name
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			// ctaf la cantidad de registros encontrados en AF
			ctaf = ajax.responseText;
			// Realiza el llamado de la funcion AM
			AM(nom, fi, ff, fsl, datos, CodEnt, ctac, ctaf);
		}
	}
	ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
	ajax.send("valor=5&nom=" + nom + "&fi=" + fi + "&ff=" + ff + "&fsl=" + fsl+ "&datos=" + datos + "&CodEnt=" + CodEnt + "&AR=3"); // Posting txtname to Servle
}


function AM(nom, fi, ff, fsl, datos, CodEnt, ctac, ctaf) {
	document.getElementById('form1').innerHTML = '<p>Generando Archivos RIPS... No Cierre La Ventana...</p><img src="Imagenes/Veinte.gif"> 20%';

	/** * Archivo de Medicamentos** */
	ajax = getXMLObject();
	var ctam = 0;
	ajax.open("POST", "ControlRipsNew", true); // getname will be the servlet name
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			// ctam la cantidad de registros encontrados en AM
			ctam = ajax.responseText;
			// Realiza el llamado de la funcion US
			US(nom, fi, ff, fsl, datos, CodEnt, ctac, ctaf, ctam);
		}
	}
	ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
	ajax.send("valor=5&nom=" + nom + "&fi=" + fi + "&ff=" + ff + "&fsl=" + fsl+ "&datos=" + datos + "&CodEnt=" + CodEnt + "&AR=4"); // Posting txtname to Servle
}


function US(nom, fi, ff, fsl, datos, CodEnt, ctac, ctaf, ctam) {
	/** * Archivo de Usuarios** */
	document.getElementById('form1').innerHTML = '<p>Generando Archivos RIPS... No Cierre La Ventana...</p><img src="Imagenes/Treinta.gif"> 30%';

	/** * Archivo de Otros Servicios** */
	ajax = getXMLObject();
	var ctus = 0;
	ajax.open("POST", "ControlRipsNew", true); // getname will be the servlet name
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			// ctus la cantidad de registros encontrados en US
			ctus = ajax.responseText;
			// Realiza el llamado de la funcion AT
			AT(nom, fi, ff, fsl, datos, CodEnt, ctac, ctaf, ctam, ctus);
		}
	}
	ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
	ajax.send("valor=5&nom=" + nom + "&fi=" + fi + "&ff=" + ff + "&fsl=" + fsl+ "&datos=" + datos + "&CodEnt=" + CodEnt + "&AR=10"); // Posting txtname to Servle
}


function AT(nom, fi, ff, fsl, datos, CodEnt, ctac, ctaf, ctam, ctus) {
	document.getElementById('form1').innerHTML = '<p>Generando Archivos RIPS... No Cierre La Ventana...</p><img src="Imagenes/Cuarenta.gif"> 40%';

	/** * Archivo de Otros Servicios** */
	ajax = getXMLObject();
	var ctat = 0;
	ajax.open("POST", "ControlRipsNew", true); // getname will be the servlet name
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			// ctat la cantidad de registros encontrados en AT
			ctat = ajax.responseText;
			// Realiza el llamado de la funcion AU
			AU(nom, fi, ff, fsl, datos, CodEnt, ctac, ctaf, ctam, ctus, ctat);
		}
	}
	ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
	ajax.send("valor=5&nom=" + nom + "&fi=" + fi + "&ff=" + ff + "&fsl=" + fsl+ "&datos=" + datos + "&CodEnt=" + CodEnt + "&AR=8"); // Posting txtname to Servle
}


function AU(nom, fi, ff, fsl, datos, CodEnt, ctac, ctaf, ctam, ctus, ctat) {
	document.getElementById('form1').innerHTML = '<p>Generando Archivos RIPS... No Cierre La Ventana...</p><img src="Imagenes/Cincuenta.gif"> 50%';

	/***************************************************************************
	 * Archivo de Urgencias* /*** Archivo de Otros Servicios
	 **************************************************************************/
	ajax = getXMLObject();
	var ctau = 0;
	ajax.open("POST", "ControlRipsNew", true); // getname will be the servlet name
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			// ctau la cantidad de registros encontrados en AU
			ctau = ajax.responseText;
			// Realiza el llamado de la funcion AP
			AP(nom, fi, ff, fsl, datos, CodEnt, ctac, ctaf, ctam, ctus, ctat,ctau);
		}
	}
	ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
	ajax.send("valor=5&nom=" + nom + "&fi=" + fi + "&ff=" + ff + "&fsl=" + fsl+ "&datos=" + datos + "&CodEnt=" + CodEnt + "&AR=9"); // Posting txtname to Servle
}


function AP(nom, fi, ff, fsl, datos, CodEnt, ctac, ctaf, ctam, ctus, ctat, ctau) {
	document.getElementById('form1').innerHTML = '<p>Generando Archivos RIPS... No Cierre La Ventana...</p><img src="Imagenes/Sesenta.gif"> 60%';

	/** * Archivo de Procedimientos** */
	ajax = getXMLObject();
	var ctap = 0;
	ajax.open("POST", "ControlRipsNew", true); // getname will be the servlet name
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			// ctap la cantidad de registros encontrados en AP
			ctap = ajax.responseText;
			// Realiza el llamado de la funcion RN
			RN(nom, fi, ff, fsl, datos, CodEnt, ctac, ctaf, ctam, ctus, ctat,ctau, ctap);
		}
	}
	ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
	ajax.send("valor=5&nom=" + nom + "&fi=" + fi + "&ff=" + ff + "&fsl=" + fsl+ "&datos=" + datos + "&CodEnt=" + CodEnt + "&AR=7"); // Posting txtname to Servle
}


function RN(nom, fi, ff, fsl, datos, CodEnt, ctac, ctaf, ctam, ctus, ctat,ctau, ctap) {
	document.getElementById('form1').innerHTML = '<p>Generando Archivos RIPS... No Cierre La Ventana...</p><img src="Imagenes/Setenta.gif"> 70%';

	/** * Archivo de Recien Nacidos** */
	ajax = getXMLObject();
	var ctrn = 0;
	ajax.open("POST", "ControlRipsNew", true); // getname will be the servlet name
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			// ctap la cantidad de registros encontrados en AP
			ctrn = ajax.responseText;
			// Realiza el llamado de la funcion RN
			AH(nom, fi, ff, fsl, datos, CodEnt, ctac, ctaf, ctam, ctus, ctat,ctau, ctap, ctrn);

		}
	}
	ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
	ajax.send("valor=5&nom=" + nom + "&fi=" + fi + "&ff=" + ff + "&fsl=" + fsl+ "&datos=" + datos + "&CodEnt=" + CodEnt + "&AR=6"); // Posting txtname to Servle
}


function AH(nom, fi, ff, fsl, datos, CodEnt, ctac, ctaf, ctam, ctus, ctat,ctau, ctap, ctrn) {
	document.getElementById('form1').innerHTML = '<p>Generando Archivos RIPS... No Cierre La Ventana...</p><img src="Imagenes/Ochenta.gif"> 80%';

	/** * Archivo de Hospitalizacion** */
	ajax = getXMLObject();
	var ctah = 0;
	ajax.open("POST", "ControlRipsNew", true); // getname will be the servlet name
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			// ctah la cantidad de registros encontrados en AH
			ctah = ajax.responseText;
			// Realiza el llamado de la funcion CT
			CT(nom, fi, ff, fsl, datos, CodEnt, ctac, ctaf, ctam, ctus, ctat,ctau, ctap, ctrn, ctah);
		}
	}
	ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
	ajax.send("valor=5&nom=" + nom + "&fi=" + fi + "&ff=" + ff + "&fsl=" + fsl+ "&datos=" + datos + "&CodEnt=" + CodEnt + "&AR=5"); // Posting txtname to Servle
}


function CT(nom, fi, ff, fsl, datos, CodEnt, ctac, ctaf, ctam, ctus, ctat,ctau, ctap, ctrn, ctah) {
	document.getElementById('form1').innerHTML = '<p>Generando Archivos RIPS... No Cierre La Ventana...</p><img src="Imagenes/Noventa.gif"> 99%';

	/** * Archivo de Control** */
	ajax = getXMLObject();
	ajax.open("POST", "ControlRipsNew", true); // getname will be the servlet name
	ajax.onreadystatechange = function() {

		if (ajax.readyState == 4) {
			var valida = ajax.responseText;
			// Realiza el llamado de la funcion zip
			zip(nom, ctac, ctaf, ctam, ctus, ctat, ctau, ctap, ctrn, ctah);
		}
	}
	ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
	ajax.send("valor=5&nom=" + nom + "&fi=" + fi + "&ff=" + ff + "&fsl=" + fsl+ "&datos=" + datos + "&CodEnt=" + CodEnt + "&ctac=" + ctac
			+ "&ctaf=" + ctaf + "&ctah=" + ctah + "&ctam=" + ctam + "&ctap="+ ctap + "&ctat=" + ctat + "&ctau=" + ctau + "&ctrn=" + ctrn
			+ "&ctus=" + ctus + "&AR=11"); // Posting txtname to Servle
}// fin de la creacion del folder


//funcion para comprimir los archivos planos
function zip(nom, ctac, ctaf, ctam, ctus, ctat, ctau, ctap, ctrn, ctah) {
	document.getElementById('form1').innerHTML = '<p>Generando Archivos RIPS... No Cierre La Ventana...</p><img src="Imagenes/Noventa.gif"> 99%';

	/** * Archivo de Control** */
	ajax = getXMLObject();
	ajax.open("POST", "ControlRipsNew", true); // getname will be the servlet name
	ajax.onreadystatechange = function() {

		if (ajax.readyState == 4) {
			var valida = ajax.responseText;
			if (valida != "") {
				document.getElementById('form1').innerHTML = "<table><tr><td ><a href='zip.jsp'>Descargar RIPS</a></td></tr></table>";
				pagina = "zip.jsp";
				var opciones = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=si, resizable=yes, width=400, height=300, top=85,  left=140";
				window.open(pagina, "NUEVA", opciones);
			}
			alert("Rips Exportados Satisfactoriamente!!!");
		}
	}
	ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
	ajax.send("valor=6&nom=" + nom + "&ctac=" + ctac + "&ctaf=" + ctaf+ "&ctah=" + ctah + "&ctam=" + ctam + "&ctap=" + ctap + "&ctat="+ ctat + "&ctau=" + ctau + "&ctrn=" + ctrn + "&ctus=" + ctus); // Posting txtname to Servle
}

function max() {
	var nom = document.getElementById("txtNombre").value;
	largo = nom.length;
	if (largo > 6) {
		//alert("El nombre debe ser maximo de seis (6) caracteres!!!");
		var y = nom.substr(0, 6);
		document.getElementById("txtNombre").value = y;
	}
}

// funcion de la fecha
var patron = new Array(2, 2, 4);
function masca(d, pat, nums, dias, mes, annio) {
	var sep = "/";
	if (d.valant != d.value) {
		val = d.value
		largo = val.length
		ini = val.substring(0, 2);
		if ((ini > 31) || (ini == "00")) {
			val = d.value = "01";
		}
		val = val.split(sep);

		val2 = ''
		for (r = 0; r < val.length; r++) {
			val2 += val[r]
		}
		ini = val2.substring(2, 4);
		if ((ini == "04") || (ini == "06") || (ini == "09") || (ini == "11")) {
			x = val2.substring(0, 2);
			if (x == "31") {
				val2 = "30";
				val2 = val2 + ini;
			}
		}
		if ((ini > 12) || (ini == "00")) {
			mescj = val2.substring(0, 2);
			val2 = mescj + "01";
		}

		ano = val2.substring(4, 8);
		dia = val2.substring(0, 2);

		if (ini == "02") {
			if ((dia == "30") || (dia == "31") || (dia == "29")) {
				if (ano.length == 4) {
					if ((ano % 100 != 0)&& ((ano % 4 == 0) || (ano % 400 == 0))) {
						val2 = "29";
						val2 = val2 + ini;
					} else {
						val2 = "28";
						val2 = val2 + ini;
					}
					val2 = val2 + ano;
				}
			}
		}

		if (nums) {
			for (z = 0; z < val2.length; z++) {
				if (isNaN(val2.charAt(z))) {
					letra = new RegExp(val2.charAt(z), "g")
					val2 = val2.replace(letra, "")
				}
			}
		}

		val = ''
		val3 = new Array()
		for (s = 0; s < pat.length; s++) {
			val3[s] = val2.substring(0, pat[s])
			val2 = val2.substring(pat[s])
		}

		for (q = 0; q < val3.length; q++) {
			if (q == 0) {
				val = val3[q]
			} else {
				if (val3[q] != "") {
					val += sep + val3[q]
				}
			}
		}
		d.value = val
		d.valant = val
	}
}