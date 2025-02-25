#!/usr/bin/env node

import inquirer from "inquirer";
import { V3 } from "./v3.js";
import { V4 } from "./v4.js";

async function main() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "version",
      message: "Select a version:",
      choices: ["v3", "v4"],
    },
  ]);
  return answers.version;
}

const answer = await main();

if (answer === "v3") {
  await V3();
} else {
  await V4();
}
