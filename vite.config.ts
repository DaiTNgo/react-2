import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    mode: "production",
    esbuild: {
        drop: ["console", "debugger"],
    },

    /**TODO: Production*/
     base: "/sc-content/javascript/fpr_1.4",
});
