//2,54 = polegada
//Pixel = Centímetro * (DPI / 2,54)
var c = document.getElementById('canvas');
c.style.border = "1px solid";

ctx = c.getContext("2d");
ctx.fillStyle = "#0000000";

//Posição do grafico
var posX = 3
var posY = 30

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);

  //Definição geral do grafico
  var dpi = parseFloat(document.getElementById('dpi').value) / 25.4;
  var turns = parseFloat(document.getElementById('turns').value);
  var line_heg = parseFloat(document.getElementById('ant_height').value) * dpi;
  var line_len = parseFloat(document.getElementById('cond_thickness').value) * dpi;
  var gap_btw_lines = parseFloat(document.getElementById('cond_spacing').value) * dpi;
  var line_dist = (line_len + gap_btw_lines)

  //Image
  c.height = dpi * parseFloat(document.getElementById('img_height').value) 
  c.width = dpi * parseFloat(document.getElementById('img_width').value)
    
  //Bases
  var lowerBasePosY = posY + line_heg
  var highBasePosY = posY + line_len

  //Linha
  var linePosX = line_n => posX + line_dist * line_n
  var linePosY = posY + line_len

  //Formas
  var line = line_n => ctx.fillRect(linePosX(line_n), linePosY, line_len, line_heg)
  var higherBase = line_n => ctx.fillRect(linePosX(line_n), highBasePosY, line_dist, line_len)
  var lowerBase = line_n => ctx.fillRect(linePosX(line_n), lowerBasePosY, line_dist, line_len)


  for (i = 0; i < turns; i++) {
    line(i)
    i % 2 ? higherBase(i) : lowerBase(i)
  }

}

draw()