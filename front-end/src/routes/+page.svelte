<script lang="ts">
	import ThemeSwap from '$lib/compontents/theme-swap/ThemeSwap.svelte';
</script>

<div class="w-screen h-screen flex justify-center items-center relative">
	<div class="w-full absolute top-0 left-0 right-0 flex items-center p-2">
		<div class="flex-grow"></div>
		<ThemeSwap />
	</div>
	<div class="flex items-center gap-2">
		<a
			href="/python"
			class="flex items-center flex-col gap-2 bg-base-100 p-3 select-none cursor-pointer border-transparent border-2 hover:border-base-200 hover:bg-base-300"
		>
			<img src="/images/python-logo.png" alt="" class="w-20 h-20" />
			<div>Python</div>
		</a>

		<a
			href="/cpp"
			class="flex items-center flex-col gap-2 bg-base-100 p-3 select-none cursor-pointer border-transparent border-2 hover:border-base-200 hover:bg-base-300"
		>
			<img src="/images/cpp-logo.png" alt="" class="w-20 h-20" />
			<div>C++</div>
		</a>
	</div>
</div>
