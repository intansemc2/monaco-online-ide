import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import importMetaUrlPlugin from '@codingame/esbuild-import-meta-url-plugin';

// export default defineConfig({
// 	plugins: [sveltekit()]
// });

/** @type {import('vite').UserConfig} */
export default ({ mode }: { mode: any }) => {
	// Extends 'process.env.*' with VITE_*-variables from '.env.(mode=production|development)'
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	return defineConfig({
		plugins: [sveltekit()],
		optimizeDeps: {
			esbuildOptions: {
				plugins: [importMetaUrlPlugin]
			}
		}
	});
};
