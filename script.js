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

	//Valores brutos
	var N = parseFloat(document.getElementById('turns').value)
	var h = parseFloat(document.getElementById('ant_height').value)
	var gap = parseFloat(document.getElementById('cond_spacing').value)
	var W = parseFloat(document.getElementById('cond_thickness').value)
	var d = W + gap
	var a = W * 2 + gap

	//Definição geral do grafico
	var dpi = parseFloat(document.getElementById('dpi').value) / 25.4;
	var turns = N;
	var line_heig = h * dpi;
	var line_thick = W * dpi;
	var gap_btw_lines = gap * dpi;
	var line_dist = (line_thick + gap_btw_lines)

	//Image
	c.height = dpi * parseFloat(document.getElementById('img_height').value) 
	c.width = dpi * parseFloat(document.getElementById('img_width').value)

	//Bases
	var lowerBasePosY = posY + line_heig
	var highBasePosY = posY + line_thick

	//Linha
	var linePosX = line_n => posX + line_dist * line_n
	var linePosY = posY + line_thick

	//Formas
	var line = line_n => ctx.fillRect(linePosX(line_n), linePosY, line_thick, line_heig)
	var higherBase = line_n => ctx.fillRect(linePosX(line_n), highBasePosY, line_dist, line_thick)
	var lowerBase = line_n => ctx.fillRect(linePosX(line_n), lowerBasePosY, line_dist, line_thick)

	console.log("a = ", a)
	console.log("h = ", h) 
	console.log("N = ", N)
	console.log("d = ", d)
	console.log("W = ", W)

	document.getElementById('inductance').value = inductanceCalc(a, N, h, d, W)

	for (i = 0; i < turns; i++) {
		line(i)
		i % 2 ? higherBase(i) : lowerBase(i)
	}

}

function inductanceCalc(a, N, h, d, W) {
	return 0.0026 * (a ** 0.0603) * (h ** 0.4429) * (N ** 0.954) * (d ** 0.606) * (W ** -0.173)
}

draw()

function download() {
	console.log("TODO")
}
