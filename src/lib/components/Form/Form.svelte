<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { titles } from './titles'

	const dispatch = createEventDispatcher()

	let fullName = ''
	let title = ''
	let email = ''
	let website = ''
	let formInvalid = true

	function onThemeChange(theme) {
		dispatch('changeTheme', theme)
	}
	function onCancel() {
		dispatchEvent(new CustomEvent('ldNotificationClear'))
		dispatchEvent(
			new CustomEvent('ldNotificationAdd', {
				detail: {
					content: "This button doesn't really do anything. 👻",
					type: 'warn'
				}
			})
		)
	}
	function onSubmit() {
		if (formInvalid) {
			dispatchEvent(new CustomEvent('ldNotificationClear'))
			dispatchEvent(
				new CustomEvent('ldNotificationAdd', {
					detail: {
						content: 'The form is invalid! 😱',
						type: 'alert'
					}
				})
			)
		} else {
			dispatchEvent(new CustomEvent('ldNotificationClear'))
			dispatchEvent(
				new CustomEvent('ldNotificationAdd', {
					detail: {
						content: `
							<span class="block">Thanks! We hope you like this sandbox. 🤗<span>
							<span class="block">
								<a class='font-bold hover:underline' href='https://github.com/emdgroup-liquid/liquid/discussions' target='_blank'>Reach out</a>
								if you have any questions!
							</span>`,
						type: 'info',
						timeout: 0
					}
				})
			)
		}
	}
</script>

<div class="bg-wht rounded-l shadow-hover p-ld-32">
	<ld-heading level="2" class="mb-ld-32"> Hi there 👋 </ld-heading>

	<ld-paragraph class="mb-ld-16">
		This small sandbox app demonstrates{' '}
		<a href="https://emdgroup-liquid.github.io/liquid/" class="font-bold hover:underline">
			Liquid Oxygen
		</a>{' '}
		used in combination with Vue 3, Typescript, Tailwind CSS and Vite.
	</ld-paragraph>
	<ld-paragraph class="mb-ld-24"> Let's change the theme of the app first: </ld-paragraph>

	<ld-label class="mb-ld-32 w-full">
		App Theme
		<ld-select
			on:change={(ev) => onThemeChange(ev.detail[0])}
			placeholder="Pick a theme"
			prevent-deselection
		>
			<ld-option value="ocean" selected> Ocean </ld-option>
			<ld-option value="bubblegum">Bubblegum</ld-option>
			<ld-option value="shake">Shake</ld-option>
			<ld-option value="solvent">Solvent</ld-option>
			<ld-option value="tea">Tea</ld-option>
		</ld-select>
	</ld-label>

	<ld-paragraph class="mb-ld-24"> Next we have set up some form validation: </ld-paragraph>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-ld-24 mb-ld-32">
		<ld-label>
			<span class="flex justify-between">
				Your title (optional)
				<ld-tooltip arrow position="top right" class="h-1">
					<ld-paragraph> We are asking because we'd like to address you correctly. </ld-paragraph>
				</ld-tooltip>
			</span>
			<ld-select
				placeholder="No title"
				on:input={(ev) => {
					title = ev.detail[0]
				}}
			>
				{#each titles as title}
					<ld-option value={title}>
						{title}
					</ld-option>
				{/each}
			</ld-select>
			<ld-input-message
				mode="valid"
				style={{
					visibility: title ? 'inherit' : 'hidden'
				}}
			>
				Good pick.
			</ld-input-message>
		</ld-label>

		<ld-label>
			Your full name
			<ld-input
				placeholder="e.g. Jason Parse"
				tone="dark"
				value={fullName}
				invalid={false}
				on:input={(ev) => {
					fullName = ev.target.value
				}}
				on:blur={(ev) => {
					console.info('ev', ev)
					// v$.fullName.$touch()
				}}
			/>
			<!--{v$.fullName.$error ? (-->
			{#if false}
				<ld-input-message mode="error">
					<!--{v$.fullName.$errors[0].$message}-->
				</ld-input-message>
			{:else}
				<ld-input-message
					mode="valid"
					style={{
						// visibility: v$.fullName.$dirty ? 'inherit' : 'hidden',
					}}
				>
					Lovely name.
				</ld-input-message>
			{/if}
		</ld-label>

		<ld-label>
			Your email address
			<ld-input
				type="email"
				placeholder="e.g. jason.parse@example.com"
				tone="dark"
				value={email}
				invalid={false}
				on:input={(ev) => {
					email = ev.target.value
				}}
				on:blur={(ev) => {
					console.info('ev', ev)
					// v$.email.$touch()
				}}
			/>
			<!--{v$.email.$error ? (-->
			{#if false}
				<ld-input-message mode="error">
					Yolo
					<!--{v$.email.$errors[0].$message}-->
				</ld-input-message>
			{:else}
				<ld-input-message
					mode="valid"
					style={{
						// visibility: v$.email.$dirty ? 'inherit' : 'hidden',
					}}
				>
					Lovely email address.
				</ld-input-message>
			{/if}
		</ld-label>

		<ld-label>
			Your website (optional)
			<ld-input
				type="url"
				placeholder="e.g. https://example.com"
				tone="dark"
				value={website}
				invalid={false}
				on:input={(ev) => {
					website = ev.target.value
				}}
				on:blur={(ev) => {
					console.info('ev', ev)
					//v$.website.$touch()
				}}
			/>
			<!--{v$.website.$error ? (-->
			{#if false}
				<ld-input-message mode="error">
					Yolo
					<!--{v$.website.$errors[0].$message}-->
				</ld-input-message>
			{:else}
				<ld-input-message
					mode="valid"
					style={{
						// visibility: website && v$.website.$dirty ? 'inherit' : 'hidden'
					}}
				>
					You even have a website! 👍
				</ld-input-message>
			{/if}
		</ld-label>
	</div>

	<ld-label class="w-full mb-ld-32">
		Comment (optional)
		<ld-input multiline placeholder="Be creative!" value="" tone="dark" style="min-height: 7rem" />
	</ld-label>

	<div class="grid grid-cols-1 sm:grid-cols-2 gap-ld-24 items-center">
		<ld-label position="right" size="m">
			<span>I accept the terms (none).</span>
			<ld-checkbox tone="dark" />
		</ld-label>

		<div class="grid grid-cols-2 gap-ld-16">
			<ld-button on:click={onCancel} mode="secondary"> Cancel </ld-button>
			<ld-button on:click={onSubmit}>Submit</ld-button>
		</div>
	</div>
</div>
