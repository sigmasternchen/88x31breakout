// @ts-ignore
import banners from 'banners';
import {toShuffled} from "../utils";
import {Position} from "./Position";

export class Banner {
    private readonly position: Position;
    private readonly banner: string;

    constructor(position: Position, banner: string) {
        this.position = position;
        this.banner = banner;
    }

    public load(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve();
            image.onerror = reject;
            image.src = "static/banners/" + this.banner;
        })
    }
}

export const makeBanners = (numberOfBanners: number, positioning: (i: number) => Position) =>
    toShuffled(banners as string[])
        .slice(0, numberOfBanners)
        .map((banner, i) => new Banner(positioning(i), banner));