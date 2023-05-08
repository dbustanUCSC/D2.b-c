class Troll extends AdventureScene {
    constructor() {
        super("scene1", "Troll Tunnel");
    }
    preload(){
        this.load.image('Troll Tunnel Back', '/assets/Scene 2.png')
        this.load.image('Minecraft', '/assets/minecraft.png')
        this.load.image('arrow','/assets/Arrow.png')
        this.load.image('ani1','/assets/Animation 1.png')
        this.load.image('ani2','/assets/Animation 2.png')
        this.load.image('ani3','/assets/Animation 3.png')
        this.load.image('ani4','/assets/Animation 4.png')
    }
    onEnter() {
        
        let scene1bg = this.add.image(-500, 0, 'Troll Tunnel Back');
        scene1bg.setOrigin(0);
        scene1bg.setDepth(-1);
        if (!this.hasItem('Dirt Block')){
            let MCcontainer = this.createContainer('Minecraft', 'Dirt Block',this.w * 0.6, this.w * 0.5)
            .on('pointerover', () => {
                     this.BounceProperty(MCcontainer,1.5, 1)
                     this.showMessage("A block from some pretty famous game...")
                 })  
                 
                 .on('pointerdown', () => {
                     this.pickUpItem(MCcontainer, 'Dirt Block', 'You picked up the Minecraft Block.')
                 })
        }
            this.anims.create({
                key: 'arrow-hover',
                frames: [
                    {key: 'arrow'},
                    {key: 'ani1'},
                    {key: 'ani2'},
                    {key: 'ani3'},
                    {key: 'ani4'}
                ],
                frameRate: 9,
                repeat: -1
            })
        let Arrow = this.add.sprite(750,900, 'arrow')
        Arrow.setInteractive()
        Arrow.setScale(0.7)
            .on('pointerover', () => {
                this.BounceProperty(Arrow,1.1,0.7)
                Arrow.anims.play('arrow-hover');
                this.showMessage("Probably the right way to go!")
            })
            .on('pointerout', () => {
                Arrow.anims.stop('arrow-hover');
                Arrow.setTexture('arrow');
            })
            .on('pointerdown', () => {
                this.showMessage("here we go...");
                this.gotoScene('scene2');
            })

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

class Scene2 extends AdventureScene {
    constructor() {
        super("scene2", "Yakuza Merch Room");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "turn around")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Maybe you missed something?");
            })
            .on('pointerdown', () => {
                this.gotoScene('scene1');
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
        this.add.image(0, 0, 'trash day').setOrigin(0, 0).setScale(0.9)
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
            this.time.delayedCall(1000, () => this.scene.start('scene1'));
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
    scene: [Intro, Troll, Scene2, Outro],
    title: "Adventure Game",
});

