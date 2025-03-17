System.register(["jimu-core","jimu-ui"],(function(e,t){var a={},s={};return{setters:[function(e){a.DataSourceComponent=e.DataSourceComponent,a.DataSourceStatus=e.DataSourceStatus,a.FormattedMessage=e.FormattedMessage,a.React=e.React},function(e){s.Alert=e.Alert,s.Button=e.Button,s.Label=e.Label,s.Loading=e.Loading,s.Option=e.Option,s.Select=e.Select}],execute:function(){e((()=>{var e={244:e=>{"use strict";e.exports=a},321:e=>{"use strict";e.exports=s}},t={};function n(a){var s=t[a];if(void 0!==s)return s.exports;var o=t[a]={exports:{}};return e[a](o,o.exports,n),o.exports}n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="";var o={};return n.p=window.jimuConfig.baseUrl,(()=>{"use strict";n.r(o),n.d(o,{__set_webpack_public_path__:()=>S,default:()=>y});var e=n(244),t=n(321);const a="Bulk Update Records",s="Number of selected records:",r="Select new value for",l="Update records",c="All edits applied successfully.",u="Some edits encountered errors.",i="All edits encountered errors.",d="|__LEAVE EXISTING VALUES__|",m="|__SET TO NULL__|";var g=function(e,t,a,s){return new(a||(a=Promise))((function(n,o){function r(e){try{c(s.next(e))}catch(e){o(e)}}function l(e){try{c(s.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(r,l)}c((s=s.apply(e,t||[])).next())}))};const{useState:p,useEffect:f}=e.React,y=n=>{const[o,y]=p(void 0),[S,b]=p({}),[R,E]=p([]),[h,v]=p(0),[w,x]=p(),[M,C]=p(),[_,j]=p(!0),[O,A]=p({type:null,message:""}),[T,D]=p(!1);f((()=>{if(O.type&&"success"===O.type){const e=setTimeout((()=>{D(!0)}),1e4),t=setTimeout((()=>{A({type:null,message:""})}),10500);return()=>{clearTimeout(e),clearTimeout(t)}}}),[O]),f((()=>{w&&v(w.length)}),[w]);const L=e=>g(void 0,void 0,void 0,(function*(){const t=[];w.forEach((a=>{"string"==typeof a&&(a=parseInt(a));const s={attributes:Object.assign(Object.assign({},e),{[M.objectIdField]:a})};t.push(s)})),j(!0),A({type:null,message:""});const a=yield M.applyEdits({updateFeatures:t}),s=(e=>[e.addFeatureResults,e.updateFeatureResults,e.deleteFeatureResults,e.addAttachmentResults,e.deleteAttachmentResults,e.updateAttachmentResults].filter(Boolean).reduce(((e,t)=>(e.total+=t.length,t.forEach((t=>t.error?e.errorCount++:e.successful++)),e)),{total:0,errorCount:0,successful:0}))(a);s.successful>0&&(n.config.clearSelectionAfterApplyEdits&&o.selectRecordsByIds([]),b({})),j(!1),0===s.errorCount?A({type:"success",message:n.intl.formatMessage({id:"alertSuccess",defaultMessage:c})}):s.errorCount===s.total?(A({type:"error",message:n.intl.formatMessage({id:"alertError",defaultMessage:i})}),console.error(a)):(A({type:"warning",message:n.intl.formatMessage({id:"alertWarning",defaultMessage:u})}),console.warn(a))}));return n.useDataSources&&1===n.useDataSources.length&&n.useDataSources[0].fields&&n.useDataSources[0].fields.length>0?e.React.createElement("div",{className:"p-3"},e.React.createElement("h2",null,n.config.widgetTitle>""?n.config.widgetTitle:e.React.createElement(e.FormattedMessage,{id:"widgetTitle",defaultMessage:a})),e.React.createElement("h5",null,e.React.createElement(e.FormattedMessage,{id:"numSelectedRecords",defaultMessage:s})," ",h),e.React.createElement(e.DataSourceComponent,{useDataSource:n.useDataSources[0],query:{where:"1=1"},widgetId:n.id,onDataSourceCreated:e=>{(e=>{y(e);const t=e.layer;C(t);const a=Array.from(n.config.fields).map((e=>{const a=t.fieldsIndex.get(e.name);return{name:a.name,alias:a.alias,domain:a.domain,allowNulls:e.allowNulls}}));E(a),j(!1)})(e)},onSelectionChange:e=>{(e=>{e&&x(e)})(e)}},((t,a)=>{if(t&&t.getStatus()===e.DataSourceStatus.Loaded)return null})),R&&R.length>0&&R.map((a=>e.React.createElement(e.React.Fragment,null,e.React.createElement(t.Label,{className:"pt-3 pb-0",size:"lg"},a.alias?a.alias:a.name),e.React.createElement(t.Select,{className:"pt-0",key:a.name,value:S[a.name],onChange:e=>{((e,t,a)=>{const s=e.target.value,n=Object.assign(Object.assign({},a),{[t]:e.target.value});s===d?delete n[t]:s===m&&(n[t]=null),b(n)})(e,a.name,S)},placeholder:`${n.intl.formatMessage({id:"selectionPlaceHolder",defaultMessage:r})}`},a.domain&&"coded-value"===a.domain.type&&[{code:d,name:"Leave existing values"},...a.allowNulls?[{code:m,name:"Set to null"}]:[],...Array.from(a.domain.codedValues).slice().sort(((e,t)=>e.name.localeCompare(t.name)))].map((a=>e.React.createElement(t.Option,{key:String(a.code),value:a.code},a.name))))))),e.React.createElement("div",{className:"d-flex w-100 mb-2 pt-3 justify-content-between align-items-center"},e.React.createElement(t.Button,{type:"primary",size:"default",onClick:e=>{L(S)},disabled:!(Object.keys(S).length>0&&h>0&&!_)},n.config.buttonText>""?n.config.buttonText:e.React.createElement(e.FormattedMessage,{id:"buttonText",defaultMessage:l})," (",h,")"),e.React.createElement("div",{className:"d-flex align-items-center"},!_&&O.type&&e.React.createElement(t.Alert,{style:Object.assign({width:"fit-content",maxWidth:"100%"},T?{opacity:0,transition:"opacity 0.5s ease-out"}:{}),type:O.type,withIcon:!0,closable:!0,onClose:()=>{A({type:null,message:""})}},O.message))),_&&e.React.createElement("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(211, 211, 211, 0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:10}},e.React.createElement(t.Loading,{type:"SECONDARY"}))):e.React.createElement("h3",null,"Bulk Update Widget",e.React.createElement("br",null),"Please configure the data source.")};function S(e){n.p=e}})(),o})())}}}));