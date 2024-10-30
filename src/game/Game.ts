import {Banner, makeBanners} from "./Banner";
import {Position} from "./Position";
import {Paddle} from "./Paddle";
import {Ball} from "./Ball";
import {fieldHeight, fieldWidth} from "./geometry";

export class Game {
    private readonly root: HTMLElement;
    private banners: Banner[];
    private paddle: Paddle;
    private balls: Ball[];

    private running: boolean = false;
    private lastTickTimestamp: number = 0;

    constructor(root: HTMLElement) {
        this.root = root;
        this.root.style.height = fieldHeight + "px";
        this.root.style.width = fieldWidth + "px";

        this.banners = makeBanners(11 * 6, i => new Position((i % 11) * (88 + 1), (0 | (i / 11)) * (31 + 1)));
        this.paddle = new Paddle(new Ball());
        this.balls = [];
    }

    public readonly load = (): Promise<void> =>
        Promise.all(this.banners.map(banner => banner.load())).then(() => {});

    public readonly setup = (): void => {
        this.banners.forEach(banner => banner.setup(this.root));
        this.paddle.setup(this.root, this.ballLaunchHandler);
        this.balls.forEach(ball => ball.setup(this.root));
    }

    private readonly ballLaunchHandler = (ball: Ball): void => {
        this.balls.push(ball);
        ball.launch();
    }

    public readonly run = (): void => {
        this.running = true;
        requestAnimationFrame(this.tick)
    }

    private readonly tick = (timestamp: number): void => {
        const delta = timestamp - this.lastTickTimestamp;
        this.lastTickTimestamp = timestamp;

        this.balls.forEach(ball => ball.tick(delta));
        if (this.running) {
            requestAnimationFrame(this.tick);
        }
    }
}
