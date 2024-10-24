import esbuild from "esbuild";
import {bannerIndex} from "./banner-index.js";

esbuild.build({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    outfile: './html/static/bundle.js',
    plugins: [bannerIndex],
}).catch(() => process.exit(1));