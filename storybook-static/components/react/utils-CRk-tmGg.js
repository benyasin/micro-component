import le, { useRef as A, useEffect as se } from "react";
var Pe, fe = { exports: {} }, q = {}, Te, ee = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
process.env.NODE_ENV === "production" ? fe.exports = function() {
  if (Pe) return q;
  Pe = 1;
  var x = le, E = Symbol.for("react.element"), $ = Symbol.for("react.fragment"), D = Object.prototype.hasOwnProperty, M = x.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, L = { key: !0, ref: !0, __self: !0, __source: !0 };
  function b(v, O, S) {
    var k, P = {}, R = null, T = null;
    for (k in S !== void 0 && (R = "" + S), O.key !== void 0 && (R = "" + O.key), O.ref !== void 0 && (T = O.ref), O) D.call(O, k) && !L.hasOwnProperty(k) && (P[k] = O[k]);
    if (v && v.defaultProps) for (k in O = v.defaultProps) P[k] === void 0 && (P[k] = O[k]);
    return { $$typeof: E, type: v, key: R, ref: T, props: P, _owner: M.current };
  }
  return q.Fragment = $, q.jsx = b, q.jsxs = b, q;
}() : fe.exports = (Te || (Te = 1, process.env.NODE_ENV !== "production" && function() {
  var x, E = le, $ = Symbol.for("react.element"), D = Symbol.for("react.portal"), M = Symbol.for("react.fragment"), L = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), v = Symbol.for("react.provider"), O = Symbol.for("react.context"), S = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), P = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), re = Symbol.for("react.offscreen"), Y = Symbol.iterator, F = E.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function h(e) {
    for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), l = 1; l < r; l++) t[l - 1] = arguments[l];
    (function(u, c, o) {
      var a = F.ReactDebugCurrentFrame.getStackAddendum();
      a !== "" && (c += "%s", o = o.concat([a]));
      var f = o.map(function(p) {
        return String(p);
      });
      f.unshift("Warning: " + c), Function.prototype.apply.call(console[u], console, f);
    })("error", e, t);
  }
  function d(e) {
    return e.displayName || "Context";
  }
  function m(e) {
    if (e == null) return null;
    if (typeof e.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case M:
        return "Fragment";
      case D:
        return "Portal";
      case b:
        return "Profiler";
      case L:
        return "StrictMode";
      case k:
        return "Suspense";
      case P:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case O:
        return d(e) + ".Consumer";
      case v:
        return d(e._context) + ".Provider";
      case S:
        return function(c, o, a) {
          var f = c.displayName;
          if (f) return f;
          var p = o.displayName || o.name || "";
          return p !== "" ? a + "(" + p + ")" : a;
        }(e, e.render, "ForwardRef");
      case R:
        var r = e.displayName || null;
        return r !== null ? r : m(e.type) || "Memo";
      case T:
        var t = e, l = t._payload, u = t._init;
        try {
          return m(u(l));
        } catch {
          return null;
        }
    }
    return null;
  }
  x = Symbol.for("react.module.reference");
  var _, j, N, C, U, z, pe, W = Object.assign, H = 0;
  function ye() {
  }
  ye.__reactDisabledLog = !0;
  var te, ne = F.ReactCurrentDispatcher;
  function K(e, r, t) {
    if (te === void 0) try {
      throw Error();
    } catch (u) {
      var l = u.stack.trim().match(/\n( *(at )?)/);
      te = l && l[1] || "";
    }
    return `
` + te + e;
  }
  var X, oe = !1, Ce = typeof WeakMap == "function" ? WeakMap : Map;
  function de(e, r) {
    if (!e || oe) return "";
    var t, l = X.get(e);
    if (l !== void 0) return l;
    oe = !0;
    var u, c = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0, u = ne.current, ne.current = null, function() {
      if (H === 0) {
        _ = console.log, j = console.info, N = console.warn, C = console.error, U = console.group, z = console.groupCollapsed, pe = console.groupEnd;
        var i = { configurable: !0, enumerable: !0, value: ye, writable: !0 };
        Object.defineProperties(console, { info: i, log: i, warn: i, error: i, group: i, groupCollapsed: i, groupEnd: i });
      }
      H++;
    }();
    try {
      if (r) {
        var o = function() {
          throw Error();
        };
        if (Object.defineProperty(o.prototype, "props", { set: function() {
          throw Error();
        } }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(o, []);
          } catch (i) {
            t = i;
          }
          Reflect.construct(e, [], o);
        } else {
          try {
            o.call();
          } catch (i) {
            t = i;
          }
          e.call(o.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (i) {
          t = i;
        }
        e();
      }
    } catch (i) {
      if (i && t && typeof i.stack == "string") {
        for (var a = i.stack.split(`
`), f = t.stack.split(`
`), p = a.length - 1, s = f.length - 1; p >= 1 && s >= 0 && a[p] !== f[s]; ) s--;
        for (; p >= 1 && s >= 0; p--, s--) if (a[p] !== f[s]) {
          if (p !== 1 || s !== 1) do
            if (p--, --s < 0 || a[p] !== f[s]) {
              var n = `
` + a[p].replace(" at new ", " at ");
              return e.displayName && n.includes("<anonymous>") && (n = n.replace("<anonymous>", e.displayName)), typeof e == "function" && X.set(e, n), n;
            }
          while (p >= 1 && s >= 0);
          break;
        }
      }
    } finally {
      oe = !1, ne.current = u, function() {
        if (--H === 0) {
          var i = { configurable: !0, enumerable: !0, writable: !0 };
          Object.defineProperties(console, { log: W({}, i, { value: _ }), info: W({}, i, { value: j }), warn: W({}, i, { value: N }), error: W({}, i, { value: C }), group: W({}, i, { value: U }), groupCollapsed: W({}, i, { value: z }), groupEnd: W({}, i, { value: pe }) });
        }
        H < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }(), Error.prepareStackTrace = c;
    }
    var g = e ? e.displayName || e.name : "", w = g ? K(g) : "";
    return typeof e == "function" && X.set(e, w), w;
  }
  function G(e, r, t) {
    if (e == null) return "";
    if (typeof e == "function") return de(e, !(!(l = e.prototype) || !l.isReactComponent));
    var l;
    if (typeof e == "string") return K(e);
    switch (e) {
      case k:
        return K("Suspense");
      case P:
        return K("SuspenseList");
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case S:
        return de(e.render, !1);
      case R:
        return G(e.type, r, t);
      case T:
        var u = e, c = u._payload, o = u._init;
        try {
          return G(o(c), r, t);
        } catch {
        }
    }
    return "";
  }
  X = new Ce();
  var J = Object.prototype.hasOwnProperty, me = {}, ve = F.ReactDebugCurrentFrame;
  function Q(e) {
    if (e) {
      var r = e._owner, t = G(e.type, e._source, r ? r.type : null);
      ve.setExtraStackFrame(t);
    } else ve.setExtraStackFrame(null);
  }
  var Ie = Array.isArray;
  function ae(e) {
    return Ie(e);
  }
  function ge(e) {
    return "" + e;
  }
  function be(e) {
    if (function(r) {
      try {
        return ge(r), !1;
      } catch {
        return !0;
      }
    }(e)) return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", function(r) {
      return typeof Symbol == "function" && Symbol.toStringTag && r[Symbol.toStringTag] || r.constructor.name || "Object";
    }(e)), ge(e);
  }
  var he, _e, we = F.ReactCurrentOwner, De = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Fe(e, r, t, l, u) {
    var c, o = {}, a = null, f = null;
    for (c in t !== void 0 && (be(t), a = "" + t), function(n) {
      if (J.call(n, "key")) {
        var g = Object.getOwnPropertyDescriptor(n, "key").get;
        if (g && g.isReactWarning) return !1;
      }
      return n.key !== void 0;
    }(r) && (be(r.key), a = "" + r.key), function(n) {
      if (J.call(n, "ref")) {
        var g = Object.getOwnPropertyDescriptor(n, "ref").get;
        if (g && g.isReactWarning) return !1;
      }
      return n.ref !== void 0;
    }(r) && (f = r.ref, function(n) {
      typeof n.ref == "string" && we.current;
    }(r)), r) J.call(r, c) && !De.hasOwnProperty(c) && (o[c] = r[c]);
    if (e && e.defaultProps) {
      var p = e.defaultProps;
      for (c in p) o[c] === void 0 && (o[c] = p[c]);
    }
    if (a || f) {
      var s = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
      a && function(n, g) {
        var w = function() {
          he || (he = !0, h("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", g));
        };
        w.isReactWarning = !0, Object.defineProperty(n, "key", { get: w, configurable: !0 });
      }(o, s), f && function(n, g) {
        var w = function() {
          _e || (_e = !0, h("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", g));
        };
        w.isReactWarning = !0, Object.defineProperty(n, "ref", { get: w, configurable: !0 });
      }(o, s);
    }
    return function(n, g, w, i, y, Z, V) {
      var I = { $$typeof: $, type: n, key: g, ref: w, props: V, _owner: Z, _store: {} };
      return Object.defineProperty(I._store, "validated", { configurable: !1, enumerable: !1, writable: !0, value: !1 }), Object.defineProperty(I, "_self", { configurable: !1, enumerable: !1, writable: !1, value: i }), Object.defineProperty(I, "_source", { configurable: !1, enumerable: !1, writable: !1, value: y }), Object.freeze && (Object.freeze(I.props), Object.freeze(I)), I;
    }(e, a, f, u, l, we.current, o);
  }
  var ce, ie = F.ReactCurrentOwner, ke = F.ReactDebugCurrentFrame;
  function B(e) {
    if (e) {
      var r = e._owner, t = G(e.type, e._source, r ? r.type : null);
      ke.setExtraStackFrame(t);
    } else ke.setExtraStackFrame(null);
  }
  function ue(e) {
    return typeof e == "object" && e !== null && e.$$typeof === $;
  }
  function Oe() {
    if (ie.current) {
      var e = m(ie.current.type);
      if (e) return `

Check the render method of \`` + e + "`.";
    }
    return "";
  }
  ce = !1;
  var Se = {};
  function Re(e, r) {
    if (e._store && !e._store.validated && e.key == null) {
      e._store.validated = !0;
      var t = function(u) {
        var c = Oe();
        if (!c) {
          var o = typeof u == "string" ? u : u.displayName || u.name;
          o && (c = `

Check the top-level render call using <` + o + ">.");
        }
        return c;
      }(r);
      if (!Se[t]) {
        Se[t] = !0;
        var l = "";
        e && e._owner && e._owner !== ie.current && (l = " It was passed a child from " + m(e._owner.type) + "."), B(e), h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, l), B(null);
      }
    }
  }
  function je(e, r) {
    if (typeof e == "object") {
      if (ae(e)) for (var t = 0; t < e.length; t++) {
        var l = e[t];
        ue(l) && Re(l, r);
      }
      else if (ue(e)) e._store && (e._store.validated = !0);
      else if (e) {
        var u = function(a) {
          if (a === null || typeof a != "object") return null;
          var f = Y && a[Y] || a["@@iterator"];
          return typeof f == "function" ? f : null;
        }(e);
        if (typeof u == "function" && u !== e.entries) for (var c, o = u.call(e); !(c = o.next()).done; ) ue(c.value) && Re(c.value, r);
      }
    }
  }
  function Me(e) {
    var r, t = e.type;
    if (t != null && typeof t != "string") {
      if (typeof t == "function") r = t.propTypes;
      else {
        if (typeof t != "object" || t.$$typeof !== S && t.$$typeof !== R) return;
        r = t.propTypes;
      }
      if (r) {
        var l = m(t);
        (function(u, c, o, a, f) {
          var p = Function.call.bind(J);
          for (var s in u) if (p(u, s)) {
            var n = void 0;
            try {
              if (typeof u[s] != "function") {
                var g = Error((a || "React class") + ": " + o + " type `" + s + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof u[s] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw g.name = "Invariant Violation", g;
              }
              n = u[s](c, s, a, o, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (w) {
              n = w;
            }
            !n || n instanceof Error || (Q(f), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", o, s, typeof n), Q(null)), n instanceof Error && !(n.message in me) && (me[n.message] = !0, Q(f), h("Failed %s type: %s", o, n.message), Q(null));
          }
        })(r, e.props, "prop", l, e);
      } else t.PropTypes === void 0 || ce || (ce = !0, h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", m(t) || "Unknown"));
      typeof t.getDefaultProps != "function" || t.getDefaultProps.isReactClassApproved || h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  var Ee = {};
  function $e(e, r, t, l, u, c) {
    var o = function(y) {
      return typeof y == "string" || typeof y == "function" || y === M || y === b || y === L || y === k || y === P || y === re || typeof y == "object" && y !== null && (y.$$typeof === T || y.$$typeof === R || y.$$typeof === v || y.$$typeof === O || y.$$typeof === S || y.$$typeof === x || y.getModuleId !== void 0);
    }(e);
    if (!o) {
      var a, f = "";
      (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (f += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), f += Oe(), e === null ? a = "null" : ae(e) ? a = "array" : e !== void 0 && e.$$typeof === $ ? (a = "<" + (m(e.type) || "Unknown") + " />", f = " Did you accidentally export a JSX literal instead of a component?") : a = typeof e, h("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", a, f);
    }
    var p = Fe(e, r, t, u, c);
    if (p == null) return p;
    if (o) {
      var s = r.children;
      if (s !== void 0) if (l) if (ae(s)) {
        for (var n = 0; n < s.length; n++) je(s[n], e);
        Object.freeze && Object.freeze(s);
      } else h("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
      else je(s, e);
    }
    if (J.call(r, "key")) {
      var g = m(e), w = Object.keys(r).filter(function(y) {
        return y !== "key";
      }), i = w.length > 0 ? "{key: someKey, " + w.join(": ..., ") + ": ...}" : "{key: someKey}";
      Ee[g + i] || (h(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, i, g, w.length > 0 ? "{" + w.join(": ..., ") + ": ...}" : "{}", g), Ee[g + i] = !0);
    }
    return e === M ? function(y) {
      for (var Z = Object.keys(y.props), V = 0; V < Z.length; V++) {
        var I = Z[V];
        if (I !== "children" && I !== "key") {
          B(y), h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", I), B(null);
          break;
        }
      }
      y.ref !== null && (B(y), h("Invalid attribute `ref` supplied to `React.Fragment`."), B(null));
    }(p) : Me(p), p;
  }
  var Le = function(e, r, t) {
    return $e(e, r, t, !1);
  }, Ue = function(e, r, t) {
    return $e(e, r, t, !0);
  };
  ee.Fragment = M, ee.jsx = Le, ee.jsxs = Ue;
}()), ee);
var We = fe.exports;
const Ne = typeof window < "u", Ae = Ne && !!(localStorage != null && localStorage.getItem("MICRO_COMPONENT:DEBUG"));
function xe(x = "id") {
  const E = Date.now(), $ = Math.random().toString(36).substr(2, 9);
  return `${x}_${E}_${Math.floor(1e4 * Math.random())}_${$}`;
}
function Be({ elementId: x, type: E }) {
  let $;
  return le.forwardRef(function(D = {}, M) {
    var h;
    const L = A(null), b = A(D), v = A(null), O = A(!1), S = A(""), k = A(D.microId || xe(`${E}_${x}`)), P = A(D.instanceId || function(d, m) {
      return xe(`${d}_${m}`);
    }(E, x)), R = (d, ...m) => {
      var _;
      ((_ = b.current) != null && _.logger || Ae) && console.log(`[MicroComponent] ${E}: ${d}`, m.map((j) => typeof j == "object" ? JSON.stringify(j, null, 2) : j));
    }, T = (d, ...m) => {
      R("event emit", d, ...m);
      const _ = b.current;
      _ && typeof _[d] == "function" ? _[d](...m) : R("event handler not found", d, _);
    };
    async function re() {
      var m, _, j, N, C, U;
      R("create component", b.current);
      const d = await async function() {
        return window.MicroRuntime ? window.MicroRuntime : new Promise((z) => {
          window.addEventListener("MicroRuntime:ready", () => {
            z(window.MicroRuntime);
          });
        });
      }();
      v.current = await d.createComponent({ elementId: x, type: E, props: b.current, microId: k.current, instanceId: P.current, el: L.current }), v.current && ((_ = (m = v.current) == null ? void 0 : m.event) == null || _.clearEvents(), (N = (j = v.current) == null ? void 0 : j.on) == null || N.call(j, "event", T), (U = (C = v.current) == null ? void 0 : C.on) == null || U.call(C, "click", (...z) => {
        T("click", ...z);
      })), R("create component complete");
    }
    function Y() {
      var d;
      v.current && (R("update props", b.current), (d = v.current) == null || d.updateProps(b.current));
    }
    se(() => {
      typeof window > "u" || v.current || O.current || (O.current = !0, re().then(() => {
        Y();
      }));
    }, []), se(() => () => {
      var d;
      v.current && ((d = v.current.event) == null || d.clearEvents());
    }, []), se(() => {
      var d, m, _, j, N, C;
      b.current = D, Y(), v.current && ((m = (d = v.current) == null ? void 0 : d.event) == null || m.clearEvents(), (j = (_ = v.current) == null ? void 0 : _.on) == null || j.call(_, "event", T), (C = (N = v.current) == null ? void 0 : N.on) == null || C.call(N, "click", (...U) => {
        T("click", ...U);
      }));
    }, [D]), S.current || (b.current.serverLocale ? S.current = $ = b.current.serverLocale : $ ? S.current = $ : Ne && (S.current = $ = ((h = document.querySelector(`[data-micro-type="${E}"]`)) == null ? void 0 : h.innerHTML) || ""), S.current || (S.current = "<div></div>"));
    const F = b.current.theme ? `micro-${b.current.theme}` : "";
    return We.jsx("div", { ref: L, className: `micro ${F} ${b.current.className || ""}`.trim(), dangerouslySetInnerHTML: { __html: S.current }, "data-micro-type": E, "data-micro-instance-id": P.current }, function(d, m) {
      return `${d}_${m}`;
    }(k.current, P.current));
  });
}
export {
  Be as g
};
