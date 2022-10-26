<script lang="ts">
	import { titles } from './titles'
	import { createEventDispatcher } from 'svelte'
	import { form, field } from 'svelte-forms'
	import { required, email as emailValidator, url } from 'svelte-forms/validators'
	function optional(validation) {
		return async (value: string | null | undefined) => {
			const validator = validation(value)
			const hasValue = !(value === undefined || value === null || value === '')
			const result = await validator
			return { valid: result.valid || !hasValue, name: result.name }
		}
	}
	const dispatch = createEventDispatcher()
	let fullNameDirty = false
	let emailDirty = false
	let websiteDirty = false
	let termsAccepted = false
	let termsAcceptedDirty = false
	let title = ''
	const fieldOptions = {
		checkOnInit: false,
		validateOnChange: false,
		stopAtFirstError: false,
	}
	const fullNameField = field('fullName', '', [required()], fieldOptions)
	const emailField = field('email', '', [required(), emailValidator()], fieldOptions)
	const websiteField = field('website', '', [optional(url())], fieldOptions)
	const termsAcceptedField = field(
		'termsAccepted',
		termsAccepted,
		[(value) => ({ valid: value === true, name: 'checked' })],
		fieldOptions
	)
	const validator = form(fullNameField, emailField, websiteField, termsAcceptedField)
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
	async function onSubmit() {
		fullNameDirty = true
		emailDirty = true
		websiteDirty = true
		termsAcceptedDirty = true
		await validator.validate()
		if ($validator.valid) {
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
			on:ldchange={(ev) => onThemeChange(ev.detail[0])}
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
				on:ldchange={(ev) => {
					title = ev.detail[0]
					console.info('title', title)
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
				value={$fullNameField.value}
				invalid={fullNameDirty && !$fullNameField.valid}
				on:input={(ev) => {
					$fullNameField.value = ev.target.value
					if (fullNameDirty) validator.validate()
				}}
				on:blur={() => {
					fullNameDirty = fullNameDirty || !!$fullNameField.value
					if (fullNameDirty) validator.validate()
				}}
			/>

			<ld-input-message
				mode={$fullNameField.valid ? 'valid' : 'error'}
				style={`visibility: ${fullNameDirty ? 'inherit' : 'hidden'}`}
			>
				{$fullNameField.valid ? 'Lovely name.' : 'Your full name is required.'}
			</ld-input-message>
		</ld-label>

		<ld-label>
			Your email address
			<ld-input
				type="email"
				placeholder="e.g. jason.parse@example.com"
				tone="dark"
				value={$emailField.value}
				invalid={emailDirty && !$emailField.valid}
				on:input={(ev) => {
					$emailField.value = ev.target.value
					if (emailDirty) {
						validator.validate()
					}
				}}
				on:blur={() => {
					emailDirty = emailDirty || !!$emailField.value
					if (emailDirty) validator.validate()
				}}
			/>
			<ld-input-message
				mode={$emailField.valid ? 'valid' : 'error'}
				style={`visibility: ${emailDirty ? 'inherit' : 'hidden'}`}
			>
				{$emailField.valid
					? 'Lovely email address.'
					: $validator.hasError('email.required')
					? 'Your email address is required.'
					: 'This email address is invalid.'}
			</ld-input-message>
		</ld-label>

		<ld-label>
			Your website (optional)
			<ld-input
				type="url"
				placeholder="e.g. https://example.com"
				tone="dark"
				value={$websiteField.value}
				invalid={($websiteField.value && websiteDirty && !$websiteField.valid) || undefined}
				on:input={(ev) => {
					$websiteField.value = ev.target.value
					if (websiteDirty) validator.validate()
				}}
				on:blur={() => {
					websiteDirty = websiteDirty || !!$websiteField.value
					if (websiteDirty) validator.validate()
				}}
			/>
			<ld-input-message
				mode={$websiteField.valid ? 'valid' : 'error'}
				style={`visibility: ${$websiteField.value && websiteDirty ? 'inherit' : 'hidden'}`}
			>
				{$websiteField.valid ? 'You even have a website! 👍' : 'This URL is invalid.'}
			</ld-input-message>
		</ld-label>
	</div>

	<ld-label class="w-full mb-ld-32">
		Comment (optional)
		<ld-input multiline placeholder="Be creative!" value="" tone="dark" style="min-height: 7rem" />
	</ld-label>

	<div class="grid grid-cols-1 sm:grid-cols-2 gap-ld-24 items-center">
		<ld-label position="right" size="m">
			<span class:text-rr={termsAcceptedDirty && !$termsAcceptedField.valid}
				>I accept the terms (none).</span
			>
			<ld-checkbox
				tone="dark"
				checked={$termsAcceptedField.value}
				invalid={termsAcceptedDirty && !$termsAcceptedField.valid}
				on:input={() => {
					$termsAcceptedField.value = !$termsAcceptedField.value
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
