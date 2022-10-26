const liquidPreset = require('@emdgroup-liquid/liquid/dist/css/tailwind-preset.cjs')
const { tailwindExtractor } = require('tailwindcss/lib/lib/purgeUnusedStyles')

const config = {
	presets: [liquidPreset],
	purge: {
		content: ['./src/**/*.{html,js,svelte,ts}'],
		options: {
			defaultExtractor: (content) => [
				// If this stops working, please open an issue at https://github.com/svelte-add/tailwindcss/issues rather than bothering Tailwind Labs about it
				...tailwindExtractor(content),
				// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
				...[...content.matchAll(/(?:class:)*([\w-/:%.]+)/gm)].map(
					([_match, group, ..._rest]) => group
				),
			],
		},
	},
}

module.exports = config
