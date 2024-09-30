interface Language {
	id: number;
	name: string;
}

interface Judge0OutputContent {
	stdout: string | null;
	time: string;
	memory: number;
	stderr: string | null;
	token: string;
	compile_output: string | null;
	message: string | null;
	status: { id: number; description: string };
}
export type { Language, Judge0OutputContent };
