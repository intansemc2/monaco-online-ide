<script lang="ts">
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';

	import Icon from '@iconify/svelte';

	import { initJudge0Output, judge0Api } from '$lib/api/judge0';
	import type { Judge0OutputContent, Language } from '$lib/interfaces/judge0';
	import { getCookie, setCookie } from '$lib/cookies/cookie';
	import { LOADING_TYPE } from '$lib/interfaces/loading-panel';
	import {
		EDITOR_SUPPORT_FONTSIZE,
		MONACO_DAISYUI_THEME,
		MONACO_DETAULT_USER_CONFIG,
		MONACO_EDITOR_DEFAULT_EDITOR_CONFIG,
		MONACO_SUPPORT_THEME
	} from '$lib/monaco-editor/constances';
	import { goto } from '$app/navigation';
	import type { MonacoEditorLanguageClientWrapper } from 'monaco-editor-wrapper';
	import type { EDITOR_FONTZISE } from '$lib/interfaces/editor';
	import { LoadingPanel, EditorOptions, TabIo } from '$lib';

	// Props
	const {
		judge0LanguageName,
		configureMonacoWorkers,
		initLanguageWrapper,
		removeLanguageWrapper,
		wrapper,
		languageCodeExample
	}: {
		judge0LanguageName: string;
		languageCode: string;
		configureMonacoWorkers: () => void;
		initLanguageWrapper: () => Promise<void>;
		removeLanguageWrapper: () => Promise<void>;
		wrapper: MonacoEditorLanguageClientWrapper;
		languageCodeExample: string;
	} = $props();

	// Variables
	let isLoading = $state<boolean>(true);
	let languages = $state<Language[]>([]);
	let selectedTheme = $state<string | undefined>('vs-dark');
	let selectedFontsize = $state<EDITOR_FONTZISE | undefined>(16);
	let inputContent = $state<string>('');
	let outputContent = $state<Judge0OutputContent>(initJudge0Output());
	let username = $state<string | undefined>('');
	const isSubmitAvaiable = $derived<boolean>(Boolean(username));
	let expectedOutput = $state<string | undefined>(undefined);

	let autosaveIntervalId = $state<NodeJS.Timeout | undefined>(undefined);
	let saveTemplateIntervalId = $state<NodeJS.Timeout | undefined>(undefined);

	// Drag and drop
	let questionWidth = $state<number>(65);
	let isResizeActive = $state<boolean>(false);
	let latestMouseYPos = $state<number>(0);
	let latestQuestionWidth = $state<number>(50);

	// Events
	function onDividerStartResize(event: any) {
		isResizeActive = true;
		latestMouseYPos = event.clientX;
		latestQuestionWidth = questionWidth;
	}

	function onDividerResize(event: any) {
		if (!isResizeActive) return;
		const moveDistance = latestMouseYPos - event.clientX;
		const moveDistancePercent = (moveDistance / window.innerWidth) * 100;
		const nextWidth = latestQuestionWidth - moveDistancePercent;
		if (nextWidth < 30 || nextWidth > 80) return;

		questionWidth = nextWidth;
	}

	function onChangeTheme(event: any) {
		const newTheme = event.target.value;
		selectedTheme = newTheme;
		wrapper.getMonacoEditorApp()?.updateUserConfiguration(
			JSON.stringify({
				...MONACO_DETAULT_USER_CONFIG,
				'workbench.colorTheme': newTheme
			})
		);

		const globalTheme = MONACO_DAISYUI_THEME.get(newTheme) || 'dark';
		document.querySelector('html')?.setAttribute('data-theme', globalTheme);

		setCookie('editor-theme', newTheme);
		$page.url.searchParams.set('theme', newTheme);
		goto(`?${$page.url.searchParams.toString()}`);
	}

	async function onResetCode() {
		wrapper.getEditor()?.setValue(languageCodeExample);
	}

	async function onRun() {
		isLoading = true;

		try {
			const selectedLanguage = languages.find((language) => language.name == judge0LanguageName);
			if (!selectedLanguage) return;
			const code = wrapper.getEditor()?.getValue() || '';
			const response = await judge0Api.submissions.post(
				code,
				selectedLanguage.id,
				inputContent,
				expectedOutput,
				true,
				true
			);

			outputContent = response;
		} catch (error) {
			console.error(error);
		}

		isLoading = false;
	}

	function onChangeFontsize(event: any) {
		const newFontsize = event.target.value;
		selectedFontsize = <EDITOR_FONTZISE>parseInt(newFontsize);
		wrapper.getEditor()?.updateOptions({
			...MONACO_EDITOR_DEFAULT_EDITOR_CONFIG,
			fontSize: newFontsize
		});

		setCookie('editor-fontsize', newFontsize);
		$page.url.searchParams.set('fontsize', newFontsize);
		goto(`?${$page.url.searchParams.toString()}`);
	}

	// Functions
	async function initJudge0() {
		languages = await judge0Api.language.get();
	}

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
			selectedTheme = localTheme;
			wrapper.getMonacoEditorApp()?.updateUserConfiguration(
				JSON.stringify({
					...MONACO_DETAULT_USER_CONFIG,
					'workbench.colorTheme': localTheme
				})
			);
			const globalTheme =
				MONACO_DAISYUI_THEME.get(<MONACO_SUPPORT_THEME>localTheme) ||
				<string>MONACO_DAISYUI_THEME.get(MONACO_SUPPORT_THEME.dark);
			document.querySelector('html')?.setAttribute('data-theme', globalTheme);
		}
	}

	function initFontsize() {
		let localFontsize: EDITOR_FONTZISE = <EDITOR_FONTZISE>(
			(parseInt(getCookie('editor-fontsize')) || 16)
		);

		const urlFontsize = String($page.url.searchParams.get('fontsize'));
		if (urlFontsize) {
			const found = EDITOR_SUPPORT_FONTSIZE.find(
				(i) => String(i.id) == urlFontsize || i.name == urlFontsize
			);
			if (found) localFontsize = <EDITOR_FONTZISE>found.id;
		}

		if (localFontsize) {
			selectedFontsize = <EDITOR_FONTZISE>localFontsize;
			wrapper
				.getEditor()
				?.updateOptions({ ...MONACO_EDITOR_DEFAULT_EDITOR_CONFIG, fontSize: localFontsize });
		}
	}

	function initOutput() {
		expectedOutput = <string | undefined>$page.url.searchParams.get('expected_output');
		if (expectedOutput) expectedOutput = expectedOutput.replace(/\\n/g, '\n');
	}

	// Life cycle
	onMount(async () => {
		isLoading = false;

		try {
			configureMonacoWorkers();
			await initLanguageWrapper();
		} catch (error) {
			console.error(error);
		}

		wrapper.getEditor()?.updateOptions(MONACO_EDITOR_DEFAULT_EDITOR_CONFIG);

		await initJudge0();
		onResetCode();

		initTheme();
		initFontsize();
		initOutput();

		isLoading = false;
	});

	onDestroy(async () => {
		await removeLanguageWrapper();
		if (autosaveIntervalId) clearInterval(autosaveIntervalId);
		if (saveTemplateIntervalId) clearInterval(saveTemplateIntervalId);
	});
