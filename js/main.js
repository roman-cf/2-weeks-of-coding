var menuArr=["index.html","album.html","numbercon.html","steinpapier.html","square.html","tipcal.html","whi.html","google.html","urlaub.html","story.html"];
var menuNamenArr=["Start","Album","kg Rechner","Stein-Schere-Papier","Square Color","Trinkgeld","Duplicate","Google","Urlaub","Story"];


for (i=0;i<menuArr.length;i++){

	let menuText = document.createTextNode(menuNamenArr[i]);
	let menuPoint = document.createElement("a");
		if (i==seiteID){
			menuPoint.className="active";
		}
	menuPoint.setAttribute('href', menuArr[i]); 
	menuPoint.appendChild(menuText);

	document.getElementById("topnav").appendChild(menuPoint);
}