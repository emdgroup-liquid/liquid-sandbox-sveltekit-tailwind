<script>
	import '../app.postcss'
	import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'

	import { browser } from '$app/env'

	let ready = false

	;(async () => {
		if (browser) {
			const modules = await Promise.all([
				import('@emdgroup-liquid/liquid/dist/components'),
				import('@emdgroup-liquid/liquid/dist/loader'),
			])
			const { setAssetPath } = modules[0]
			setAssetPath(window.location.origin)
			const { defineCustomElements } = modules[1]
			defineCustomElements()
			ready = true
		}
	})()
</script>

<main style={`visibility: ${ready ? 'inherit' : 'hidden'}`}><slot /></main>
