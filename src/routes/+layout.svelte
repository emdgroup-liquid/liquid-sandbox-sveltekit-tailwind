<script>
	import '../app.postcss'
	import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'
	import { browser } from '$app/environment'

	let ready = false
	;(async () => {
		if (browser) {
			window.__LD_ASSET_PATH__ = window.location.origin
			const { defineCustomElements } = await import('@emdgroup-liquid/liquid/dist/loader')
			defineCustomElements()
			ready = true
		}
	})()
</script>

<main style={`visibility: ${ready ? 'inherit' : 'hidden'}`}><slot /></main>
