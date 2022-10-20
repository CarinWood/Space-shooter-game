
    const config = {
        width: 256,
        height: 272,
        backgroundColor: 0x000000,
        physics: {
            default: "arcade",
            arcade: {
                debug: false
            }
        },
        scene: [Scene1, Scene2]
    }

    const game = new Phaser.Game(config);

    
