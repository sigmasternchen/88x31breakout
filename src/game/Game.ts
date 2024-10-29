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

    constructor(root: HTMLElement) {
        this.root = root;
        this.root.style.height = fieldHeight + "px";
        this.root.style.width = fieldWidth + "px";

        this.banners = makeBanners(11 * 6, i => new Position((i % 11) * (88 + 1), (0 | (i / 11)) * (31 + 1)));
        this.paddle = new Paddle(new Ball());
        this.balls = [];
    }

    public load(): Promise<void> {
        return Promise.all(this.banners.map(banner => banner.load())).then(() => {});
    }

    public setup(): void {
        this.banners.forEach(banner => banner.setup(this.root));
        this.paddle.setup(this.root);
        this.balls.forEach(ball => ball.setup(this.root));
    }
}