var options = ["0", "32", "15", "19", "4", "21", "2", "25", "17", "34", "6", "27", "13", "36", "11", "30", "8", "23", "10", "5", "24", "16", "33", "1", "20", "44", "31", "9", "22", "18", "29", "7", "28", "12", "35", "3", "26"];

var angleDepart = 0;
var arc = Math.PI / (options.length / 2);
var delaiRotation = null;

var debutArcRotation = 10;
var tempsRotation = 0;
var tempsRotationTotal = 0;

var ctx;

document.getElementById("tourner").addEventListener("click", tourner);

function dessinerRoulette() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var rayonExterieur = 200;
    var rayonText = 160;
    var rayonInterieur = 125;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);

    ctx.strokeStyle = "black";  
    ctx.lineWidth = 2;

    ctx.font = 'bold 12px Helvetica, Arial';

    for(var i = 0; i < options.length; i++) {
      var angle = angleDepart + i * arc;
      
      if(i === 0) {
        ctx.fillStyle = '#0C0'  
      } else {
        ctx.fillStyle = (i % 2 === 0) ? '#000' : '#C00';
      }
      
      ctx.beginPath();
      ctx.arc(250, 250, rayonExterieur, angle, angle + arc, false);
      ctx.arc(250, 250, rayonInterieur, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      
      
      ctx.fillStyle = '#FFF'  
      
      ctx.translate(250 + Math.cos(angle + arc / 2) * rayonText, 
                    250 + Math.sin(angle + arc / 2) * rayonText);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text = options[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    } 

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (rayonExterieur + 5));
    ctx.lineTo(250 + 4, 250 - (rayonExterieur + 5));
    ctx.lineTo(250 + 4, 250 - (rayonExterieur - 5));
    ctx.lineTo(250 + 9, 250 - (rayonExterieur - 5));
    ctx.lineTo(250 + 0, 250 - (rayonExterieur- 13));
    ctx.lineTo(250 - 9, 250 - (rayonExterieur- 5));
    ctx.lineTo(250 - 4, 250 - (rayonExterieur- 5));
    ctx.lineTo(250 - 4, 250 - (rayonExterieur+ 5));
    ctx.fill();
  }
}

function tourner() {
  debutAngleRotation = Math.random() * 10 + 10;
  tempsRotation = 0;
  tempsRotationTotal = Math.random() * 10 * 1000;
  tournerRoue();
}

function tournerRoue() {
  tempsRotation += 30;
  if(tempsRotation >= tempsRotationTotal ) {
    arretRotation();
    return;
  }
  var angleRotation = debutAngleRotation - easeOut(tempsRotation, 0, debutAngleRotation, tempsRotationTotal);
  angleDepart += (angleRotation * Math.PI / 180);
  dessinerRoulette();
  delaiRotation = setTimeout('tournerRoue()', 30);
}

function arretRotation() {
  clearTimeout(delaiRotation);
  var degrees = angleDepart * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  ctx.save();
  ctx.font = 'bold 30px Helvetica, Arial';
  var text = options[index];
  ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
  ctx.restore();
  return this.text;
}

function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}

dessinerRoulette();

var elmt = document.getElementById('choice').value//addEventListener("change", valeur());
var mise = document.getElementById('mise').value//addEventListener("change", valeur());

function valeur () {
  return this.value;

}

 function typeNum(num) {
   
   if (num % 2 == 0) {
    return  true; 
   }
   else{
     return false;
   }
   
 }
 var b = elmt;
 var a = arretRotation();
function gameRule(a,b) {
  var pocketCl = document.getElementById('pocketClient').value;
  var pocketMch = document.getElementById('pocketOrdi').value;
  /*if(a == 0){
   this.ordipocket = this.mise;
    mise = 0;
  }
  if (a == b) {
  this.mise += this.mise * 35;
  }
  
  if(typeNum(a) == typeNum(b)){
    this.mise +=this.mise*this.mise;
  }
  else{
    this.ordipocket = this.mise;

  }*/
  if (typeNum(a) == typeNum(b))
  {
  	pocketCl += mise;
  	document.getElementById('pocketClient').value = pocketCl;
  }
  else{
  	pocketCl -= this.mise;
  	pocketMch += this.mise;
  	document.getElementById('pocketClient').value = pocketCl;
  	document.getElementById('pocketOrdi').value = pocketMch; 	
  }
}

gameRule(a,b);
