



class Scene1 extends Phaser.Scene {
    constructor() {
        super('bootGame') 
    }

    preload() {
        this.load.image('background', './assets/background.png')
        this.load.spritesheet("ship", './sprites/ship.png', {frameWidth: 16, frameHeight: 16})
        this.load.spritesheet("ship2", './sprites/ship2.png', {frameWidth: 32, frameHeight: 16})
        this.load.spritesheet("ship3", './sprites/ship3.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet("explosion", './sprites/explosion.png', {frameWidth: 16, frameHeight: 16})
        this.load.spritesheet("power-up", './assets/power-up.png', {frameWidth: 16, frameHeight: 16})
        this.load.spritesheet("player", './sprites/player.png', {frameWidth: 16, frameHeight: 24})

    }
    
 

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background")
        this.background.setOrigin(0, 0)
        this.add.text(20, 20, "Loading game ...", {fontFamily: 'PressStart2P', fontSize: '8px'})
        this.ship1 = this.add.sprite(config.width/2 - 50, config.height/2, 'ship').setScale(1.3)
        this.ship2 = this.add.sprite(config.width/2, config.height/2, 'ship2');
        this.ship3 = this.add.sprite(config.width/2 + 50, config.height/2, 'ship3');
        this.player = this.physics.add.sprite(config.width/2 - 8, config.height -64, 'player')
        this.player.setCollideWorldBounds(true)        

        this.anims.create({
            key: "ship1_anim",
            frames: this.anims.generateFrameNumbers("ship"),
            frameRate: 20,
            repeat: -1,
        })
        this.anims.create({
            key: "ship2_anim",
            frames: this.anims.generateFrameNumbers("ship2"),
            frameRate: 20,
            repeat: -1,
        })
        this.anims.create({
            key: "ship3_anim",
            frames: this.anims.generateFrameNumbers("ship3"),
            frameRate: 20,
            repeat: -1,
        })
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        })
        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("power-up", {start: 0, end: 1}),
            frameRate: 20,
            repeat: -1,
        })
        this.anims.create({
            key: "gray",
            frames: this.anims.generateFrameNumbers("power-up", {start: 2, end: 3}),
            frameRate: 20,
            repeat: -1,
        })
        this.anims.create({
            key: "thrust",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 20,
            repeat: -1,
        })

        //Run the animations
        this.ship1.anims.play('ship1_anim')
        this.ship2.anims.play('ship2_anim')
        this.ship3.anims.play('ship3_anim')
        this.player.play('thrust')

        //Set the ships interacitve
        this.ship1.setInteractive()
        this.ship2.setInteractive()
        this.ship3.setInteractive()

        //Destroy ship when clicking
        this.input.on('gameobjectdown', this.destroyShip, this)

        //Power-ups
        this.powerUps = this.physics.add.group()

        let maxObject = 4
        for(let i = 0; i <= maxObject; i++) {
            let powerUp = this.physics.add.sprite(16, 16, "power-up")
            this.powerUps.add(powerUp)
            powerUp.setRandomPosition(0, 0, game.config.width, game.config.height)

            if(Math.random() > 0.5) {
                powerUp.play('red')
            } else {
                powerUp.play('gray')
            }

            powerUp.setVelocity(100, 100)
            powerUp.setCollideWorldBounds(true)
            powerUp.setBounce(1)
        }

        //Cursors
        this.cursors = this.input.keyboard.createCursorKeys();

    

    }

    moveShip(ship, speed) {
        ship.y += speed; 
        if(ship.y > config.height) {
            this.resetShipPos(ship)
        }  
    }

    resetShipPos(ship) {
        ship.y = 0;
        let randomX = Phaser.Math.Between(0, config.width)
        ship.x = randomX
    }

    destroyShip(pointer, gameObject) {
        gameObject.setTexture("explosion")
        gameObject.play("explode")
    }

    movePlayerManager() {
        if(this.cursors.left.isDown) {
            this.player.setVelocityX(-200)
         } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200)
         }
    }

    update() {

    
   
        if(this.cursors.left.isDown) {
            this.player.setVelocityX(-200)
          
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200)
       
        } else {
            this.player.setVelocityX(0)
        }

    

          this.moveShip(this.ship1, 1)
          this.moveShip(this.ship2, 2)
          this.moveShip(this.ship3, 3)

          this.background.tilePositionY -= 0.5;


    
         
     
    }
}

