var storyIdArr = JSON.parse(localStorage.getItem("storyIdArr"));
var storyDateArr= JSON.parse(localStorage.getItem("storyDateArr"));
var storyauthorArr= JSON.parse(localStorage.getItem("storyauthorArr"));
var storyEintragArr= JSON.parse(localStorage.getItem("storyEintragArr"));
var storyID = 0;
for (i=0;i<storyIdArr.length;i++)
	{createStoryElement(i)};

document.getElementById("storytop").innerHTML = storyauthorArr[storyID]+ " schrieb am "+ datum + " Eintrag "  +storyID;
document.getElementById("eingabefeldid").value = storyEintragArr[storyID];

function createStoryElement(storyIdFunc){
		let newEintrag = document.createElement("div");
			newEintrag.className = "storyanzeigerahmen";
			newEintrag.id = "eintrag"+storyIdFunc;
		document.getElementById("inhaltstory").appendChild(newEintrag);

			let storylinks = document.createElement("div");
				storylinks.className =  "storyanzeigeL";
				storylinks.id = "storylinks"+storyIdFunc;
			document.getElementById("eintrag"+storyIdFunc).appendChild(storylinks);
			document.getElementById("storylinks"+storyIdFunc).innerHTML= storyauthorArr[storyIdFunc];

			let storyinhalt = document.createElement("div");
				storyinhalt.className =  "storyanzeigeI";
				storyinhalt.id = "storyinhalt"+storyIdFunc;
				storyinhalt.onclick = function (e){
				editPicUp(e.target.id);
				}
			document.getElementById("eintrag"+storyIdFunc).appendChild(storyinhalt);
			document.getElementById("storyinhalt"+storyIdFunc).innerHTML=storyEintragArr[storyIdFunc];

			let storyrechts = document.createElement("div");
				storyrechts.className =  "storyanzeigeR";
				storyrechts.id = "storyrechts"+storyIdFunc;
			document.getElementById("eintrag"+storyIdFunc).appendChild(storyrechts);
			datumformatI(storyDateArr[storyIdFunc]);
			document.getElementById("storyrechts"+storyIdFunc).innerHTML=datum;	
}

function eintrag(){

	if (document.getElementById("eingabefeldid").value == ""){
			document.getElementById("storytop").innerHTML = "leere Inhalte werden nicht hinzugefügt."	
	}else{
	var d = new Date();
  	var n = d.getTime()
	storyID = storyIdArr.length;
	storyIdArr.push(storyID);
	storyDateArr.push(n);
	storyauthorArr.push("ich");
	storyEintragArr.push(document.getElementById("eingabefeldid").value);
	
	datumformatI(n);
	createStoryElement(storyID);
	
	document.getElementById("storytop").innerHTML = storyauthorArr[storyID]+ " schrieb am "+ datum + " " + storyID;
	document.getElementById("eintrag"+storyID).scrollIntoView({behavior:"smooth"});
	beitragErleuchten(storyID);

	localstorageschreiben();

	beitragErleuchten(storyID);

	}
}

function ersetzen(){ 
	if (document.getElementById("eingabefeldid").value == ""){
			document.getElementById("storytop").innerHTML = "leere Inhalte werden nicht hinzugefügt."	
	}else{
		var d = new Date();
  		var n = d.getTime()
		storyIdArr[storyID]=storyID;
		storyDateArr[storyID]=n;
		storyauthorArr[storyID]=("ich");
			console.log(document.getElementById("eingabefeldid").value);
		var fertigerText = (document.getElementById("eingabefeldid").value).replace("\n","<br> " );
			console.log(fertigerText);

		storyEintragArr[storyID]=fertigerText;
		//storyEintragArr[storyID]=(document.getElementById("eingabefeldid").value);
		
		datumformatI(n);
		document.getElementById("storylinks"+storyID).innerHTML = "ich";
		document.getElementById("storyinhalt"+storyID).innerHTML = (document.getElementById("eingabefeldid").value).replace("\n","<br> " );
		document.getElementById("storyrechts"+storyID).innerHTML = datum;
		document.getElementById("eintrag"+storyID).scrollIntoView({behavior:"smooth"});
		
		localstorageschreiben();

		beitragErleuchten(storyID);

	}
}

