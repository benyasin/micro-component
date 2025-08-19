import{r as N,w as j,a as P,d as A,b as F,e as H,f as J,t as K,u as l,n as Q,g as U,o as W}from"./iframe-D4unRjJm.js";import{u as X,a as Y,_ as Z}from"./_plugin-vue_export-helper-BwEP8WCV.js";import"./preload-helper-C1FmrZbK.js";const ee=()=>({text:"",size:"medium",color:"#1890ff",type:"primary",disabled:!1}),te=m=>{const{props:i,updateProps:C}=X(m),s=Y(),t=N(),f=(o,e)=>{const r=ee(),a={text:o.text,size:o.size,color:o.color,type:o.type,disabled:o.disabled},n={text:e.text,size:e.size,color:e.color,type:e.type,disabled:e.disabled};t.value={...r,...a,...n}},g=()=>{f(m||{},i.value)};j([()=>i.value],()=>{typeof window<"u"&&g()},{immediate:!0,deep:!0});const z=P(()=>{var o,e,r;return["micro-button",`micro-button--${((o=t.value)==null?void 0:o.size)||"medium"}`,`micro-button--${((e=t.value)==null?void 0:e.type)||"primary"}`,{"micro-button--disabled":(r=t.value)==null?void 0:r.disabled}]}),y=P(()=>{var r,a,n,c,d,u,p;const o=((r=t.value)==null?void 0:r.color)||"#1890ff",e=((a=t.value)==null?void 0:a.type)||"primary";return e==="secondary"?(n=t.value)!=null&&n.disabled?{backgroundColor:"#f5f5f5",borderColor:"#d9d9d9",color:"#00000040"}:{}:e==="danger"?(c=t.value)!=null&&c.disabled?{backgroundColor:"#f5f5f5",borderColor:"#d9d9d9",color:"#00000040"}:{}:{backgroundColor:(d=t.value)!=null&&d.disabled?"#f5f5f5":o,borderColor:(u=t.value)!=null&&u.disabled?"#d9d9d9":o,color:(p=t.value)!=null&&p.disabled?"#00000040":"white"}}),k=o=>{var e;(e=t.value)!=null&&e.disabled||s.emit("click",o)};return g(),{buttonProps:i,updateProps:C,config:t,buttonClass:z,buttonStyle:y,handleClick:k,on:s.on,emit:s.emit,event:s}},oe=["disabled"],re=A({__name:"Button",props:{locale:{},theme:{},i18nEnabled:{type:Boolean},themeSwitchEnabled:{type:Boolean},directionSwitchEnabled:{type:Boolean},direction:{},logger:{type:Boolean},logEvent:{},gtag:{},twq:{},text:{default:""},size:{default:"medium"},color:{default:"#1890ff"},type:{default:"primary"},disabled:{type:Boolean,default:!1}},emits:["click"],setup(m,{expose:i,emit:C}){const s=m,t=C,f=N(null),{buttonProps:g,updateProps:z,config:y,buttonClass:k,buttonStyle:o,handleClick:e,on:r,event:a}=te(s);return r("click",n=>{t("click",n)}),i({buttonRef:f,updateProps:z,props:g,event:a,on:a.on}),(n,c)=>{var d,u,p,w,_;return W(),F("button",{ref_key:"buttonRef",ref:f,class:U(l(k)),style:Q(l(o)),disabled:(d=l(y))==null?void 0:d.disabled,onClick:c[0]||(c[0]=(...V)=>l(e)&&l(e)(...V))},[H(K(((u=l(y))==null?void 0:u.text)||((_=(w=(p=n.$slots).default)==null?void 0:w.call(p)[0])==null?void 0:_.children))+" ",1),J(n.$slots,"default",{},void 0,!0)],14,oe)}}}),S=Z(re,[["__scopeId","data-v-90095f48"]]),le={title:"Components/Button",component:S,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{text:{control:"text",description:"按钮文本"},size:{control:{type:"select"},options:["small","medium","large"],description:"按钮尺寸"},color:{control:"color",description:"按钮颜色"},onClick:{action:"clicked",description:"点击事件"}}},b={args:{text:"Default Button"}},x={args:{text:"Primary Button",color:"#1890ff"}},B={render:()=>({components:{Button:S},template:`
      <div style="display: flex; gap: 8px; align-items: center;">
        <Button text="Small" size="small" color="#1890ff" />
        <Button text="Medium" size="medium" color="#1890ff" />
        <Button text="Large" size="large" color="#1890ff" />
      </div>
    `})},v={render:()=>({components:{Button:S},template:`
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <Button text="Green" color="#52c41a" />
        <Button text="Orange" color="#fa8c16" />
        <Button text="Purple" color="#722ed1" />
      </div>
    `})};var h,E,D;b.parameters={...b.parameters,docs:{...(h=b.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    text: 'Default Button'
  }
}`,...(D=(E=b.parameters)==null?void 0:E.docs)==null?void 0:D.source}}};var $,O,G;x.parameters={...x.parameters,docs:{...($=x.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    text: 'Primary Button',
    color: '#1890ff'
  }
}`,...(G=(O=x.parameters)==null?void 0:O.docs)==null?void 0:G.source}}};var L,M,R;B.parameters={...B.parameters,docs:{...(L=B.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Button
    },
    template: \`
      <div style="display: flex; gap: 8px; align-items: center;">
        <Button text="Small" size="small" color="#1890ff" />
        <Button text="Medium" size="medium" color="#1890ff" />
        <Button text="Large" size="large" color="#1890ff" />
      </div>
    \`
  })
}`,...(R=(M=B.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};var T,q,I;v.parameters={...v.parameters,docs:{...(T=v.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Button
    },
    template: \`
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <Button text="Green" color="#52c41a" />
        <Button text="Orange" color="#fa8c16" />
        <Button text="Purple" color="#722ed1" />
      </div>
    \`
  })
}`,...(I=(q=v.parameters)==null?void 0:q.docs)==null?void 0:I.source}}};const ie=["Default","Primary","Sizes","CustomColors"];export{v as CustomColors,b as Default,x as Primary,B as Sizes,ie as __namedExportsOrder,le as default};
