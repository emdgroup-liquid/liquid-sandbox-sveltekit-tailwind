<script>
	import '../app.postcss'
	import '@emdgroup-liquid/liquid/dist/css/liquid.global.css'

	import { browser } from '$app/env'
	import { setAssetPath } from '@emdgroup-liquid/liquid'
	import {
		LdBgCells,
		LdButton,
		LdCheckbox,
		LdIcon,
		LdInput,
		LdInputMessage,
		LdLabel,
		LdNotification,
		LdOption,
		LdOptionInternal,
		LdSelectPopper,
		LdSelect,
		LdTooltip,
		LdTooltipPopper,
		LdTypo
	} from '@emdgroup-liquid/liquid/dist/custom-elements'

	let ready = false
	if (browser) {
		setAssetPath(window.location.origin)
		customElements.define('ld-bg-cells', LdBgCells)
		customElements.define('ld-button', LdButton)
		customElements.define('ld-checkbox', LdCheckbox)
		customElements.define('ld-typo', LdTypo)
		customElements.define('ld-icon', LdIcon)
		customElements.define('ld-input', LdInput)
		customElements.define('ld-input-message', LdInputMessage)
		customElements.define('ld-label', LdLabel)
		customElements.define('ld-notification', LdNotification)
		customElements.define('ld-option', LdOption)
		customElements.define('ld-option-internal', LdOptionInternal)
		customElements.define('ld-select-popper', LdSelectPopper)
		customElements.define('ld-select', LdSelect)
		customElements.define('ld-tooltip', LdTooltip)
		customElements.define('ld-tooltip-popper', LdTooltipPopper)
		ready = true
	}
</script>

<main style={`visibility: ${ready ? 'inherit' : 'hidden'}`}><slot /></main>
