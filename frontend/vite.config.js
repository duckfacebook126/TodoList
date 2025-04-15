import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'; // This line is correct

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss() , nodePolyfills({
    // Whether to polyfill specific globals/modules. If false, only auto detected modules are polyfilled.
    globals: {
      Buffer: true, // Enable Buffer polyfill
    },
  }),],

})
