import { readFile, appendFile, cp, writeFile, rm as fsRm, stat } from 'fs/promises'
import { glob } from 'glob'
import * as path from 'path'

export const excludeCompoents = ['ConfigProvider']

export async function rm(target: string) {
  try {
    await fsRm(target, { recursive: true })
  } catch {}
}

/**
 * 将template文件复制到指定文件夹，并替换关键词
 * @param library
 * @param target
 */
export async function copyTemplate(library: 'vue' | 'react' | 'vue2', target: string) {
  const source = `template/${library}`
  const ext = {
    vue: '.ts',
    vue2: '.ts',
    react: '.tsx'
  }[library]
  const templateFile = path.resolve(
    {
      vue: `${target}/component.ts`,
      vue2: `${target}/component.ts`,
      react: `${target}/Index.tsx`
    }[library]
  )

  await rm(target)
  await cp(source, target, { recursive: true })
  
  const componentContent = (await readFile(templateFile)).toString()

  let indexFileExportContent = ``
  let files: string[] = []

  for (const filepath of await glob('src/components/*/')) {
    const name = filepath.replace('src/components/', '')
    const content = componentContent
      .replace(/{{elementId}}/g, `Micro${name}`)
      .replace(/{{type}}/g, name)
    if (excludeCompoents.includes(name)) continue
    await writeFile(`${target}/${name}${ext}`, content)
    indexFileExportContent += `export { default as ${name} } from "./${name}${ext}";\n`
    files.push(`${target}/${name}${ext}`)
  }
  await writeFile(`${target}/index.ts`, indexFileExportContent)
  return files
}
