/*!
 * gender.js v0.5
 * Copyright 2014 gender-api.com
 * https://github.com/markus-perl/gender-api/blob/master/LICENSE
 *
 *
 */
 console.log("gender plugin here");
(function(b){var a=function(k,f){var l="name";var m="email";var o=b(k);var h=false;var q=500;var e=null;var p=null;var c=true;var n=l;o.detachApi=function(){c=false};o.attachApi=function(){c=true};var j={ip:"auto"};if(f.key){j.key=f.key}if(f.country){j.country=f.country}if(f.language){j.language=f.language}if(f.type){n=f.type}var r="https:"==document.location.protocol?"https://":"http://";var d=f.url?f.url:r+"gender-api.com/get";o.query=function(u,v){u=b.trim(u);if((n==m&&u.indexOf("@")>0)||(n==l&&u.length>1)){if(n==m){j.email=u}else{j.name=u}if(h==true){return}if(u==p){return}h=true;p=u;if(!b.support.cors&&b.ajaxTransport&&window.XDomainRequest){var s=new XDomainRequest();if(s){if(window.location&&window.location.href){j.ref=window.location.href}s.onload=function(){var w=b.parseJSON(s.responseText);v(w);h=false};var t="";b.each(j,function(w,x){t+="&"+w+"="+encodeURIComponent(x)});s.open("get",d+"?"+t.substr(1));s.send()}}else{b.ajax({url:d,data:j,dataType:"json"}).done(function(w){v(w);h=false})}}else{v({name:u,gender:null})}};if(f.hasOwnProperty("name")&&f.callback){o.query(f.name,f.callback);return}var i=function(){if(e){clearTimeout(e)}e=setTimeout(g,q)};var g=function(){if(c){var s=o.val();o.query(s,function(t){if(t.gender){o.trigger("gender-found",t)}h=false})}};o.on({change:g,focusout:g,keyup:i,paste:function(){setTimeout(g,100)}});o.data("genderapi",o)};b.fn.genderApi=function(c){return this.each(function(){var d=b(this).data("genderapi");switch(c){case"detach":if(d){d.detachApi();return d}return null;case"attach":if(d){d.attachApi();return d}return null}return new a(this,c)})}})(jQuery);
