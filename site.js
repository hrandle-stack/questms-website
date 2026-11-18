document.documentElement.classList.remove("no-js");

/* Red revision cloud drawn round any .cloud span, the way a drawing gets marked up */
function drawClouds(){
  document.querySelectorAll(".cloud").forEach(function(el){
    var old = el.querySelector("svg"); if (old) old.remove();
    var w = el.offsetWidth + 24, h = el.offsetHeight + 14;
    var step = 22, r = 9, d = "M 0 " + (h/2);
    function side(x0,y0,x1,y1){
      var len = Math.hypot(x1-x0,y1-y0), n = Math.max(2,Math.round(len/step)), s = "";
      for (var i=1;i<=n;i++){ var x = x0+(x1-x0)*i/n, y = y0+(y1-y0)*i/n; s += " A "+r+" "+r+" 0 0 1 "+x.toFixed(1)+" "+y.toFixed(1); }
      return s;
    }
    d = "M 0 " + h + side(0,h,0,0) + side(0,0,w,0) + side(w,0,w,h) + side(w,h,0,h) + " Z";
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns,"svg");
    svg.setAttribute("width",w); svg.setAttribute("height",h); svg.setAttribute("aria-hidden","true");
    var p = document.createElementNS(ns,"path"); p.setAttribute("d",d);
    svg.appendChild(p); el.appendChild(svg);
    var len = p.getTotalLength();
    p.style.strokeDasharray = len; p.style.setProperty("--len",len);
    if (!el.dataset.drawn){ p.classList.add("draw"); el.dataset.drawn = "1"; }
  });
}
window.addEventListener("load",drawClouds);
var rt; window.addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(drawClouds,150);});

/* Project filter */
(function(){
  var bar = document.querySelector(".filters"); if (!bar) return;
  var cards = document.querySelectorAll(".project");
  bar.addEventListener("click",function(e){
    var b = e.target.closest("button"); if (!b) return;
    bar.querySelectorAll("button").forEach(function(x){x.setAttribute("aria-pressed", x===b ? "true" : "false");});
    var f = b.dataset.f;
    cards.forEach(function(c){ c.hidden = !(f==="all" || c.dataset.s.split(" ").indexOf(f) > -1); });
  });
})();
