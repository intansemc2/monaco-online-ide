<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { untrack } from 'svelte';
	import Icon from '@iconify/svelte';

	import type { Judge0OutputContent } from '$lib/interfaces/judge0';
	import { filesizeVisiable } from '$lib/text-utils/unit-converter';

	let {
		isSubmitAvaiable,
		username,
		inputContent = $bindable(''),
		outputContent,
		expectedOutput,
		class: className,
		style
	}: {
		isSubmitAvaiable: boolean;
		username: string | undefined;
		inputContent: string;
		outputContent: Judge0OutputContent;
		expectedOutput: string | undefined;
		class?: string;
		style?: string;
	} = $props();

	let activeTab = $state<string>('i/o');
	const stdoutLines = $derived(
		outputContent.stdout ? outputContent.stdout.replace(/\n+$/g, '').split('\n') : []
	);
	const isHasError = $derived(
		outputContent.message || outputContent.compile_output || outputContent.stderr
	);

	//
	$effect(() => {
		outputContent;

		untrack(() => {
			if (isHasError) {
				activeTab = 'error';
				return;
			}
			activeTab = 'i/o';
		});
	});
</script>

<div class="flex flex-grow flex-col items-stretch {className}" {style}>
	{#if isHasError}
		<div role="tablist" class="tabs tabs-lifted bg-base-100">
			<button
				role="tab"
				class="tab"
				class:tab-active={activeTab == 'i/o'}
				onclick={() => (activeTab = 'i/o')}
			>
				I/O
			</button>
			<button
				role="tab"
				class="tab"
				class:tab-active={activeTab == 'error'}
				onclick={() => (activeTab = 'error')}
				in:fade
			>
				<Icon icon="tabler:exclamation-circle" width="20" height="20" class="mr-1 text-red-500" />
				<span class="text-red-500">Error</span>
			</button>
		</div>
	{/if}

	{#if activeTab == 'i/o'}
		<div class="flex flex-grow flex-col items-stretch gap-1 overflow-hidden bg-base-200">
			<!-- STDIN -->
			<div class="flex items-center gap-1">
				<span>Input</span>
				<div class="flex-grow"></div>
				{#if isSubmitAvaiable}
					<div class="cursor-pointer select-none">{username}</div>
				{/if}
			</div>

			<textarea
				class="w-full flex-grow resize-none bg-base-300 p-1 outline-none"
				bind:value={inputContent}
				autocomplete="off"
				autocorrect="off"
				autocapitalize="off"
				spellcheck="false"
				in:fade
			></textarea>

			<!-- STDOUT -->
			<div class="flex items-center">
				<span>Output</span>
				<span class="flex-grow"></span>
				{#if outputContent.time}
					<span class="badge badge-primary rounded-none">
						{outputContent.time}s
					</span>
				{/if}
				{#if outputContent.memory}
					<span
						class="badge badge-info tooltip rounded-none"
						data-tip="{outputContent.memory} Bytes"
					>
						{filesizeVisiable(outputContent.memory)}
					</span>
				{/if}
			</div>

			<div
				class="stdout flex max-h-[50%] min-w-0 flex-grow flex-col items-stretch overflow-y-auto bg-base-200"
			>
				{#if expectedOutput}
					{#if outputContent.status.id == 3}
						<div class="flex items-center gap-2 bg-success p-2 text-black">
							<Icon icon="ph:check-circle-light" width="32" height="32" />
							{outputContent.status.description}
						</div>
					{:else if outputContent.status.id == 4}
						<div class="flex items-center gap-2 bg-error p-2 text-white">
							<Icon icon="ph:x-circle-light" width="32" height="32" />
							{outputContent.status.description}
						</div>
					{/if}
				{/if}

				{#if outputContent.stdout}
					<!-- <pre class="bg-base-200">{outputContent.stdout}</pre> -->

					<div
						class="mockup-code min-w-0 flex-grow overflow-auto rounded-none bg-base-300 text-base-content"
					>
						{#each stdoutLines as line, i}
							<pre data-prefix={i + 1}><code>{line}</code></pre>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}

	{#if isHasError && activeTab == 'error'}
		<div class="flex w-full max-w-full flex-grow flex-col overflow-auto bg-base-200" in:fade>
			{#if outputContent.message}
				<pre class="bg-base-200">{outputContent.message}</pre>
			{/if}

			{#if outputContent.compile_output}
				<pre class="bg-base-200">{outputContent.compile_output}</pre>
			{/if}

			{#if outputContent.stderr}
				<pre class="bg-base-200">{outputContent.stderr}</pre>
			{/if}
		</div>
	{/if}

	{#if activeTab == 'output'}
		<div
			class="mockup-code min-w-0 flex-grow overflow-auto rounded-none bg-base-200 text-base-content"
			in:fade
		>
			{#each stdoutLines as line, i}
				<pre data-prefix={i + 1}><code>{line}</code></pre>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss" scoped>
	.tabs-lifted > .tab.tab-active {
		--tab-bg: var(--fallback-b2, oklch(var(--b2) / var(--tw-bg-opacity))) !important;
	}

	.tablist,
	.tablist * {
		min-width: 0px;
		flex-shrink: 0;
	}
</style>
