import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    mode: "production",

    /**TODO: Production*/
    // base: "/static.assets.sadlierconnect.com/sc-content/javascript/fpr_1.2",
});
