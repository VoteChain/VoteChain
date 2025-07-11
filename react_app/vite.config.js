// // FIle changed completely
// // https://chatgpt.com/s/t_6856d647e7ec8191aaeaefe3654fca9c

// // vite.config.js
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       util: "util/",
//       buffer: "buffer",
//       process: "process/browser",
//       stream: "stream-browserify",
//     },
//   },
//   define: {
//     global: "globalThis", // 👈 this is the key line that fixes `global is not defined`
//     "process.env": {}, // <-- important for process-related references
//   },
// });
// File changed completely
// https://dev.to/boostup/uncaught-referenceerror-process-is-not-defined-12kg
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.SOME_KEY": JSON.stringify(env.SOME_KEY),
      global: "globalThis", // 👈 this is the key line that fixes `global is not defined`
      "process.env": {}, // <-- important for process-related references
    },
    plugins: [react()],
  };
});