</script>

<svelte:window on:mouseup={() => (isResizeActive = false)} on:mousemove={onDividerResize} />

{#if isLoading}
	<LoadingPanel {isLoading} loadingType={LOADING_TYPE.SPINNER} />
{/if}

<!-- svelte-ignore a11y_missing_attribute -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore event_directive_deprecated -->
<div class="flex h-[100vh] max-h-[100vh] items-stretch overflow-hidden">
	<div class="flex-shrink-0 overflow-auto pl-1" style="width: {questionWidth}%;">
		<div class="flex min-h-[100vh] flex-col overflow-auto pr-1">
			<div class="mb-1 flex items-center gap-1">
				<button
					class="btn btn-outline btn-success btn-sm rounded-none font-normal"
					on:click={onRun}
				>
					<Icon icon="ion:play" width="16" height="16" />
					<span>Run code</span>
				</button>

				<button
					class="btn btn-outline btn-neutral btn-sm rounded-none font-normal"
					on:click={onResetCode}
				>
					<Icon icon="heroicons:arrow-path" width="16" height="16" />
					<span>Reset</span>
				</button>
				<div class="flex-grow"></div>

				<EditorOptions {selectedTheme} {onChangeTheme} {selectedFontsize} {onChangeFontsize} />
			</div>
			<div class="h-[calc(100vh-40px)] w-full flex-shrink-0" id="monaco-editor-root"></div>
		</div>
	</div>

	<div
		class="divider divider-horizontal m-0 cursor-e-resize select-none"
		on:mousedown={onDividerStartResize}
	></div>

	<TabIo
		{isSubmitAvaiable}
		{username}
		bind:inputContent
		{outputContent}
		{expectedOutput}
		style="max-width: calc(100% - 1rem - {questionWidth}%)"
	/>
</div>
