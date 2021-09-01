<script>
	import '../app.postcss'

	import { browser } from '$app/env'
	import { setAssetPath } from '@emdgroup-liquid/liquid'
	import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'

	if (browser) {
		import('@emdgroup-liquid/liquid/dist/custom-elements').then((liquid) => {
			const {
				LdBgCells,
				LdButton,
				LdCheckbox,
				LdHeading,
				LdInput,
				LdInputMessage,
				LdLabel,
				LdNotification,
				LdOption,
				LdOptionInternal,
				LdParagraph,
				LdSelect,
				LdTheme,
				LdTooltip
			} = liquid
			setAssetPath(window.location.origin)
			customElements.define('ld-bg-cells', LdBgCells)
			customElements.define('ld-button', LdButton)
			customElements.define('ld-checkbox', LdCheckbox)
			customElements.define('ld-heading', LdHeading)
			customElements.define('ld-input', LdInput)
			customElements.define('ld-input-message', LdInputMessage)
			customElements.define('ld-label', LdLabel)
			customElements.define('ld-notification', LdNotification)
			customElements.define('ld-option', LdOption)
			customElements.define('ld-option-internal', LdOptionInternal)
			customElements.define('ld-paragraph', LdParagraph)
			customElements.define('ld-select', LdSelect)
			customElements.define('ld-theme', LdTheme)
			customElements.define('ld-tooltip', LdTooltip)
		})
	}
</script>

<main><slot /></main>
