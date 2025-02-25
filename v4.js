import { exec } from "child_process";
import fs from "node:fs";

const path = process.cwd();

export const V4 = async () => {
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
    const content2 = `@import "tailwindcss";`;
    const extension = checkExists() ? "js" : "ts";
    try {
      fs.writeFileSync(`${path}/vite.config.${extension}`, content);
      fs.writeFileSync(`${path}/src/index.css`, content2);
      console.log("all done");
    } catch (error) {
      console.error(error);
    }
  }

  await change();

  await tail("npm install tailwindcss @tailwindcss/vite");

  template();
};

function checkExists() {
  if (fs.existsSync(`${path}/tailwind.config.js`)) {
    return true;
  } else {
    false;
  }
}
