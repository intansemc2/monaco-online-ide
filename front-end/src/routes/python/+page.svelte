<script lang="ts">
	import {
		configureMonacoWorkers,
		initPythonWrapper,
		removePythonWrapper,
		wrapper
	} from '$lib/monaco-editor/languages-config/python/page';
	import PythonHelloWorld from '$lib/monaco-editor/languages-config/python/example-code.py?raw';
	import { WrapperSessionId } from '$lib';

	// Constances
	const JUDGE0_LANGUAGE_NAME = 'Python (3.8.1)';
	const LANGUAGE_CODE = 'python';
</script>

<WrapperSessionId
	{configureMonacoWorkers}
	initLanguageWrapper={initPythonWrapper}
	removeLanguageWrapper={removePythonWrapper}
	{wrapper}
	languageCodeExample={PythonHelloWorld}
	judge0LanguageName={JUDGE0_LANGUAGE_NAME}
	languageCode={LANGUAGE_CODE}
/>
