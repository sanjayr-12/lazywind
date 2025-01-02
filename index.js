#!/usr/bin/env node
import { exec } from "child_process";
import fs from "node:fs";

const path = process.cwd();

function change() {
  return new Promise((res, rej) => {
    exec(`cd ${path}`, (err, stdout) => {
      if (err) {
        console.log(err);
        rej(err);
      } else {
        console.log(stdout);
        res(stdout);
      }
    });
  });
}

function tail(cmd) {
  return new Promise((res, rej) => {
    exec(cmd, (err, stdout) => {
      if (err) {
        console.log(err);
        rej(err);
      } else {
        console.log(stdout);
        res(stdout);
      }
    });
  });
}

function template() {
  const content = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
  const content2 = `@tailwind base;
@tailwind components;
@tailwind utilities;`;
  try {
    fs.writeFileSync(`${path}/tailwind.config.js`, content);
    fs.writeFileSync(`${path}/src/index.css`, content2);
    console.log("all done");
    
  } catch (error) {
    console.error(error);
  }
}

await change();

await tail("npm install -D tailwindcss postcss autoprefixer");

await tail("npx tailwindcss init -p");

template();
