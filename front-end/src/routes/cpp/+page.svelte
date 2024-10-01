<script lang="ts">
	import {
		configureMonacoWorkers,
		initCppWrapper,
		removeCppWrapper,
		wrapper
	} from '$lib/monaco-editor/languages-config/cpp/page';
	import CppHelloWorld from '$lib/monaco-editor/languages-config/cpp/example-code.cpp?raw';
	import { WrapperSessionId } from '$lib';

	// Constances
	const JUDGE0_LANGUAGE_NAME = 'C++ (GCC 9.2.0)';
	const LANGUAGE_CODE = 'cpp';
</script>

<WrapperSessionId
	{configureMonacoWorkers}
	initLanguageWrapper={initCppWrapper}
	removeLanguageWrapper={removeCppWrapper}
	{wrapper}
	languageCodeExample={CppHelloWorld}
	judge0LanguageName={JUDGE0_LANGUAGE_NAME}
	languageCode={LANGUAGE_CODE}
/>
