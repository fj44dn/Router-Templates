function Basic(){this.w=window;this.routerAlive=!1;this.head=document.getElementsByTagName("head")[0];this.d=document;this.isIE=0<=navigator.userAgent.indexOf("IE");this.domainUrl="http://192.168.1.1";this.time=1E3;this.explorerTag=0;this.pwd=this.session="";this.setWzd=0;this.httpTag="http://";this.ajaxAsyn=!0;this.ajaxSyn=!1;this._init=function(){this.local="undefined"!=typeof bWebUISimulator&&!0===bWebUISimulator?!0:"file:"==location.protocol};this.isArray=function(a){return"[object Array]"===
Object.prototype.toString.call(a)};this.getExplorer=function(){var a=navigator.userAgent;0<a.indexOf("IE 6.0")?this.explorerTag=6:0<a.indexOf("IE 7.0")&&(this.explorerTag=7)};this.transText=function(a){if(0<a.length){a=a.substring(a.indexOf("\r\n")+2);try{return eval("("+a+")")}catch(b){return""}}};this.id=function(a){return document.getElementById(a)};this.changeDomain=function(a){var b=this.httpTag;this.domainUrl=0<=a.indexOf(b)?a:b+a};this.initUrl=function(){if(!this.local){var a=location.href,
b=a.indexOf("#");0<b&&(a=a.substring(0,b));this.domainUrl=a}};this.objInitNull=function(a){for(var b in a)"object"==typeof a[b]?this.arguments.callee(a[b]):a[b]=""};this.objSet=function(a,b){if(this.isArray(b)){var c=0,d;for(d in a)a[d]=b[c++]}else for(d in a)a[d]=b};this.objCopy=function(a,b){var c,d;for(d in a)c=b[d],void 0!=c&&(a[d]=c)};this.encodePara=function(a){return a=encodeURL(a.toString())};this._init()}
function WebAjax(){this.isIE=0<=navigator.userAgent.indexOf("IE");this.ajaxTimeout=2E3;this.sessionKey="id";this.externDataParseFunc=new Function;this.result={errorno:0,data:"",timeout:!0};this.initResult=function(a){this.result.errorno=0;this.result.data="";this.result.timeout=!0};this.setDataParseFunc=function(a){this.externDataParseFunc=a};this.changeAsynTime=function(a){this.ajaxTimeout=a};this.getValueFromUrl=function(a,b){var c="",d;b+="=";d=a.indexOf(b);0<=d&&(c=a.substring(d+b.length),d=c.indexOf("&"),
d=0<d?d:c.length,c=c.substring(0,d));return c};this.orgURL=function(a){var b="",c=a.indexOf("?");if(0==this.session.length)return a;0<c?("&"!=a.substring(a.length-1)&&(b="&"),a+=b+this.sessionKey+"="+this.encodePara(this.session)):a+="?"+this.sessionKey+"="+this.encodePara(this.session);return a};this.createXHR=function(){var a;if(void 0!=window.ActiveXObject)try{a=!0==this.local?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest}catch(b){a=new ActiveXObject("Microsoft.XMLHTTP")}else a=new XMLHttpRequest;
return a};this.request=function(a,b,c,d,e,f,k,g){var h=this.createXHR(),m,l=this;this.initResult(l.result);h.onreadystatechange=function(){if(4==h.readyState&&(!0===$.local||100<=h.status)){l.result.timeout=!1;if(m=h.responseText)l.result.data=m;var a,d=m,c,g=0,f;c=d.indexOf("\r\n");a=d.substring(0,c);if(!0==/\D/.test(a)||0==a.length)a=0;else{for(f=a.length-1;"0"==a.charAt(g)&&g<f;)g++;a=parseInt(a.substring(g),10);d=d.substring(c+2)}a=[a,d];l.result.errorno=a[0];l.result.data=a[1];void 0!=b&&l.externDataParseFunc(l.result.data);
void 0!=e&&e(l.result);return!0}};void 0!=k&&void 0!=g?h.open(c,a,d,k,g):h.open(c,a,d);try{!0==this.isIE&&!1==this.local&&h.setRequestHeader("If-Modified-Since","0"),void 0!=b?h.send(b.toString()):h.send(null)}catch(n){}}}
function Load(){Basic.call(this);WebAjax.call(this);this.asyn=!0;this.syn=!1;this.detectTime=1E3;this.div=document.createElement("div");this.externResizefunc=new Function;this.externJSP=new Function;this.externLoading=new Function;this.externPageHandle=new Function;this.pageTickArray=[];this.scriptArray=[];this.unAuthCode=401;this.httpOK=200;this.setTimeout=function(a,b){var c=window.setTimeout(a,b);this.pageTickArray.push(c);return c};this.addScript=function(a){if(a&&/\S/.test(a)){var b=this.d.createElement("script");
b.type="text/javascript";void 0===b.text?b.appendChild(this.d.createTextNode(a)):b.text=a;this.head.insertBefore(b,this.head.firstChild);this.head.removeChild(b)}};this.getNodeArray=function(a,b){for(var c=[],d=0,e=a.length;d<e;d++)c[d]=a[d];b(c)};this.addDomNode=function(a,b){var c=this;this.div.innerHTML="div"+b;this.div.removeChild(this.div.firstChild);this.getNodeArray(this.div.childNodes,function(b){a&&(a.innerHTML="");for(var e=0,f=c.pageTickArray.length;e<f;e++)try{window.clearTimeout(c.pageTickArray[e])}catch(k){}for(var g=
[],e=0,f=b.length;e<f;e++)1==b[e].nodeType&&"script"===b[e].nodeName.toLowerCase()?g.push(b[e]):a.appendChild(b[e]);e=0;for(f=g.length;e<f;e++)c.addScript(g[e].text||g[e].textContent||g[e].innerHTML||"")})};this.pageResize=function(){this.externResizefunc()};this.setPageResize=function(a){this.externResizefunc=a};this.setexternJSP=function(a){this.externJSP=a};this.setExternLoading=function(a){this.externLoading=a};this.setExternPageHandle=function(a){this.externPageHandle=a};this.append=function(a,
b){a&&1==a.nodeType&&"string"===typeof b&&(this.addDomNode(a,b),this.pageResize())};this.detectWidthImg=function(a){var b=new Image;b.onload=function(){a()};b.src=this.domainUrl+detectPathStr+"?requence="+Math.random()};this.detect=function(a){!0==isIETenLess?this.detectWidthImg(a):this.request(this.domainUrl+detectPathStr+"?requence="+Math.random(),void 0,"get",this.asyn,a)};this.loadHand=function(a,b){str=this.externJSP(a.data);void 0!=str&&(a.data=str);this.append(this.id(b),a.data);try{this.externPageHandle()}catch(c){}};
this.load=function(a,b,c){function d(a){e=a.timeout;e||(f=k.externJSP(a.data),void 0!=f&&(a.data=f),k.loadHand(a,c));b&&b(a)}var e=!1,f,k=this;this.local||void 0!=b?this.loadAsyn(a,this.ajaxTimeout,function(b){b.errorno==EUNAUTH?(setLoadPage(a,c),k.postUnAuthHandle(a,void 0,k.asyn,d,"get")):b.errorno==ENONE&&d(b)}):(this.request(this.orgURL(a),void 0,"get",this.syn),this.result.errorno==EUNAUTH?(setLoadPage(a,c),!0==this.postUnAuthHandle(a,void 0,this.syn,void 0,"get")&&d(this.result)):this.result.errorno==
ENONE&&d(this.result));return e};this.loadAsyn=function(a,b,c){this.request(this.orgURL(a),void 0,"get",this.asyn,c,b)}};
