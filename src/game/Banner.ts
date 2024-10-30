// @ts-ignore
import banners from 'banners';
import {toShuffled} from "../utils";
import {Position} from "./Position";

export class Banner {
    private readonly position: Position;
    private readonly banner: string;
    private readonly element: HTMLElement;

    constructor(position: Position, banner: string) {
        this.position = position;
        this.banner = banner;

        this.element = document.createElement("img");
        this.element.classList.add("banner");
        this.element.style.top = this.position.y + "px";
        this.element.style.left = this.position.x + "px";
    }

    public readonly load = (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve();
            image.onerror = reject;
            image.src = "static/banners/" + this.banner;
            this.element.setAttribute("src", image.src);
        })
    }

    public readonly setup = (gameElement: HTMLElement): void => {
        gameElement.appendChild(this.element);
    }
}

export const makeBanners = (numberOfBanners: number, positioning: (i: number) => Position) =>
    toShuffled(banners as string[])
        .slice(0, numberOfBanners)
        .map((banner, i) => new Banner(positioning(i), banner));