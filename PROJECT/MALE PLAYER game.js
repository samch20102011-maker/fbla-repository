const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {debug: false}
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player;
let cursors;

const game = new Phaser.Game(config);

function preload() {
    this.load.spritesheet('player', 'spritesheet.png', {
        frameWidth: 32,    // CHANGE THIS
        frameHeight: 48.  // CHANGE THIS
    });
}

function create() {
    player = this.physics.add.sprite(400,300, 'player');

    // ---- ANIMATIONS ----
    // Down (frames 0-3)
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
    });

    // Left (frames 4-7)
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', {start: 4, end: 7 }),
        frameRate: 8,
        repeat: -1
    });

    // Right (frames 8-11)
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', {start: 8, end: 11 }),
        frameRate: 8,
        repeat: -1
    });

    // Up (frames 12-15)
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', {start: 12, end: 15 }),
        frameRate: 8,
        repeat: -1
    });
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    const speed = 150;
    player.setVelocity(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-speed);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(speed);
        player.anims.play('right', true);
    }
    else if (cursors.up.isDown) {
        player.setVelocityY(-speed);
        player.anims.play('up', true);

    }
    else if (cursors.down.isDown) {
        player.setVelocityY(speed);
        player.anims.play('down', true);
    }
    else {
        player.anims.stop();
    }
}
   const canvas = document.getElementById("gameCanvas");
   const ctx = canvas.getContext("2d");

   const sprite = new Image();
   sprite.src = "character-spritesheet-2.png"; // your sheet here

   // Size of each frame
   const FRAME_WIDTH = 32;
   const FRAME_HEIGHT = 32;

   // Animation state
    let currentFrame = 0;
    let frameCount = 4; // number of frames in the animation
    let frameTimer = 0;
    let frameInverval = 100; // ms per frame

    // Active animation
    let animation = "idle";

    function setAnimation(name) {
        if (animation !== name) {
            animation = name;
            currentFrame = 0;
            frameCount = animations[name].frames;
        }
    }
        function updateAnimation(deltaTime) {
            frameTimer += deltaTime;

            if (frameTimer > frameInverval) {
                currentFrame = (currentFrame + 1) % frameCount;
                frameTimer = 0;
            }
        }
        function drawCharacter() {
            const anim = animations[animation];

            ctx.drawImage(
                sprite,
                currentFrame * FRAME_WIDTH,
                anim.row * FRAME_HEIGHT,
                FRAME_WIDTH,
                FRAME_HEIGHT,
                100, 100,
                FRAME_WIDTH,
                FRAME_HEIGHT
            );
        }
    let lastTime = 0;

    function gameLoop(timeStamp) {
        const delta = timeStamp - lastTime;
        lastTime = timeStamp;

        updateAnimation(delta);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw the character for this animation loop
        drawCharacter();

        requestAnimationFrame(gameLoop);
    }

    sprite.onload = () => {
        requestAnimationFrame(gameLoop);
    };

const sprite2 = new Image();
sprite2.src = "spritesheet.png"; // your sprite sheet file

// Animation frames
const animations = {
    idle: { row: 0, frames: 4},
    walk: { row: 1, frames: 6},
    sit: { row: 2, frames: 2},
    jump: { row: 3, frames: 4}
};
let currentAnimation = "idle";
let frameIndex = 0;
let frameInterval = 120; // ms between frames
let frameTimer2 = 0; // separate timer for this animation set

let x = 100;
let y = 100;
let speed = 3;

let velY = 0;
let gravity = 0.5;
let jumpForce = -10;
let onGround = true;

const keys = {};
let moving = false;

// Key listeners
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

const ANIMATIONS = {
    idle: { row: 0, frames: 4 },
    walk: { row: 1, frames: 6},
    sit: { row: 2, frames: 2 },
    jump: { row: 3, frames: 4}
};
if (keys["ArrowLeft"]) { x -= speed; moving = true; }
if (keys["ArrowRight"]) { x += speed; moving = true; }
if (keys["Space"] && onGround) {
    velY = jumpForce;
    onGround = false;
    currentAnimation = "jump";
}
// Apply gravity
velY += gravity;
y += velY;

        // Fake ground level at y = 100
        if (y > 100) {
            y = 100;
            velY = 0;
            onGround = true;
        }

        // Animation logic
        if (!onGround) {
            currentAnimation = "jump";
        } else if (keys["z"]) {
           currentAnimation = "sit";
        } else if (moving) {
            currentAnimation = "walk";
        } else {
            currentAnimation = "idle";
        }

        // Animation timing
        frameTimer += 16;
        if (frameTimer >= frameInterval) {
            frameTimer = 0;
            frameIndex = (frameIndex + 1) % animations[currentAnimation].frames;

        }
            frameIndex = (frameIndex + 1) % animations2[currentAnimation].frames;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const anim = animations[currentAnimation];
        const frameW = 64; // frame width
        const frameH = 64; // frame height

        ctx.drawImage(
            sprite,
            frameIndex * frameW,
            anim.row * frameH,
            frameW, frameH,
            x, y,
            frameW, frameH

        );
    }
    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }
    
    loop();
            frameIndex = (frameIndex + 1) % animations[currentAnimation].frames;
    let cameraX = 0;
    // Keep camera centered on player
    cameraX = x - canvas.width / 2;
    ctx.drawImage(
    spriteSheet,
    frameIndex * 64,
    animations[currentAnimation].row * 64,
    64,
    64,
    x - cameraX, // <-- subtract camera!
    y,
    64,
    64
 );
    const worldWidth = 2000; // Make your world bigger
    if (x < 0) x = 0;
    if (x > worldWidth) x = worldWidth;





        
    
