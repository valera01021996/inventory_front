import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    server: {
        host: true,
        port: 3000,
    },
    plugins: [react(), tailwindcss(), tsConfigPaths()],
});
