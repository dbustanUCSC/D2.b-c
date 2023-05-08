class Troll extends AdventureScene {
    constructor() {
        super("room1", "Troll Tunnel");
    }
    preload(){
        this.load.image('Troll Tunnel Back', '/assets/Scene 2.png')
        this.load.image('Minecraft', '/assets/minecraft.png')
        this.load.image('arrow','/assets/Arrow.png')
    }
    onEnter() {
        let scene1bg = this.add.image(-500, 0, 'Troll Tunnel Back');
        scene1bg.setOrigin(0);
        scene1bg.setDepth(-1);
        let MCcontainer = this.createContainer('Minecraft', 'Dirt block',this.w * 0.6, this.w * 0.5)
            .on('pointerover', () => {
                this.BounceProperty(MCcontainer)
                this.showMessage("A block from some pretty famous game...");
            })  
            
            .on('pointerdown', () => {
                this.pickUpItem(MCcontainer, 'Minecraft Block', 'You picked up the Minecraft Block.');
            })

            let Arrow = this.add.image(this.w, this.w, 'arrow').setDepth(1);
            Arrow.setScale(0.1)

        /*this.MinecraftBlockWhole = this.add.container(this.w * 0.6, this.w * 0.5);
        this.Minecraft = this.add.text(75, 0, "Dirt Block")
        this.MinecraftBlockWhole.add(this.Minecraft)
        this.DirtBlock = this.add.image(0, 0,'Minecraft')
        this.DirtBlock.setScale(0.2)
        this.MinecraftBlockWhole.add(this.DirtBlock)
        this.MinecraftBlockWhole.setSize(200, 200);
        this.MinecraftBlockWhole.setInteractive();*/


       

      
            /*.on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo2');
                }
            })*/

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }

    preload(){
        this.load.image('trash day', '/assets/Scene 1.png')
    }
    create() {
        this.add.image(0, 0, 'trash day').setOrigin(0, 0);
        const title = this.add.text(50,50, "The Horrifying Secret of Trash Day. \n Click to start the story!").setFontSize(50);
        const hey = this.add.text(50,100, "You have been contacted by Trash Day (pictured behind). \n They want you to fix the production of their merch, as \n they have no more supply.").setFontSize(50);
        hey.alpha = 0;
        let currentText = title;
        const handleClick = () => {
            if (currentText == title){
                this.tweens.add ({
                    targets: title,
                    alpha: 0,
                    duration: 700,
                    onComplete: () => {
                        title.destroy();
                        currentText = hey;
                        this.tweens.add({
                            targets: hey,
                            alpha: 1,
                            duration: 700
                        });
                    }
                });
            } else if (currentText == hey){
                this.tweens.add({
                    targets: hey,
                    alpha: 0,
                    duration: 700,
                    onComplete: () => {
                      hey.destroy();
                      currentText = null;
                      this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('room1'));
                    }
                  });
            }
        };
        this.input.on('pointerdown', handleClick);
        /*this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });*/
       
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


 game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Troll, Demo2, Outro],
    title: "Adventure Game",
});

