const fs = require("fs/promises");
const path = require("path");

const packagePath = process.cwd();
const buildPath = path.join(packagePath, "./build");

const includeFileInBuild = async (file) => {
  const sourcePath = path.resolve(packagePath, file);
  const targetPath = path.resolve(buildPath, path.basename(file));
  await fs.copyFile(sourcePath, targetPath);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
};

const addLicenseComments = async (packageData) => {
  const license = `/**
 * NWS Client v${packageData.version}
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * @license MIT
 */
`;
  await Promise.all(
    ["./index.js"].map(async (file) => {
      try {
        const filePath = path.resolve(buildPath, file);
        const data = await fs.readFile(filePath, "utf8");
        await fs.writeFile(filePath, license + data, "utf8");
      } catch (err) {
        if (err.code === "ENOENT") {
          console.log(`Skipped license for ${file}`);
        } else {
          throw err;
        }
      }
    })
  );
};

const run = async () => {
  try {
    const packageJson = await fs.readFile(
      path.resolve(packagePath, "./package.json"),
      "utf8"
    );
    const packageData = JSON.parse(packageJson);

    await Promise.all(
      ["../../LICENSE"].map((file) => includeFileInBuild(file))
    );

    await addLicenseComments(packageData);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
