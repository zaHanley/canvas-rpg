import { Vector2 } from "./Vector2";

export class Sprite {
  constructor({
    resource, // image we want to draw
    frameSize, // size of the crop of the image
    hFrames, // how is the sprite arranged horizontally
    vFrames, // vertically
    frame, // which frame we want to show
    scale,
    position,
  }) {
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16, 16);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.frameMap = new Map();
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0, 0);

    this.buildFrameMap();
  }

  buildFrameMap() {
    let frameCount = 0;
    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          new Vector2(h * this.frameSize.x, v * this.frameSize.y)
        );
        frameCount++;
        console.log(this.frameMap);
      }
    }
  }

  drawImage(ctx, x, y) {
    if (!this.resource.isLoaded) return;

    let frameCoordX = 0;
    let frameCoordY = 0;
    const frame = this.frameMap.get(this.frame);
    if (frame) {
      frameCoordX = frame.x;
      frameCoordY = frame.y;
    }

    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    ctx.drawImage(
      this.resource.image,
      frameCoordX,
      frameCoordY, // Where to start cropping in the sprite sheet (top Y corner)
      frameSizeX, // How much to crop in the X direction
      frameSizeY, // How much to crop in the Y direction
      x, // Where to put the image on the canvas (X)
      y, // Where to put the image on the canvas (Y)
      frameSizeX * this.scale, // How wide to draw the image on the canvas
      frameSizeY * this.scale
    ); // How tall to draw the image on the canvas
  }
}
