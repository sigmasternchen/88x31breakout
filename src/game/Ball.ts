import {Position} from "./Position";
import {ballSize} from "./geometry";

export class Ball {
    private _position: Position;
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

    public redraw(): void {
        this.element.style.left = this._position.x + "px";
        this.element.style.top = this._position.y + "px";
    }

    public setup(gameElement: HTMLElement): void {
        gameElement.appendChild(this.element);
    }
}