import fs from 'fs';

export const bannerIndex = {
    name: 'banner-index',
    setup(build) {
        build.onResolve({ filter: /^banners$/ }, args => {
            return { path: args.path, namespace: 'banners' };
        });

        build.onLoad({ filter: /.*/, namespace: "banners" }, () => {
            const files = fs.readdirSync("./html/static/banners/");

            return {
                contents: `export default ${JSON.stringify(files)}`,
                loader: "js"
            };
        });
    }
};