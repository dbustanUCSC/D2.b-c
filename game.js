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
            let MCcontainer = this.createContainer('Minecraft', 'Dirt Block',this.w * 0.6, this.w * 0.5, 0.3)
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
        let Arrow = this.ArrowCreation(750, 900, 0, "Probably the right way to go!","scene2", 1.1, 0.7)

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
    preload(){
        this.load.image('MerchRoom', '/assets/Scene 2.5.png')
        this.load.image('majima', '/assets/majima.png')
        this.load.image('duck', '/assets/kazuma duck.png')
        this.load.image('arrow','/assets/Arrow.png')
        this.load.image('ani1','/assets/Animation 1.png')
        this.load.image('ani2','/assets/Animation 2.png')
        this.load.image('ani3','/assets/Animation 3.png')
        this.load.image('ani4','/assets/Animation 4.png')
    }
    onEnter() {
        let scene2bg = this.add.image(-300, 0, 'MerchRoom');
        scene2bg.setOrigin(0);
        scene2bg.setDepth(-1);
        scene2bg.setScale(0.75);
        const Arrow = this.ArrowCreation(750,900,3.14, "Maybe you missed something?", "scene1", 1.0, 0.7)
        let Duck = this.createContainer('duck', 'Dame Duck', 200,450, 0.15)  
            .on('pointerover', () => {
                this.BounceProperty(Duck,1.3, 1)
                this.showMessage("Dame Dane Dame yo...")
            })  
            .on('pointerdown', () => {
                this.pickUpItem(Duck, 'Kiryu Duck', 'You picked up the Kiryu Duck.')
            })
        let MajimaPoster = this.createContainer('majima', 'Weird Poster',900, 150, 0.17)
            .on('pointerover', () => {
                this.BounceProperty(MajimaPoster,1.3, 1)
                this.showMessage("Kiryu Chan...")
            })  
            .on('pointerdown', () => {
                this.pickUpItem(MajimaPoster, 'Cool Majima Poster', 'Why is this on the way to the Trash Day merch?...')
            })
        const Arrow2 = this.ArrowCreation(1100, 500, 1.14,"Onwards!", "scene3", 1.0, 0.7)
            
    }
}


class Scene3 extends AdventureScene {
    constructor() {
        super("scene3", "The Lab...");
    }
    preload(){
        this.load.image('Lab', '/assets/Scene 3.png')
        this.load.image('Manny', '/assets/Mannycrop.png')
    }
    onEnter() {
        let Manny = this.add.image(900, 400, 'Manny');
        let scene3bg = this.add.image(-70, 0, 'Lab');
        Manny.alpha = 0.5;
        Manny.setInteractive();
        Manny.on('pointerdown', () => {
            this.showMessage("When knocking on the display, you hear faint bubbles. What's going on?...")
        })
        scene3bg.setOrigin(0);
        scene3bg.setDepth(-1);
        scene3bg.setScale(0.75);
        let invis = this.add.image(1500, 400, 'Manny');
        invis.alpha = 0.05
        invis.setInteractive();
        invis.on('pointerdown', () => {
                this.showMessage("It's hard to read, but it says 'Trash Day Merch Cloner'. \n What could this mean?...")
        })
        let invis2 = this.add.image(270, 500, 'Manny');
        invis2.alpha = 0.05
        invis2.setInteractive();
        invis2.on('pointerdown', () => {
            this.showMessage("Oh shit...")
        })
        invis2.on('pointerover', () => {
            this.showMessage("Do I click it?")
        })


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
            this.time.delayedCall(1000, () => this.scene.start('scene3'));
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
    scene: [Intro, Troll, Scene2, Scene3, Outro],
    title: "Adventure Game",
});

