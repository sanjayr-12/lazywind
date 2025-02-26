import { exec } from "child_process";
import fs from "node:fs";

function checkExists(path) {
  if (fs.existsSync(`${path}/vite.config.js`)) {
    return true;
  } else {
    return false;
  }
}

export const V4 = async () => {
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
    const content = `import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})`;
    const content2 = `@import "tailwindcss";`;
    const extension = checkExists(path) ? "js" : "ts";

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
