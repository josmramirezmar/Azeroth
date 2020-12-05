// Se crear un nuevo objeto "Phaser.juego" y se define su tamaño
var juego = new Phaser.Game(1435, 957, Phaser.CANVAS, "mapi");

// Definiendo los estados por mapa
juego.state.add('Mazeroth', Mazeroth);
juego.state.add('Mrasganorte', Mrasganorte);
juego.state.add('Mkalimdor', Mkalimdor);
juego.state.add('Mreinos', Mreinos);
juego.state.add('Mpandaria', Mpandaria);
juego.state.add('Mislas', Mislas);

// Arrancando el mapa inicial (azeroth)
juego.state.start('Mazeroth');
