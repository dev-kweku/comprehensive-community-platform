	import { vitePlugin as remix } from "@remix-run/dev";
	import { installGlobals } from "@remix-run/node";
	import UnoCSS from "unocss/vite";
	import { defineConfig } from "vite";

	installGlobals();

	export default defineConfig({
	plugins: [
		remix(),
		UnoCSS({
		// If UnoCSS does not support `content`, remove or configure it differently
		}),
	],
	resolve: {
		alias: {
		"~": "/app",
		},
	},
	server: {
		port: 3000,
		watch: {
		usePolling: true, // Enable polling for file changes
		interval: 300, // Adjust polling frequency
		},
		fs: {
		strict: false, // Allow access outside strict file boundaries
		},
	},
	optimizeDeps: {
		exclude: ["nock", "mock-aws-s3"],
	},
	build: {
		rollupOptions: {
		output: {
			manualChunks(id) {
			if (id.includes("node_modules")) {
				return id.toString().split("node_modules/")[1].split("/")[0];
			}
			},
		},
		},
	},
	});
