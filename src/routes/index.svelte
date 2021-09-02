<script lang="ts">
	import Form from '$lib/components/Form/Form.svelte'

	let currentTheme = 'ocean'
	let successMessages = [
		'Nice! 👍',
		'Aaaweeesome! 🙌',
		'Rock on! 🤘',
		'How cool is that?! 😎',
		'Rad! 🤓',
		'Supersonic! ⚡️',
		'Magic! ✨',
		'Groovy baby! 🕺',
		'Lovely! 🥰',
		'Smooth! 💆‍♀️',
		'Mind-blowing! 🤯️',
		'Excellent! 👌️',
		'Delicious! 🤤️',
		'Outa space! 👽',
	]

	function onChangeTheme(ev) {
		currentTheme = ev.detail
		setTimeout(() => {
			dispatchEvent(new CustomEvent('ldNotificationClear'))
			dispatchEvent(
				new CustomEvent('ldNotificationAdd', {
					detail: {
						content: successMessages[0],
						type: 'info',
						timeout: 2000,
					},
				})
			)
			successMessages = [...successMessages.slice(1), successMessages[0]]
		}, 500)
	}
</script>

<ld-theme name={currentTheme} class="flex flex-col min-h-screen">
	<ld-notification placement="bottom" />
	<div class="relative flex items-center" style="min-height: 80vh">
		<ld-bg-cells class="block absolute inset-0" />
		<div class="container mx-auto px-ld-24 pt-ld-40 pb-24 relative max-w-2xl">
			<ld-heading level="1" visual-level="b1" class="text-vy mb-ld-40">
				Liquid Sandbox App
			</ld-heading>
			<Form on:changeTheme={onChangeTheme} />
		</div>
	</div>
	<div
		class="relative flex-grow"
		style="background: var(--ld-thm-bg-secondary); min-height: 12rem"
	/>
</ld-theme>
