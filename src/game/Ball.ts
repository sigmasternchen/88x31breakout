import {Position} from "./Position";
import {ballSize} from "./geometry";
import {choice} from "../utils";
import {defaultBallSpeed, startAngles} from "./parameters";

export class Ball {
    private _position: Position;
    private phi: number;
    private speed: number;
    private readonly element: HTMLElement;

    constructor() {
        this.position = new Position(0, 0);

        this.element = document.createElement("div");
        this.element.classList.add("ball");
        this.element.style.width = ballSize + "px";
        this.element.style.height = ballSize + "px";

        this.redraw();
    }

    set position(position: Position) {
        this._position = position;
    }

    public readonly redraw = (): void => {
        this.element.style.left = this._position.x + "px";
        this.element.style.top = this._position.y + "px";
    }

    public readonly setup = (gameElement: HTMLElement): void => {
        gameElement.appendChild(this.element);
    }

    public readonly launch = (): void => {
        this.phi = choice(startAngles);
        this.speed = defaultBallSpeed;
    }

    public readonly tick = (delta: number): void => {
        this._position = this._position.moveInDirection(this.phi, this.speed * delta / 1000);
        this.redraw();
    }
}