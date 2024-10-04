<script lang="ts">
	import {
		configureMonacoWorkers,
		initPHPWrapper,
		removePHPWrapper,
		wrapper
	} from '$lib/monaco-editor/languages-config/php/page';
	import PHPHelloWorld from '$lib/monaco-editor/languages-config/php/example-code.php?raw';
	import { WrapperSessionId } from '$lib';

	// Constances
	const JUDGE0_LANGUAGE_NAME = 'PHP (7.4.1)';
	const LANGUAGE_CODE = 'php';
</script>

<WrapperSessionId
	{configureMonacoWorkers}
	initLanguageWrapper={initPHPWrapper}
	removeLanguageWrapper={removePHPWrapper}
	{wrapper}
	languageCodeExample={PHPHelloWorld}
	judge0LanguageName={JUDGE0_LANGUAGE_NAME}
	languageCode={LANGUAGE_CODE}
/>
