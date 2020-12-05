// Se crear un nuevo objeto "Phaser.Game" y se define su tamaño
var juego = new Phaser.Game(1435, 957, Phaser.CANVAS, "mapi");

// Variables globales
var fondo;
var bup;
var bright;
var bdown;
var bleft;
var up = false;
var right = false;
var down = false;
var left = false;
var back = false;
var bkal;
//var ppartida;
//var pllegada;

// Definicion del mapa general inicial
var mazeroth = {
  preload: function() {
    // Carga de las imágenes
		juego.load.image("imgaz", "../imagenes/mapazeroth.jpg");
    juego.load.image("bdespx", "../imagenes/bdespx.png");
    juego.load.image("bdespy", "../imagenes/bdespy.png");
    juego.load.image("bback", "../imagenes/bback.png");
    juego.load.image("bubi", "../imagenes/bubi.png");
    // Carga de las imágenes del grifo camindndo en spritesheet
    juego.load.spritesheet("grifou", "../imagenes/grifou.png", 80, 77);
    juego.load.spritesheet("grifor", "../imagenes/grifor.png", 80, 77);
    juego.load.spritesheet("grifod", "../imagenes/grifod.png", 80, 89);
	},

  // Inicializacion
	create: function() {
    // Muestra el fondo
    fondo = juego.add.tileSprite(0, 0, 1435, 957, "imgaz");

    // Animacion grifo
    grifox = juego.add.sprite(80, 300, "grifor");
		  grifox.animations.add("gcaminarx", [0, 1, 2, 3], 5, true);  // se crea la animación, orden de los pasos, velocidad
		  grifox.anchor.setTo(0.5); // centra las coordenadas del objeto
    grifoarriba = juego.add.sprite(80, 200, "grifou");
		  grifoarriba.animations.add("gcaminaru", [0, 1, 2, 3], 5, true);
		  grifoarriba.anchor.setTo(0.5);
    grifoabajo = juego.add.sprite(80, 400, "grifod");
		  grifoabajo.animations.add("gcaminard", [0, 1, 2, 3], 5, true);
		  grifoabajo.anchor.setTo(0.5);

    // Activa la capacidad de reconocer coliciones, bordes, gravedad, etc.
		juego.physics.startSystem(Phaser.Physics.ARCADE);
    juego.physics.arcade.enable(grifox);
		  grifox.body.collideWorldBounds = false;
    juego.physics.arcade.enable(grifoarriba);
		  grifoarriba.body.collideWorldBounds = false;
    juego.physics.arcade.enable(grifoabajo);
		  grifoabajo.body.collideWorldBounds = false;

    // Botones de desplazamiento
    bup = juego.add.button(80, 30, "bdespy", this.arriba, this); // crea el botón y le asigna una función
  		bup.anchor.setTo(0.5); // centra las coordenadas del objeto
  		bup.scale.setTo(1, 1); // cambia el tamaño del botón
  		bup.alpha = 0.6; // cambia la transparencia del botón
      bup.events.onInputOver.add(function(){up=true;}); // define instancias a las acciones con el botón ( over, out, down, up )
      bup.events.onInputOut.add(function(){up=false;});
      bup.events.onInputDown.add(function(){up=true;});
      bup.events.onInputUp.add(function(){up=false;});
    bright = juego.add.button(120, 65, "bdespx", this.derecha, this);
  		bright.anchor.setTo(0.5);
  		bright.scale.setTo(1, 1);
  		bright.alpha = 0.6;
      bright.events.onInputOver.add(function(){right=true;});
      bright.events.onInputOut.add(function(){right=false;});
      bright.events.onInputDown.add(function(){right=true;});
      bright.events.onInputUp.add(function(){right=false;});
    bdown = juego.add.button(80, 100, "bdespy", this.abajo, this);
  		bdown.anchor.setTo(0.5);
  		bdown.scale.setTo(1, -1);
  		bdown.alpha = 0.6;
      bdown.events.onInputOver.add(function(){down=true;});
      bdown.events.onInputOut.add(function(){down=false;});
      bdown.events.onInputDown.add(function(){down=true;});
      bdown.events.onInputUp.add(function(){down=false;});
    bleft = juego.add.button(40, 65, "bdespx", this.izquierda, this);
  		bleft.anchor.setTo(0.5);
  		bleft.scale.setTo(-1, 1);
  		bleft.alpha = 0.6;
      bleft.events.onInputOver.add(function(){left=true;});
      bleft.events.onInputOut.add(function(){left=false;});
      bleft.events.onInputDown.add(function(){left=true;});
      bleft.events.onInputUp.add(function(){left=false;});

    // Botones de regreso
    bvolver = juego.add.button(30, 130, "bback", this.volver, this);
  		bvolver.anchor.setTo(0.5);
  		bvolver.scale.setTo(0.05, 0.05);
  		bvolver.alpha = 0.6;
      bvolver.events.onInputDown.add(function(){back=true;}); // define instancias a las acciones con el botón ( down, up )
      bvolver.events.onInputUp.add(function(){back=false;});

    // Botones de Ubicaciones
    bkal = juego.add.button(400, 600, "bubi", this.kal, this); // crea el botón y le asigna una función
  		bkal.anchor.setTo(0.5); // centra las coordenadas del objeto
  		bkal.scale.setTo(0.04, 0.04); // cambia el tamaño del botón
  		bkal.alpha = 0.7; // cambia la transparencia del botón
      bkal.events.onInputDown.add(function(){up=true;}); // define instancias a las acciones con el botón ( down, up )
      bkal.events.onInputUp.add(function(){up=false;});
	},

  // Reinterativo
	update: function() {
    if(up) { // condicion para activar la funcion de desplazamiento
		    this.arriba();
		} else {
			bup.alpha = 0.6;
      grifoarriba.animations.stop();
		}
    if(right) {
		    this.derecha();
		} else {
			bright.alpha = 0.6;
		}
    if(down) {
		    this.abajo();
		} else {
			bdown.alpha = 0.6;
      grifoabajo.animations.stop();
		}
    if(left) {
		    this.izquierda();
		} else {
			bleft.alpha = 0.6;
		}
    if(!right && !left){
      grifox.animations.stop();
    }
	},

  arriba: function() {
    fondo.tilePosition.y += 3; // mueve el fondo
    bkal.position.y -=3;
    bup.alpha = 1;          // cuando actua el boton se ve al 100%

    grifoarriba.scale.setTo(1, 1);  // define la orientación de la animación
    grifoarriba.animations.play("gcaminaru"); // pone la animación en play
  },

  derecha: function() {
    fondo.tilePosition.x -= 3;
    bright.alpha = 1;

    grifox.scale.setTo(1, 1);
    grifox.animations.play("gcaminarx");
  },

  abajo: function() {
    fondo.tilePosition.y -= 3;
    bdown.alpha = 1;

    grifoabajo.scale.setTo(1, 1);
    grifoabajo.animations.play("gcaminard");
  },

  izquierda: function() {
    fondo.tilePosition.x += 3;
    bleft.alpha = 1;

    grifox.scale.setTo(-1, 1);
    grifox.animations.play("gcaminarx");
  },

  volver: function() {
    this.state.start('estadoaz');
  },
}

// Definiendo el estado inicial
juego.state.add("estadoaz", mazeroth);
juego.state.start("estadoaz");
