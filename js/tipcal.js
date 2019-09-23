/*
Arrays für Zufriedenheit und Land
für die Anzeige und
mehrdimensional für Rechnungen
*/
var infStr=""
var zufriedenheitArr = ["wählen","überragend" ,"gut","durchschnittlich","katastrophal"];
var spendArr =["frei", "exorbitant hoch","grosszügig", "üblich", "mikrig","beleidigend"];
var landArr = ["Österreich", "Deutschland","Frankreich"];
var dbArr = [["Kein Trinkgeld zu geben gilt hier als äusserst unhöflich.",15,10,4,0],
			 ["Die Deutschen sind mit Trinkgeldern sehr sparsam.",10,4,0,0],
			 ["In Frankreich lässt man das Trinkgeld am Tisch liegen und rundet nicht beim Bezahlen auf",14,10,5,0]
			];
var ConBetr=0;
var ConZuf=0;
var ConPro=0;
//--------------------------------------------------------------------Überwachung bei der Eingabe
function eingabekontrolleB(){
	document.getElementById("zusatzausgabe").innerHTML = "";
	eingabeRepl = document.getElementById("betrag").value.replace(",",".");
	document.getElementById("betrag").value = eingabeRepl;
	if (isNaN(eingabeRepl)) {                    
		document.getElementById("zusatzausgabe").innerHTML = "Bitte nur den Betrag eingeben."
		ConBetr = 0;
	}
	if (parseFloat(eingabeRepl)){
		ConBetr = 1;           
	}
	if (eingabeRepl == ""){
		ConBetr=0;
	}
}
function eingabekontrolleZ(){
	document.getElementById("zusatzausgabe").innerHTML = "";
	zufriedenheitK = parseInt(document.getElementById("zufriedenheit").value);
	if (zufriedenheitK!=0){
		document.getElementById("prozentEingabe").value = "";
		ConZuf = 1;
		ConPro = 0;
	}
}
function eingabekontrolleP(){
	document.getElementById("zusatzausgabe").innerHTML = "";
	document.getElementById("zufriedenheit").selectedIndex = 0;	
	ConZuf=0;
	prozentK = parseInt(document.getElementById("prozentEingabe").value);
	console.log(prozentK);
	if (prozentK>100){
		document.getElementById("zusatzausgabe").innerHTML = "Hast du Geld zuviel?";
		}
	if (isNaN(prozentK)|| prozentK==""){
		ConPro=0;

	}else{
		ConPro=1;
	}
	if (prozentK==0){
			ConPro =1;
			console.log("Zahl is =" + prozentK);
		}
}
//--------------------------------------------------------------------Click auf Button
function trinkgeldrechnen() {
	console.log(ConBetr);
	console.log(ConZuf);
	console.log(ConPro);
// Allegemeine Ausgangswerte festlegen
	var betragvor = document.getElementById("betrag").value;
	var betrag = parseFloat(betragvor.replace(",",".")); // In Gleitkommazahlen umwandeln von: Komma Eingaben auf Punkte geänderte EIngabe
	var land = parseInt(document.getElementById("land").value);
// Zufriedenheit oder Prozent festlegen
	var zufriedenheit= parseInt(document.getElementById("zufriedenheit").value);
	var prozent = dbArr[land][zufriedenheit];
	var prozentE = parseInt(document.getElementById("prozentEingabe").value);
	var tg = 0;

// Berechnung
	if (ConZuf+ConPro+ConBetr==2 ){
		if (zufriedenheit!=0) {
			if (isNaN(prozent)){
				var infStr=prozent;
			}else if (prozent==0){
				sum = betrag;
			}else{
				tg = Math.round(betrag*(prozent/100)).toFixed(2);
				sum = Math.round((betrag*(prozent/100)+betrag)).toFixed(2);
			}
			document.querySelector("#daumen").style.height = "0px";
			document.getElementById("ausgabe").innerHTML = "War das Service " 
														 + zufriedenheitArr[zufriedenheit]
														 + " gibt man in " 
														 + landArr [land] 
														 + " bis zu "
														 +prozent 
														 + "% Trinkgeld. ("
														 + tg
														 +") Macht gesamt (gerundet): " 
														 + sum;
			document.getElementById("zusatzausgabe").innerHTML = "Tipp: " + "<br>"+dbArr[land][0];
			
		}else{
			tg = (betrag*(prozentE/100)).toFixed(2);
			sum = Math.round((betrag*(prozentE/100)+betrag)).toFixed(2);
			var i=1;
			for (i = 1; prozentE<= dbArr[land][i]; i++) {
			}
			console.log(spendArr[i]); 		
			console.log(betrag);
			document.getElementById("ausgabe").innerHTML= 
				"Bei " 
														+ prozentE
														+ "% würdest du "
														+ tg 
														+ " EUR Trinkgeld geben. <br> Tipp: <br> Bezahl gerundet gesamt "
														+ sum
														+ " EUR. Das ist in "
														+ landArr[land]
														+ " "
														+ spendArr[i];
			document.getElementById("zusatzausgabe").innerHTML = "Tipp: " + "<br>"+dbArr[land][0];
			
			if (i==1){
				changeDaumen(0,100);
			}			
			if (i==2){
				changeDaumen(0,50);
			}
			if (i==3){
				changeDaumen(270,50);
			}
			if (i==4 || i==5){
				changeDaumen(180,50);
			}

		}
	}else{

		alert("Eingabe unvollständig");
		return;
	}

	function changeDaumen(modeDaumen,modeDaumenXY){
	var rotateWert = "rotate("+modeDaumen+"deg)";
	document.querySelector("#daumen").style.height = modeDaumenXY+"px";
	document.querySelector("#daumen").style.width = modeDaumenXY+"px";
	document.querySelector("#daumen").style.backgroundImage = "url('./img/daumen.png')";
	document.querySelector("#daumen").style.transform = rotateWert;
}
}

