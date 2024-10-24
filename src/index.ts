import {makeBanners} from "./game/Banner";
import {Position} from "./game/Position";

const banners = makeBanners(5, i => new Position(i, i));
console.log(banners);

console.log(Promise.all(banners.map(b => b.load())));