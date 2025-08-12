const svgs = import.meta.glob<{ default: any }>(`./*.svg`, {
  eager: true,
  import: 'default'
})

export default svgs
