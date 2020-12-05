// Se crear un nuevo objeto "Phaser.Game" y se define su tamaño
var juego = new Phaser.Game(1435, 957, Phaser.CANVAS, "mapi");

// Variables globales
var fondo;
//var ppartida;
//var pllegada;

// Definicion del mapa general inicial
var mazeroth = {
  preload: function() {
    // Carga de las imágenes
		juego.load.image("imgfondo", "../imagenes/mapazeroth.jpg");
	},

  // Inicializacion
	create: function() {
    // Muestra el fondo
    fondo = juego.add.tileSprite(0, 0, 1435, 957, "imgfondo");

    // Activa la capacidad de reconocer coliciones, bordes, gravedad, etc.
		juego.physics.startSystem(Phaser.Physics.ARCADE);
	},

  // Reinterativo
	update: function() {
    fondo.tilePosition.x -= 1;	//  mueve el fondo un pixel a la izquierda
	}
}

// Definiendo el estado inicial
juego.state.add("estadoaz", mazeroth);
juego.state.start("estadoaz");
