enum MONACO_SUPPORT_THEME {
	dark = 'Default Dark Modern',
	light = 'Default Light Modern',
	high_contrast_dark = 'Default High Contrast',
	high_contrast_light = 'Default High Contrast Light',
	dark_plus = 'Default Dark+',
	light_plus = 'Default Light+'
}

const MONACO_THEMES = [
	{ id: MONACO_SUPPORT_THEME.dark, name: 'Dark' },
	{ id: MONACO_SUPPORT_THEME.light, name: 'Light' },
	{ id: MONACO_SUPPORT_THEME.high_contrast_dark, name: 'High Contrast Dark' },
	{ id: MONACO_SUPPORT_THEME.high_contrast_light, name: 'High Contrast Light' },
	{ id: MONACO_SUPPORT_THEME.dark_plus, name: 'Dark+' },
	{ id: MONACO_SUPPORT_THEME.light_plus, name: 'Light+' }
];
const MONACO_DAISYUI_THEME = new Map([
	[MONACO_SUPPORT_THEME.dark, 'dark'],
	[MONACO_SUPPORT_THEME.light, 'light'],
	[MONACO_SUPPORT_THEME.high_contrast_dark, 'dark'],
	[MONACO_SUPPORT_THEME.high_contrast_light, 'light'],
	[MONACO_SUPPORT_THEME.dark_plus, 'dark'],
	[MONACO_SUPPORT_THEME.light_plus, 'light']
]);

const MONACO_DETAULT_USER_CONFIG = {
	'editor.wordWrap': 'on',
	'editor.fontSize': 18,
	'editor.tabWidth': 4,
	'editor.singleQuote': true,
	'editor.fontFamily': "'Fira Code', 'monospace', monospace",
	'editor.fontLigatures': true,
	'editor.stickyScroll.scrollWithEditor': false,
	'workbench.tree.enableStickyScroll': false,
	'editor.stickyScroll.enabled': false
};

const MONACO_EDITOR_DEFAULT_EDITOR_CONFIG = {
	'semanticHighlighting.enabled': true,
	fontFamily: 'Fira Code',
	fontSize: 16,
	fontLigatures: true,
	tabSize: 4,
	insertSpaces: true,
	stickyScroll: { enabled: false }
};

const EDITOR_SUPPORT_LANGUAGE = [{ id: 'python', name: 'Python (3.8.1)' }];

const EDITOR_SUPPORT_FONTSIZE = [
	{ id: 8, name: 'Very small' },
	{ id: 12, name: 'Small' },
	{ id: 16, name: 'Normal' },
	{ id: 18, name: 'Big' },
	{ id: 24, name: 'Very big' }
];

export {
	MONACO_SUPPORT_THEME,
	MONACO_THEMES,
	MONACO_DAISYUI_THEME,
	MONACO_DETAULT_USER_CONFIG,
	MONACO_EDITOR_DEFAULT_EDITOR_CONFIG,
	EDITOR_SUPPORT_LANGUAGE,
	EDITOR_SUPPORT_FONTSIZE
};
