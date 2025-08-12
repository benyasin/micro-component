/**
 * 锁定vue2版本
 * 由于我们需要在同一个仓库下安装vue2、vue3和他们相关的依赖，存在版本冲突
 * 所以在构建vue2时需要先修改pnpm.override并且重装依赖，锁定vue2版本
 */

import path from "path";
import fs from "fs/promises";
import shell from "shelljs";

const packageConfigPath = path.resolve("./package.json");

async function getRootPackageConfig() {
  const content = (await fs.readFile(packageConfigPath)).toString();
  return JSON.parse(content);
}

async function overrideVueVersion(append: boolean) {
  const packageConfig = await getRootPackageConfig();

  if (append && packageConfig.pnpm.overrides.vue) return;
  if (!append && !packageConfig.pnpm.overrides.vue) return;

  if (append) {
    packageConfig.pnpm.overrides["vue-template-compiler"] = "2.6.14";
    packageConfig.pnpm.overrides.vue = "2.6.14";
  } else {
    delete packageConfig.pnpm.overrides["vue-template-compiler"];
    delete packageConfig.pnpm.overrides.vue;
  }

  await fs.writeFile(packageConfigPath, JSON.stringify(packageConfig, null, 2));

  shell.exec(`pnpm i --no-frozen-lockfile`);
}

const isAppend = process.argv[2] === "--append";
overrideVueVersion(isAppend);
