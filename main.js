import "./style.css";
import { resources } from "./src/Resource.js";
import { Sprite } from "./src/Sprite.js";
import { Vector2 } from "./src/Vector2.js";
import { GameLoop } from "./src/GameLoop.js";
import { Input } from "./src/Input.js";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

canvas.width = 320;
canvas.height = 180;

const sky = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});

const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 1,
});
const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});
const house = new Sprite({
  resource: resources.images.landscape,
  frameSize: new Vector2(16, 32),
  hFrames: 4,
  vFrames: 5,
  frame: 9,
});

const heroPos = new Vector2(16 * 6, 16 * 5);

const ground = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});
const update = () => {
  // Updating entities in the game
  if (input.direction === "UP") {
    // 6 is walking, 7 is facing, 8 is walking
    heroPos.y -= 1;
    hero.frame = 7;
  }
  if (input.direction === "DOWN") {
    heroPos.y += 1;
    hero.frame = 1;
  }
  if (input.direction === "LEFT") {
    heroPos.x -= 1;
    hero.frame = 10;
  }
  if (input.direction === "RIGHT") {
    heroPos.x += 1;
    hero.frame = 4;
  }
};
const draw = () => {
  sky.drawImage(ctx, 0, 0);
  ground.drawImage(ctx, 0, 0);

  const heroOffset = new Vector2(-8, -21);
  const heroPosX = heroPos.x + heroOffset.x;
  const heroPosY = heroPos.y + 1 + heroOffset.y;
  shadow.drawImage(ctx, heroPosX, heroPosY);
  hero.drawImage(ctx, heroPosX, heroPosY);
  house.drawImage(ctx, 0, 0);
};

const gameLoop = new GameLoop(update, draw);
const input = new Input();
gameLoop.start();
