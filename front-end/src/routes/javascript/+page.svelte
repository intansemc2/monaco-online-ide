<script lang="ts">
	import {
		configureMonacoWorkers,
		initJavascriptWrapper,
		removeJavascriptWrapper,
		wrapper
	} from '$lib/monaco-editor/languages-config/javascript/page';
	import JavascriptHelloWorld from '$lib/monaco-editor/languages-config/javascript/example-code.js?raw';
	import { WrapperSessionId } from '$lib';

	// Constances
	const JUDGE0_LANGUAGE_NAME = 'JavaScript (Node.js 12.14.0)';
	const LANGUAGE_CODE = 'javascript';
</script>

<WrapperSessionId
	{configureMonacoWorkers}
	initLanguageWrapper={initJavascriptWrapper}
	removeLanguageWrapper={removeJavascriptWrapper}
	{wrapper}
	languageCodeExample={JavascriptHelloWorld}
	judge0LanguageName={JUDGE0_LANGUAGE_NAME}
	languageCode={LANGUAGE_CODE}
/>
