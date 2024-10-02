<script lang="ts">
	import {
		configureMonacoWorkers,
		initJavaWrapper,
		removeJavaWrapper,
		wrapper
	} from '$lib/monaco-editor/languages-config/java/page';
	import JavaHelloWorld from '$lib/monaco-editor/languages-config/java/example-code.java?raw';
	import { WrapperSessionId } from '$lib';

	// Constances
	const JUDGE0_LANGUAGE_NAME = 'Java (OpenJDK 13.0.1)';
	const LANGUAGE_CODE = 'java';
</script>

<WrapperSessionId
	{configureMonacoWorkers}
	initLanguageWrapper={initJavaWrapper}
	removeLanguageWrapper={removeJavaWrapper}
	{wrapper}
	languageCodeExample={JavaHelloWorld}
	judge0LanguageName={JUDGE0_LANGUAGE_NAME}
	languageCode={LANGUAGE_CODE}
/>
