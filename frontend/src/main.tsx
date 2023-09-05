import React from "react";
import { createRoot } from "react-dom/client";
import "@/globals.css";
import App from "@/App";
import { ThemeProvider } from "@/components/theme-provider";

const container = document.getElementById("root");

const root = createRoot(container!);

root.render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);
