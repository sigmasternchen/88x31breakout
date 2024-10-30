import {ballSize, fieldWidth, paddleHeight, paddleY} from "./geometry";
import {Ball} from "./Ball";
import {Position} from "./Position";

export class Paddle {
    private position: number;
    private size: number;
    private readonly element: HTMLElement;

    private ball: Ball|null;

    constructor(ball: Ball|null) {
        this.position = fieldWidth / 2;
        this.size = 60;
        this.ball = ball;

        this.element = document.createElement("div");
        this.element.classList.add("paddle");
        this.element.style.top = paddleY + "px";
        this.element.style.height = paddleHeight + "px";

        this.redraw();
    }

    private readonly redraw = (): void => {
        this.element.style.left = this.position + "px";
        this.element.style.width = this.size + "px";

        if (this.ball) {
            this.ball.position = new Position(this.position, paddleY - ballSize / 2);
            this.ball.redraw();
        }
    }

    private readonly mouseHandler = (event: MouseEvent): void => {
        this.position =
            Math.min(fieldWidth - this.size / 2,
            Math.max(this.size / 2, event.offsetX)
        );

        this.redraw();
    }

    public readonly setup = (gameElement: HTMLElement, ballLaunchHandler: (ball: Ball) => void): void => {
        gameElement.appendChild(this.element);
        gameElement.addEventListener("mousemove", this.mouseHandler);
        gameElement.addEventListener("mouseenter", this.mouseHandler);
        gameElement.addEventListener("mouseleave", this.mouseHandler);

        gameElement.addEventListener("click", () => {
            if (this.ball) {
                const ball = this.ball;
                this.ball = null;
                ballLaunchHandler(ball);
            }
        });

        if (this.ball) {
            this.ball.setup(gameElement);
        }
    }
}