const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const { promisify } = require("util");
const exec = promisify(childProcess.exec);

async function run() {
  const packageRoot = process.cwd();

  const tsconfigPath = path.join(packageRoot, "tsconfig.build.json");
  if (!fs.existsSync(tsconfigPath)) {
    throw new Error(
      "Unable to find a tsconfig to build this project. " +
        `The package root needs to contain a 'tsconfig.build.json'. ` +
        `The package root is '${packageRoot}'`
    );
  }

  await exec(["yarn", "tsc", "-b", tsconfigPath].join(" "));
}

yargs
  .command({
    command: "$0",
    description: "build package",
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
