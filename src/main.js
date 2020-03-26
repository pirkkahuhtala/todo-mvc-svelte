import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		appTitle: 'Todos'
	}
});

export default app;