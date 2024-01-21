import { createApp } from 'vue';
import './assets/css/tailwind.css';
import App from './App.vue';
import { provideVSCodeDesignSystem } from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register();
const app = createApp(App);
app.mount('#app');

