// Variables globales
var up = false;
var right = false;
var down = false;
var left = false;
var back = false;
var ras = false;
var kal = false;
var rei = false;
var pan = false;
var isl = false;
var inf = false;

// Definicion del mapa de azeroth inicial
var Mazeroth = {
  preload: function() {
    // Carga de las imágenes
		juego.load.image("imgfond", "../imagenes/mapazeroth.jpg");
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
    fondo = juego.add.tileSprite(0, 0, 1435, 957, "imgfond");

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
  		bvolver.alpha = 0.8;
      bvolver.events.onInputDown.add(function(){back=true;}); // define instancias a las acciones con el botón ( down, up )
      bvolver.events.onInputUp.add(function(){back=false;});

    // Botones de Ubicaciones
    bras = juego.add.button(700, 90, "bubi", this.ras, this); // crea el botón y le asigna una función
  		bras.anchor.setTo(0.5); // centra las coordenadas del objeto
  		bras.scale.setTo(0.04, 0.04); // cambia el tamaño del botón
  		bras.alpha = 0.8; // cambia la transparencia del botón
      bras.events.onInputDown.add(function(){ras=true;}); // define instancias a las acciones con el botón ( down, up )
      bras.events.onInputUp.add(function(){ras=false;});
    bkal = juego.add.button(270, 450, "bubi", this.kal, this);
      bkal.anchor.setTo(0.5);
      bkal.scale.setTo(0.04, 0.04);
      bkal.alpha = 0.8;
      bkal.events.onInputDown.add(function(){kal=true;});
      bkal.events.onInputUp.add(function(){kal=false;});
    brei = juego.add.button(1250, 550, "bubi", this.rei, this);
      brei.anchor.setTo(0.5);
      brei.scale.setTo(0.04, 0.04);
      brei.alpha = 0.8;
      brei.events.onInputDown.add(function(){rei=true;});
      brei.events.onInputUp.add(function(){rei=false;});
    bpan = juego.add.button(700, 730, "bubi", this.pan, this);
      bpan.anchor.setTo(0.5);
      bpan.scale.setTo(0.04, 0.04);
      bpan.alpha = 0.8;
      bpan.events.onInputDown.add(function(){pan=true;});
      bpan.events.onInputUp.add(function(){pan=false;});
    bisl = juego.add.button(850, 400, "bubi", this.isl, this);
      bisl.anchor.setTo(0.5);
      bisl.scale.setTo(0.04, 0.04);
      bisl.alpha = 0.8;
      bisl.events.onInputDown.add(function(){isl=true;});
      bisl.events.onInputUp.add(function(){isl=false;});
	},

  // Reinterativo
	update: function() {
    if(up) { // condicion para activar la funcion de desplazamiento
		    this.arriba();
		} else {
			bup.alpha = 0.6;
      grifoarriba.animations.stop(); // detener la animacion
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
    if(!right && !left){ // condicion para detener la animacion de desplazamiento en x
      grifox.animations.stop();
    }
	},

  arriba: function() {
    fondo.tilePosition.y += 3; // mueve el fondo
    bras.position.y += 3; // mueve el boton para mantenerlo quieto
    bkal.position.y += 3;
    brei.position.y += 3;
    bpan.position.y += 3;
    bisl.position.y += 3;
    bup.alpha = 1; // cuando actua el boton se ve al 100%

    grifoarriba.scale.setTo(1, 1); // define la orientación de la animación
    grifoarriba.animations.play("gcaminaru"); // pone la animación en play
  },

  derecha: function() {
    fondo.tilePosition.x -= 3;
    bras.position.x -= 3; // mueve el boton para mantenerlo quieto
    bkal.position.x -= 3;
    brei.position.x -= 3;
    bpan.position.x -= 3;
    bisl.position.x -= 3;
    bright.alpha = 1;

    grifox.scale.setTo(1, 1);
    grifox.animations.play("gcaminarx");
  },

  abajo: function() {
    fondo.tilePosition.y -= 3;
    bras.position.y -= 3; // mueve el boton para mantenerlo quieto
    bkal.position.y -= 3;
    brei.position.y -= 3;
    bpan.position.y -= 3;
    bisl.position.y -= 3;
    bdown.alpha = 1;

    grifoabajo.scale.setTo(1, 1);
    grifoabajo.animations.play("gcaminard");
  },

  izquierda: function() {
    fondo.tilePosition.x += 3;
    bras.position.x += 3; // mueve el boton para mantenerlo quieto
    bkal.position.x += 3;
    brei.position.x += 3;
    bpan.position.x += 3;
    bisl.position.x += 3;
    bleft.alpha = 1;

    grifox.scale.setTo(-1, 1);
    grifox.animations.play("gcaminarx");
  },

  volver: function() { // funcion que regresa al estado inicial Mazeroth
    this.state.start('Mazeroth');
  },

  //funciones para cambiar estados(mapas)
  ras: function() {
    this.state.start('Mrasganorte');
  },
  kal: function() {
    this.state.start('Mkalimdor');
  },
  rei: function() {
    this.state.start('Mreinos');
  },
  pan: function() {
    this.state.start('Mpandaria');
  },
  isl: function() {
    this.state.start('Mislas');
  },
}
