import { createPinia } from 'pinia';

/**
 * The central Pinia instance for the application.
 * This is created here and exported to be used in main.ts.
 * This pattern helps keep the main.ts file clean and centralizes store configuration.
 */
const pinia = createPinia();

export default pinia;
