class AdventureScene extends Phaser.Scene {
    //need this for Arrowanimation func below
    preload(){
        this.load.image('arrow','/assets/Arrow.png')
        this.load.image('ani1','/assets/Animation 1.png')
        this.load.image('ani2','/assets/Animation 2.png')
        this.load.image('ani3','/assets/Animation 3.png')
        this.load.image('ani4','/assets/Animation 4.png')
    }
    init(data) {
        this.inventory = data.inventory || [];
    }

    constructor(key, name) {
        super(key);
        this.name = name;
    }

    create() {
        this.transitionDuration = 1000;

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        this.add.rectangle(this.w * 0.75, 0, this.w * 0.25, this.h).setOrigin(0, 0).setFillStyle(0);
        this.add.text(this.w * 0.75 + this.s, this.s)
            .setText(this.name)
            .setStyle({ fontSize: `${3 * this.s}px` })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s);
        
        this.messageBox = this.add.text(this.w * 0.75 + this.s, this.h * 0.33)
            .setStyle({ fontSize: `${2 * this.s}px`, color: '#eea' })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s);

        this.inventoryBanner = this.add.text(this.w * 0.75 + this.s, this.h * 0.66)
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setText("Inventory")
            .setAlpha(0);

        this.inventoryTexts = [];
        this.updateInventory();

        this.add.text(this.w-3*this.s, this.h-3*this.s, "📺")
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Fullscreen?'))
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });

        this.onEnter();

    }

    showMessage(message) {
        this.messageBox.setText(message);
        this.tweens.add({
            targets: this.messageBox,
            alpha: { from: 1, to: 0 },
            easing: 'Quintic.in',
            duration: 4 * this.transitionDuration
        });
    }

    updateInventory() {
        if (this.inventory.length > 0) {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 1,
                duration: this.transitionDuration
            });
        } else {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 0,
                duration: this.transitionDuration
            });
        }
        if (this.inventoryTexts) {
            this.inventoryTexts.forEach((t) => t.destroy());
        }
        this.inventoryTexts = [];
        let h = this.h * 0.66 + 3 * this.s;
        this.inventory.forEach((e, i) => {
            let text = this.add.text(this.w * 0.75 + 2 * this.s, h, e)
                .setStyle({ fontSize: `${1.5 * this.s}px` })
                .setWordWrapWidth(this.w * 0.75 + 4 * this.s);
            h += text.height + this.s;
            this.inventoryTexts.push(text);
        });
    }

    hasItem(item) {
        return this.inventory.includes(item);
    }

    gainItem(item) {
        if (this.inventory.includes(item)) {
            console.warn('gaining item already held:', item);
            return;
        }
        this.inventory.push(item);
        this.updateInventory();
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x - 20, to: text.x },
                    alpha: { from: 0, to: 1 },
                    ease: 'Cubic.out',
                    duration: this.transitionDuration
                });
            }
        }
    }

    loseItem(item) {
        if (!this.inventory.includes(item)) {
            console.warn('losing item not held:', item);
            return;
        }
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x, to: text.x + 20 },
                    alpha: { from: 1, to: 0 },
                    ease: 'Cubic.in',
                    duration: this.transitionDuration
                });
            }
        }
        this.time.delayedCall(500, () => {
            this.inventory = this.inventory.filter((e) => e != item);
            this.updateInventory();
        });
    }
    //new function
    createContainer(image, text, x, y, scale){
        const container = this.add.container(x, y);
        const contimage = this.add.image(0, 0, image);
        contimage.setScale(scale)
        const conttext = this.add.text(75, 0, text);
        conttext.setFontSize(33);
        container.add([contimage, conttext]);
        container.setSize(200,200);
        container.setInteractive();
        return container;
    }
    //new function
    pickUpItem(container, nameInInventory, messageToShow){
        this.showMessage(messageToShow);
                this.gainItem(nameInInventory);
                this.tweens.add({
                    targets: container,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => container.destroy()
                });
    }
    //new function
    BounceProperty(Object, scaleOn, scaleAfter){
        this.tweens.add({
            targets: Object,
            scaleX: scaleOn,
            scaleY: scaleOn,
            duration: 500,
            ease: 'Power2',
        });
        Object.on('pointerout', () => {
            this.tweens.add({
                targets: Object,
                scaleX: scaleAfter,
                scaleY: scaleAfter,
                duration: 500,
                ease: 'Power2',
            });
        })
    }
    //new function
    ArrowCreation(x, y, rotation, message, scene, bounceIn, bounceOut){
        let Arrow = this.add.sprite(x,y, 'arrow')
        .setInteractive()
        .setScale(0.7)
        .setRotation(rotation)
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
        Arrow.on('pointerover', () => {
            this.BounceProperty(Arrow, bounceIn, bounceOut)
            Arrow.anims.play('arrow-hover');
            this.showMessage(message);
        })
        .on('pointerout', () => {
            Arrow.anims.stop('arrow-hover');
            Arrow.setTexture('arrow');
        })
        .on('pointerdown', () => {
            this.gotoScene(scene);
        });
        return Arrow;
    }
    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, { inventory: this.inventory });
        });
    }

    onEnter() {
        console.warn('This AdventureScene did not implement onEnter():', this.constructor.name);
    }
}