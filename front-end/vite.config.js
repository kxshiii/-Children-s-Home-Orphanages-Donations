import { defineConfig, createLogger } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// ✅ Fix: Define isDev
const isDev = process.env.NODE_ENV !== 'production';

// ✅ Your existing error handlers...
const configHorizonsViteErrorHandler = `...`;  // keep as is
const configHorizonsRuntimeErrorHandler = `...`;  // keep as is
const configHorizonsConsoleErrroHandler = `...`;  // keep as is
const configWindowFetchMonkeyPatch = `...`;  // keep as is

// ✅ HTML injection plugin
const addTransformIndexHtml = {
	name: 'add-transform-index-html',
	transformIndexHtml(html) {
		return {
			html,
			tags: [
				{
					tag: 'script',
					attrs: { type: 'module' },
					children: configHorizonsRuntimeErrorHandler,
					injectTo: 'head',
				},
				{
					tag: 'script',
					attrs: { type: 'module' },
					children: configHorizonsViteErrorHandler,
					injectTo: 'head',
				},
				{
					tag: 'script',
					attrs: { type: 'module' },
					children: configHorizonsConsoleErrroHandler,
					injectTo: 'head',
				},
				{
					tag: 'script',
					attrs: { type: 'module' },
					children: configWindowFetchMonkeyPatch,
					injectTo: 'head',
				},
			],
		};
	},
};

// ✅ Optional plugin stubs if missing
const inlineEditPlugin = () => ({
	name: 'inline-edit-plugin',
	transform(code, id) {
		return null;
	},
});

const editModeDevPlugin = () => ({
	name: 'edit-mode-dev-plugin',
	transform(code, id) {
		return null;
	},
});

// ✅ Filter PostCSS errors
console.warn = () => {};

const logger = createLogger();
const loggerError = logger.error;

logger.error = (msg, options) => {
	if (options?.error?.toString().includes('CssSyntaxError: [postcss]')) {
		return;
	}
	loggerError(msg, options);
};

export default defineConfig({
	customLogger: logger,
	plugins: [
		...(isDev ? [inlineEditPlugin(), editModeDevPlugin()] : []),
		react(),
		addTransformIndexHtml
	],
	server: {
		cors: true,
		headers: {
			'Cross-Origin-Embedder-Policy': 'credentialless',
		},
		allowedHosts: true,
	},
	resolve: {
		extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		rollupOptions: {
			external: [
				'@babel/parser',
				'@babel/traverse',
				'@babel/generator',
				'@babel/types'
			]
		}
	}
});