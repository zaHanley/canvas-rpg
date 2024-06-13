export const DIRECTION = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

export class Input {
  constructor() {
    document.addEventListener("keydown", (e) => {
      if (e.code === "ArrowUp" || e.code === "KeyW") {
        this.onButtonPressed(DIRECTION.UP);
      }
      if (e.code === "ArrowDown" || e.code === "KeyS") {
        this.onButtonPressed(DIRECTION.DOWN);
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        this.onButtonPressed(DIRECTION.LEFT);
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        this.onButtonPressed(DIRECTION.RIGHT);
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.code === "ArrowUp" || e.code === "KeyW") {
        this.onButtonReleased(DIRECTION.UP);
      }
      if (e.code === "ArrowDown" || e.code === "KeyS") {
        this.onButtonReleased(DIRECTION.DOWN);
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        this.onButtonReleased(DIRECTION.LEFT);
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        this.onButtonReleased(DIRECTION.RIGHT);
      }
    });

    this.heldKeybinds = [];
  }
  get direction() {
    return this.heldKeybinds[0];
  }

  onButtonPressed(direction) {
    if (this.heldKeybinds.indexOf(direction) === -1) {
      this.heldKeybinds.unshift(direction);
    }
  }

  onButtonReleased(direction) {
    if (this.heldKeybinds.indexOf(direction) !== -1) {
      this.heldKeybinds.splice(this.heldKeybinds.indexOf(direction), 1);
    }
  }
}
