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
  
  // 检查是否启用SSR，以及dist/server-app是否存在
  const enableSSR = process.env.ENABLE_SSR === 'true'
  if (enableSSR) {
    try {
      await stat('dist/server-app')
      await cp('dist/server-app', `${target}/server-app`, { recursive: true })
      console.log('SSR模式：已复制server-app资源')
    } catch {
      console.log('SSR模式：dist/server-app不存在，跳过复制')
    }
  } else {
    console.log('CSR模式：跳过server-app复制')
  }
  
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
