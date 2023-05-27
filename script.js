class start extends Phaser.Scene {
    constructor() {
        super('start');
    }

    preload() {
        this.load.path = './assets/';
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        const text = this.add.text(centerX, centerY, 'Press <SPACE> to jump', { fontSize: '32px', fill: '#ffffff' });
        text.setOrigin(0.5);

        this.input.keyboard.on('keydown-SPACE', this.startGame, this);
    }

    startGame() {
        this.scene.start('main');
    }

    update() {

    }
}

class main extends Phaser.Scene {
    constructor() {
        super('main');
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        const text = this.add.text(centerX, centerY, 'Game scene', { fontSize: '32px', fill: '#ffffff' });
        text.setOrigin(0.5);
    }

    update() {

    }
}


class end extends Phaser.Scene {
    constructor() {
        super('end');
    }
}

let config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    scene: [start, main, end]
}

let game = new Phaser.Game(config);