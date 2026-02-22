const config = {
    type: Phaser.AUTO,
    width: 320,
    height: 320,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

new Phaser.Game(config);

let player;
let cursors;

function preload() {
    this.load.tilemapTiledJSON("map", "assets/map.json");
    this.load.image("tiles", "assets/tilemap_packed.png");

    this.load.spritesheet("player", "assets/player-spritesheet.png", {
        frameWidth: 64,
        frameHeight: 64
    });
}

function create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tilemap_packed", "tiles");

    const ground = map.createLayer("ground", tileset);
    const decoration = map.createLayer("decoration", tileset);
    const collision = map.createLayer("collision", tileset);

    collision.setCollisionByExclusion([-1]);

    // Spawn player
    player = this.physics.add.sprite(16, 16, "player", 0);

    // Make player 0.25 size
    player.setScale(0.5);

    // Fix hitbox to 1 tile
    player.body.setSize(16, 16);
    player.body.setOffset(24, 24);

    player.lastDirection = "down";

    this.physics.add.collider(player, collision);

    cursors = this.input.keyboard.createCursorKeys();

    // Animations
    this.anims.create({
        key: "walk-down",
        frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: "walk-left",
        frames: this.anims.generateFrameNumbers("player", { start: 4, end: 7 }),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: "walk-right",
        frames: this.anims.generateFrameNumbers("player", { start: 8, end: 11 }),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: "walk-up",
        frames: this.anims.generateFrameNumbers("player", { start: 12, end: 15 }),
        frameRate: 8,
        repeat: -1
    });

    // Camera
    this.cameras.main.setZoom(2);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(player);
}

function update() {
    let vx = 0;
    let vy = 0;

    const speed = cursors.shift.isDown ? 125 : 75;

    if (cursors.left.isDown) vx = -speed;
    if (cursors.right.isDown) vx = speed;
    if (cursors.up.isDown) vy = -speed;
    if (cursors.down.isDown) vy = speed;

    if (cursors.left.isDown && cursors.right.isDown) vx = 0;
    if (cursors.up.isDown && cursors.down.isDown) vy = 0;

    player.setVelocity(vx, vy);

    const moving = vx !== 0 || vy !== 0;

    if (moving) {
        if (vx < 0) {
            player.anims.play("walk-left", true);
            player.lastDirection = "left";
        }
        else if (vx > 0) {
            player.anims.play("walk-right", true);
            player.lastDirection = "right";
        }
        else if (vy < 0) {
            player.anims.play("walk-up", true);
            player.lastDirection = "up";
        }
        else if (vy > 0) {
            player.anims.play("walk-down", true);
            player.lastDirection = "down";
        }
    } else {
        player.anims.stop();

        // Idle frame based on last direction
        if (player.lastDirection === "down") player.setFrame(0);
        if (player.lastDirection === "left") player.setFrame(4);
        if (player.lastDirection === "right") player.setFrame(8);
        if (player.lastDirection === "up") player.setFrame(12);
    }
}