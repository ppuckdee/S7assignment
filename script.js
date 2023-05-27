class start extends Phaser.Scene {
    constructor() {
        super('start');
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        const text = this.add.text(centerX, centerY, 'Press the screen to jump', { fontSize: '32px', fill: '#ffffff' });
        text.setOrigin(0.5);

        this.input.on('pointerdown', this.startGame, this);
    }

    startGame() {
        this.scene.start('main');
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

        const line = this.add.line(centerX, 540, 0, 0, 1280, 0)
            .setStrokeStyle(1, 0xffffff, 1)
            .setOrigin(0.5);

        const circle = this.add.circle(80, 510, 30)
            .setFillStyle(0x8080FF)
            .setOrigin(0.5);

        const obstacles = this.add.group();
        const obstacleWidth = 60;
        const obstacleSpeed = 240;

        const createObstacle = () => {
            const obstacle = this.add.rectangle(this.cameras.main.width, 510, obstacleWidth, obstacleWidth, 0xFF8080);
            obstacles.add(obstacle);
        };

        createObstacle();
        createObstacle();
        createObstacle();

        this.updateBall = (delta) => {
            var distance = (120 * delta) / 1000;
            circle.x += distance;

            if (circle.x >= 1200) {
                this.scene.start('end');
            }
        };

        this.updateObstacles = (delta) => {
            const obstacleDistance = (obstacleSpeed * delta) / 1000;
            obstacles.getChildren().forEach((obstacle) => {
                obstacle.x -= obstacleDistance;

                if (Phaser.Geom.Intersects.RectangleToRectangle(obstacle.getBounds(), circle.getBounds())) {
                    this.scene.start('end');
                }

                if (obstacle.x + obstacleWidth < 0) {
                    obstacles.remove(obstacle, true);
                    createObstacle();
                }
            });
        };

        const jumpHeight = 360;
        const jumpDuration = 500;
        const groundY = 540;
        let isJumping = false;
        let jumpTween = null;

        const jumpBall = () => {
            if (!isJumping) {
                isJumping = true;
                jumpTween = this.tweens.add({
                    targets: circle,
                    y: groundY - jumpHeight,
                    duration: jumpDuration,
                    ease: 'Quad.easeOut',
                    yoyo: true,
                    onComplete: () => {
                        isJumping = false;
                    }
                });
            }
        };

        this.input.on('pointerdown', jumpBall);
    }

    update(time, delta) {
        this.updateBall(delta);
        this.updateObstacles(delta);
    }
}

class end extends Phaser.Scene {
    constructor() {
        super('end');
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        const text = this.add.text(centerX, centerY, 'Great job!', { fontSize: '32px', fill: '#ffffff' });
        text.setOrigin(0.5);

        this.input.on('pointerdown', this.startGame, this);
    }

    startGame() {
        this.scene.start('start');
    }
}

let config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    scene: [start, main, end]
}

let game = new Phaser.Game(config);
