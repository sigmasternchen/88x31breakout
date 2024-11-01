import {Position} from "./Position";
import {ballSize} from "./geometry";
import {choice} from "../utils";
import {defaultBallSpeed, startAngles} from "./parameters";

const sameWallCollisionTimeout: number = 50;

export class Ball {
    public position: Position;
    private phi: number;
    private speed: number;
    private readonly element: HTMLElement;

    private lastCollisionWallAngle: number;
    private lastCollisionTimestamp: number;

    constructor() {
        this.position = new Position(0, 0);

        this.element = document.createElement("div");
        this.element.classList.add("ball");
        this.element.style.width = ballSize + "px";
        this.element.style.height = ballSize + "px";

        this.redraw();
    }

    public readonly redraw = (): void => {
        console.log(this.phi / Math.PI, this.position.x, this.position.y);
        this.element.style.left = this.position.x + "px";
        this.element.style.top = this.position.y + "px";
    }

    public readonly setup = (gameElement: HTMLElement): void => {
        gameElement.appendChild(this.element);
    }

    public readonly launch = (): void => {
        this.phi = choice(startAngles);
        this.speed = defaultBallSpeed;
    }

    public readonly tick = (delta: number): void => {
        this.position = this.position.moveInDirection(this.phi, this.speed * delta / 1000);
        this.redraw();
    }

    public readonly collision = (wallAngle: number): void => {
        if (wallAngle == this.lastCollisionWallAngle && (Date.now() - this.lastCollisionTimestamp) < sameWallCollisionTimeout) {
            return;
        }

        this.phi = 2 * wallAngle - this.phi;
        this.phi -= (0|(this.phi / (Math.PI*2))) * Math.PI * 2;

        this.lastCollisionWallAngle = wallAngle;
        this.lastCollisionTimestamp = Date.now();
    }
}