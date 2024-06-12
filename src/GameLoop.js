export class GameLoop {
    constructor(update, render) {
        this.lastFrameTime = 0;
        this.accumulatedTime = 0;
        this.timeStep = 1000 / 60; // 60 frames per second

        this.update = update;
        this.render = render;

        this.rafId = null; // requestAnimationFrame() ID to cancel the loop (game is paused)
        this.isRunning = false; // is game running
    }

    mainLoop = (timestamp) => {
        if (!this.isRunning) return;

        let deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;

        // Accumulate all time since the last frame
        this.accumulatedTime += deltaTime;

        // Fixed time stamp updates.
        while (this.accumulatedTime >= this.timeStep) {
            console.log('update')
            this.update(this.timeStep);
            this.accumulatedTime -= this.timeStep;
        }


        this.render();
        this.rafId = requestAnimationFrame(this.mainLoop);
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.rafId = requestAnimationFrame(this.mainLoop);
        }
    }

    stop() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        this.isRunning = false;
    }
}