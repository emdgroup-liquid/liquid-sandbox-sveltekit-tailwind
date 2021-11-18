<script>
	import '../app.postcss'
	import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'

	import { browser } from '$app/env'
	import { defineCustomElements, setAssetPath } from '@emdgroup-liquid/liquid'

	let ready = false
	if (browser) {
		setAssetPath(window.location.origin)
		defineCustomElements()
		ready = true
	}
</script>

<main style={`visibility: ${ready ? 'inherit' : 'hidden'}`}><slot /></main>
