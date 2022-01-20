import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import { ViteAliases } from 'vite-aliases'

const pathSrc = path.resolve(__dirname, "./src");
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@/": `${pathSrc}/`,
		},
	},
	css: {
		preprocessorOptions: {
			scss: { additionalData: `@import "${pathSrc}/scss/global";` },
		},
	},
});
