import fs from 'fs/promises'
import glob from 'glob'
import path from 'path'

export const excludeCompoents = ['ConfigProvider']

export async function rm(target: string) {
  try {
    await fs.rm(target, { recursive: true })
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
  await fs.cp(source, target, { recursive: true })
  await fs.cp('dist/server-app', `${target}/server-app`, {
    recursive: true
  })

  const componentContent = (await fs.readFile(templateFile)).toString()

  let indexFileExportContent = ``
  let files = []

  // 为每个组件创建一个组件文件
  for (const filepath of await glob('src/components/*/')) {
    const name = filepath.replace('src/components/', '')

    const content = componentContent
      .replace(/{{elementId}}/g, `Micro${name}`)
      .replace(/{{type}}/g, name)

    if (excludeCompoents.includes(name)) continue

    await fs.writeFile(`${target}/${name}${ext}`, content)
    indexFileExportContent += `export { default as ${name} } from "./${name}${ext}";\n`

    files.push(`${target}/${name}${ext}`)
  }

  await fs.writeFile(`${target}/index.ts`, indexFileExportContent)

  return files
}