function editPicUp(picupID){
	storyID = picupID.slice(11);

	datumformatI(storyDateArr[storyID]);
	document.getElementById("storytop").innerHTML = storyauthorArr[storyID]+ " schrieb am "+ datum + " Eintrag "  +storyID;
	document.getElementById("eingabefeldid").value = storyEintragArr[storyID].replace("<br>","\n");

	window.scroll({
		top: 0,
		left: 0,
		behavior: 'smooth'
	})
}

function idup(){
	if ((storyID +1)<storyIdArr.length){
		storyID= storyID+1;
		datumformatI(storyDateArr[storyID]);
		document.getElementById("storytop").innerHTML = storyauthorArr[storyID]+ " schrieb am "+ datum + " "  +storyID;
		document.getElementById("eingabefeldid").value = storyEintragArr[storyID];
	}else{
		document.getElementById("storytop").innerHTML = "keine weiteren Einträge";
	}
}
function iddown(){
	if ((storyID -1)>-1){
		storyID= storyID-1;
		datumformatI(storyDateArr[storyID]);
		document.getElementById("storytop").innerHTML = storyauthorArr[storyID]+ " schrieb am "+ datum + " "  +storyID;
		document.getElementById("eingabefeldid").value = storyEintragArr[storyID];
	}else{
		document.getElementById("storytop").innerHTML = "wir sind am Anfang angelangt"
	}
}

function localstorageschreiben(){
	localStorage.setItem("storyIdArr", JSON.stringify(storyIdArr));
	localStorage.setItem("storyDateArr", JSON.stringify(storyDateArr));
	localStorage.setItem("storyauthorArr", JSON.stringify(storyauthorArr));
	localStorage.setItem("storyEintragArr", JSON.stringify(storyEintragArr));
}

function datumformatI(time){
	d = new Date(time);
	minute = d.getMinutes();
	stunde = d.getHours();
	tag = d.getDate();
	monat = d.getMonth()+1;
	jahr = d.getFullYear();
	if (minute<10){minute="0"+minute};
	if (stunde<10){stunde="0"+stunde};
	if (tag<10){tag="0"+tag};
	if (monat<10){monat="0"+monat};
	datum = tag + "." + monat + "." + jahr + " " + stunde + ":" + minute;
}

function cleareintrag(){
	document.getElementById("eingabefeldid").value = "";
}
function beitragErleuchten(storyID){
	document.getElementById("storyinhalt"+storyID).style.backgroundColor="rgb(235,235,235,0.5)";
	setTimeout(function(){
		document.getElementById("storyinhalt"+storyID).style.backgroundColor="rgb(235,235,235,0)";
	}, 3000);

}

//-----------------------------alte funktionen---------------------------------------
function datumformat(){
	d = new Date(storyDateArr[storyID]);
	tag = d.getDate();
	monat = d.getMonth()+1;
	jahr = d.getFullYear();
	if (tag<10){tag="0"+tag};
	if (monat<10){monat="0"+monat};
	datum = tag + "." + monat + "." + jahr;
}
function cleartop(){
		document.getElementById("storytop").innerHTML = "Eingabe läuft";
}
function storyinhaltladen(){
	var geschichte = "Chain Story";	
	for(i=0;i<storyIdArr.length;i++){
	geschichte = geschichte + "<br><br>"+storyEintragArr[i];
	}
	document.getElementById("storyinhalt").innerHTML= geschichte;
}
function storagereset(){
	var storyIdArr = [0,1];
	var storyDateArr= [0,0];
	var storyauthorArr=["Meinereiner","Meinereiner"];
	var storyEintragArr= ["Text0","Text1"];

		localStorage.setItem("storyIdArr", JSON.stringify(storyIdArr));
		localStorage.setItem("storyDateArr", JSON.stringify(storyDateArr));
		localStorage.setItem("storyauthorArr", JSON.stringify(storyauthorArr));
		localStorage.setItem("storyEintragArr", JSON.stringify(storyEintragArr));
}


