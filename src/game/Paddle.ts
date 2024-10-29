import {fieldWidth} from "./geometry";

export class Paddle {
    private position: number;
    private size: number;
    private readonly element: HTMLElement;

    constructor() {
        this.position = fieldWidth / 2;
        this.size = 60;

        this.element = document.createElement("div");
        this.element.classList.add("paddle");

        this.redraw();
    }

    private redraw() {
        this.element.style.left = this.position + "px";
        this.element.style.width = this.size + "px";
    }

    private mouseHandler(event: MouseEvent) {
        this.position =
            Math.min(fieldWidth - this.size / 2,
            Math.max(this.size / 2, event.offsetX)
        );

        this.redraw();
    }

    public setup(gameElement: HTMLElement): void {
        gameElement.appendChild(this.element);
        gameElement.addEventListener("mousemove", this.mouseHandler.bind(this));
        gameElement.addEventListener("mouseenter", this.mouseHandler.bind(this));
        gameElement.addEventListener("mouseleave", this.mouseHandler.bind(this));
    }
}