var bildDateinamenArr=["csm_26_iStock-908264484_658ba603a6.jpg","steinbock-zug-viadukt.jpg","wandernnationalpark.jpg","shutterstock_1189047874-528x297.jpg"]
var bildDateinamenArr2=[];
var maxBilder =0; 
var picID = 0;
// aktuelle bild ID um die bilder später manipulieren zu können ....var bildID=0;

// Div erstellen und befüllen ------------------------------------------------------------
function divladen(){
	for (i=0;i<bildDateinamenArr.length;i++){
		var bildID = "bild"+i;

		var eintragVar = "url('./img/album/"+bildDateinamenArr[i]+"')";
		var bildIdNum = "#bild"+i;
		var bildtextID = "bildtext"+i;
		var bildfensterID = "bildfenster"+i;
		
		//Bildelement erstellen
		let newSquareDiv = document.createElement("div");
			newSquareDiv.className="albumsquare";
			newSquareDiv.id=bildID;
			newSquareDiv.onclick = function (e){
				bildfenster(e.target.id);
				}
		document.getElementById("inhaltalbum").appendChild(newSquareDiv);
		
		//Unterelement Bildbeschreibung erstellen
		let newBiltextDiv = document.createElement("div");
			newBiltextDiv.className="bildtext";
			newBiltextDiv.id="bildtext"+i;
		document.getElementById(bildID).appendChild(newBiltextDiv);

		//Unterelement Grossansicht erstellen
		let newFensterDiv = document.createElement("div");
			newFensterDiv.className="fenster";
			newFensterDiv.id="bildfenster"+i;
			newFensterDiv.onclick = function (e){
				fnstrschliessen(e.target.id);
			}
		document.getElementById("inhaltalbum").appendChild(newFensterDiv);					

		document.querySelector(bildIdNum).style.backgroundImage = eintragVar;
		document.getElementById(bildtextID).innerHTML = bildDateinamenArr[i];			//Bildbeschreibung ausfüllen
		document.getElementById(bildfensterID).innerHTML = bildDateinamenArr[i];

	}	
	document.getElementById("ausgabe").innerHTML = "Es wurden " + i + " Bilder gefunden."
	document.querySelector("#btn1").style.visibility = "hidden";
}

// Fensteransicht------------------------------------------------------------
function bildfenster(picID){
	var reinID = picID.slice(4);
	document.getElementById("bildfenster"+reinID).innerHTML= '<img src="./img/album/'+bildDateinamenArr[reinID]+'" id="pixxfenster'+reinID+'" >'; 
	document.querySelector("#bildfenster"+reinID).style.visibility = "visible";	 
	document.querySelector("#bildfenster"+reinID).style.opacity = "1";	 
}
function fnstrschliessen(picID){
	var reinID = picID.slice(11);
	//alert(reinID);
	document.querySelector("#bildfenster"+reinID).style.visibility = "hidden";	 
	document.querySelector("#bildfenster"+reinID).style.opacity = "0";	 

}
//----------------Dateien auswählen------------------------------------------

/*function dateienwaehlen(evt){
	var files = evt.target.files;
	var bildDateinamenArr2=[];
console.log("var def");
	for (var i = 0, f; f=files[i];i++){
		bildDateinamenArr2.push(f.name);
		console.log(bildDateinamenArr2[i]);
		}
		document.getElementById("ausgabe").innerHTML = "Es wurden " + i + " Bilder gefunden."+ bildDateinamenArr2.join('');
		console.log("Es wurden " + i + " Bilder gefunden."+ bildDateinamenArr2.join(''))
}	
	

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("dateiwahl").addEventListener('change', dateienwaehlen, false);
})*/
function dateiauswahl(evt) {
	console.log("function started")
		var files = evt.target.files;
		var fragmente = [];

		for (var i = 0, f; f = files[i]; i++) {
			fragmente.push('<li><strong>', f.name, '</strong>(', f.type || 'n/a',') - ', f.size, ' bytes</li>');
		console.log(fragmente);
		}
		document.getElementById('ausgabe').innerHTML = '<ul>' + fragmente.join('') + '</ul>';
	}
document.addEventListener("DOMContentLoaded", function () {
	document.getElementById('dateien').addEventListener('change', dateiauswahl, false);
});

function arraylog(){
	console.log(bildDateinamenArr2);
	console.log(fragmente)
}

//---------------------------------------------------------------------------
