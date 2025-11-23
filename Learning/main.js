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
        preload: preload,
        create: create,
        update: update
    }
};

new Phaser.Game(config);

let player;
let cursors;
let speed = 150;

function preload() {
    this.load.tilemapTiledJSON("map", "assets/map.json");
    this.load.image("tiles", "assets/tilemap_packed.png");

    // TEMP PLAYER (use any 16x16 image)
    this.load.spritesheet("player", "assets/player.png", {
        frameWidth: 16,
        frameHeight: 16
    });
}

function create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tilemap_packed", "tiles");

    const ground = map.createLayer("ground", tileset, 0, 0);
    const decoration = map.createLayer("decoration", tileset, 0, 0);
    const collision = map.createLayer("collision", tileset, 0, 0);

    collision.setCollisionByExclusion([-1]);

    player = this.physics.add.sprite(32, 32, "player", 0);
    this.physics.add.collider(player, collision);

    cursors = this.input.keyboard.createCursorKeys();

    // Zoom everything by 2x
    this.cameras.main.setZoom(2);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.centerOn(map.widthInPixels / 2, map.heightInPixels / 2);

    // Optional: center camera on player
    this.cameras.main.startFollow(player);
}

function update() {
    player.setVelocity(0);

    if (cursors.left.isDown) player.setVelocityX(-speed);
    if (cursors.right.isDown) player.setVelocityX(speed);
    if (cursors.up.isDown) player.setVelocityY(-speed);
    if (cursors.down.isDown) player.setVelocityY(speed);
}