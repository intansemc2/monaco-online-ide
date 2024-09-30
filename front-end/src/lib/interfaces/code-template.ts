interface CodeTemplate {
	id: string;
	session_id: string;
	code: string;
	username: string | null;
	language: string;
	theme: string;
	created?: string;
	updated?: string;
	input: string;
	fontsize: string;
}

export { type CodeTemplate };
