(this["webpackJsonpmy-client"]=this["webpackJsonpmy-client"]||[]).push([[0],{104:function(e,t,n){e.exports=n(203)},109:function(e,t,n){},111:function(e,t,n){},141:function(e,t){},203:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(8),c=n.n(o),s=(n(109),n(9)),l=n.n(s),i=n(18),u=n(5),m=(n(111),n(97)),p=n.n(m),d=n(34),f=n(103);n(202);function g(e){var t=e.pad,n=t.owner,o=t.holder,c=t.pages,s=t.task,l=t.id,i=Object(a.useState)(""),m=Object(u.a)(i,2),p=m[0],g=m[1],h=Object(a.useState)(!1),b=Object(u.a)(h,2),v=b[0],E=b[1],y=Object(a.useState)(2),x=Object(u.a)(y,2),w=x[0],j=x[1],O=Object(a.useState)(""),k=Object(u.a)(O,2),S=k[0],C=k[1],B=Object(a.useRef)(),T=Object(a.useRef)();Object(a.useEffect)((function(){C(!1),E(!1)}),[e.pad]),Object(a.useEffect)((function(){"guess"!==e.pad.task||v||T.current&&(T.current.loadSaveData(e.pad.pages[e.pad.pages.length-1].drawing,!1),E(!0))}));var N=n.position===o?r.a.createElement("p",{style:{marginBottom:"0"}},"you have your own pad"):r.a.createElement("p",{style:{marginBottom:"0"}},"you have ",r.a.createElement("strong",null,n.name),"'s pad"),R="draw"===s?r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"draw your best ",r.a.createElement("strong",null,c[c.length-1])),r.a.createElement(d.a,{ref:B,hideGrid:!0,className:"canvasStyle",brushRadius:w}),r.a.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",width:"100%"}},r.a.createElement("p",{style:{fontWeight:"bold",marginBottom:"0"}},"thickness:"),r.a.createElement(f.a,{className:"thicknessSlider",min:1,max:12,value:w,onChange:function(e){j(e)},onAfterChange:function(e){j(e)}})),r.a.createElement("div",{style:{display:"flex",justifyContent:"space-evenly",margin:"12px 0",width:"100%"}},r.a.createElement("button",{onClick:function(){B.current.undo()}},"\u270f undo"),r.a.createElement("button",{onClick:function(){B.current.clear()}},"\ud83d\udca3 clear"))):r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"what do you think this drawing is?"),r.a.createElement(d.a,{ref:T,hideGrid:!0,className:"canvasStyle",disabled:!0}),r.a.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"start",width:"100%"}},r.a.createElement("p",{style:{fontWeight:"bold",marginBottom:"0",marginTop:"6px"}},"guess:"),r.a.createElement("input",{style:{marginTop:"12px",marginBottom:"12px",width:"100%"},value:p,onChange:function(e){g(e.target.value)}})));return S?r.a.createElement("p",null,"waiting for others to finish..."):r.a.createElement(r.a.Fragment,null,N,R,r.a.createElement("button",{onClick:function(){var t;C(!0),t="draw"===s?{drawing:B.current.getSaveData()}:{guess:p},fetch("".concat("https://guess-a-sketch-service.azurewebsites.net/","room/submit/").concat(e.roomCode,"/playerName/").concat(e.name,"/padId/").concat(l),{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}})},style:{margin:"12px 0",alignSelf:"center"}},"\ud83e\udd1e submit"))}var h=n(102);function b(e){var t=e.pad,n=e.onBackClicked,o=t.owner,c=t.pages,s=Object(a.useState)(1),l=Object(u.a)(s,2),i=l[0],m=l[1],p=Object(a.useState)(!1),f=Object(u.a)(p,2),g=f[0],h=f[1],b=Object(a.useRef)(),v=r.a.createElement("strong",null,o.name);return Object(a.useEffect)((function(){b.current&&b.current.loadSaveData(c[i].drawing)})),r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:n},"\u25c0 back"),r.a.createElement("p",{style:{marginTop:"12px"}},v,"'s pad"),i%2!==0?r.a.createElement(d.a,{ref:b,hideGrid:!0,className:"canvasStyle",disabled:!0}):r.a.createElement("div",{style:{display:"flex",height:"500px",justifyContent:"center",alignItems:"center",fontSize:"40px",width:"350px",border:"1px black solid",borderRadius:"4px"}},r.a.createElement("p",null,c[i])),r.a.createElement("div",{style:{display:"flex",justifyContent:"space-evenly",width:"100%",marginTop:"24px",marginBottom:"14px"}},r.a.createElement("button",{disabled:1===i,onClick:function(){m(i-1)}},"previous page"),r.a.createElement("p",{style:{margin:0}},"page ",r.a.createElement("strong",null,i)),i===c.length-1?r.a.createElement("button",{onClick:function(){return h(!0)}},"reveal ",v,"'s word"):r.a.createElement("button",{onClick:function(){return m(i+1)}},"next page")),g&&r.a.createElement("strong",{style:{marginBottom:"12px"}},c[0]))}function v(e){var t=e.pads,n=Object(a.useState)(),o=Object(u.a)(n,2),c=o[0],s=o[1],l=Object(a.useMemo)((function(){if(c){var e,n=Object(h.a)(t);try{for(n.s();!(e=n.n()).done;){var a=e.value;if(a.owner.name===c)return a}}catch(r){n.e(r)}finally{n.f()}}return null}),[t,c]);return l?r.a.createElement(b,{pad:l,onBackClicked:function(){return s(null)}}):r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"game over"),r.a.createElement("h3",null,"results"),r.a.createElement("ul",null,t.map((function(e){return r.a.createElement("li",{key:e.owner.name},r.a.createElement("a",{role:"button",href:"#",onClick:function(){s(e.owner.name)}},e.owner.name,"'s pad"))}))),r.a.createElement("button",{style:{marginTop:"28px"},onClick:function(){window.location.reload()}},"\ud83c\udfc3\u200d\u2642\ufe0f leave room"))}function E(e){var t=e.players,n=e.showStartGameButton,a=e.roomCode,o=function(){var e=Object(i.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://guess-a-sketch-service.azurewebsites.net/","room/start/").concat(a),{method:"POST"});case 2:e.sent.status;case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",{style:{alignSelf:"center"}},r.a.createElement("p",{style:{margin:"24px 0"}},"you're in room ",r.a.createElement("strong",null,a)),t.length>0?r.a.createElement("p",{style:{margin:"24px 0"}},"who's in the house?"):r.a.createElement("p",{style:{margin:"24px 0"}},"waiting for people to join..."),r.a.createElement("ul",{style:{margin:"24px 0"}},t.map((function(e){return r.a.createElement("li",{key:e.name},e.name)}))),n&&r.a.createElement("button",{onClick:o},"\ud83d\udd2b start game"))}function y(e){var t=Object(a.useState)(""),n=Object(u.a)(t,2),o=n[0],c=n[1],s=e.name,m=e.onNameChange,p=function(){var t=Object(i.a)(l.a.mark((function t(){var n,a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat("https://guess-a-sketch-service.azurewebsites.net/","room/create/playerName/").concat(s,"/"),{method:"POST"});case 2:if(200!==(n=t.sent).status){t.next=8;break}return t.next=6,n.json();case 6:(a=t.sent).joined&&e.onRoomJoined(a.roomCode,[],!0);case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),d=function(){var t=Object(i.a)(l.a.mark((function t(){var n,a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat("https://guess-a-sketch-service.azurewebsites.net/","room/join/").concat(o,"/playerName/").concat(s,"/"),{method:"POST"});case 2:if(200!==(n=t.sent).status){t.next=8;break}return t.next=6,n.json();case 6:(a=t.sent).joined&&e.onRoomJoined(a.roomCode,a.players,!1);case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return r.a.createElement("div",{className:"Welcome"},r.a.createElement("div",{style:{marginBottom:"12px",display:"flex",flexDirection:"column"}},r.a.createElement("strong",null,"your name"),r.a.createElement("input",{placeholder:"joe",value:s,onChange:function(e){return m(e.target.value)},style:{marginTop:"6px",marginBottom:"6px"}})),r.a.createElement("div",{style:{marginBottom:"12px",display:"flex",flexDirection:"column"}},r.a.createElement("strong",{style:{marginTop:"6px",marginBottom:"6px"}},"create a new room"),r.a.createElement("button",{onClick:p,disabled:!s,style:{marginBottom:"12px"}},"\ud83c\udfe0 new room")),r.a.createElement("div",{style:{marginBottom:"12px",display:"flex",flexDirection:"column"}},r.a.createElement("strong",null,"join a room"),r.a.createElement("input",{placeholder:"i.e. 0825",value:o,onChange:function(e){return c(e.target.value)},style:{marginTop:"6px",marginBottom:"6px"}}),r.a.createElement("button",{onClick:d,disabled:!o},"\ud83e\uddd1 join room")))}var x=function(){var e=Object(a.useState)("pre"),t=Object(u.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(!1),s=Object(u.a)(c,2),m=s[0],d=s[1],f=Object(a.useState)(function(){window.localStorage.getItem("name");0;for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=t.length,a=0;a<5;a++)e+=t.charAt(Math.floor(Math.random()*n));return e}()),h=Object(u.a)(f,2),b=h[0],x=h[1],w=Object(a.useState)(null),j=Object(u.a)(w,2),O=j[0],k=j[1],S=Object(a.useState)(null),C=Object(u.a)(S,2),B=C[0],T=C[1],N=Object(a.useState)([]),R=Object(u.a)(N,2),z=R[0],D=R[1],I=Object(a.useState)(0),P=Object(u.a)(I,2),F=P[0],J=P[1];Object(a.useEffect)((function(){var e=function(e){return e==F},t=p()("https://guess-a-sketch-service.azurewebsites.net/",{transports:["websocket"]});return t.on("newPlayer",(function(t){e(t.roomCode)&&D(t.players)})),t.on("nextRound",function(){var t=Object(i.a)(l.a.mark((function t(n){var a,r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e(n.roomCode)){t.next=10;break}return t.next=3,fetch("".concat("https://guess-a-sketch-service.azurewebsites.net/","room/nextRound/").concat(F,"/playerName/").concat(b,"/"),{method:"POST"});case 3:if(200!==(a=t.sent).status){t.next=10;break}return t.next=7,a.json();case 7:r=t.sent,k(r.pad),o("in");case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),t.on("gameOver",function(){var t=Object(i.a)(l.a.mark((function t(n){var a,r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e(n.roomCode)){t.next=10;break}return t.next=3,fetch("".concat("https://guess-a-sketch-service.azurewebsites.net/","room/gameOver/").concat(F),{method:"POST"});case 3:if(200!==(a=t.sent).status){t.next=10;break}return t.next=7,a.json();case 7:r=t.sent,T(r.pads),o("post");case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),function(){return t.close()}}),[F,b]);var G=function(e,t,n){J(e),D(t),d(n)},M=r.a.useMemo((function(){switch(n){case"pre":return F?r.a.createElement(E,{players:z,showStartGameButton:m,roomCode:F}):r.a.createElement(y,{name:b,onRoomJoined:G,onNameChange:function(e){x(e),window.localStorage.setItem("name",e)}});case"in":return r.a.createElement(g,{pad:O,roomCode:F,name:b});case"post":return r.a.createElement(v,{pads:B});default:return r.a.createElement(r.a.Fragment,null,"\ud83e\udd37\u200d\u2640\ufe0f")}}),[n,z,m,F,b,O]);return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"content"},M))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(x,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[104,1,2]]]);
//# sourceMappingURL=main.5768ea0b.chunk.js.map