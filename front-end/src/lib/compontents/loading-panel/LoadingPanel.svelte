<script lang="ts">
	import { LOADING_TYPE } from '$lib/interfaces/loading-panel';

	let {
		isLoading = $bindable(false),
		loadingType = LOADING_TYPE.SPINNER
	}: { isLoading: boolean; loadingType: LOADING_TYPE } = $props();
</script>

{#if isLoading}
	<div
		class="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-base-100/10 backdrop-blur-sm"
	>
		{#if loadingType == LOADING_TYPE.SPINNER}
			<span class="loading loading-spinner loading-lg"></span>
		{:else if loadingType == LOADING_TYPE.DOTS}
			<span class="loading loading-dots loading-lg"></span>
		{:else if loadingType == LOADING_TYPE.RING}
			<span class="loading loading-ring loading-lg"></span>
		{:else if loadingType == LOADING_TYPE.BALL}
			<span class="loading loading-ball loading-lg"></span>
		{:else if loadingType == LOADING_TYPE.BARS}
			<span class="loading loading-bars loading-lg"></span>
		{:else if loadingType == LOADING_TYPE.INFINITY}
			<span class="loading loading-infinity loading-lg"></span>
		{:else}
			<span class="loading loading-spinner loading-lg"></span>
		{/if}
	</div>
{/if}
