// @ts-ignore
import banners from 'banners';
import {toShuffled} from "../utils";
import {Position} from "./Position";
import {Ball} from "./Ball";
import {ballSize} from "./geometry";

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

    public readonly remove = (gameElement: HTMLElement): void => {
        gameElement.removeChild(this.element);
    }

    public readonly handleCollisions = (ball: Ball): boolean => {
        if (
            ball.position.x + ballSize / 2 > this.position.x &&
            ball.position.x - ballSize / 2 < this.position.x + 88 &&
            ball.position.y + ballSize / 2 > this.position.y &&
            ball.position.y - ballSize / 2 < this.position.y + 31
        ) {
            const distancesWithAngles = [
                { distance: Math.abs(ball.position.x - this.position.x), phi: Math.PI / 2 }, // left
                { distance: Math.abs(ball.position.x - this.position.x + 88), phi: Math.PI /2 }, // right
                { distance: Math.abs(ball.position.y - this.position.y), phi: 0 }, // top
                { distance: Math.abs(ball.position.y - this.position.y + 31), phi: 0 }, // bottom
            ];
            console.log(distancesWithAngles);

            const closestAngle = distancesWithAngles.sort((a, b) => a.distance - b.distance)[0];

            ball.collision(closestAngle.phi);

            return true;
        } else {
            return false;
        }
    }
}

export const makeBanners = (numberOfBanners: number, positioning: (i: number) => Position) =>
    toShuffled(banners as string[])
        .slice(0, numberOfBanners)
        .map((banner, i) => new Banner(positioning(i), banner));