import preprocess from 'svelte-preprocess'
import node from '@sveltejs/adapter-node'
import copy from 'rollup-plugin-copy'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true,
	}),

	kit: {
		adapter: node(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: () => ({
			plugins: [
				copy({
					targets: [
						{
							src: 'node_modules/@emdgroup-liquid/liquid/dist/liquid/assets/*',
							dest: 'static/assets',
						},
					],
					hook: 'buildStart',
				}),
			],
		}),
	},
}

export default config
