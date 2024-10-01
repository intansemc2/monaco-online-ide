<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	import { getCookie, setCookie } from '$lib/cookies/cookie';
	import {
		MONACO_DAISYUI_THEME,
		MONACO_SUPPORT_THEME,
		type DAISYUI_THEME
	} from '$lib/monaco-editor/constances';
	import { onMount, untrack } from 'svelte';

	let checked = $state<boolean>(true);

	// Events

	// Functions
	function initTheme() {
		let localTheme = getCookie('editor-theme') || MONACO_SUPPORT_THEME.dark;

		const urlTheme = $page.url.searchParams.get('theme');
		if (urlTheme) {
			if (Object.values(MONACO_SUPPORT_THEME).includes(<MONACO_SUPPORT_THEME>urlTheme))
				localTheme = urlTheme;
			if (Object.keys(MONACO_SUPPORT_THEME).includes(urlTheme))
				localTheme = (<any>MONACO_SUPPORT_THEME)[urlTheme];
		}

		if (localTheme) {
			const globalTheme: DAISYUI_THEME =
				<DAISYUI_THEME>MONACO_DAISYUI_THEME.get(<MONACO_SUPPORT_THEME>localTheme) ||
				<string>MONACO_DAISYUI_THEME.get(MONACO_SUPPORT_THEME.dark);

			if (globalTheme == 'dark') checked = false;
			else if (globalTheme == 'light') checked = true;
		}
	}

	// Effects
	$effect(() => {
		checked;
		untrack(() => {
			setTimeout(() => {
				const globalTheme: DAISYUI_THEME = checked ? 'light' : 'dark';
				const monacoTheme: MONACO_SUPPORT_THEME = checked
					? MONACO_SUPPORT_THEME.light
					: MONACO_SUPPORT_THEME.dark;
				document.querySelector('html')?.setAttribute('data-theme', globalTheme);
				setCookie('editor-theme', monacoTheme);
			}, 100);
		});
	});

	// Lifecycle
	onMount(() => {
		initTheme();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<label class="swap swap-rotate">
	<input type="checkbox" bind:checked />
	<Icon icon="ph:sun" width="32" height="32" class="fill-current swap-on" />
	<Icon icon="ph:moon" width="32" height="32" class="fill-current swap-off" />
</label>
