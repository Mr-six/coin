webpackJsonp([1],{"+BTi":function(t,e){},"/I4U":function(t,e){},"/bpg":function(t,e){},"2rGO":function(t,e){},"6Jd/":function(t,e){},"8gNo":function(t,e){},BY2l:function(t,e){},DSCY:function(t,e){},Dte2:function(t,e){},FEIM:function(t,e){},GXEp:function(t,e){},H3rH:function(t,e){},I4nB:function(t,e){},IxJZ:function(t,e){},Mf0D:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("isgN"),a("+BTi");var n=a("tLa+"),r=a.n(n),s=(a("ylrw"),a("6oiW")),i=a.n(s),o=(a("uKbn"),a("GegP")),c=a.n(o),u=(a("w2s5"),a("oTyR")),l=a.n(u),d=(a("wJKS"),a("orbS")),p=a.n(d),h=(a("I4nB"),a("STLj")),f=a.n(h),m=(a("cDSy"),a("e0Bm")),v=a.n(m),g=(a("jZDA"),a("91Nw")),_=a.n(g),x=(a("d7TW"),a("ajQY")),b=a.n(x),y=(a("Q6SQ"),a("LQMI")),w=a.n(y),k=(a("GXEp"),a("mtrD")),D=a.n(k),P=(a("DSCY"),a("LaeV")),C=a.n(P),S=(a("IxJZ"),a("NoPp")),I=a.n(S),A=(a("H3rH"),a("6mNG")),E=a.n(A),T=(a("Dte2"),a("q4le")),M=a.n(T),R=(a("Mf0D"),a("exT9")),F=a.n(R),L=(a("V5v9"),a("D8db")),O=a.n(L),N=(a("/bpg"),a("ACGT")),$=a.n(N),V=(a("bwiK"),a("SExR")),U=a.n(V),z=(a("isE6"),a("LR6y")),H=a.n(z),G=(a("NOFV"),a("mWcH")),j=a.n(G),B=(a("ZzA9"),a("cgIP")),Z=a.n(B),W=a("7+uW"),q={name:"com-header",data:function(){return{activeIndex:"1"}},methods:{handleSelect:function(t,e){console.log(t,e)}}},J={render:function(){var t=this.$createElement,e=this._self._c||t;return e("el-menu",{staticClass:"el-menu-demo",attrs:{"default-active":this.activeIndex,mode:"horizontal","background-color":"#545c64","text-color":"#fff","active-text-color":"#ffd04b"}},[e("el-menu-item",{attrs:{index:"1"}},[e("router-link",{attrs:{to:{name:"DashBoard"}}},[this._v("首页")])],1),this._v(" "),e("el-submenu",{attrs:{index:"2"}},[e("template",{slot:"title"},[this._v("交易详情")]),this._v(" "),e("el-menu-item",{attrs:{index:"2-1"}},[e("router-link",{attrs:{to:{name:"Profits"}}},[this._v("收益统计")])],1),this._v(" "),e("el-menu-item",{attrs:{index:"2-2"}},[e("router-link",{attrs:{to:{name:"ExchangeTrades"}}},[this._v("交易所交易详情")])],1),this._v(" "),e("el-menu-item",{attrs:{index:"2-3"}},[e("router-link",{attrs:{to:{name:"ProfitsPercent"}}},[this._v("盈利率统计")])],1),this._v(" "),e("el-menu-item",{attrs:{index:"2-4"}},[e("router-link",{attrs:{to:{name:"TradeStatus"}}},[this._v("交易状态")])],1)],2),this._v(" "),e("el-menu-item",{attrs:{index:"3"}},[e("router-link",{attrs:{to:{name:"Account"}}},[this._v("用户中心")])],1),this._v(" "),e("el-menu-item",{attrs:{index:"4"}},[e("router-link",{attrs:{to:{name:"Status"}}},[this._v("系统监控")])],1),this._v(" "),e("el-menu-item",{attrs:{index:"5"}},[e("router-link",{attrs:{to:{name:"TableCoin"}}},[this._v("数字货币行情")])],1)],1)},staticRenderFns:[]},K={name:"app",components:{comHeader:a("VU/8")(q,J,!1,null,null,null).exports}},Q={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("el-container",[e("el-header",[e("com-header")],1),this._v(" "),e("el-main",[e("router-view")],1)],1)],1)},staticRenderFns:[]};var Y=a("VU/8")(K,Q,!1,function(t){a("8gNo")},null,null).exports,X=a("/ocq"),tt={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[t._v("首页看板 - 等待完善")]),t._v(" "),a("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"}},[t._v("操作按钮")])],1),t._v(" "),t._l(4,function(e){return a("div",{key:e,staticClass:"text item"},[t._v("\n    "+t._s("列表内容 "+e)+"\n  ")])})],2)},staticRenderFns:[]};var et=a("VU/8")(null,tt,!1,function(t){a("g3cS")},null,null).exports,at=(a("2rGO"),a("nu7/")),nt=a.n(at),rt=a("Xxa5"),st=a.n(rt),it=a("exGp"),ot=a.n(it),ct=a("woOf"),ut=a.n(ct),lt=(a("/I4U"),a("yg6k")),dt=a.n(lt),pt=a("//Fk"),ht=a.n(pt),ft=(a("cwe7"),a("2X9z")),mt=a.n(ft),vt=a("mtWM"),gt=a.n(vt),_t={baseURL:"/",timeout:1e5};gt.a.interceptors.request.use(function(t){return t},function(t){return mt()({showClose:!0,message:"错误信息："+t,type:"error"}),ht.a.reject(t)}),gt.a.interceptors.response.use(function(t){return t.data.data instanceof Array&&!t.data.data.length&&dt.a.error({title:"无数据",message:"暂无交易数据",duration:2e3}),t},function(t){return mt()({showClose:!0,duration:0,message:"错误信息："+t,type:"error"}),ht.a.reject(t)}),ut()(gt.a.defaults,_t);var xt={getAllCoin:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;return ot()(st.a.mark(function n(){var r;return st.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,gt()("https://api.coinmarketcap.com/v1/ticker/?start="+e+"&limit="+a);case 3:return r=t.sent,t.abrupt("return",{success:!0,data:r});case 7:return t.prev=7,t.t0=t.catch(0),t.abrupt("return",{success:!1,data:t.t0});case 10:case"end":return t.stop()}},n,t,[[0,7]])}))()},getPriceById:function(t){return gt()("/api/currencies/"+t+"/")},getCoinRedditSub:function(t){return gt()("/redditSub/currencies/"+t+"/")},getTrades:function(t){return gt.a.post("/api/tradesProfit",t)},getTradeStatus:function(t){return gt.a.post("/api/tradesStatus",t)},getProfit:function(t){return gt.a.post("/api/totalProfit",t)},getCoinCost:function(t){return gt.a.post("/api/coinCost",t)},getMoneyCost:function(t){return gt.a.post("/api/moneyCost",t)},getAccount:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"btc";return gt()("/api/balances?symbol="+t)},getProfitsPercent:function(t){return gt.a.post("/api/profitsPercent",t)},getAccountPreview:function(){return gt()("/api/balancePreview")},getErrLog:function(t){return gt.a.post("/api/errLog",t)},getSysStatus:function(){return gt()("/api/status")},getAvailablePeriod:function(){var t=this;return ot()(st.a.mark(function e(){var a,n,r,s;return st.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,gt.a.post("/api/trades",{limit:1,sort:{timestamp:1}});case 2:return a=t.sent,n=a.data,t.next=6,gt.a.post("/api/trades",{limit:1,sort:{timestamp:-1}});case 6:return r=t.sent,s=r.data,t.abrupt("return",{start:n.data[0].timestamp,end:s.data[0].timestamp});case 9:case"end":return t.stop()}},e,t)}))()},getExchangeStatus:function(){return gt()("/api/exchangeStatus")},getProgressStatus:function(){return gt()("/api/progressStatus")}},bt={data:function(){return{activeName:"first",profitItem:{title:{text:"盈利情况"},tooltip:{},legend:{data:["盈利"]},xAxis:{type:"time"},yAxis:{},dataZoom:[{type:"slider",xAxisIndex:[0],show:!0,start:0,end:100},{type:"slider",yAxisIndex:[0],show:!0,start:0,end:100}],dataset:{},series:[]},totalProfit:{title:{text:"累计盈利"},tooltip:{},legend:{data:["总盈利"]},xAxis:{type:"time"},yAxis:{},dataZoom:[{type:"slider",xAxisIndex:[0],show:!0,start:0,end:100},{type:"slider",yAxisIndex:[0],show:!0,start:0,end:100}],dataset:{},series:[]}}},beforeMount:function(){var t=this;return ot()(st.a.mark(function e(){return st.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},e,t)}))()},methods:{getTrades:function(t,e){var a=this;return ot()(st.a.mark(function n(){var r,s,i,o,c,u,l;return st.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r={query:{timestamp:{$gte:t,$lt:e}}},s=nt.a.service({fullscreen:!0,body:!0,text:"数据加载中……"}),n.next=4,xt.getTrades(r);case 4:return i=n.sent,o=i.data,(c=o.data).length?(a.profitItem.dataset={sourceHeader:!1,source:c},a.profitItem.series=[{type:"line",name:"盈利",encode:{x:"timestamp",y:"profit",tooltip:["timestamp","profit","sellExchange","sellAmount","sellPrice","buyExchange","buyAmount","buyPrice"]}}]):a.profitItem.dataset=[],n.next=10,xt.getProfit(r);case 10:u=n.sent,s.close(),(l=u.data.data).length?(a.totalProfit.dataset={sourceHeader:!1,source:l},a.totalProfit.series=[{type:"line",name:"总盈利",encode:{x:"timestamp",y:"profit",tooltip:["timestamp","profit","sellExchange","sellAmount","sellPrice","buyExchange","buyAmount","buyPrice"]}}]):a.totalProfit.dataset=[];case 14:case"end":return n.stop()}},n,a)}))()}}},yt={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("date-picker",{attrs:{handlerDateChange:this.getTrades}}),this._v(" "),e("chart",{attrs:{options:this.profitItem}}),this._v(" "),e("chart",{attrs:{options:this.totalProfit}})],1)},staticRenderFns:[]};var wt=a("VU/8")(bt,yt,!1,function(t){a("ZrHJ")},null,null).exports,kt=a("fZjL"),Dt=a.n(kt),Pt={data:function(){return{coinCostItem:{title:{text:"数字货币数量详情(正为买入,负为卖出)"},tooltip:{},legend:{data:[]},xAxis:{type:"time"},yAxis:{},dataZoom:[{type:"slider",xAxisIndex:[0],show:!0,start:0,end:100},{type:"slider",yAxisIndex:[0],show:!0,start:0,end:100}],dataset:{},series:[]},moneyCostItem:{title:{text:"现金数量(正为收入,负为花费)"},tooltip:{},legend:{data:[]},xAxis:{type:"time"},yAxis:{},dataZoom:[{type:"slider",xAxisIndex:[0],show:!0,start:0,end:100},{type:"slider",yAxisIndex:[0],show:!0,start:0,end:100}],dataset:{},series:[]}}},beforeMount:function(){var t=this;return ot()(st.a.mark(function e(){return st.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},e,t)}))()},methods:{getCost:function(t,e){var a=this;return ot()(st.a.mark(function n(){var r,s,i,o,c,u,l,d;return st.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r={query:{timestamp:{$gte:t,$lt:e}}},s=nt.a.service({fullscreen:!0,body:!0,text:"数据加载中……"}),n.next=4,xt.getCoinCost(r);case 4:return i=n.sent,o=i.data,n.next=8,xt.getMoneyCost(r);case 8:c=n.sent,u=c.data,s.close(),o.data?(a.coinCostItem.series=[],l=Dt()(o.data),console.log(l),a.coinCostItem.legend.data=l,l.forEach(function(t){a.coinCostItem.series.push({name:t,type:"line",data:o.data[t]})})):a.coinCostItem.series=[],u.data&&(a.moneyCostItem.series=[],d=Dt()(u.data),a.moneyCostItem.legend.data=d,d.forEach(function(t){a.moneyCostItem.series.push({name:t,type:"line",data:u.data[t]})}));case 13:case"end":return n.stop()}},n,a)}))()}}},Ct={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("date-picker",{attrs:{handlerDateChange:this.getCost}}),this._v(" "),e("chart",{attrs:{options:this.coinCostItem}}),this._v(" "),e("chart",{attrs:{options:this.moneyCostItem}})],1)},staticRenderFns:[]};var St=a("VU/8")(Pt,Ct,!1,function(t){a("y31C")},null,null).exports,It={data:function(){return{activeName:"first",profitPercentItem:{title:{text:"收益率 - 折线图"},tooltip:{},legend:{data:["收益率"]},xAxis:{type:"time"},yAxis:{},dataZoom:[{type:"slider",xAxisIndex:[0],show:!0,start:0,end:100},{type:"slider",yAxisIndex:[0],show:!0,start:0,end:100}],dataset:{},series:[]},pieItem:{title:{text:"收益率 - 饼图"},legend:{},tooltip:{},series:[{type:"pie",radius:"55%",data:[]}]}}},beforeMount:function(){var t=this;return ot()(st.a.mark(function e(){return st.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},e,t)}))()},methods:{getProfitsPercent:function(t,e){var a=this;return ot()(st.a.mark(function n(){var r,s,i,o,c,u;return st.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r={query:{timestamp:{$gte:t,$lt:e}}},s=nt.a.service({fullscreen:!0,body:!0,text:"数据加载中……"}),n.next=4,xt.getProfitsPercent(r);case 4:i=n.sent,o=i.data,s.close(),console.log(o),o.data&&o.data.profitPercent&&o.data.yields?(c=o.data.profitPercent,u=o.data.yields,a.profitPercentItem.dataset={sourceHeader:!1,source:c},a.profitPercentItem.series=[{type:"line",name:"盈利",encode:{x:"timestamp",y:"profitPercent",tooltip:["timestamp","profitRate","sellExchange","sellAmount","sellPrice","buyExchange","buyAmount","buyPrice"]}}],a.pieItem.series[0].data=u,console.log()):(a.profitPercentItem.dataset=[],a.pieItem.series[0].data=[]);case 9:case"end":return n.stop()}},n,a)}))()}}},At={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("date-picker",{attrs:{handlerDateChange:this.getProfitsPercent}}),this._v(" "),"first"==this.activeName?e("chart",{attrs:{options:this.profitPercentItem}}):this._e(),this._v(" "),"first"==this.activeName?e("chart",{attrs:{options:this.pieItem}}):this._e()],1)},staticRenderFns:[]};var Et=a("VU/8")(It,At,!1,function(t){a("kBGR")},null,null).exports,Tt={render:function(t){!function(t,e){var a=["danger","warning","success","theme"],n="";switch(t){case"btc":n=e<Mt.btc.danger?a[0]:e<Mt.btc.warning?a[1]:a[2];break;case"usd":n=e<Mt.usd.danger?a[0]:e<Mt.usd.warning?a[1]:a[2];break;default:n=e<Mt.default.danger?a[0]:e<Mt.default.warning?a[1]:a[2]}}(this.symbol,this.amount);return t("div",this.$slots.default)},props:{symbol:{type:String,required:!0},amount:{type:Number,required:!0}}},Mt={btc:{danger:5,warning:10},usd:{danger:5e4,warning:5e5},default:{danger:1e3,warning:5e3}};var Rt={data:function(){return{selectVal:"btc",activeName:"first",accountPreview:[],selects:[{value:"btc"},{value:"eth"},{value:"usd"},{value:"bch"}],accountItem:{title:{text:"账户余额"},tooltip:{},legend:{data:[]},xAxis:{type:"time"},yAxis:{},dataZoom:[{type:"slider",xAxisIndex:[0],show:!0,start:0,end:100},{type:"slider",yAxisIndex:[0],show:!0,start:0,end:100}],dataset:{},series:[]}}},beforeMount:function(){var t=this;return ot()(st.a.mark(function e(){return st.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getPreview();case 2:console.log("数据加载完成");case 3:case"end":return e.stop()}},e,t)}))()},methods:{getPreview:function(){var t=this;return ot()(st.a.mark(function e(){var a,n,r;return st.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=nt.a.service({fullscreen:!0,body:!0,text:"数据加载中……"}),e.next=3,xt.getAccountPreview();case 3:n=e.sent,(r=n.data).success&&(t.accountPreview=r.data,a.close());case 6:case"end":return e.stop()}},e,t)}))()},getAccount:function(){var t=this;return ot()(st.a.mark(function e(){var a,n,r,s,i;return st.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=nt.a.service({fullscreen:!0,body:!0,text:"数据加载中……"}),n=t.selectVal,e.next=4,xt.getAccount(n);case 4:r=e.sent,s=r.data,a.close(),console.log(s),t.accountItem.series=[],i=Dt()(s.data),t.accountItem.legend.data=i,i.forEach(function(e){t.accountItem.series.push({name:e,type:"line",data:s.data[e]})});case 12:case"end":return e.stop()}},e,t)}))()},handleTabClick:function(t,e){"second"===t.name&&this.getAccount()},selectChange:function(t){this.getAccount()},getClass:function(t,e){return e}},computed:{test:function(t){console.log(t)}},components:{balanceItem:Tt}},Ft={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-tabs",{on:{"tab-click":t.handleTabClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"账户余额",name:"first"}},[t.accountPreview.length?a("el-row",{attrs:{gutter:20}},t._l(t.accountPreview,function(e){return a("el-col",{key:e.timestamp,attrs:{span:6}},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[t._v(t._s("余额 "+e.exchange_name))]),t._v(" "),a("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"}},[t._v("查看图表")])],1),t._v(" "),t._l(e.account_ballance,function(e,n){return a("div",{key:e},[a("balance-item",{attrs:{symbol:n,amount:e}},[t._v("\n                "+t._s(n+": "+e)+"\n              ")])],1)})],2)],1)})):t._e()],1),t._v(" "),a("el-tab-pane",{attrs:{label:"图表展示",name:"second"}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-refresh"},on:{click:t.getAccount}},[t._v("点击刷新数据")]),t._v("\n      选择币种：\n      "),a("el-select",{attrs:{placeholder:"btc"},on:{change:t.selectChange},model:{value:t.selectVal,callback:function(e){t.selectVal=e},expression:"selectVal"}},t._l(t.selects,function(t){return a("el-option",{key:t.value,attrs:{value:t.value}})})),t._v(" "),"second"==t.activeName?a("chart",{attrs:{options:t.accountItem}}):t._e()],1),t._v(" "),a("el-tab-pane",{attrs:{label:"其他",name:"fourth"}},[t._v("\n      空\n    ")])],1)],1)},staticRenderFns:[]};var Lt=a("VU/8")(Rt,Ft,!1,function(t){a("hVA/")},null,null).exports,Ot={data:function(){return{tableData:[]}},beforeMount:function(){var t=this;return ot()(st.a.mark(function e(){var a,n,r;return st.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=nt.a.service({fullscreen:!0,body:!0,text:"数据加载中……"}),e.next=3,xt.getAllCoin();case 3:n=e.sent,r=n.data,a.close(),t.tableData=r.data,console.log(r);case 8:case"end":return e.stop()}},e,t)}))()},methods:{mysort:function(t,e){return Number(parseFloat(t.price_usd)>parseFloat(e.price_usd))},formatter:function(t,e){return parseFloat(t.price_usd)}}},Nt={render:function(){var t=this.$createElement,e=this._self._c||t;return e("el-table",{staticStyle:{width:"100%"},attrs:{data:this.tableData}},[e("el-table-column",{attrs:{prop:"rank",label:"rank"}}),this._v(" "),e("el-table-column",{attrs:{prop:"name",label:"name",sortable:""}}),this._v(" "),e("el-table-column",{attrs:{prop:"price_usd",sortable:"",formatter:this.formatter,label:"price"}}),this._v(" "),e("el-table-column",{attrs:{prop:"market_cap_usd",sortable:"",label:"market_cap"}}),this._v(" "),e("el-table-column",{attrs:{prop:"percent_change_1h",sortable:"",label:"change_1h"}}),this._v(" "),e("el-table-column",{attrs:{prop:"percent_change_24h",sortable:"",label:"change_24h"}}),this._v(" "),e("el-table-column",{attrs:{prop:"percent_change_7d",sortable:"",label:"change-7d"}})],1)},staticRenderFns:[]},$t=a("VU/8")(Ot,Nt,!1,null,null,null).exports,Vt={data:function(){return{activeName:"first",statusItem:{title:{text:"成交率率 - 饼图"},legend:{},tooltip:{},series:[{type:"pie",radius:"55%",data:[]}]}}},beforeMount:function(){var t=this;return ot()(st.a.mark(function e(){return st.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},e,t)}))()},methods:{getTradeStatus:function(t,e){var a=this;return ot()(st.a.mark(function n(){var r,s,i,o,c;return st.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r={query:{timestamp:{$gte:t,$lt:e}}},s=nt.a.service({fullscreen:!0,body:!0,text:"数据加载中……"}),n.next=4,xt.getTradeStatus(r);case 4:i=n.sent,o=i.data,s.close(),c=o.data,o.data&&o.data.length&&(a.statusItem.series[0].data=c,0===o.data.reduce(function(t,e){return t.value+e.value})&&dt.a.error({title:"无数据",message:"暂无交易数据",duration:2e3}));case 9:case"end":return n.stop()}},n,a)}))()}}},Ut={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("date-picker",{attrs:{handlerDateChange:this.getTradeStatus}}),this._v(" "),e("chart",{attrs:{options:this.statusItem}})],1)},staticRenderFns:[]};var zt=a("VU/8")(Vt,Ut,!1,function(t){a("BY2l")},null,null).exports,Ht={data:function(){return{errorData:[]}},beforeMount:function(){var t=this;return ot()(st.a.mark(function e(){return st.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.getErrorLog();case 1:case"end":return e.stop()}},e,t)}))()},methods:{getErrorLog:function(){var t=this;return ot()(st.a.mark(function e(){return st.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},e,t)}))()},handleOpen:function(t,e){console.log(t,e)},handleClose:function(t,e){console.log(t,e)}}},Gt={render:function(){var t=this.$createElement,e=this._self._c||t;return e("el-container",[e("el-aside",{attrs:{width:"200px"}},[e("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"1","background-color":"#545c64","text-color":"#fff","active-text-color":"#ffd04b"},on:{open:this.handleOpen,close:this.handleClose}},[e("el-menu-item",{attrs:{index:"1"}},[e("i",{staticClass:"el-icon-menu"}),this._v(" "),e("router-link",{attrs:{slot:"title",to:{name:"ProgressStatus"}},slot:"title"},[this._v("程序状态")])],1),this._v(" "),e("el-menu-item",{attrs:{index:"2"}},[e("i",{staticClass:"el-icon-info"}),this._v(" "),e("router-link",{attrs:{slot:"title",to:{name:"PlatformInfo"}},slot:"title"},[this._v("平台信息")])],1),this._v(" "),e("el-menu-item",{attrs:{index:"3"}},[e("i",{staticClass:"el-icon-document"}),this._v(" "),e("router-link",{attrs:{to:{name:"ErrorLog"}}},[this._v("错误日志")])],1),this._v(" "),e("el-menu-item",{attrs:{index:"4",disabled:""}},[e("i",{staticClass:"el-icon-setting"}),this._v(" "),e("span",{attrs:{slot:"title"},slot:"title"},[this._v("其他")])]),this._v(" "),e("el-submenu",{attrs:{index:"5"}},[e("template",{slot:"title"},[e("i",{staticClass:"el-icon-location"}),this._v(" "),e("span",[this._v("测试")])]),this._v(" "),e("el-menu-item-group",[e("template",{slot:"title"},[this._v("分组一")]),this._v(" "),e("el-menu-item",{attrs:{index:"1-1"}},[this._v("选项1")]),this._v(" "),e("el-menu-item",{attrs:{index:"1-2"}},[this._v("选项2")])],2),this._v(" "),e("el-menu-item-group",{attrs:{title:"分组2"}},[e("el-menu-item",{attrs:{index:"1-3"}},[this._v("选项3")])],1),this._v(" "),e("el-submenu",{attrs:{index:"1-4"}},[e("template",{slot:"title"},[this._v("选项4")]),this._v(" "),e("el-menu-item",{attrs:{index:"1-4-1"}},[this._v("选项1")])],2)],2)],1)],1),this._v(" "),e("el-main",[e("router-view")],1)],1)},staticRenderFns:[]},jt=a("VU/8")(Ht,Gt,!1,null,null,null).exports,Bt={data:function(){return{errorData:[],tatolLog:0}},beforeMount:function(){var t=this;return ot()(st.a.mark(function e(){return st.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.getErrorLog();case 1:case"end":return e.stop()}},e,t)}))()},methods:{getErrorLog:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:15;return ot()(st.a.mark(function n(){var r,s,i;return st.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r=nt.a.service({fullscreen:!0,body:!0,text:"数据加载中……"}),n.next=3,xt.getErrLog({limit:a,skip:e*a});case 3:s=n.sent,i=s.data,r.close(),t.errorData=i.data.errorLog,t.tatolLog=i.data.tatol;case 8:case"end":return n.stop()}},n,t)}))()},mysort:function(t,e){return Number(parseFloat(t.price_usd)>parseFloat(e.price_usd))},formatterTime:function(t,e){var a=new Date(t.timestamp);return a.toLocaleDateString()+"-"+a.toLocaleTimeString()},handlePageChange:function(t){this.getErrorLog(t)}}},Zt={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.errorData}},[a("el-table-column",{attrs:{prop:"timestamp",formatter:t.formatterTime,sortable:"",label:"timestamp"}}),t._v(" "),a("el-table-column",{attrs:{label:"level"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:"danger"}},[t._v(t._s(e.row.level))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"threadName",sortable:"",label:"threadName"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fileName",sortable:"",label:"fileName"}}),t._v(" "),a("el-table-column",{attrs:{prop:"lineNumber",label:"lineNumber"}}),t._v(" "),a("el-table-column",{attrs:{prop:"message",label:"message"}})],1),t._v(" "),a("el-pagination",{staticClass:"text-center err-pagi",attrs:{background:"",layout:"prev, pager, next","page-size":15,total:t.tatolLog},on:{"current-change":t.handlePageChange}})],1)},staticRenderFns:[]};var Wt=a("VU/8")(Bt,Zt,!1,function(t){a("c87K")},null,null).exports,qt=a("gRE1"),Jt=a.n(qt),Kt={data:function(){return{infoData:"",cpusData:[]}},beforeMount:function(){var t=this;return ot()(st.a.mark(function e(){return st.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.getSysInfo();case 1:case"end":return e.stop()}},e,t)}))()},methods:{getSysInfo:function(){var t=this;return ot()(st.a.mark(function e(){var a,n,r,s;return st.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=nt.a.service({fullscreen:!0,body:!0,text:"数据加载中……"}),e.next=3,xt.getSysStatus();case 3:n=e.sent,r=n.data,a.close(),t.infoData=r.data,(s=r.data.cpus?r.data.cpus:[]).length&&s.forEach(function(e,a){var n=Jt()(e.times).reduce(function(t,e){return t+e}),r=e.times.idle,s=parseFloat((r/n*100).toFixed(2)),i=parseFloat((100-s).toFixed(2)),o=e.model;t.cpusData.push({model:o,useRate:i})}),console.log(t.infoData);case 10:case"end":return e.stop()}},e,t)}))()}},computed:{}},Qt={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.infoData?a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("el-card",[a("div",{attrs:{slot:"header"},slot:"header"},[a("span",[t._v("系统信息")])]),t._v(" "),a("p",[t._v("系统平台："+t._s(t.infoData.platform+" "+t.infoData.arch))]),t._v(" "),a("p",[t._v("主机名称："+t._s(t.infoData.hostname))]),t._v(" "),a("p",[t._v("发行版本："+t._s(t.infoData.release))])])],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-card",[a("div",{attrs:{slot:"header"},slot:"header"},[a("span",[t._v("平均负载")])]),t._v(" "),a("p",[t._v("1min: "+t._s(t.infoData.loadavg[0]))]),t._v(" "),a("p",[t._v("5min: "+t._s(t.infoData.loadavg[1]))]),t._v(" "),a("p",[t._v("15min: "+t._s(t.infoData.loadavg[2]))])])],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-card",[a("div",{attrs:{slot:"header"},slot:"header"},[a("span",[t._v("内存占用")])]),t._v(" "),a("el-progress",{attrs:{"text-inside":!0,"stroke-width":18,percentage:t.infoData.memory.memoryRate,status:"exception"}}),t._v(" "),a("p",[t._v("可用内存: "+t._s(t.infoData.memory.memoryFree)+" G")]),t._v(" "),a("p",[t._v("内存总量: "+t._s(t.infoData.memory.totalMem)+" G")])],1)],1),t._v(" "),a("el-col",{staticClass:"cpu-card",attrs:{span:24}},[a("el-card",[a("div",{attrs:{slot:"header"},slot:"header"},[a("span",[t._v("cpu使用情况")])]),t._v(" "),t._l(t.cpusData,function(e,n){return t.cpusData.length?a("el-col",{key:n,staticClass:"text-center",attrs:{span:6}},[a("el-progress",{attrs:{type:"circle",percentage:e.useRate}}),t._v(" "),a("h5",[t._v(t._s(e.model))])],1):t._e()})],2)],1),t._v(" "),a("el-col",{staticClass:"cpu-card",attrs:{span:24}},[a("el-card",[a("div",{attrs:{slot:"header"},slot:"header"},[a("span",[t._v("文件系统")])]),t._v(" "),a("div",t._l(t.infoData.dirc,function(e,n){return a("div",{key:n,staticClass:"line clearfix"},t._l(e,function(e,n){return a("el-col",{key:n,attrs:{span:4}},[a("span",[t._v(t._s(e))])])}))}))])],1)],1):t._e()},staticRenderFns:[]};var Yt=a("VU/8")(Kt,Qt,!1,function(t){a("FEIM")},null,null).exports,Xt={data:function(){return{exchangeStatus:{},progressData:[]}},beforeMount:function(){var t=this;return ot()(st.a.mark(function e(){return st.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.getSysInfo();case 1:case"end":return e.stop()}},e,t)}))()},methods:{getSysInfo:function(){var t=this;return ot()(st.a.mark(function e(){var a,n,r,s,i,o,c;return st.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=nt.a.service({fullscreen:!0,body:!0,text:"数据加载中……"}),e.next=3,xt.getExchangeStatus();case 3:return n=e.sent,r=n.data,e.next=7,xt.getProgressStatus();case 7:if(s=e.sent,i=s.data,a.close(),t.progressData=i.data,r.data instanceof Object){o=r.data.ExchangeStatusStore;for(c in o)"string"==typeof o[c]&&(o[c]=JSON.parse(o[c]));t.exchangeStatus=o,console.log(o)}case 12:case"end":return e.stop()}},e,t)}))()}},computed:{checkStatus:function(t){return t?"success":"danger"}}},te={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{attrs:{gutter:20}},[a("el-col",{staticClass:"progress-status",attrs:{span:24}},[t.progressData.length?t._e():a("h2",[t._v("获取不到move_bricks的进程数据")]),t._v(" "),t.progressData.length?a("el-card",[a("div",{attrs:{slot:"header"},slot:"header"},[a("span",[t._v("move_bricks 进程状态")])]),t._v(" "),a("div",t._l(t.progressData,function(e,n){return a("div",{key:n,staticClass:"line clearfix"},t._l(e,function(e,n){return a("el-col",{key:n,attrs:{span:2}},[a("span",[t._v(t._s(10>n?e:""))])])}))}))]):t._e()],1),t._v(" "),a("el-col",{attrs:{span:24}},t._l(t.exchangeStatus,function(e,n){return a("div",{key:n},[a("el-col",{staticClass:"status-card",attrs:{span:12}},[a("el-card",[a("div",{attrs:{slot:"header"},slot:"header"},[a("b",[t._v(t._s(n+" 服务状态"))])]),t._v(" "),a("div",{staticClass:"status-card-item"},[a("span",[t._v("Deep WebSocket：")]),t._v(" "),a("el-tag",{attrs:{type:e.is_depth_websocket_ok?"success":"danger"}},[t._v(t._s(e.is_depth_websocket_ok?"链接正常":"未链接"))])],1),t._v(" "),a("div",{staticClass:"status-card-item"},[a("span",[t._v("Order WebSocket：")]),t._v(" "),a("el-tag",{attrs:{type:e.is_order_websocket_ok?"success":"danger"}},[t._v(t._s(e.is_order_websocket_ok?"链接正常":"未链接"))])],1),t._v(" "),a("div",{staticClass:"status-card-item"},[a("span",[t._v("Deep REST API：")]),t._v(" "),a("el-tag",{attrs:{type:e.is_order_rest_ok?"success":"danger"}},[t._v(t._s(e.is_order_rest_ok?"链接正常":"未链接"))])],1),t._v(" "),a("div",{staticClass:"status-card-item"},[a("span",[t._v("Account REST API：")]),t._v(" "),a("el-tag",{attrs:{type:e.is_account_rest_ok?"success":"danger"}},[t._v(t._s(e.is_account_rest_ok?"链接正常":"未链接"))])],1),t._v(" "),a("div",{staticClass:"status-card-item"},[a("span",[t._v("Order WebSocket Msg：")]),t._v(" "),a("el-tag",{attrs:{type:e.order_websocket_msg?"danger":"info"}},[t._v(t._s(e.order_websocket_msg?e.order_websocket_msg:"無消息"))])],1),t._v(" "),a("div",{staticClass:"status-card-item"},[a("span",[t._v("Order REST Msg：")]),t._v(" "),a("el-tag",{attrs:{type:e.order_rest_msg?"danger":"info"}},[t._v(t._s(e.order_rest_msg?e.order_rest_msg:"無消息"))])],1),t._v(" "),a("div",{staticClass:"status-card-item"},[a("span",[t._v("Deep WebSocket Msg：")]),t._v(" "),a("el-tag",{attrs:{type:e.depth_websocket_msg?"danger":"info"}},[t._v(t._s(e.depth_websocket_msg?e.depth_websocket_msg:"無消息"))])],1),t._v(" "),a("div",{staticClass:"status-card-item"},[a("span",[t._v("Deep WebSocket Restart：")]),t._v(" "),a("el-tag",{attrs:{type:e.depth_restart_time?"danger":"info"}},[t._v(t._s(e.depth_restart_time?e.depth_restart_time:"暂不需要重启"))])],1)])],1)],1)}))],1)},staticRenderFns:[]};var ee=a("VU/8")(Xt,te,!1,function(t){a("6Jd/")},null,null).exports;W.default.use(X.a);var ae=new X.a({routes:[{path:"/",name:"DashBoard",component:et},{path:"/Profits",name:"Profits",component:wt},{path:"/TradeStatus",name:"TradeStatus",component:zt},{path:"/ExchangeTrades",name:"ExchangeTrades",component:St},{path:"/account",name:"Account",component:Lt},{path:"/ProfitsPercent",name:"ProfitsPercent",component:Et},{path:"/tableCoin",name:"TableCoin",component:$t},{path:"/Status",name:"Status",redirect:"/Status/ProgressStatus",component:jt,children:[{path:"PlatformInfo",name:"PlatformInfo",component:Yt},{path:"ErrorLog",name:"ErrorLog",component:Wt},{path:"ProgressStatus",name:"ProgressStatus",component:ee}]}]}),ne=(a("PS5z"),{data:function(){var t=this;return{startDate:"",endDate:"",period:[(new Date).setHours(0,0,0,0),(new Date).setHours(23,59,59,59)],pickerOptions:{disabledDate:function(e){if(t.startDate&&t.endDate){var a=t.startDate-864e5,n=e.getTime();return n<a||n>t.endDate}}}}},props:{handlerDateChange:{type:Function,require:!0}},beforeMount:function(){var t=this;return ot()(st.a.mark(function e(){return st.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.initAvailablePeriod();case 2:return e.next=4,t.getPeriodData();case 4:case"end":return e.stop()}},e,t)}))()},methods:{initAvailablePeriod:function(){var t=this;return ot()(st.a.mark(function e(){var a;return st.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,xt.getAvailablePeriod();case 3:a=e.sent,t.startDate=a.start,t.endDate=a.end,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}},e,t,[[0,8]])}))()},getPeriodData:function(){var t=this;return ot()(st.a.mark(function e(){var a,n;return st.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.period&&t.period.length){e.next=2;break}return e.abrupt("return");case 2:a=new Date(t.period[0]).getTime(),n=new Date(t.period[1]).getTime(),t.handlerDateChange(a,n);case 5:case"end":return e.stop()}},e,t)}))()}}}),re={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{attrs:{gutter:20}},[a("el-button",{attrs:{type:"primary",icon:"el-icon-refresh"},on:{click:t.getPeriodData}},[t._v("点击刷新数据")]),t._v(" "),a("el-col",{attrs:{span:24}},[a("div",{staticClass:"block"},[a("p",[t._v("选择日期")]),t._v(" "),a("el-date-picker",{attrs:{type:"daterange","start-placeholder":"开始日期","end-placeholder":"结束日期","default-time":["00:00:00","23:59:59"],"value-format":"timestamp","picker-options":t.pickerOptions},on:{change:t.getPeriodData},model:{value:t.period,callback:function(e){t.period=e},expression:"period"}})],1)])],1)},staticRenderFns:[]},se=a("VU/8")(ne,re,!1,null,null,null).exports,ie=a("Gu7T"),oe=a.n(ie),ce=a("Icdr"),ue=a.n(ce),le=a("O4Lo"),de=a.n(le),pe=a("472O"),he=["legendselectchanged","legendselected","legendunselected","datazoom","datarangeselected","timelinechanged","timelineplaychanged","restore","dataviewchanged","magictypechanged","geoselectchanged","geoselected","geounselected","pieselectchanged","pieselected","pieunselected","mapselectchanged","mapselected","mapunselected","axisareaselected","focusnodeadjacency","unfocusnodeadjacency","brush","brushselected","click","dblclick","mouseover","mouseout","mousedown","mouseup","globalout"],fe={props:{options:Object,theme:[String,Object],initOptions:Object,group:String,autoResize:Boolean,watchShallow:Boolean},data:function(){return{chart:null}},computed:{width:{cache:!1,get:function(){return this.delegateGet("width","getWidth")}},height:{cache:!1,get:function(){return this.delegateGet("height","getHeight")}},isDisposed:{cache:!1,get:function(){return!!this.delegateGet("isDisposed","isDisposed")}},computedOptions:{cache:!1,get:function(){return this.delegateGet("computedOptions","getOption")}}},watch:{group:function(t){this.chart.group=t}},methods:{mergeOptions:function(t,e,a){this.delegateMethod("setOption",t,e,a)},appendData:function(t){this.delegateMethod("appendData",t)},resize:function(t){this.delegateMethod("resize",t)},dispatchAction:function(t){this.delegateMethod("dispatchAction",t)},convertToPixel:function(t,e){return this.delegateMethod("convertToPixel",t,e)},convertFromPixel:function(t,e){return this.delegateMethod("convertFromPixel",t,e)},containPixel:function(t,e){return this.delegateMethod("containPixel",t,e)},showLoading:function(t,e){this.delegateMethod("showLoading",t,e)},hideLoading:function(){this.delegateMethod("hideLoading")},getDataURL:function(t){return this.delegateMethod("getDataURL",t)},getConnectedDataURL:function(t){return this.delegateMethod("getConnectedDataURL",t)},clear:function(){this.delegateMethod("clear")},dispose:function(){this.delegateMethod("dispose")},delegateMethod:function(t){var e;if(this.chart){for(var a=arguments.length,n=Array(a>1?a-1:0),r=1;r<a;r++)n[r-1]=arguments[r];return(e=this.chart)[t].apply(e,oe()(n))}W.default.util.warn("Cannot call ["+t+"] before the chart is initialized. Set prop [options] first.",this)},delegateGet:function(t,e){return this.chart||W.default.util.warn("Cannot get ["+t+"] before the chart is initialized. Set prop [options] first.",this),this.chart[e]()},init:function(){var t=this;if(!this.chart){var e=ue.a.init(this.$el,this.theme,this.initOptions);this.group&&(e.group=this.group),e.setOption(this.options,!0),he.forEach(function(a){e.on(a,function(e){t.$emit(a,e)})}),this.autoResize&&(this.__resizeHanlder=de()(function(){e.resize()},100,{leading:!0}),Object(pe.a)(this.$el,this.__resizeHanlder)),this.chart=e}},destroy:function(){this.autoResize&&Object(pe.b)(this.$el,this.__resizeHanlder),this.dispose(),this.chart=null},refresh:function(){this.destroy(),this.init()}},created:function(){var t=this;this.$watch("options",function(e){!t.chart&&e?t.init():t.chart.setOption(t.options,!0)},{deep:!this.watchShallow});["theme","initOptions","autoResize","watchShallow"].forEach(function(e){t.$watch(e,function(){t.refresh()},{deep:!0})})},mounted:function(){this.options&&this.init()},activated:function(){this.autoResize&&this.chart&&this.chart.resize()},beforeDestroy:function(){this.chart&&this.destroy()},connect:function(t){"string"!=typeof t&&(t=t.map(function(t){return t.chart})),ue.a.connect(t)},disconnect:function(t){ue.a.disConnect(t)},registerMap:function(t,e,a){ue.a.registerMap(t,e,a)},registerTheme:function(t,e){ue.a.registerTheme(t,e)},graphic:ue.a.graphic},me={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"echarts"})},staticRenderFns:[]},ve=a("VU/8")(fe,me,!1,null,null,null).exports;a("GbHy"),a("Oq2I"),a("4UDB"),a("miEh"),a("80cc"),a("wQkr"),a("+Dgo"),a("Vb+l");W.default.use(Z.a),W.default.use(j.a),W.default.use(H.a),W.default.use(U.a),W.default.use($.a),W.default.use(O.a),W.default.use(F.a),W.default.use(M.a),W.default.use(E.a),W.default.use(I.a),W.default.use(C.a),W.default.use(D.a),W.default.use(w.a),W.default.use(b.a),W.default.use(_.a),W.default.use(v.a),W.default.use(f.a),W.default.use(p.a),W.default.use(l.a),W.default.use(c.a),W.default.use(i.a),W.default.use(r.a),W.default.component("chart",ve),W.default.component("datePicker",se),W.default.config.productionTip=!1,new W.default({el:"#app",router:ae,template:"<App/>",components:{App:Y}})},NOFV:function(t,e){},PS5z:function(t,e){},Q6SQ:function(t,e){},V5v9:function(t,e){},ZrHJ:function(t,e){},ZzA9:function(t,e){},bwiK:function(t,e){},c87K:function(t,e){},cDSy:function(t,e){},cwe7:function(t,e){},d7TW:function(t,e){},g3cS:function(t,e){},"hVA/":function(t,e){},isE6:function(t,e){},isgN:function(t,e){},jZDA:function(t,e){},kBGR:function(t,e){},uKbn:function(t,e){},w2s5:function(t,e){},wJKS:function(t,e){},y31C:function(t,e){},ylrw:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.9dfa25532cc82f99e14e.js.map