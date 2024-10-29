
export class Paddle {
    private position: number;
    private size: number;
    private readonly element: HTMLElement;

    constructor() {
        this.position = ((88 + 1) * 11 + 1) / 2;
        this.size = 60;

        this.element = document.createElement("div");
        this.element.classList.add("paddle");
        this.element.style.left = this.position + "px";
        this.element.style.width = this.size + "px";
    }

    public setup(gameElement: HTMLElement): void {
        gameElement.appendChild(this.element);
    }
}