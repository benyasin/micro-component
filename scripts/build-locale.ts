import path from 'path'
import fs from 'fs/promises'
import shell from 'shelljs'
import glob from 'glob'

const configs = {
  // web: {
  //   subDir: "seperation",
  //   branch: "web_seperation_new",
  //   target: "web",
  // },
  common: {
    subDir: 'locale',
    branch: 'web_common',
    target: 'common'
  }
}

/**
 * 下载多语言包到本地
 */
function fetchLocale(type: keyof typeof configs) {
  const { subDir, branch, target } = configs[type]
  const tempDir = `temp_${branch}`
  const targetDir = `locales/${target}`

  shell.exec(`rm -rf ${tempDir}`)
  shell.exec(`git clone -b ${branch} --depth=1 git@gitlab.upex.com:WebOnly/language.git ${tempDir}`)
  shell.exec(`rm -rf ${targetDir} && mkdir ${targetDir}`)
  shell.exec(`cp -rf ./${tempDir}/${subDir}/* ${targetDir}/`)
  shell.exec(`rm -rf ./${tempDir}`)
}

/**
 * 生成入口ts
 */
async function generateEntry() {
  shell.exec(`rm -rf locales/js && mkdir locales/js`)

  for (const filepath of await glob('locales/common/*.json')) {
    const name = path.basename(filepath).replace('.json', '')
    const content = `
    import common from '../common/${name}.json' assert { type: "json" };
    export default common;`

    await fs.writeFile(`locales/js/${name}.js`, content)
  }
}

async function generateExport() {
  const each = async (fn) => {
    let content = ''
    for (const filepath of await glob('locales/js/*.js')) {
      const name = path.basename(filepath).replace('.js', '')
      content += fn(name)
    }
    return content
  }

  let content = `
    // 自动生成，勿动
    ${await each((name) => `import ${name.replace('-', '_')} from './js/${name}.js'\n`)}
    export default {
      ${await each((name) => `'${name}': ${name.replace('-', '_')},\n`)}
    }
  `
  fs.writeFile('locales/index.ts', content)
}

/**
 * 生成BG语言，该语言只显示KEY
 */
async function generateBG() {
  const bg = JSON.parse((await fs.readFile('locales/common/en_US.json')).toString())
  const eachRewrite = (obj, prefix = '') => {
    if (!obj) return
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object') {
        eachRewrite(obj[key], prefix + key + '.')
        return
      }
      obj[key] = prefix + key
    })
  }
  if (bg) {
    eachRewrite(bg)
  }
  await fs.writeFile(`locales/common/bg.json`, JSON.stringify(bg, null, 2))
}

;(async function () {
  await fetchLocale('common')
  await generateBG()

  const isGenerate = process.argv[2] === '--generate'
  if (isGenerate) {
    await generateEntry()
    await generateExport()
  }
})()
