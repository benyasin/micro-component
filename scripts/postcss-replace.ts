const keyframeRules = ['keyframes', '-webkit-keyframes', '-moz-keyframes', '-o-keyframes']

type Option = Record<string, string | RegExp>

export default function (options: { rule?: Option; decl?: Option }) {
  function replace(value: string, record: Option) {
    for (const [newValue, regexp] of Object.entries(record)) {
      value = value.replace(regexp, newValue)
    }
    return value
  }

  return function (root) {
    root.walkRules((rule) => {
      // 排除 keyframe
      if (rule.parent && keyframeRules.includes(rule.parent.name)) {
        return
      }
      // 替换 selector
      if (options.rule) {
        rule.selectors = rule.selectors.map((selector) => replace(selector, options.rule))
      }
      // 替换 decl
      if (options.decl) {
        root.walkDecls((decl) => {
          decl.prop = replace(decl.prop, options.decl)
          decl.value = replace(decl.value, options.decl)
        })
      }
    })
  }
}
