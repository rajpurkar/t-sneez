!function(t,e,n,o,r,i,a){function s(){var t=v();if(null!==t){var e=b.selectAll(".u").data(f.words).attr("transform",function(e,n){return e.rotate?e.rotate=e.rotate:e.rotate=10*(Math.random()-.5),"translate("+(200*t.get(n,0)*P+D+400)+","+(200*t.get(n,1)*P+O+400)+")rotate("+e.rotate+")"});e.selectAll("rect").style("fill-opacity",function(t){return t.init===!0&&N>0?Math.min(.9-Math.sqrt(.009*N),.9):.9}),N--}}function c(){var t=e(".viewport").width(),n=600;b.attr("width",t).attr("height",n)}function l(){D=n.event.translate[0],O=n.event.translate[1],P=n.event.scale}function u(){var t=b.selectAll(".b").data(f.words,function(t){return t.str}).enter().append("g").attr("class","u");t.append("rect").attr("width",function(t){return 8*t.str.length+10}).attr("height",20).attr("rx",5).attr("ry",5).style("fill",function(t){return a({luminosity:"light",seed:t.str})}),t.append("text").attr("text-anchor","middle").attr("x",function(t){return 4*t.str.length+5}).attr("y",10).attr("alignment-baseline","central").attr("fill","#333").text(function(t){return t.str})}function d(){var t=n.select(".viewport");b=t.append("svg"),u(),M(b),n.select(window).on("resize",c),c()}function w(){E&&console.time("step"),m(),E&&console.timeEnd("step");Math.round(A/(o.now()-T)*1e3);s(),10===A&&h&&window.console&&window.console.profile&&console.profileEnd(),requestAnimationFrame(w)}var f,p,v,g,m,h=!1,E=!1,S="tsneez",y="/t-sneez/data/wordvecs50dtop1000.json",z=600,A=0,k=z/100;switch(S){case"tsneez":p=new t.TSNEEZ({theta:.7,perplexity:k}),g=function(t){p.initData(t)},m=function(){return A++,p.step()},v=function(){return p.Y};break;case"karpathy":p=new r.tSNE({perplexity:k}),g=function(t){p.initDataRaw(t)},m=function(){return A++,p.step()},v=function(){var t=p.getSolution();return{get:function(e,n){return t[e][n]}}};break;case"scienceai":var x=new Worker("/t-sneez/javascripts/scienceai-worker.js"),R=null,T=o.now();x.onmessage=function(t){var e=t.data;switch(e.type){case"PROGRESS_STATUS":break;case"PROGRESS_ITER":break;case"PROGRESS_DATA":var n=o.now();E===!0&&(null===R?console.log("initialization",n-T+"ms"):console.log("step",n-T+"ms")),R=e.data,T=o.now(),A++;break;case"STATUS":console.log("status",e.data);break;case"DONE":R=e.data}},g=function(t){x.postMessage({type:"INPUT_DATA",data:t}),x.postMessage({type:"RUN",data:{perplexity:30,earlyExaggeration:4,learningRate:10,nIter:1e3,metric:"euclidean"}})},m=function(){},v=function(){return null===R?{get:function(){return null}}:{get:function(t,e){return R[t][e]}}},E=!1}var b,N=0,M=n.behavior.zoom().scaleExtent([.05,10]).center([0,0]).on("zoom",l),D=0,O=0,P=1,T=o.now();e(window).load(function(){e.getJSON(y,function(t){t.words=t.words.map(function(t){return{str:t,init:!0}}),f={words:t.words.slice(0,z),vecs:t.vecs.slice(0,z)},h&&window.console&&window.console.profile&&console.profile("initialization"),E&&console.time("initialization"),g(f.vecs),E&&console.timeEnd("initialization"),h&&window.console&&window.console.profile&&console.profileEnd(),d(),h&&window.console&&window.console.profile&&console.profile("step"),requestAnimationFrame(w),e("#addPoints").click(function(){N=100,f.words=f.words.map(function(t){return t.init=!0,t});for(var e=0;e<10;e++){var o=t.words[z];o.init=!1,console.log("adding word",o),p.add(t.vecs[z]),f.words.push(o),z++}n.selectAll(".viewport > svg").remove(),d()})})})}(tsneez,$,d3,performance,tsnejs,TSNE,randomColor);