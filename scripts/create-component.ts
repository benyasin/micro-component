import glob from "glob";
import shell from "shelljs";
import fs from "fs/promises";

async function copyTemplate(name: string) {
  const source = `template/component`;
  const target = `src/components/${name}/`;

  shell.exec(`cp -r ${source} ${target}`);

  for (const filepath of await glob(`src/components/${name}/*`)) {
    const propsName = name.replace(/[a-zA-Z]/, ($1) => $1.toLowerCase());
    let content = (await fs.readFile(filepath)).toString();
    content = content
      .replace(/{{name}}/g, name)
      .replace(/{{propsName}}/g, propsName);

    await fs.writeFile(filepath, content);
    if (filepath.includes("{{name}}")) {
      shell.exec(`mv ${filepath} ${filepath.replace("{{name}}", name)}`);
    }
  }

  console.log(`Create component ${name} success!`);
}

const name = process.argv[2];
copyTemplate(name);
