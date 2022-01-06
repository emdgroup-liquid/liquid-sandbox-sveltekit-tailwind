<script>
	import '../app.postcss'
	import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'

	import { browser } from '$app/env'

	let ready = false

	;(async () => {
		if (browser) {
			const { setAssetPath } = await import('@emdgroup-liquid/liquid/dist/components')
			const modules = await Promise.all([
				import('@emdgroup-liquid/liquid/dist/components/ld-bg-cells'),
				import('@emdgroup-liquid/liquid/dist/components/ld-button'),
				import('@emdgroup-liquid/liquid/dist/components/ld-checkbox'),
				import('@emdgroup-liquid/liquid/dist/components/ld-icon'),
				import('@emdgroup-liquid/liquid/dist/components/ld-input'),
				import('@emdgroup-liquid/liquid/dist/components/ld-input-message'),
				import('@emdgroup-liquid/liquid/dist/components/ld-label'),
				import('@emdgroup-liquid/liquid/dist/components/ld-notification'),
				import('@emdgroup-liquid/liquid/dist/components/ld-option'),
				import('@emdgroup-liquid/liquid/dist/components/ld-option-internal'),
				import('@emdgroup-liquid/liquid/dist/components/ld-select-popper'),
				import('@emdgroup-liquid/liquid/dist/components/ld-select'),
				import('@emdgroup-liquid/liquid/dist/components/ld-tooltip'),
				import('@emdgroup-liquid/liquid/dist/components/ld-tooltip-popper'),
				import('@emdgroup-liquid/liquid/dist/components/ld-typo'),
			])
			setAssetPath(window.location.origin)
			modules.forEach((module) => {
				module.defineCustomElement()
			})
			ready = true
		}
	})()
</script>

<main style={`visibility: ${ready ? 'inherit' : 'hidden'}`}><slot /></main>
