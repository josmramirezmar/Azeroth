// Ejemplo de una estructura mínima para un juego creado utilizando la librería externa Phaser
//  realizado por el profesor Carlos Delgado para el curso Gráfica Interactiva de la Universidad Nacional de Colombia

// El primer paso es crear un nuevo objeto "Phaser.Game" y definir su tamaño
var juego = new Phaser.Game(320, 480, Phaser.CANVAS, "mapi");

//declara todas las variables globales
var fondo;
var pescado;
var flechaderecha;
var flechaizquierda;

// Define "jugando", donde va a ocurrir el juego
// El estado jugando tiene tres métodos básicos: preload, create y update
var jugando = {
	preload: function() {        // primero carga todas las imágenes
		juego.load.image("imgfondo", "../imagenes/mapazeroth.jpg");
		juego.load.image("sujeto", "../imagenes/dps.png");
	},

	create: function() {           // crea los actores y muestra las imágenes
		fondo = juego.add.tileSprite(0, 0, 320, 480, "imgfondo");

		pescado = juego.add.sprite(100, 150, "sujeto");
		pescado.anchor.setTo(0.5); // centra las coordenadas del objeto

		flechaderecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT); // activa la tecla derecha
		flechaizquierda = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);  // activa la tecla izquierda

		juego.physics.startSystem(Phaser.Physics.ARCADE);  // activa la capacidad de reconocer coliciones, bordes, gravedad, etc.
		juego.physics.arcade.enable(pescado);
		pescado.body.collideWorldBounds = true;  // no deja salir de los límites del juego
	},

	update: function(){                // ejecuta de manera reiterativa
    	fondo.tilePosition.x -= 1;	//  mueve el fondo un pixel a la izquierda

		if(flechaderecha.isDown){          //  si la tecla derecha está undida...
			pescado.position.x += 1;       //  mueve el pescado un pixel a la derecha
			pescado.scale.setTo(1, 1);    // voltea el pescado hacia la derecha
		}
		if(flechaizquierda.isDown){
			pescado.position.x -= 1;        //  mueve el pescado un pixel a la izquierda
			pescado.scale.setTo(-1, 1);  // voltea el pescado hacia la izquierda
			fondo.tilePosition.x +=2;       // contraresta el movimiento del fondo y lo mueve a la derecha
		}
	    if(juego.input.activePointer.isDown) {   // si el puntero del mouse está undido ( o el dedo toca la pantalla)...
            this.parar();                                       // ejecuta la función "parar()"
        } else {                                                  //  si no está undido.....
			pescado.angle = 0;                          //  devuelve el pescado a la rotación inicial
		}
	},

   parar: function(){                    // detiene el fondo y rota el pescado
	    pescado.angle -= 1;          // gira el pescado un grado
	    fondo.tilePosition.x += 1;  // contraresta el movimiento del fondo y lo detiene
     },
}

juego.state.add("activo", jugando);   // define a "jugando" como un estado
juego.state.start("activo");                 // inicia con el estado "jugando"
