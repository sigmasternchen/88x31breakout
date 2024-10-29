import {Banner, makeBanners} from "./Banner";
import {Position} from "./Position";

export class Game {
    private readonly root: HTMLElement;
    private banners: Banner[];

    constructor(root: HTMLElement) {
        this.root = root;
        this.banners = makeBanners(11 * 6, i => new Position((i % 11) * (88 + 1), (0 | (i / 11)) * (31 + 1)));
    }

    public load(): Promise<void> {
        return Promise.all(this.banners.map(banner => banner.load())).then(() => {});
    }

    public draw(): void {
        this.banners.forEach(banner => {
            this.root.appendChild(banner.element);
        });
    }
}