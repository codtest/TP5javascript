 
 //http://rss.cnn.com/services/podcasting/studentnews/rss.xml
 
 window.addEventListener("load",function(){

// 
var nbpodcast=1; // numéro de chaque vidéo
//Envoie de la requète Http
var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
  function doCORSRequest(options, printResult) {
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function() {
      printResult(x.responseXML,
        options.method + ' ' + options.url + '\n' +
        x.status + ' ' + x.statusText + '\n\n' +
        (x.responseXml || '')
      );
    };

    x.send(options.data);
  }

  //Récupération des vidéos
  (function() {
    var urlField = document.getElementById('url');
    //var dataField = document.getElementById('data');
    var outputField; // = document.getElementById('output');
	
	var docxml;
	
    document.getElementById('get').onclick  /* document.getElementById('post').onclick*/ = function(e) {
      e.preventDefault();
	  

if(document.getElementById("url").value==="http://rss.cnn.com/services/podcasting/studentnews/rss.xml")	
{
		  
	  
      doCORSRequest({
		  
        method: 'GET',
        url: urlField.value,
        //data: dataField
		
	 
		
		
      }, function printResult(podcast,result) {
        outputField /* .value */= result;
		
		docxml=podcast; //Contient le document XML
		
		var titre= docxml.getElementsByTagName('title');
		var lien= docxml.getElementsByTagName('link');
		var description= docxml.getElementsByTagName('description');
		//var durvideo = docxml.getElementsByTagName('itunes:duration');
		
		var playlist=document.getElementById("playlist");
		
		var xLen = titre.length;
		var i=1;
			
		//for (i=1; i <xLen; i++) {
		test();
		
		function test(){
			
			var txt = titre[i].childNodes[0].nodeValue; //Titre 
			var ln = lien[i].childNodes[0].nodeValue;   //Lien
			var des = description[i].childNodes[0].nodeValue; //description
			//var dv = durvideo[i].childNodes[0].nodeValue;

			var titrepodcast = document.createElement("p"); //paragraphe contenant toutes les informations de chaque vidéo
			
			var divtitre = document.createElement("div");
			var divdes = document.createElement("div");
			
			var boutonmonter = document.createElement("button");
			var boutondescendre = document.createElement("button");
			var boutonsupprimer = document.createElement("button");
	
			
			//eval("dynamic" + i) = "test";
			
			
			titrepodcast.id=nbpodcast;
			titrepodcast.value=ln;
			//titrepodcast.innerHTML=txt+" "+des.slice(des.indexOf("."));
			
			divtitre.innerHTML=txt;
			divdes.innerHTML=des.slice(0,des.indexOf("<"));
			
			boutonmonter.id="boutonmont"+nbpodcast;
			boutonmonter.innerHTML="<-";

			boutondescendre.id="boutondes"+nbpodcast;
			boutondescendre.innerHTML="->";			
			
			boutonsupprimer.id="boutonsup"+nbpodcast;
			boutonsupprimer.innerHTML="X";
					
			titrepodcast.appendChild(divtitre);		
			titrepodcast.appendChild(divdes);
			titrepodcast.appendChild(boutonmonter);
			titrepodcast.appendChild(boutondescendre);
			titrepodcast.appendChild(boutonsupprimer);
			
			titrepodcast.style.width="10%";
			titrepodcast.style.height="200px";
			//titrepodcast.style.marginRight="2px";
			//titrepodcast.style.marginLeft="2px";
			//titrepodcast.style.margin="auto";
			titrepodcast.style.marginBottom="30px";
			titrepodcast.style.background="white";
			
			titrepodcast.style.borderRadius="10px";
			titrepodcast.style.opacity="0.8";
	
			
			playlist.appendChild(titrepodcast);
			
			
			
			boutonmonter.addEventListener("click", function() {
				//var boutajout = document.getElementById(boutonsupprimer.id);
				//var monttitre = titrepodcast;			
				//playlist.removeChild(titrepodcast);
				
				var y=0;
				var viddes=titrepodcast.parentElement;
				//var montest = playlist.getElementsByTagName("p");     
				var idpos=0;
				var pod = viddes.getElementsByTagName('p'); // fait la meme chose que montest
				
				while(pod[y]!=null)
				{
					//console.log(montest[y].id);
					
					if(pod[y].id==titrepodcast.id)
					{
						idpos=y;
					}
					
					y++;
										
				}
		
				if(idpos!=0)
				{
				
				viddes.removeChild(titrepodcast);
				
		
				if(idpos-1===0)
				{
				pod[0].style.backgroundColor="white";
				//rgb(" + [14,72,96].join() + ")
				}
				
				viddes.insertBefore(titrepodcast,pod[idpos-1]);
				
				
				pod[0].style.backgroundColor="silver";
				//pod[0].style.background="rgb(" + [249,17,5].join() + ")";
				
				
				
				
				}
			});				
			
			boutondescendre.addEventListener("click", function() {
				
				var y=0;
				var viddes=titrepodcast.parentElement;
				
				//var montest = playlist.getElementsByTagName("p");
				var idpos=0;
				var pod = viddes.getElementsByTagName('p');
				
				
				while(pod[y]!=null)
				{
					//console.log(montest[y].id);
					
					if(pod[y].id==titrepodcast.id)
					{
						idpos=y;
					}
					
					y++;
										
				}
				
				if(pod[idpos+1]!=null)
				{	
				
				if(idpos===0)
				{
				pod[0].style.background="white";
				}				
				
				var viddes=titrepodcast.parentElement;
		
				viddes.removeChild(titrepodcast);
				
				pod[0].style.backgroundColor="silver";
				
				viddes.insertBefore(titrepodcast,pod[idpos+1]);

				}				
				
			});				
				
			
			boutonsupprimer.addEventListener("click", function() {
				//var boutajout = document.getElementById(boutonsupprimer.id);
				
				var viddes=titrepodcast.parentElement;
				var pod = viddes.getElementsByTagName('p');
				
				titrepodcast.parentElement.removeChild(titrepodcast);
				
				if(pod[0]!=null)
				{
					pod[0].style.backgroundColor="silver";
				}
							
			});				
			
			
			/*
			boutonsupprimer.addEventListener("click", function() {
				console.log(boutonsupprimer.id);
			});
			*/
			i++;
			nbpodcast++;
			//playlist.insertBefore(titrepodcast,document.getElementById("get"))
			
			//playlist.appendChild(document.createElement("br"));
			
			if(i<xLen)
			{
				test();
			}
			
		}
		
		var pod = document.getElementById('playlist').getElementsByTagName('p');
		pod[0].style.backgroundColor="silver";

		//}
		
		

	  
		
		
      });
	  
}	  
    };
	 
	 
var allume=1; // 1 pour vidéo en play, 0 pour vidéo en pause
var cptvideo =0; // Temps écoulé dans la vidéo
var dureevideo=60*10; // les videos font toutes 10 minutes
var videoenlecture=null;

//var atitrevideo;
//var adescriptionvideo;




//Réglage du volume du son
document.getElementById("volume").addEventListener("change",function AdjustVolume() {
	
	if(document.getElementById('div1').getElementsByTagName("video")[0]!=null)
	{
	  document.getElementById('div1').getElementsByTagName("video")[0].volume = document.getElementById("volume").value;
	  document.getElementById("volumetxt").innerHTML = Math.round(document.getElementById("volume").value*100)+'%';
	}
  
});

//Couper ou activer le son de la vidéo
document.getElementById("mute").addEventListener("click",function (){

  if(document.getElementById('div1').getElementsByTagName("video")[0]!=null)
  {
  document.getElementById('div1').getElementsByTagName("video")[0].muted = !document.getElementById('div1').getElementsByTagName("video")[0].muted;
  document.getElementById("mute").style.backgroundColor = document.getElementById('div1').getElementsByTagName("video")[0].muted ? 'silver' : 'white';
  }
  
});




//Barre du temps du la vidéo
document.getElementById("videopos").addEventListener("change",function GotoPos(){
	
if(document.getElementById('div1').getElementsByTagName("video")[0]!=null)
{	
	
document.getElementById('div1').getElementsByTagName("video")[0].currentTime = document.getElementById("videopos").value;

 cptvideo=Math.round(document.getElementById('div1').getElementsByTagName("video")[0].currentTime);

}
 
});

//Définition des raccourcis clavier 
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; 
  }

  switch (event.key) {
    case "ArrowDown":
      petit();
      break;
    case "ArrowUp":
		grand();
      break;
    case "ArrowLeft":
      moins10();
      break;
    case "ArrowRight":
      plus10();
      break;
    case "0":
		pausedem();
      break;
    case "1":
		suiv1();
      break;	    
    default:
      return; 
  }

  event.preventDefault();
}, true); 
 
 
//Activer le plein écran
document.getElementById("grand").addEventListener("click",grand);
function grand(){
if(document.getElementById('div1').getElementsByTagName("video")[0]!=null)
{
	
var elem = document.getElementById('div1').getElementsByTagName("video")[0];	
	
  if(elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if(elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if(elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if(elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
} 
}

//Désactiver le plein écran
function petit() {
	
if(document.getElementById('div1').getElementsByTagName("video")[0]!=null)
{	
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
  
}
}

 
 



//Récupérer le temps écoulé dans la vidéo
setInterval(compteurvideo, 1000);
function compteurvideo(){
		
 if(document.getElementsByTagName("video")[0]!=null)
 {		

		cptvideo=Math.round(document.getElementsByTagName("video")[0].currentTime);
		 document.getElementById("dvs").innerHTML=Math.round(cptvideo);
		 document.getElementById("videopos").value=cptvideo;
		 
		 //document.getElementById("dvs").innerHTML=Math.round(cptvideo);
	
 }	

 
console.log(cptvideo);
	
}


//Avancer le temps de 10 secondes dans la vidéo
document.getElementById("avance").addEventListener("click",plus10);
function plus10()
{ 
 if(document.getElementsByTagName("video")[0]!=null)
 {
	  
	 if(cptvideo+10>=600)
	 {
		 cptvideo=599;
	 }
	 else
	 {	 
	 cptvideo=cptvideo+10;
	 document.getElementsByTagName("video")[0].currentTime=document.getElementsByTagName("video")[0].currentTime+10;
	 }
 }
}
 

//Reculer le temps de 10 secondes dans la vidéo
  document.getElementById("reculer").addEventListener("click",moins10);
 function moins10()
 { 
 if(document.getElementsByTagName("video")[0]!=null)
 {
	 if(cptvideo-10<0)
	 {
		 cptvideo=0;
	 }
	 else
	 {	 
	 cptvideo=cptvideo-10;
	 }
	  document.getElementsByTagName("video")[0].currentTime=document.getElementsByTagName("video")[0].currentTime-10; 
 }

	
	
 }
 
 
//Mettre en pause la vidéo
document.getElementById("sas").addEventListener("click", pausedem);	 
function pausedem()
{	 
	 if(document.getElementsByTagName("video")[0]!=null)
	 {
	 
		 if(allume===1)
		 {
			 document.getElementById('div1').getElementsByTagName("video")[0].pause();
			 document.getElementById("sas").innerHTML="&#x25B6;";
			 allume=0;
		 }
		 else
		 {
			 document.getElementById('div1').getElementsByTagName("video")[0].play();
			 document.getElementById("sas").innerHTML="&#10074;&#10074;";
			 allume=1;
		 }	
	 }
}	

//Afficher la vidéo suivante
document.getElementById('suiv').addEventListener("click",suiv1);
function suiv1(){
	
	if(videoenlecture!=null & document.getElementById('playlist').getElementsByTagName('p')[0]!=null)
	{
		document.getElementById('playlistlu').appendChild(videoenlecture);
		document.getElementById('playlistlu').insertBefore(videoenlecture,document.getElementById('playlistlu').getElementsByTagName('p')[0]);
		if(document.getElementById('playlistlu').getElementsByTagName('p')[1]!=null)
		{
			document.getElementById('playlistlu').getElementsByTagName('p')[1].style.backgroundColor="white";
		}
		
	}
	
		
	if(document.getElementById('playlist').getElementsByTagName('p')[0]!=null)
	{			
		
		
		var listevideo=document.getElementById('div1').getElementsByTagName("video"); // Récupération de la vidéo dans le lecteur	
		if(listevideo[0]!=null)
		{
			//console.log("test");
			//video1.pause();
			//document.getElementById('video1').removeChild(listesource[0]);
			
			document.getElementById('div1').removeChild(listevideo[0]);
			//document.getElementById('div1').getElementsByTagName("video")[0]=null;
		}			
		
		
		
		var pod = document.getElementById('playlist').getElementsByTagName('p'); // Récupération de toutes les vidéos dans la playlist
		
		document.getElementById("titvid").innerHTML=pod[0].getElementsByTagName("div")[0].innerHTML; //Copie du titre de la première vidéo de la playlist dans le lecteur de vidéos
		document.getElementById("aades").innerHTML=pod[0].getElementsByTagName("div")[1].innerHTML;  //Copie de la description la première vidéo de la playlist dans le lecteur de vidéos
		
		
			
		console.log(pod[0].value);

		var video1 = document.createElement("video");	
		var sourcevideo = document.createElement("source");
		
		
		sourcevideo.src=pod[0].value;
		sourcevideo.type="video/mp4";
		
		video1.appendChild(sourcevideo);
		document.getElementById('div1').appendChild(video1);
		document.getElementById('div1').insertBefore(video1,document.getElementById("div2"));
		
		document.getElementById("sas").innerHTML="&#10074;&#10074;";
		video1.play();
		allume=1;			

		
		
		videoenlecture= pod[0];
		
		document.getElementById('playlist').removeChild(pod[0]);
		
		
		//document.getElementById('playlistlu').appendChild(videoenlecture);
		//document.getElementById('playlistlu').insertBefore(videoenlecture,document.getElementById('playlistlu').getElementsByTagName('p')[0]);
		
		
		
		if(pod[0]!=null)
		{
		pod[0].style.backgroundColor="silver";
		}
		cptvideo=0;
		
		//dureevideo=Math.round(video1.duration);
		
		document.getElementById("videopos").value=0;
		document.getElementById("volume").value=1;
		document.getElementById("volumetxt").innerHTML=100;
		document.getElementById("mute").style.backgroundColor="white";
	}	
}

 
//affiche la vidéo précédente
document.getElementById('prec').addEventListener("click",pred1);
function pred1(){
	
	if(videoenlecture!=null & document.getElementById('playlistlu').getElementsByTagName('p')[0]!=null)
	{
		document.getElementById('playlist').appendChild(videoenlecture);
		document.getElementById('playlist').insertBefore(videoenlecture,document.getElementById('playlist').getElementsByTagName('p')[0]);
		if(document.getElementById('playlist').getElementsByTagName('p')[1]!=null)
		{
			document.getElementById('playlist').getElementsByTagName('p')[1].style.backgroundColor="white";
		}		
	}
	
		
	if(document.getElementById('playlistlu').getElementsByTagName('p')[0]!=null)
	{			
		
		
		var listevideo=document.getElementById('div1').getElementsByTagName("video"); // Récupération de la vidéo dans le lecteur	
		if(listevideo[0]!=null)
		{
			//console.log("test");
			//video1.pause();
			//document.getElementById('video1').removeChild(listesource[0]);
			
			document.getElementById('div1').removeChild(listevideo[0]);
		}			
		
		
		
		var pod = document.getElementById('playlistlu').getElementsByTagName('p'); // Récupération de toutes les vidéos dans la playlist
		
		document.getElementById("titvid").innerHTML=pod[0].getElementsByTagName("div")[0].innerHTML; //Copie du titre de la première vidéo de la playlist dans le lecteur de vidéos
		document.getElementById("aades").innerHTML=pod[0].getElementsByTagName("div")[1].innerHTML;  //Copie de la description la première vidéo de la playlist dans le lecteur de vidéos
		
		
			
		console.log(pod[0].value);

		var video1 = document.createElement("video");	
		var sourcevideo = document.createElement("source");
		
		
		sourcevideo.src=pod[0].value;
		sourcevideo.type="video/mp4";
		
		video1.appendChild(sourcevideo);
		document.getElementById('div1').appendChild(video1);
		document.getElementById('div1').insertBefore(video1,document.getElementById("div2"));
		
		document.getElementById("sas").innerHTML="&#10074;&#10074;";
		video1.play();
		allume=1;			

		
		
		videoenlecture= pod[0];
		
		document.getElementById('playlistlu').removeChild(pod[0]);
		
		
		//document.getElementById('playlistlu').appendChild(videoenlecture);
		//document.getElementById('playlistlu').insertBefore(videoenlecture,document.getElementById('playlistlu').getElementsByTagName('p')[0]);
		
		
		
		if(pod[0]!=null)
		{
		pod[0].style.backgroundColor="silver";
		}
		cptvideo=0;
		
		//dureevideo=Math.round(video1.duration);
		
		document.getElementById("videopos").value=0;
		document.getElementById("volume").value=1;
		document.getElementById("volumetxt").innerHTML=100;
		document.getElementById("mute").style.backgroundColor="white";
	}	
}

 
 
 
//1: Supprimer une vidéo si elle est terminé
//2: Afficher une vidéo suivante si aucune vidéo n'est affichée
setInterval(affichevideo, 1000);
function affichevideo(){
	if(document.getElementById('div1').getElementsByTagName("video")[0]!=null)
	{
		
		var listevideo=document.getElementById('div1').getElementsByTagName("video");
		if(dureevideo===cptvideo)
		{
			document.getElementById('div1').removeChild(listevideo[0]);
			//document.getElementById('div1').getElementsByTagName("video")[0]=null;
			document.getElementById("aades").innerHTML="";
			document.getElementById("titvid").innerHTML="Aucune vidéo";
			cptvideo=0;
			
			if(videoenlecture!=null)
			{
				document.getElementById('playlistlu').appendChild(videoenlecture);
				document.getElementById('playlistlu').insertBefore(videoenlecture,document.getElementById('playlistlu').getElementsByTagName('p')[0]);
				
				if(document.getElementById('playlistlu').getElementsByTagName('p')[1]!=null)
				{
					document.getElementById('playlistlu').getElementsByTagName('p')[1].style.backgroundColor="white";
				}				
			}			
			
		}
	}
	else
	{
		if(document.getElementById('playlist').getElementsByTagName('p')[0]!=null)
		{
		var pod = document.getElementById('playlist').getElementsByTagName('p');
		
		videoenlecture= pod[0];
			
		console.log(pod[0].value);

		var video1 = document.createElement("video");	
		var sourcevideo = document.createElement("source");
		
		//video1.width="50%";
		//video1.height="50%";
		
		
		document.getElementById("titvid").innerHTML=pod[0].getElementsByTagName("div")[0].innerHTML;
		document.getElementById("aades").innerHTML=pod[0].getElementsByTagName("div")[1].innerHTML;
		
		sourcevideo.src=pod[0].value;
		sourcevideo.type="video/mp4";
		
		video1.appendChild(sourcevideo);
		document.getElementById('div1').appendChild(video1);
		
		document.getElementById('div1').insertBefore(video1,document.getElementById("div2"));
		
		
		video1.play();
		allume=1;			
		document.getElementById("sas").innerHTML="&#10074;&#10074;";
		
		document.getElementById('playlist').removeChild(pod[0]);
		
		if(pod[0]!=null)
		{	
		pod[0].style.background="silver";
		}
		
		}
		else
		{
			//cument.getElementById("ades").innerHTML="Aucune vidéo";
			
		}

		document.getElementById("videopos").value=0;
		document.getElementById("volume").value=1;
		document.getElementById("volumetxt").innerHTML=100;
		document.getElementById("mute").style.backgroundColor="white";
	}
	

}

//
 	
	

//	
	
  })();

  
});