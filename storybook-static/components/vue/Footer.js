import { defineComponent as d, h as p } from "vue";
const h = process.client, l = h && !!(localStorage != null && localStorage.getItem("MICRO_COMPONENT:DEBUG")), o = "Footer";
let n = "";
const u = d({ inheritAttrs: !1, data() {
  return { component: null, microId: this.$attrs.microId || `${o}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, instanceId: this.$attrs.instanceId || `instance_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` };
}, methods: { log(e, ...t) {
  (this.$attrs.logger || l) && console.log(`[MicroComponent] ${o}: ${e}`, t.map((s) => typeof s == "object" ? JSON.stringify(s, null, 2) : s));
}, async createComponent() {
  var s, i;
  this.log("create component");
  const e = await async function() {
    return window.MicroRuntime ? window.MicroRuntime : new Promise((r) => {
      window.addEventListener("MicroRuntime:ready", () => {
        r(window.MicroRuntime);
      });
    });
  }(), t = await e.createComponent({ microId: this.microId, instanceId: this.instanceId, type: o, props: this.$attrs, el: this.$el });
  t && ((s = t.event) == null || s.clearEvents(), (i = t.event) == null || i.on("event", (r, ...a) => {
    this.log("event emit", r, ...a);
    const c = "on" + r.replace(/^([a-zA-Z]{1})/, (m) => m.toUpperCase());
    this.$attrs[c] && this.$attrs[c](...a);
  }), t == null || t.updateProps(this.$attrs)), this.component = t, this.log("create component complete");
} }, created() {
  var e;
  this.serverHTML = "", this.$attrs.serverLocale ? this.serverHTML = n = this.$attrs.serverLocale : n ? this.serverHTML = n : h && (this.serverHTML = n = (e = document.querySelector(`[data-micro-type="${o}"]`)) == null ? void 0 : e.innerHTML), this.serverHTML || (this.serverHTML = "<div></div>");
}, mounted() {
  this.$nextTick(() => {
    this.createComponent();
  });
}, beforeDestroy() {
  var e, t;
  this.log("beforeDestroy"), (t = (e = this.component) == null ? void 0 : e.event) == null || t.clearEvents(), this.component = null;
}, render() {
  this.log("render"), this.component && (this.log("update props", this.$attrs), this.component.updateProps(this.$attrs));
  const e = this.$attrs.theme ? `micro-${this.$attrs.theme}` : "";
  return p("div", { innerHTML: n, key: `${this.microId}_${this.instanceId}`, class: { micro: !0, [e]: !0 }, "data-micro-type": o, "data-micro-instance-id": this.instanceId });
} });
export {
  u as default
};
