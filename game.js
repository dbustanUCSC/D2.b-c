class Troll extends AdventureScene {
    constructor() {
        super("scene1", "Troll Tunnel");
    }
    preload(){
        this.load.image('Troll Tunnel Back', './assets/scene2.png')
        this.load.image('Minecraft', './assets/minecraft.png')
        this.load.image('arrow','./assets/arrow.png')
        this.load.image('ani1','./assets/animation1.png')
        this.load.image('ani2','./assets/animation2.png')
        this.load.image('ani3','./assets/animation3.png')
        this.load.image('ani4','./assets/animation4.png')
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
        this.load.image('MerchRoom', './assets/scene2.5.png')
        this.load.image('majima', './assets/majima.png')
        this.load.image('duck', './assets/kazumaduck.png')
    }
    onEnter() {
        let scene2bg = this.add.image(-300, 0, 'MerchRoom');
        scene2bg.setOrigin(0);
        scene2bg.setDepth(-1);
        scene2bg.setScale(0.75);
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
        super("scene3", "The Lab.");
    }
    preload(){
        this.load.image('Lab', './assets/scene3.png')
        this.load.image('Manny', './assets/mannycrop.png')
    }
    onEnter() {
        let Manny = this.add.image(900, 400, 'Manny');
        let scene3bg = this.add.image(-70, 0, 'Lab');
        let counter = 0;
        scene3bg.setOrigin(0);
        scene3bg.setDepth(-1);
        scene3bg.setScale(0.75);
        Manny.alpha = 0.5;
        Manny.setInteractive();
        Manny.on('pointerdown', () => {
            if (Manny.alpha != 0.01 && counter < 1){
                this.showMessage("Weird...")
                counter++;
            } else if (Manny.alpha != 0.01 && counter >= 1) {
                this.showMessage("I think he's the being that creates Trash day merch.")
                counter++;
            } else if (Manny.alpha == 0.01 && counter >= 1) {
                this.showMessage("He's gone?")
            }
            
        })
        
        let invis = this.add.image(1500, 400, 'Manny');
        invis.alpha = 0.01
        invis.setInteractive();
        invis.on('pointerdown', () => {
                this.showMessage("It's hard to read, but it says 'Trash Day Merch Cloner'. \n What could this mean?...")
        })
        let invis2 = this.add.image(270, 500, 'Manny');
        let check = false
        invis2.alpha = 0.01
        invis2.setInteractive();
        invis2.on('pointerdown', () => {
            this.showMessage("Oh shit...");
            let fade = this.add.rectangle(500, 500, this.cameras.main.width, this.cameras.main.height+90, 0x000000);
            fade.alpha = 0;
            fade.setDepth(2);
            this.tweens.add({
                targets: fade,
                alpha: 1,
                duration: 1000,
                onComplete: () => {
                    this.tweens.add({
                        targets: fade, 
                        alpha: 0.4,
                        duration: 7000,
                    });
                    invis2.alpha = 0;
                    check = true;
                    if (check == true){
                        const Arrow = this.ArrowCreation(1000, 500, 1, "I think I hear something over here...", "scene4", 1.0, 0.7);
                    }
                    // Code to execute after fade in
                }
            });
            this.tweens.add({
                targets: Manny,
                alpha: 0.01,
                duration: 1000,
            });
        });
        invis2.on('pointerover', () => {
            this.showMessage("Do I click it?")
        })
    }

}

class Scene4 extends AdventureScene{
    constructor(){
        super("scene4", 'MANNY!')
    }
    preload(){
        this.load.image('Manny', './assets/mannycrop.png')
        this.load.image('Background', './assets/scene4.png')
        this.load.image('Manny Text','./assets/mannytext.png')
    }
    onEnter(){
        let scene4bg = this.add.image(-70, 0, 'Background');
        let manny = this.add.image(0, 0, 'Manny');
        let lever = this.add.image(1400, 300, 'Manny');
        lever.alpha = 0.01
        lever.setInteractive();
        lever.on('pointerover', () => {
            this.showMessage("Looks like a lever! Do I grab it?")    
        })
        lever.on('pointerdown', () => {
                if (!this.hasItem('Dirt Block')){
                    this.showMessage("I can't reach it! This is the end...")
                    let rect = this.add.rectangle(500, 500, this.cameras.main.width, this.cameras.main.height+90, 0x000000);
                    rect.setDepth(0);
                    this.time.delayedCall(2000, () => this.scene.start('badoutro'));

                } else {
                    this.showMessage("Let me place down this block!")
                    this.loseItem('Dirt Block')
                    let rect = this.add.rectangle(500, 500, this.cameras.main.width, this.cameras.main.height+90, 0x000000);
                    rect.setDepth(0);
                    this.time.delayedCall(2000, () => this.scene.start('goodoutro'));
                }
        })
        let mannytext = this.add.particles(0,-50,'Manny Text', {
                x: 0,
                y: 0,
                lifespan: 2000,
                speed: { min: 400, max: 600 },
                angle: { min: 0, max: 360 },
                gravityY: 30,
                gravityX: 30,
                accelerationX: -400,
                accelerationY: -300,
                quantity: 0.00000001,
                blendMode: 'NORMAL'
        });
        mannytext.setScale(0.3)
        let mannyContainer = this.add.container(900, 800);
        mannyContainer.add(mannytext);
        mannyContainer.add(manny);
        manny.setDepth(2);
        
        mannytext.start();
        scene4bg.setOrigin(0);
        scene4bg.setDepth(-1);
        scene4bg.setScale(0.75);
        this.showMessage("He looks like he's going to kill me!");
    }

}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }

    preload(){
        this.load.image('trash day', './assets/scene1.png')
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

class BadOutro extends Phaser.Scene {
    constructor() {
        super('badoutro');
    }
    create() {
        this.add.text(50, 50, "Manny eats you alive and runs away. \nTrash Day no longer can supply merch. \nThis is the worst ending possible. Good job.").setFontSize(50);
        this.add.text(50, 200, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

class GoodOutro extends Phaser.Scene {
    constructor() {
        super('goodoutro');
    }
    create() {
        this.add.text(50, 50, "You pull the lever and kill Manny.").setFontSize(50);
        this.add.text(50, 100, "You are now his new replacement! Good job.").setFontSize(40);
        this.add.text(50, 200, "Click anywhere to restart.").setFontSize(20);
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
    scene: [Intro, Troll, Scene2, Scene3, Scene4, BadOutro, GoodOutro],
    title: "Adventure Game",
});

