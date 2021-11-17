<script lang="ts">
	import Form from '$lib/components/Form/Form.svelte'
	import Footer from '$lib/components/Footer/Footer.svelte'

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

<div class={`flex flex-col min-h-screen ld-theme-${currentTheme}`}>
	<ld-notification placement="bottom" />
	<main class="relative flex items-center" style="min-height: 80vh">
		<ld-bg-cells class="block absolute inset-0" />
		<div class="container mx-auto px-ld-24 pt-ld-40 pb-24 relative max-w-2xl">
			<ld-typo variant="b1" class="text-vy mb-ld-40">Liquid Sandbox App</ld-typo>
			<Form on:changeTheme={onChangeTheme} />
		</div>
	</main>
	<Footer />
</div>
