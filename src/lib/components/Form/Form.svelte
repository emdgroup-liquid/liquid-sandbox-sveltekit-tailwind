<script lang="ts">
	import { form } from 'svelte-forms'
	import { createEventDispatcher } from 'svelte'
	import { titles } from './titles'

	const dispatch = createEventDispatcher()

	let fullName = ''
	let fullNameDirty = false
	let title = ''
	let email = ''
	let emailDirty = false
	let website = ''
	let websiteDirty = false
	let termsAccepted = false
	let termsAcceptedDirty = false

	const validator = form(
		() => ({
			fullName: {
				value: fullName,
				validators: ['required'],
			},
			email: { value: email, validators: ['required', 'email'] },
			website: { value: website, validators: ['url'] },
			termsAccepted: {
				value: termsAccepted,
				validators: [(value) => ({ valid: value === true, name: 'checked' })],
			},
		}),
		{
			initCheck: false,
			validateOnChange: false,
			stopAtFirstError: false,
			stopAtFirstFieldError: true,
		}
	)

	function onThemeChange(theme) {
		dispatch('changeTheme', theme)
	}

	function onCancel() {
		dispatchEvent(new CustomEvent('ldNotificationClear'))
		dispatchEvent(
			new CustomEvent('ldNotificationAdd', {
				detail: {
					content: "This button doesn't really do anything. 👻",
					type: 'warn',
				},
			})
		)
	}

	function onSubmit() {
		fullNameDirty = true
		emailDirty = true
		websiteDirty = true
		termsAcceptedDirty = true
		validator.validate()

		const isFormValid = !Object.keys($validator.fields).some((key) => {
			const field = $validator.fields[key]
			return !field.valid && field.errors.includes('required')
		})

		if (isFormValid) {
			dispatchEvent(new CustomEvent('ldNotificationClear'))
			dispatchEvent(
				new CustomEvent('ldNotificationAdd', {
					detail: {
						content: `
							<div>
								<div>Thanks! We hope you like this sandbox. 🤗</div>
								<div>
									<a class='font-bold hover:underline' style="color: inherit" href='https://github.com/emdgroup-liquid/liquid/discussions' target='_blank'><b>Reach out</b></a>
									if you have any questions!
								</div>
							</div>`,
						type: 'info',
						timeout: 0,
					},
				})
			)
		} else {
			dispatchEvent(new CustomEvent('ldNotificationClear'))
			dispatchEvent(
				new CustomEvent('ldNotificationAdd', {
					detail: {
						content: 'The form is invalid! 😱',
						type: 'alert',
					},
				})
			)
		}
	}
</script>

<div class="bg-wht rounded-l shadow-hover p-ld-32">
	<ld-typo variant="h2" class="mb-ld-32">Hi there 👋</ld-typo>

	<ld-typo class="mb-ld-16">
		This small sandbox app demonstrates{' '}
		<a href="https://emdgroup-liquid.github.io/liquid/" class="font-bold hover:underline">
			Liquid Oxygen
		</a>{' '}
		used in combination with SvelteKit and Tailwind CSS.
	</ld-typo>
	<ld-typo class="mb-ld-24">Let's change the theme of the app first:</ld-typo>

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

	<ld-typo class="mb-ld-24"> Next we have set up some form validation: </ld-typo>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-ld-24 mb-ld-32">
		<ld-label>
			<span class="flex justify-between">
				Your title (optional)
				<ld-tooltip arrow position="top right" class="h-1">
					<ld-typo> We are asking because we'd like to address you correctly. </ld-typo>
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
			<ld-input-message mode="valid" style={`visibility: ${title ? 'inherit' : 'hidden'}`}>
				Good pick.
			</ld-input-message>
		</ld-label>

		<ld-label>
			Your full name
			<ld-input
				placeholder="e.g. Jason Parse"
				tone="dark"
				value={fullName}
				invalid={fullNameDirty && !$validator?.fields.fullName.valid}
				on:input={(ev) => {
					fullName = ev.target.value
					if (fullNameDirty) validator.validate()
				}}
				on:blur={() => {
					fullNameDirty = fullNameDirty || !!fullName
					if (fullNameDirty) validator.validate()
				}}
			/>

			<ld-input-message
				mode={$validator?.fields.fullName.valid ? 'valid' : 'error'}
				style={`visibility: ${fullNameDirty ? 'inherit' : 'hidden'}`}
			>
				{$validator?.fields.fullName.valid ? 'Lovely name.' : 'Your full name is required.'}
			</ld-input-message>
		</ld-label>

		<ld-label>
			Your email address
			<ld-input
				type="email"
				placeholder="e.g. jason.parse@example.com"
				tone="dark"
				value={email}
				invalid={emailDirty && !$validator?.fields.email.valid}
				on:input={(ev) => {
					email = ev.target.value
					if (emailDirty) validator.validate()
				}}
				on:blur={() => {
					emailDirty = emailDirty || !!email
					if (emailDirty) validator.validate()
				}}
			/>
			<ld-input-message
				mode={$validator?.fields.email.valid ? 'valid' : 'error'}
				style={`visibility: ${emailDirty ? 'inherit' : 'hidden'}`}
			>
				{$validator?.fields.email.valid
					? 'Lovely email address.'
					: $validator.fields.email.errors.includes('email')
					? 'This email address is invalid.'
					: 'Your email address is required.'}
			</ld-input-message>
		</ld-label>

		<ld-label>
			Your website (optional)
			<ld-input
				type="url"
				placeholder="e.g. https://example.com"
				tone="dark"
				value={website}
				invalid={(website && websiteDirty && !$validator?.fields.website.valid) || undefined}
				on:input={(ev) => {
					website = ev.target.value
					if (websiteDirty) validator.validate()
				}}
				on:blur={() => {
					websiteDirty = websiteDirty || !!website
					if (websiteDirty) validator.validate()
				}}
			/>
			<ld-input-message
				mode={$validator?.fields.website.valid ? 'valid' : 'error'}
				style={`visibility: ${website && websiteDirty ? 'inherit' : 'hidden'}`}
			>
				{$validator?.fields.website.valid ? 'You even have a website! 👍' : 'This URL is invalid.'}
			</ld-input-message>
		</ld-label>
	</div>

	<ld-label class="w-full mb-ld-32">
		Comment (optional)
		<ld-input multiline placeholder="Be creative!" value="" tone="dark" style="min-height: 7rem" />
	</ld-label>

	<div class="grid grid-cols-1 sm:grid-cols-2 gap-ld-24 items-center">
		<ld-label position="right" size="m">
			<span class:text-rr={termsAcceptedDirty && !$validator?.fields.termsAccepted.valid}
				>I accept the terms (none).</span
			>
			<ld-checkbox
				tone="dark"
				checked={termsAccepted}
				invalid={termsAcceptedDirty && !$validator?.fields.termsAccepted.valid}
				on:input={() => {
					termsAccepted = !termsAccepted
					termsAcceptedDirty = true
					validator.validate()
				}}
				on:blur={() => {
					termsAcceptedDirty = true
					validator.validate()
				}}
			/>
		</ld-label>

		<div class="grid grid-cols-2 gap-ld-16">
			<ld-button on:click={onCancel} mode="secondary"> Cancel </ld-button>
			<ld-button on:click={onSubmit}>Submit</ld-button>
		</div>
	</div>
</div>
