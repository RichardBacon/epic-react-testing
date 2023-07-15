import * as React from "react";
import Button from "./Button";
import { ThemeProvider, useTheme } from "../contexts/Theme";

function EasyButton() {
  return (
    <ThemeProvider>
      <h1>Hit the easy button!</h1>
      <hr />
      <Button onClick={() => alert("that was easy")}>Easy!</Button>
      <hr />
      <ThemeToggler />
    </ThemeProvider>
  );
}

function ThemeToggler() {
  const [theme, setTheme] = useTheme();
  return (
    <button onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}>
      Toggle theme: {theme}
    </button>
  );
}

export default EasyButton;
