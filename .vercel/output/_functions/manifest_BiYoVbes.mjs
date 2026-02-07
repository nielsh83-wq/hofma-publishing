import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_CRgg0T9s.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_YbQSl0fn.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/nielshofna/Documents/Hofma%20Publishing/","cacheDir":"file:///Users/nielshofna/Documents/Hofma%20Publishing/node_modules/.astro/","outDir":"file:///Users/nielshofna/Documents/Hofma%20Publishing/dist/","srcDir":"file:///Users/nielshofna/Documents/Hofma%20Publishing/src/","publicDir":"file:///Users/nielshofna/Documents/Hofma%20Publishing/public/","buildClientDir":"file:///Users/nielshofna/Documents/Hofma%20Publishing/dist/client/","buildServerDir":"file:///Users/nielshofna/Documents/Hofma%20Publishing/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.CBpzpDKQ.css"},{"type":"inline","content":".page-content[data-astro-cid-kh7btl4r]{padding:var(--space-2xl) var(--space-lg)}.section-inner[data-astro-cid-kh7btl4r]{max-width:720px;margin:0 auto}.page-content[data-astro-cid-kh7btl4r] h1[data-astro-cid-kh7btl4r]{margin:0 0 var(--space-xl)}.about-body[data-astro-cid-kh7btl4r] p[data-astro-cid-kh7btl4r]{margin:0 0 var(--space-md)}.about-body[data-astro-cid-kh7btl4r] p[data-astro-cid-kh7btl4r]:last-child{margin-bottom:0}\n"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/subscribe","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/subscribe\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"subscribe","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/subscribe.ts","pathname":"/api/subscribe","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.CBpzpDKQ.css"},{"type":"inline","content":".page-content[data-astro-cid-4sn4zg3r]{padding:var(--space-2xl) var(--space-lg)}.section-inner[data-astro-cid-4sn4zg3r]{max-width:720px;margin:0 auto}.breadcrumb[data-astro-cid-4sn4zg3r]{margin-bottom:var(--space-md);font-size:.875rem;color:var(--color-text-muted)}.breadcrumb[data-astro-cid-4sn4zg3r] .separator[data-astro-cid-4sn4zg3r]{margin:0 var(--space-xs)}.page-content[data-astro-cid-4sn4zg3r] time[data-astro-cid-4sn4zg3r]{font-size:.875rem;color:var(--color-text-muted)}.page-content[data-astro-cid-4sn4zg3r] h1[data-astro-cid-4sn4zg3r]{margin:var(--space-xs) 0 var(--space-xl)}.post-body[data-astro-cid-4sn4zg3r] p[data-astro-cid-4sn4zg3r]{margin:0 0 var(--space-md)}.back-link[data-astro-cid-4sn4zg3r]{font-weight:500;margin-top:var(--space-xl);display:inline-block}\n"}],"routeData":{"route":"/blog/[slug]","isIndex":false,"type":"page","pattern":"^\\/blog\\/([^/]+?)\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/blog/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.CBpzpDKQ.css"},{"type":"inline","content":".page-content[data-astro-cid-5tznm7mj]{padding:var(--space-2xl) var(--space-lg)}.section-inner[data-astro-cid-5tznm7mj]{max-width:720px;margin:0 auto}.page-content[data-astro-cid-5tznm7mj] h1[data-astro-cid-5tznm7mj]{margin:0 0 var(--space-sm)}.section-intro[data-astro-cid-5tznm7mj]{color:var(--color-text-muted);margin:0 0 var(--space-xl)}.posts-list[data-astro-cid-5tznm7mj]{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:var(--space-xl)}.post-card[data-astro-cid-5tznm7mj]{padding-bottom:var(--space-xl);border-bottom:1px solid var(--color-border)}.post-card[data-astro-cid-5tznm7mj]:last-child{border-bottom:none;padding-bottom:0}.post-card[data-astro-cid-5tznm7mj] time[data-astro-cid-5tznm7mj]{font-size:.875rem;color:var(--color-text-muted)}.post-card[data-astro-cid-5tznm7mj] h3[data-astro-cid-5tznm7mj]{margin:var(--space-xs) 0 var(--space-sm)}.post-card[data-astro-cid-5tznm7mj] h3[data-astro-cid-5tznm7mj] a[data-astro-cid-5tznm7mj]{color:var(--color-text)}.post-card[data-astro-cid-5tznm7mj] h3[data-astro-cid-5tznm7mj] a[data-astro-cid-5tznm7mj]:hover{color:var(--color-accent)}.post-card[data-astro-cid-5tznm7mj] p[data-astro-cid-5tznm7mj]{margin:0 0 var(--space-sm);color:var(--color-text-muted)}.read-more[data-astro-cid-5tznm7mj]{font-weight:600}\n"}],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.CBpzpDKQ.css"},{"type":"inline","content":".page-content[data-astro-cid-xglhyxzr]{padding:var(--space-2xl) var(--space-lg)}.section-inner[data-astro-cid-xglhyxzr]{max-width:var(--max-width);margin:0 auto}.page-content[data-astro-cid-xglhyxzr] h1[data-astro-cid-xglhyxzr]{margin:0 0 var(--space-sm)}.section-intro[data-astro-cid-xglhyxzr]{color:var(--color-text-muted);margin:0 0 var(--space-xl)}.books-grid[data-astro-cid-xglhyxzr]{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:var(--space-xl)}.book-card[data-astro-cid-xglhyxzr]{background:#fff;border:1px solid var(--color-border);border-radius:8px;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow .2s ease}.book-card[data-astro-cid-xglhyxzr]:hover{box-shadow:0 8px 24px #00000014}.book-cover[data-astro-cid-xglhyxzr]{aspect-ratio:2/3;background:var(--color-border)}.book-cover-placeholder[data-astro-cid-xglhyxzr]{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--color-text-muted);font-size:.875rem}.book-info[data-astro-cid-xglhyxzr]{padding:var(--space-md);flex:1;display:flex;flex-direction:column}.book-info[data-astro-cid-xglhyxzr] h3[data-astro-cid-xglhyxzr]{margin:0 0 var(--space-xs);font-size:1.125rem}.book-author[data-astro-cid-xglhyxzr]{margin:0 0 var(--space-sm);font-size:.875rem;color:var(--color-text-muted)}.book-description[data-astro-cid-xglhyxzr]{margin:0 0 var(--space-md);font-size:.9375rem;color:var(--color-text-muted);flex:1}.book-info[data-astro-cid-xglhyxzr] .btn[data-astro-cid-xglhyxzr]{margin-top:auto}\n"}],"routeData":{"route":"/books","isIndex":false,"type":"page","pattern":"^\\/books\\/?$","segments":[[{"content":"books","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/books.astro","pathname":"/books","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.CBpzpDKQ.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://hofmapublishing.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/nielshofna/Documents/Hofma Publishing/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/nielshofna/Documents/Hofma Publishing/src/pages/blog/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/nielshofna/Documents/Hofma Publishing/src/pages/blog/index.astro",{"propagation":"none","containsHead":true}],["/Users/nielshofna/Documents/Hofma Publishing/src/pages/books.astro",{"propagation":"none","containsHead":true}],["/Users/nielshofna/Documents/Hofma Publishing/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/subscribe@_@ts":"pages/api/subscribe.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/books@_@astro":"pages/books.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BiYoVbes.mjs","/Users/nielshofna/Documents/Hofma Publishing/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_C2g60mvg.mjs","/Users/nielshofna/Documents/Hofma Publishing/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.e8vwJ_Lr.js","/Users/nielshofna/Documents/Hofma Publishing/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.DQC1Yrdl.js","/Users/nielshofna/Documents/Hofma Publishing/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts":"_astro/Layout.astro_astro_type_script_index_1_lang.C-KWeTZK.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/nielshofna/Documents/Hofma Publishing/src/pages/index.astro?astro&type=script&index=0&lang.ts","const o=document.getElementById(\"newsletter-form\"),m=document.getElementById(\"newsletter-email\"),l=document.getElementById(\"newsletter-submit\"),c=document.getElementById(\"newsletter-submit-text\"),d=document.getElementById(\"newsletter-spinner\"),r=document.getElementById(\"newsletter-message\"),u=/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;function t(e,s=!1){r.textContent=e,r.className=`mt-3 text-sm min-h-[1.25rem] ${s?\"text-amber-800\":\"text-stone-600\"}`}function i(e){l.disabled=e,c.classList.toggle(\"hidden\",e),d.classList.toggle(\"hidden\",!e)}o?.addEventListener(\"submit\",async e=>{e.preventDefault();const s=m.value.trim().toLowerCase();if(t(\"\"),!u.test(s)){t(\"Please enter a valid email address.\",!0);return}i(!0);try{const n=await fetch(\"/api/subscribe\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({email:s,source:\"website\"})}),a=await n.json();n.ok?(t(a.message||\"Thank you for subscribing!\"),o.reset()):t(a.error||\"Something went wrong. Please try again.\",!0)}catch{t(\"Something went wrong. Please try again.\",!0)}finally{i(!1)}});"],["/Users/nielshofna/Documents/Hofma Publishing/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts","document.querySelector(\".nav-toggle\")?.addEventListener(\"click\",()=>{document.querySelector(\".nav\")?.classList.toggle(\"is-open\")});"]],"assets":["/_astro/about.CBpzpDKQ.css","/favicon.ico","/favicon.svg","/robots.txt","/_astro/Layout.astro_astro_type_script_index_0_lang.DQC1Yrdl.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"fPeJacnuvDZ1kZBxrPKXzORd8/ODs+qZrCuAVXotig8="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
