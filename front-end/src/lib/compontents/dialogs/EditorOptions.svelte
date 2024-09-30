<script lang="ts">
	import Icon from '@iconify/svelte';

	import type { EDITOR_FONTZISE } from '$lib/interfaces/editor';
	import { EDITOR_SUPPORT_FONTSIZE, MONACO_THEMES } from '$lib/monaco-editor/constances';

	let {
		selectedTheme = $bindable(undefined),
		selectedFontsize = $bindable(undefined),
		onChangeTheme,
		onChangeFontsize
	}: {
		selectedTheme: string | undefined;
		selectedFontsize: EDITOR_FONTZISE | undefined;
		onChangeTheme: (event: any) => void;
		onChangeFontsize: (event: any) => void;
	} = $props();

	let dialog = $state<HTMLDialogElement>();
	// Events
	function closeDialog() {
		dialog?.close();
	}
</script>

<!-- svelte-ignore event_directive_deprecated -->
<button
	class="btn btn-outline btn-info btn-sm rounded-none font-normal"
	on:click={() => dialog?.showModal()}
>
	<Icon icon="heroicons:cog-6-tooth" width="16" height="16" />
	Settings
</button>
<!-- svelte-ignore event_directive_deprecated -->
<dialog bind:this={dialog} class="modal">
	<div class="modal-box">
		<div class="flex w-full flex-col items-stretch gap-2">
			<select
				class="select select-bordered select-sm rounded-none"
				on:change={onChangeTheme}
				bind:value={selectedTheme}
			>
				{#each MONACO_THEMES as theme (theme.id)}
					<option value={theme.id}>Theme {theme.name}</option>
				{/each}
			</select>
			<select
				class="select select-bordered select-sm rounded-none"
				on:change={onChangeFontsize}
				bind:value={selectedFontsize}
			>
				{#each EDITOR_SUPPORT_FONTSIZE as fontsize (fontsize.id)}
					<option value={fontsize.id}>Font size {fontsize.name}</option>
				{/each}
			</select>

			<div class="flex items-center justify-end gap-1">
				<button class="btn btn-outline btn-sm rounded-none font-normal" on:click={closeDialog}>
					Close
				</button>
			</div>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
