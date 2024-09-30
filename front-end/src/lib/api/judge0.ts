import type { Judge0OutputContent, Language } from '$lib/interfaces/judge0';
import { fromBinary, toBinary } from '$lib/text-utils/base64-support';

const JUDGE0_HOST = 'http://localhost:2358';

export const judge0Api = {
	language: {
		get: async () => {
			let result: Language[] = [];

			try {
				const url = `${JUDGE0_HOST}/languages/`;
				const response = await fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					},
					redirect: 'follow' // manual, *follow, error
				});
				result = await response.json();
			} catch (error) {
				console.error(error);
			}

			return result;
		}
	},
	submissions: {
		post: async (
			source_code: string,
			language_id: number,
			stdin: string = '',
			expected_output: string | undefined = undefined,
			base64_encoded = false,
			wait = false
		) => {
			let result: any;

			try {
				const url = `${JUDGE0_HOST}/submissions/?base64_encoded=${base64_encoded}&wait=${wait}`;
				source_code = base64_encoded ? toBinary(source_code) : source_code;
				stdin = base64_encoded ? toBinary(stdin) : stdin;
				expected_output =
					base64_encoded && expected_output ? toBinary(expected_output) : expected_output;
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					redirect: 'follow',
					body: JSON.stringify({
						source_code: source_code,
						language_id: language_id,
						stdin: stdin,
						expected_output: expected_output
					})
				});
				result = await response.json();

				if (base64_encoded) {
					if (result.stdout) result.stdout = fromBinary(result.stdout);
					if (result.message) result.message = fromBinary(result.message);
					if (result.stderr) result.stderr = fromBinary(result.stderr);
					if (result.compile_output) result.compile_output = fromBinary(result.compile_output);
				}

				console.log(
					'[JUDGE0][SUBMISSION] input=',
					source_code,
					', stdin=',
					stdin,
					', output=',
					result
				);
			} catch (error) {
				console.error(error);
			}

			return result;
		}
	}
};

export function initJudge0Output(): Judge0OutputContent {
	return {
		stdout: null,
		time: '',
		memory: 0,
		stderr: null,
		token: '',
		compile_output: null,
		message: null,
		status: { id: 0, description: '' }
	};
}
