System.register(["jimu-core","jimu-ui","jimu-ui/advanced/setting-components","jimu-ui/advanced/data-source-selector","jimu-theme","jimu-ui/advanced/sql-expression-builder","jimu-arcgis","jimu-for-builder"],(function(e,t){var a={},o={},s={},i={},n={},r={},c={},l={};return{setters:[function(e){a.AllDataSourceTypes=e.AllDataSourceTypes,a.DataSourceComponent=e.DataSourceComponent,a.DataSourceManager=e.DataSourceManager,a.Immutable=e.Immutable,a.MessageActionConnectionType=e.MessageActionConnectionType,a.MessageCarryData=e.MessageCarryData,a.React=e.React,a.SqlExpressionMode=e.SqlExpressionMode,a.classNames=e.classNames,a.css=e.css,a.dataSourceUtils=e.dataSourceUtils,a.getAppStore=e.getAppStore,a.jsx=e.jsx,a.polished=e.polished},function(e){o.Button=e.Button,o.Collapse=e.Collapse,o.Icon=e.Icon,o.Label=e.Label,o.Radio=e.Radio,o.Switch=e.Switch,o.Tooltip=e.Tooltip},function(e){s.SettingRow=e.SettingRow,s.SettingSection=e.SettingSection},function(e){i.DataSourceSelector=e.DataSourceSelector,i.FieldSelector=e.FieldSelector},function(e){n.withTheme=e.withTheme},function(e){r.SqlExpressionBuilderPopup=e.SqlExpressionBuilderPopup},function(e){c.ArcGISDataSourceTypes=e.ArcGISDataSourceTypes},function(e){l.ChooseConnectionType=e.ChooseConnectionType}],execute:function(){e((()=>{var e={45508:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="M8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6.5 7.5A.5.5 0 0 1 7 7h1.5v4.5h1a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1h1V8H7a.5.5 0 0 1-.5-.5"></path><path fill="#000" fill-rule="evenodd" d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16m0-1A7 7 0 1 0 8 1a7 7 0 0 0 0 14" clip-rule="evenodd"></path></svg>'},74587:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 40"><path fill="#A8A8A8" fill-rule="evenodd" d="M6 30v10H0v-1h5v-9zM3.162 18.582a.5.5 0 0 1 0 .71l-1.416 1.421a2.497 2.497 0 0 0-.003 3.545c.983.983 2.56.98 3.544-.003l1.42-1.42a.504.504 0 0 1 .712.713L6 24.968a3.5 3.5 0 0 1-4.967 0 3.5 3.5 0 0 1 0-4.967l1.416-1.422a.504.504 0 0 1 .713.003m4.967-.71a.5.5 0 0 1 0 .71L4.58 22.129a.504.504 0 0 1-.713-.712l3.548-3.548a.504.504 0 0 1 .713.003m2.838-2.838a3.5 3.5 0 0 1 0 4.967l-1.42 1.419a.504.504 0 0 1-.713-.712l1.423-1.417a2.5 2.5 0 0 0 0-3.547 2.5 2.5 0 0 0-3.547 0l-1.42 1.419a.504.504 0 0 1-.713-.712l1.42-1.42a3.506 3.506 0 0 1 4.97.003M6 0v10H5V1H0V0z"></path></svg>'},62686:e=>{"use strict";e.exports=c},79244:e=>{"use strict";e.exports=a},4108:e=>{"use strict";e.exports=l},1888:e=>{"use strict";e.exports=n},14321:e=>{"use strict";e.exports=o},13089:e=>{"use strict";e.exports=i},79298:e=>{"use strict";e.exports=s},71442:e=>{"use strict";e.exports=r}},t={};function u(a){var o=t[a];if(void 0!==o)return o.exports;var s=t[a]={exports:{}};return e[a](s,s.exports,u),s.exports}u.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return u.d(t,{a:t}),t},u.d=(e,t)=>{for(var a in t)u.o(t,a)&&!u.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},u.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),u.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var d={};return(()=>{"use strict";u.r(d),u.d(d,{default:()=>V});var e=u(79244),t=u(14321),a=u(79298),o=u(13089),s=u(1888),i=u(71442);const n="Trigger data",r="Connection mode",c="Customize",l="In this mode, the selected data will be filtered if the data from the source widgets is in the Map widget. The trigger and action data are from the same layer and will be automatically bound.",p="Action data",g="Conditions",S="Trigger / action connection",h="Select a trigger field",m="Select an action field",D="More conditions",f="Please set your expression first.",I="Auto bound.",y="Automatic";var v=u(62686);function x(t,a){var o,s;const i=C(),n=null===(o=null==i?void 0:i.widgets)||void 0===o?void 0:o[t],r=null===(s=null==n?void 0:n.manifest)||void 0===s?void 0:s.publishMessages;let c=e.MessageCarryData.UseDataSource;return null==r||r.forEach((e=>{const t=e;(null==t?void 0:t.messageCarryData)&&(null==t?void 0:t.messageType)===a&&(c=null==t?void 0:t.messageCarryData)})),c}function b(t,a,o,s){var i,n;let r=null;const c=w(t,o);if(!(c&&c.length>0))return null;let l=!1;if(a){const t=null===(n=null===(i=e.DataSourceManager.getInstance().getDataSource(a.dataSourceId))||void 0===i?void 0:i.getDataSourceJson())||void 0===n?void 0:n.isOutputFromWidget;l=c.some((e=>!!e&&(L(e.dataSourceId)?e.dataSourceId===a.rootDataSourceId:t||s?a.mainDataSourceId===e.mainDataSourceId:a.dataSourceId===e.dataSourceId)))}if(l)r=a;else if(r=null,c&&1===c.length){const t=c[0];t&&t.dataSourceId&&!L(t.dataSourceId)&&(r=(0,e.Immutable)({dataSourceId:t.dataSourceId,mainDataSourceId:t.mainDataSourceId,dataViewId:t.dataViewId,rootDataSourceId:t.rootDataSourceId}))}return r}function A(t,a,o){var s;const i=C(),n=null===(s=null==i?void 0:i.widgets)||void 0===s?void 0:s[t],r=T(t,a);return{isReadOnly:U(n,a,r),useDataSources:o&&o.dataSourceId?(0,e.Immutable)([o]):(0,e.Immutable)([]),fromRootDsIds:r,fromDsIds:r&&r.length>0?void 0:j(t,a)}}function w(t,a){var o;const s=x(t,a),i=C(),n=null===(o=null==i?void 0:i.widgets)||void 0===o?void 0:o[t],r=(null==n?void 0:n.useDataSources)||(0,e.Immutable)([]),c=function(t){var a;const o=null!==(a=null==t?void 0:t.map((e=>({dataSourceId:e,mainDataSourceId:e,rootDataSourceId:null}))))&&void 0!==a?a:[];return(0,e.Immutable)(o)}(null==n?void 0:n.outputDataSources)||(0,e.Immutable)([]),l=function(t){const a=[],o=M(t),s=null==o?void 0:o.useMapWidgetIds,i={};(null==s?void 0:s.length)>0&&s.forEach((e=>{if(e){const t=M(e),o=null==t?void 0:t.useDataSources;o&&o.forEach((e=>{var t;const o=null===(t=null==e?void 0:e.asMutable)||void 0===t?void 0:t.call(e,{deep:!0});o&&o.dataSourceId&&!i[o.dataSourceId]&&(i[o.dataSourceId]=!0,a.push(o))}))}}));return(0,e.Immutable)(a)}(t),u=c,d=(null==n?void 0:n.useDataSources)?r:l,p=(0,e.Immutable)(d.asMutable({deep:!0}).concat(u.asMutable({deep:!0})));switch(s){case e.MessageCarryData.OutputDataSource:return u;case e.MessageCarryData.UseDataSource:return d;case e.MessageCarryData.BothDataSource:return p}}function M(e){var t;if(!e)return null;const a=C();return null===(t=null==a?void 0:a.widgets)||void 0===t?void 0:t[e]}function U(t,a,o){const s=x(null==t?void 0:t.id,a),i=(null==t?void 0:t.outputDataSources)||[],n=(null==t?void 0:t.useDataSources)||[];if(o)return!1;switch(s){case e.MessageCarryData.OutputDataSource:return 1===(null==i?void 0:i.length);case e.MessageCarryData.UseDataSource:return 1===(null==n?void 0:n.length);case e.MessageCarryData.BothDataSource:return 1===i.length+n.length}}function C(){var t,a,o;return window.jimuConfig.isBuilder?null===(a=null===(t=(0,e.getAppStore)().getState())||void 0===t?void 0:t.appStateInBuilder)||void 0===a?void 0:a.appConfig:null===(o=(0,e.getAppStore)().getState())||void 0===o?void 0:o.appConfig}function T(t,a){let o=[];const s=w(t,a);return s&&s.forEach((e=>{const t=null==e?void 0:e.dataSourceId;t&&L(t)&&o.push(t)})),o=Array.from(new Set(o)),o.length>0?(0,e.Immutable)(o):void 0}function j(t,a){const o=w(t,a),s=[];return o&&o.forEach((e=>{const t=null==e?void 0:e.mainDataSourceId;t&&!L(t)&&s.push(t)})),(0,e.Immutable)(s)}function L(e){const t=C();if(e&&t.dataSources){const a=t.dataSources[e];if(a&&(a.type===v.ArcGISDataSourceTypes.WebMap||a.type===v.ArcGISDataSourceTypes.WebScene))return!0}return!1}var R=u(4108),O=u(45508),E=u.n(O),q=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(o=Object.getOwnPropertySymbols(e);s<o.length;s++)t.indexOf(o[s])<0&&Object.prototype.propertyIsEnumerable.call(e,o[s])&&(a[o[s]]=e[o[s]])}return a};const N=t=>{const a=window.SVG,{className:o}=t,s=q(t,["className"]),i=(0,e.classNames)("jimu-icon jimu-icon-component",o);return a?e.React.createElement(a,Object.assign({className:i,src:E()},s)):e.React.createElement("svg",Object.assign({className:i},s))},F=(0,e.Immutable)([e.AllDataSourceTypes.FeatureLayer,e.AllDataSourceTypes.SceneLayer,e.AllDataSourceTypes.BuildingComponentSubLayer,e.AllDataSourceTypes.ImageryLayer,e.AllDataSourceTypes.OrientedImageryLayer,e.AllDataSourceTypes.SubtypeGroupLayer,e.AllDataSourceTypes.SubtypeSublayer]);class B extends e.React.PureComponent{constructor(t){super(t),this.modalStyle={position:"absolute",top:"0",bottom:"0",width:"259px",height:"auto",borderRight:"",borderBottom:"",paddingBottom:"1px"},this.initOutputDataSources=t=>{var a;const o=null!==(a=null==t?void 0:t.map((e=>({dataSourceId:e,mainDataSourceId:e,rootDataSourceId:null}))))&&void 0!==a?a:[];return(0,e.Immutable)(o)},this.onAllDataRadioChecked=()=>{const e=this.props.config.set("useAnyTriggerData",!0);this.updateMessageActionConfigAndUseDataSources(e)},this.onCustomizeDataRadioChecked=()=>{const e=this.props.config.set("useAnyTriggerData",!1);this.updateMessageActionConfigAndUseDataSources(e)},this.handleTriggerLayerChange=e=>{e&&e.length>0?this.handleTriggerLayerSelected(e[0]):this.handleRemoveLayerForTriggerLayer()},this.handleActionLayerChange=e=>{e&&e.length>0?this.handleActionLayerSelected(e[0]):this.handleRemoveLayerForActionLayer()},this.handleTriggerLayerSelected=e=>{const t=this.props.config.set("messageUseDataSource",e);this.updateMessageActionConfigAndUseDataSources(t)},this.handleActionLayerSelected=e=>{const t=this.props.config.set("actionUseDataSource",e).set("sqlExprObj",null);this.updateMessageActionConfigAndUseDataSources(t)},this.handleRemoveLayerForTriggerLayer=()=>{const e=this.props.config.set("messageUseDataSource",null).set("connectionType",null);this.updateMessageActionConfigAndUseDataSources(e)},this.handleRemoveLayerForActionLayer=()=>{const e=this.props.config.set("actionUseDataSource",null).set("sqlExprObj",null).set("connectionType",null);this.updateMessageActionConfigAndUseDataSources(e)},this.showSqlExprPopup=()=>{this.setState({isSqlExprShow:!0})},this.toggleSqlExprPopup=()=>{this.setState({isSqlExprShow:!this.state.isSqlExprShow})},this.onSqlExprBuilderChange=e=>{const t=this.props.config.set("sqlExprObj",e);this.updateMessageActionConfigAndUseDataSources(t)},this.onMessageFieldSelected=(e,t)=>{const a=this.props.config.set("messageUseDataSource",{dataSourceId:this.props.config.messageUseDataSource.dataSourceId,mainDataSourceId:this.props.config.messageUseDataSource.mainDataSourceId,dataViewId:this.props.config.messageUseDataSource.dataViewId,rootDataSourceId:this.props.config.messageUseDataSource.rootDataSourceId,fields:e.map((e=>e.jimuName))});this.updateMessageActionConfigAndUseDataSources(a)},this.onActionFieldSelected=(e,t)=>{const a=this.props.config.set("actionUseDataSource",{dataSourceId:this.props.config.actionUseDataSource.dataSourceId,mainDataSourceId:this.props.config.actionUseDataSource.mainDataSourceId,dataViewId:this.props.config.actionUseDataSource.dataViewId,rootDataSourceId:this.props.config.actionUseDataSource.rootDataSourceId,fields:e.map((e=>e.jimuName))});this.updateMessageActionConfigAndUseDataSources(a)},this.switchEnabledDataRelationShip=e=>{const t=this.props.config.set("enabledDataRelationShip",e);this.updateMessageActionConfigAndUseDataSources(t)},this.checkTriggerLayerIsSameToActionLayer=()=>!(!this.props.config.messageUseDataSource||!this.props.config.actionUseDataSource)&&(this.props.config.messageUseDataSource.mainDataSourceId===this.props.config.actionUseDataSource.mainDataSourceId&&this.props.config.messageUseDataSource.rootDataSourceId===this.props.config.actionUseDataSource.rootDataSourceId),this.onUseLayersRelationship=()=>{const t=this.props.config.setIn(["messageUseDataSource","fields"],[]).setIn(["actionUseDataSource","fields"],[]).set("connectionType",e.MessageActionConnectionType.UseLayersRelationship);this.updateMessageActionConfigAndUseDataSources(t)},this.onSetCustomFields=()=>{const t=this.props.config.setIn(["messageUseDataSource","fields"],[]).setIn(["actionUseDataSource","fields"],[]).set("connectionType",e.MessageActionConnectionType.SetCustomFields);this.updateMessageActionConfigAndUseDataSources(t)},this.modalStyle.borderRight="1px solid black",this.modalStyle.borderBottom="1px solid black",this.state={isShowLayerList:!1,currentLayerType:null,isSqlExprShow:!1}}componentDidMount(){const t=function(t){const a=t.messageWidgetId,o=C();let s=null,i=null;if(t.config.messageUseDataSource){const e=!0;s=b(t.messageWidgetId,t.config.messageUseDataSource,t.messageType,e)}else{const o=w(a,t.messageType);if(o&&1===o.length){const t=o[0];t&&(s=L(t.dataSourceId)?null:(0,e.Immutable)({dataSourceId:t.dataSourceId,mainDataSourceId:t.mainDataSourceId,dataViewId:t.dataViewId,rootDataSourceId:t.rootDataSourceId}))}}const n=t.widgetId,r=o.widgets[n];if(t.config.actionUseDataSource){const e=!1;i=b(t.widgetId,t.config.actionUseDataSource,t.messageType,e)}else if(r&&r.useDataSources&&1===r.useDataSources.length){const t=r.useDataSources[0];t&&(i=L(t.dataSourceId)?null:(0,e.Immutable)({dataSourceId:t.dataSourceId,mainDataSourceId:t.mainDataSourceId,dataViewId:t.dataViewId,rootDataSourceId:t.rootDataSourceId}))}const c=t.config.actionUseDataSource&&t.config.actionUseDataSource.dataSourceId;return(i&&i.dataSourceId)!==c?{messageUseDataSource:s,actionUseDataSource:i,sqlExprObj:null}:{messageUseDataSource:s,actionUseDataSource:i,sqlExprObj:t.config.sqlExprObj}}(this.props),a=this.props.config.set("messageUseDataSource",t.messageUseDataSource).set("actionUseDataSource",t.actionUseDataSource).set("sqlExprObj",t.sqlExprObj);this.updateMessageActionConfigAndUseDataSources(a)}getStyle(t){return e.css`
      .jimu-widget-setting--section {
        border-bottom: none;
      }

      .label-line-height {
        line-height: 20px;
      }

      .jimu-collapse {
        margin-top: 12px;
        margin-bottom: 12px;
      }

      .setting-header {
        padding: ${e.polished.rem(10)} ${e.polished.rem(16)} ${e.polished.rem(0)} ${e.polished.rem(16)}
      }

      .deleteIcon {
        cursor: pointer;
        opacity: .8;
      }

      .deleteIcon:hover {
        opacity: 1;
      }

      .sql-expr-display {
        width: 100%;
        height: auto;
        min-height: 60px;
        line-height: 25px;
        padding: 3px 5px;
        color: ${t.ref.palette.neutral[900]};
        border: 1px solid ${t.ref.palette.neutral[500]};
      }

      .relate-panel-left {
        flex: auto;
        .action-select-chooser {
          margin-top: ${e.polished.rem(12)};
        }
      }
    `}updateMessageActionConfigAndUseDataSources(t){const a=function(t){const a=[];if(t){if(t.messageUseDataSource){const o=(0,e.Immutable)(t.messageUseDataSource).asMutable({deep:!0});a.push(o)}if(t.actionUseDataSource&&(0===a.length||a.length>0&&t.actionUseDataSource.dataSourceId!==a[0].dataSourceId)){const o=(0,e.Immutable)(t.actionUseDataSource).asMutable({deep:!0});a.push(o)}}return a}(t);this.props.onSettingChange({actionId:this.props.actionId,config:t,useDataSources:a})}render(){var s,d,v,x,b;const{config:w}=this.props,M=e.DataSourceManager.getInstance(),U=w.messageUseDataSource&&M.getDataSource(w.messageUseDataSource.dataSourceId),C=w.actionUseDataSource&&M.getDataSource(w.actionUseDataSource.dataSourceId),T=!w.connectionType||w.connectionType===e.MessageActionConnectionType.SetCustomFields,{theme:j}=this.props,L=A(this.props.messageWidgetId,this.props.messageType,this.props.config.messageUseDataSource),O=A(this.props.widgetId,this.props.messageType,this.props.config.actionUseDataSource),E=null===(v=null===(d=null===(s=null==j?void 0:j.ref)||void 0===s?void 0:s.palette)||void 0===d?void 0:d.neutral)||void 0===v?void 0:v[900],q=this.props.config.useAnyTriggerData,B=this.props.intl.formatMessage({id:"mapAction_TriggerActionConnectionMode",defaultMessage:r}),V=this.props.intl.formatMessage({id:"mapZoomToAction_Automatic",defaultMessage:y}),P=this.props.intl.formatMessage({id:"mapFilterAction_AutomaticTriggerDataTip",defaultMessage:l}),_=this.props.intl.formatMessage({id:"mapAction_Customize",defaultMessage:c}),k=this.props.intl.formatMessage({id:"mapAction_TriggerLayer",defaultMessage:n}),W=this.props.intl.formatMessage({id:"mapAction_ActionLayer",defaultMessage:p});return(0,e.jsx)("div",{css:this.getStyle(this.props.theme)},(0,e.jsx)(a.SettingSection,{title:B,className:"pb-0"},(0,e.jsx)(a.SettingRow,null,(0,e.jsx)(t.Label,{className:"d-flex align-items-center label-line-height"},(0,e.jsx)(t.Radio,{className:"mr-2",checked:q,onChange:()=>{this.onAllDataRadioChecked()}}),V),(0,e.jsx)(t.Tooltip,{title:P,showArrow:!0,placement:"left"},(0,e.jsx)("span",{className:"ml-2"},(0,e.jsx)(N,null)))),(0,e.jsx)(a.SettingRow,null,(0,e.jsx)(t.Label,{className:"d-flex align-items-center label-line-height"},(0,e.jsx)(t.Radio,{className:"mr-2",checked:!q,onChange:()=>{this.onCustomizeDataRadioChecked()}}),_))),!q&&(0,e.jsx)(a.SettingSection,{title:k,className:"pt-5 pb-0"},(0,e.jsx)(o.DataSourceSelector,{className:"mt-2",types:F,useDataSources:L.useDataSources,fromRootDsIds:L.fromRootDsIds,fromDsIds:L.fromDsIds,closeDataSourceListOnChange:!0,disableRemove:()=>L.isReadOnly,disableDataSourceList:L.isReadOnly,hideAddDataButton:!0,hideTypeDropdown:!0,mustUseDataSource:!0,onChange:this.handleTriggerLayerChange,widgetId:this.props.messageWidgetId,isMultiple:!1,hideDataView:!0,isMultipleDataView:!1,disableDataView:!0,enableToSelectOutputDsFromSelf:!0})),!q&&(0,e.jsx)(a.SettingSection,{title:W,className:"pt-5 pb-0"},(0,e.jsx)(o.DataSourceSelector,{className:"mt-2",types:F,useDataSources:O.useDataSources,fromRootDsIds:O.fromRootDsIds,fromDsIds:O.fromDsIds,closeDataSourceListOnChange:!0,disableRemove:()=>O.isReadOnly,disableDataSourceList:O.isReadOnly,hideAddDataButton:!0,hideTypeDropdown:!0,mustUseDataSource:!0,onChange:this.handleActionLayerChange,widgetId:this.props.widgetId,isMultiple:!1,hideDataView:!0,isMultipleDataView:!1,disableDataView:!0,enableToSelectOutputDsFromSelf:!0})),!q&&this.props.config&&this.props.config.messageUseDataSource&&this.props.config.actionUseDataSource&&(0,e.jsx)(a.SettingSection,{title:this.props.intl.formatMessage({id:"mapAction_Conditions",defaultMessage:g}),className:"pt-5"},(0,e.jsx)(a.SettingRow,{label:this.props.intl.formatMessage({id:"mapAction_RelateMessage",defaultMessage:S}),className:"mt-2"},(0,e.jsx)(t.Switch,{checked:this.props.config.enabledDataRelationShip,onChange:e=>{this.switchEnabledDataRelationShip(e.target.checked)}})),(0,e.jsx)(t.Collapse,{isOpen:this.props.config.enabledDataRelationShip,className:"w-100"},(0,e.jsx)(R.ChooseConnectionType,{messageDataSource:U,actionDataSource:C,connectionType:w.connectionType,onUseLayersRelationship:this.onUseLayersRelationship,onSetCustomFields:this.onSetCustomFields}),this.checkTriggerLayerIsSameToActionLayer()&&(0,e.jsx)("div",{className:"w-100 border p-1 mr-2"},this.props.intl.formatMessage({id:"mapAction_AutoBind",defaultMessage:I})),!this.checkTriggerLayerIsSameToActionLayer()&&T&&(0,e.jsx)("div",{className:"w-100 d-flex align-items-center"},(0,e.jsx)("div",{className:"d-flex flex-column relate-panel-left mt-3"},(0,e.jsx)(o.FieldSelector,{className:"w-100",useDataSources:(0,e.Immutable)([null===(x=this.props.config.messageUseDataSource)||void 0===x?void 0:x.asMutable({deep:!0})]),isDataSourceDropDownHidden:!0,placeholder:this.props.intl.formatMessage({id:"mapAction_TriggerLayerField",defaultMessage:h}),onChange:this.onMessageFieldSelected,useDropdown:!0,selectedFields:this.props.config.messageUseDataSource&&this.props.config.messageUseDataSource.fields?this.props.config.messageUseDataSource.fields:(0,e.Immutable)([])}),(0,e.jsx)(o.FieldSelector,{className:"w-100 action-select-chooser",placeholder:this.props.intl.formatMessage({id:"mapAction_ActionLayerField",defaultMessage:m}),useDataSources:(0,e.Immutable)([null===(b=this.props.config.actionUseDataSource)||void 0===b?void 0:b.asMutable({deep:!0})]),isDataSourceDropDownHidden:!0,onChange:this.onActionFieldSelected,useDropdown:!0,selectedFields:this.props.config.actionUseDataSource&&this.props.config.actionUseDataSource.fields?this.props.config.actionUseDataSource.fields:(0,e.Immutable)([])})),(0,e.jsx)(t.Icon,{className:"flex-none",width:12,height:40,color:E,icon:u(74587)}))),(0,e.jsx)(a.SettingRow,null,(0,e.jsx)(t.Button,{type:"link",disabled:!this.props.config.actionUseDataSource,className:"w-100 d-flex justify-content-start",onClick:this.showSqlExprPopup},(0,e.jsx)("div",{className:"w-100 text-truncate",style:{textAlign:"start"}},this.props.intl.formatMessage({id:"mapAction_MoreConditions",defaultMessage:D}))),this.props.config.actionUseDataSource&&(0,e.jsx)(e.DataSourceComponent,{useDataSource:this.props.config.actionUseDataSource},(t=>(0,e.jsx)(i.SqlExpressionBuilderPopup,{dataSource:t,mode:e.SqlExpressionMode.Simple,isOpen:this.state.isSqlExprShow,toggle:this.toggleSqlExprPopup,expression:this.props.config.sqlExprObj,onChange:e=>{this.onSqlExprBuilderChange(e)}})))),(0,e.jsx)(a.SettingRow,null,(0,e.jsx)("div",{className:"sql-expr-display"},this.props.config.sqlExprObj&&C?e.dataSourceUtils.getArcGISSQL(this.props.config.sqlExprObj,C).displaySQL:this.props.intl.formatMessage({id:"mapAction_SetExpression",defaultMessage:f})))))}}B.defaultProps={config:(0,e.Immutable)({useAnyTriggerData:!0,messageUseDataSource:null,actionUseDataSource:null,sqlExprObj:null,enabledDataRelationShip:!0,connectionType:e.MessageActionConnectionType.SetCustomFields})};const V=(0,s.withTheme)(B)})(),d})())}}}));