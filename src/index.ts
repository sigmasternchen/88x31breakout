import {Game} from "./game/Game";

window.addEventListener("load", async () => {
    const game = new Game(document.getElementById("game"));
    await game.load();
    game.draw();
});