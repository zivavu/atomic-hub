/* empty css                          */
import { A as AstroError, i as UnknownContentCollectionError, e as createComponent, j as renderUniqueStylesheet, k as renderScriptElement, l as createHeadAndContent, r as renderTemplate, n as renderComponent, u as unescapeHTML, m as maybeRenderHead, g as addAttribute, h as createAstro, s as spreadAttributes, o as Fragment, p as renderSlot, q as renderHead, _ as __astro_tag_component__, t as createVNode } from './astro_CFX1K48I.mjs';
import 'kleur/colors';
import { $ as $$Image } from './pages/generic_D30VIw46.mjs';
import pLimit from 'p-limit';
import { p as prependForwardSlash } from './astro/assets-service_DEUr57na.mjs';
import { getIconData, iconToSVG } from '@iconify/utils';
import 'clsx';

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}, { Path: process.env.Path })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/articles/ai-cyfrowy-przyjaciel.mdx": () => import('./ai-cyfrowy-przyjaciel_Cxb4XY6V.mjs'),"/src/content/articles/ai-w-sluzbie-panstwa.mdx": () => import('./ai-w-sluzbie-panstwa_-qt_bH8F.mjs'),"/src/content/articles/atomowa-rewolucja.mdx": () => import('./atomowa-rewolucja_Ca52ntBY.mjs'),"/src/content/articles/atomowa-wies.mdx": () => import('./atomowa-wies_D4SeQoz-.mjs'),"/src/content/articles/atomowa-wizja-pracy.mdx": () => import('./atomowa-wizja-pracy_DKNfHKQX.mjs'),"/src/content/articles/atomowe-miasto.mdx": () => import('./atomowe-miasto_B-9xWjoO.mjs'),"/src/content/articles/blockchain-cyfrowy-notariusz.mdx": () => import('./blockchain-cyfrowy-notariusz_BaBqndDA.mjs'),"/src/content/articles/globalizm-2-0.mdx": () => import('./globalizm-2-0_BhpKBZLZ.mjs'),"/src/content/articles/gospodarka-2-0.mdx": () => import('./gospodarka-2-0_6b0WwzwF.mjs'),"/src/content/articles/nauka-2-0.mdx": () => import('./nauka-2-0_B2zBR75x.mjs'),"/src/content/articles/odnowa-demokracji.mdx": () => import('./odnowa-demokracji_yYsWHCVx.mjs'),"/src/content/articles/polityka-2-0.mdx": () => import('./polityka-2-0_TNhlvdnm.mjs'),"/src/content/articles/przedsiebiorczosc-w-erze-jawnosci.mdx": () => import('./przedsiebiorczosc-w-erze-jawnosci_Dq4Pyze_.mjs'),"/src/content/articles/synteza-atomowa-ekologia.mdx": () => import('./synteza-atomowa-ekologia_Drawy8y7.mjs'),"/src/content/articles/synteza-atomowa-fundament.mdx": () => import('./synteza-atomowa-fundament_DPY72b-5.mjs'),"/src/content/articles/synteza-atomowa-kapitalizm.mdx": () => import('./synteza-atomowa-kapitalizm_DPX9UYTv.mjs'),"/src/content/articles/synteza-atomowa-socjaldemokracja.mdx": () => import('./synteza-atomowa-socjaldemokracja_DbXufs69.mjs'),"/src/content/articles/synteza-atomowa-socjalizm.mdx": () => import('./synteza-atomowa-socjalizm_Bksg74fI.mjs'),"/src/content/articles/synteza-atomowa-wolność.mdx": () => import('./synteza-atomowa-wolność_BrMev_py.mjs'),"/src/content/articles/szkolnictwo-psp.mdx": () => import('./szkolnictwo-psp_ddcRYvvm.mjs'),"/src/content/articles/web3-twoj-wlasny-internet.mdx": () => import('./web3-twoj-wlasny-internet__UlkUReI.mjs'),"/src/content/articles/zdrowie-dla-wszystkich.mdx": () => import('./zdrowie-dla-wszystkich_BfQ_wYUA.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"articles":{"type":"content","entries":{"ai-cyfrowy-przyjaciel":"/src/content/articles/ai-cyfrowy-przyjaciel.mdx","atomowa-wizja-pracy":"/src/content/articles/atomowa-wizja-pracy.mdx","blockchain-cyfrowy-notariusz":"/src/content/articles/blockchain-cyfrowy-notariusz.mdx","globalizm-2-0":"/src/content/articles/globalizm-2-0.mdx","atomowa-rewolucja":"/src/content/articles/atomowa-rewolucja.mdx","ai-w-sluzbie-panstwa":"/src/content/articles/ai-w-sluzbie-panstwa.mdx","gospodarka-2-0":"/src/content/articles/gospodarka-2-0.mdx","nauka-2-0":"/src/content/articles/nauka-2-0.mdx","atomowa-wies":"/src/content/articles/atomowa-wies.mdx","atomowe-miasto":"/src/content/articles/atomowe-miasto.mdx","odnowa-demokracji":"/src/content/articles/odnowa-demokracji.mdx","polityka-2-0":"/src/content/articles/polityka-2-0.mdx","przedsiebiorczosc-w-erze-jawnosci":"/src/content/articles/przedsiebiorczosc-w-erze-jawnosci.mdx","synteza-atomowa-ekologia":"/src/content/articles/synteza-atomowa-ekologia.mdx","synteza-atomowa-fundament":"/src/content/articles/synteza-atomowa-fundament.mdx","synteza-atomowa-kapitalizm":"/src/content/articles/synteza-atomowa-kapitalizm.mdx","synteza-atomowa-socjaldemokracja":"/src/content/articles/synteza-atomowa-socjaldemokracja.mdx","synteza-atomowa-socjalizm":"/src/content/articles/synteza-atomowa-socjalizm.mdx","synteza-atomowa-wolność":"/src/content/articles/synteza-atomowa-wolność.mdx","szkolnictwo-psp":"/src/content/articles/szkolnictwo-psp.mdx","web3-twoj-wlasny-internet":"/src/content/articles/web3-twoj-wlasny-internet.mdx","zdrowie-dla-wszystkich":"/src/content/articles/zdrowie-dla-wszystkich.mdx"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/articles/ai-cyfrowy-przyjaciel.mdx": () => import('./ai-cyfrowy-przyjaciel_9VBlhjK7.mjs'),"/src/content/articles/ai-w-sluzbie-panstwa.mdx": () => import('./ai-w-sluzbie-panstwa_C9PmRq0r.mjs'),"/src/content/articles/atomowa-rewolucja.mdx": () => import('./atomowa-rewolucja_CNX1-6QS.mjs'),"/src/content/articles/atomowa-wies.mdx": () => import('./atomowa-wies_DKdc7GQS.mjs'),"/src/content/articles/atomowa-wizja-pracy.mdx": () => import('./atomowa-wizja-pracy_C0G2qgDO.mjs'),"/src/content/articles/atomowe-miasto.mdx": () => import('./atomowe-miasto_CF72Tnal.mjs'),"/src/content/articles/blockchain-cyfrowy-notariusz.mdx": () => import('./blockchain-cyfrowy-notariusz_Dhyfaxhj.mjs'),"/src/content/articles/globalizm-2-0.mdx": () => import('./globalizm-2-0_BMZBcuQM.mjs'),"/src/content/articles/gospodarka-2-0.mdx": () => import('./gospodarka-2-0_Bs2ZneR7.mjs'),"/src/content/articles/nauka-2-0.mdx": () => import('./nauka-2-0_CdZMDitn.mjs'),"/src/content/articles/odnowa-demokracji.mdx": () => import('./odnowa-demokracji_2-yJxxp8.mjs'),"/src/content/articles/polityka-2-0.mdx": () => import('./polityka-2-0_C8j_vNG5.mjs'),"/src/content/articles/przedsiebiorczosc-w-erze-jawnosci.mdx": () => import('./przedsiebiorczosc-w-erze-jawnosci_oAOskWD8.mjs'),"/src/content/articles/synteza-atomowa-ekologia.mdx": () => import('./synteza-atomowa-ekologia_COUnDQYY.mjs'),"/src/content/articles/synteza-atomowa-fundament.mdx": () => import('./synteza-atomowa-fundament_czmQEk5d.mjs'),"/src/content/articles/synteza-atomowa-kapitalizm.mdx": () => import('./synteza-atomowa-kapitalizm_Do82Pb_P.mjs'),"/src/content/articles/synteza-atomowa-socjaldemokracja.mdx": () => import('./synteza-atomowa-socjaldemokracja_DpQsd3Zm.mjs'),"/src/content/articles/synteza-atomowa-socjalizm.mdx": () => import('./synteza-atomowa-socjalizm_DaM_3qa_.mjs'),"/src/content/articles/synteza-atomowa-wolność.mdx": () => import('./synteza-atomowa-wolność_B2iNRAE7.mjs'),"/src/content/articles/szkolnictwo-psp.mdx": () => import('./szkolnictwo-psp_C3Li2mLM.mjs'),"/src/content/articles/web3-twoj-wlasny-internet.mdx": () => import('./web3-twoj-wlasny-internet_BFX4OSKv.mjs'),"/src/content/articles/zdrowie-dla-wszystkich.mdx": () => import('./zdrowie-dla-wszystkich_DyhBfznA.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
});

const $$Astro$4 = createAstro();
const $$ArticleList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ArticleList;
  const { articles } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${articles.map((article) => renderTemplate`<a${addAttribute(`/artykuly/${article.slug}`, "href")} class="block rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl no-underline text-black dark:text-white dark:bg-gray-800 group"> <div class="relative pb-56 md:pb-64 lg:pb-72 overflow-hidden"> ${renderComponent($$result, "Image", $$Image, { "src": article.data.cover, "alt": article.data.coverAlt, "class": "absolute inset-0 h-full w-full object-cover transition duration-300 ease-in-out transform group-hover:scale-110" })} </div> <div class="p-6"> <div class="text-sm text-gray-500 dark:text-gray-400 mb-2"> ${new Date(article.data.publishedAt).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </div> <h4 class="text-2xl font-bold mb-2">${article.data.title}</h4> <p class="text-gray-600 dark:text-gray-400 mb-4"> ${article.data.description} </p> <div class="flex flex-wrap mb-4"> ${article.data.tags.map((tag) => renderTemplate`<span class="inline-block border border-gray-300 dark:border-gray-600 rounded-full px-3 py-1 text-xs font-semibold text-gray-600 dark:text-gray-300 mr-2 mb-2">
#${tag} </span>`)} </div> </div> </a>`)} </div>`;
}, "C:/Users/zivavu/Desktop/atomic-hub/src/components/ArticlesFeed/ArticleList.astro", void 0);

const $$ArticlesFeed = createComponent(async ($$result, $$props, $$slots) => {
  const articlesData = await getCollection("articles");
  const sortedArticles = articlesData.sort((a, b) => {
    return new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime();
  });
  return renderTemplate`${maybeRenderHead()}<main class="max-w-7xl mx-auto px-4 sm:px-2 lg:px-8 py-8"> ${renderComponent($$result, "ArticleList", $$ArticleList, { "articles": sortedArticles })} </main>`;
}, "C:/Users/zivavu/Desktop/atomic-hub/src/components/ArticlesFeed/ArticlesFeed.astro", void 0);


const cache = /* @__PURE__ */ new WeakMap();

const $$Astro$3 = createAstro();
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Icon;
  class AstroIconError extends Error {
    constructor(message) {
      super(message);
    }
  }
  const req = Astro2.request;
  const { name = "", title, "is:inline": inline = false, ...props } = Astro2.props;
  const map = cache.get(req) ?? /* @__PURE__ */ new Map();
  const i = map.get(name) ?? 0;
  map.set(name, i + 1);
  cache.set(req, map);
  const includeSymbol = !inline && i === 0;
  let [setName, iconName] = name.split(":");
  if (!setName && iconName) {
    const err = new AstroIconError(`Invalid "name" provided!`);
    throw err;
  }
  if (!iconName) {
    iconName = setName;
    setName = "local";
    if (!icons[setName]) {
      const err = new AstroIconError('Unable to load the "local" icon set!');
      throw err;
    }
    if (!(iconName in icons[setName].icons)) {
      const err = new AstroIconError(`Unable to locate "${name}" icon!`);
      throw err;
    }
  }
  const collection = icons[setName];
  if (!collection) {
    const err = new AstroIconError(`Unable to locate the "${setName}" icon set!`);
    throw err;
  }
  const iconData = getIconData(collection, iconName ?? setName);
  if (!iconData) {
    const err = new AstroIconError(`Unable to locate "${name}" icon!`);
    throw err;
  }
  const id = `ai:${collection.prefix}:${iconName ?? setName}`;
  if (props.size) {
    props.width = props.size;
    props.height = props.size;
    delete props.size;
  }
  const renderData = iconToSVG(iconData);
  const normalizedProps = { ...renderData.attributes, ...props };
  const normalizedBody = renderData.body;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(normalizedProps)}${addAttribute(name, "data-icon")}> ${title && renderTemplate`<title>${title}</title>`} ${inline ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "id": id }, { "default": ($$result2) => renderTemplate`${unescapeHTML(normalizedBody)}` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${includeSymbol && renderTemplate`<symbol${addAttribute(id, "id")}>${unescapeHTML(normalizedBody)}</symbol>`}<use${addAttribute(`#${id}`, "xlink:href")}></use> ` })}`} </svg>`;
}, "C:/Users/zivavu/Desktop/atomic-hub/node_modules/astro-icon/components/Icon.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const ICON_SIZE = 32;
  return renderTemplate`${maybeRenderHead()}<header class="bg-slate-700 text-white sticky top-0 dark:bg-gray-800 py-6 z-50" data-astro-cid-ynjxaszr> <div class="container mx-auto px-6 flex justify-between items-center" data-astro-cid-ynjxaszr> <a href="/" class="text-2xl font-bold" data-astro-cid-ynjxaszr>Atomowy Hub</a> <nav data-astro-cid-ynjxaszr> <ul class="flex space-x-4 items-center" data-astro-cid-ynjxaszr> <li data-astro-cid-ynjxaszr> <a href="https://github.com/zivavu/atomic-hub" target="_blank" rel="noopener noreferrer" title="Odwiedź nasze repozytorium na GitHub" data-astro-cid-ynjxaszr> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:github", "width": ICON_SIZE, "height": ICON_SIZE, "data-astro-cid-ynjxaszr": true })} </a> </li> <li class="relative group" data-astro-cid-ynjxaszr> <button disabled title="Dołącz do naszej społeczności na Discordzie" data-astro-cid-ynjxaszr> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:github", "width": ICON_SIZE, "height": ICON_SIZE, "data-astro-cid-ynjxaszr": true })} </button> </li> <li data-astro-cid-ynjxaszr> <button id="themeToggle" class="theme-toggle" title="Przełącz motyw" data-astro-cid-ynjxaszr> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:weather-night", "width": ICON_SIZE, "height": ICON_SIZE, "class": "dark-icon", "data-astro-cid-ynjxaszr": true })} ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:weather-sunny", "width": ICON_SIZE, "height": ICON_SIZE, "class": "light-icon", "data-astro-cid-ynjxaszr": true })} </button> </li> </ul> </nav> </div> </header>  `;
}, "C:/Users/zivavu/Desktop/atomic-hub/src/components/UI/Header.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro();
const $$RootLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$RootLayout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="pl" class="overflow-y-scroll"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><title>", "</title><script>\n			const theme = (() => {\n				if (\n					typeof localStorage !== 'undefined' &&\n					localStorage.getItem('theme')\n				) {\n					return localStorage.getItem('theme');\n				}\n				if (window.matchMedia('(prefers-color-scheme: dark)').matches) {\n					return 'dark';\n				}\n				return 'light';\n			})();\n			if (theme === 'light') {\n				document.documentElement.classList.remove('dark');\n			} else {\n				document.documentElement.classList.add('dark');\n			}\n			window.localStorage.setItem('theme', theme);\n		<\/script>", '</head> <body class="min-h-svh dark:bg-slate-900"> ', " ", " </body></html>"])), addAttribute(Astro2.generator, "content"), title, renderHead(), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]));
}, "C:/Users/zivavu/Desktop/atomic-hub/src/layouts/RootLayout.astro", void 0);

const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const articles = await getCollection("articles");
  return renderTemplate`${renderComponent($$result, "RootLayout", $$RootLayout, { "title": "Atomowe artyku\u0142y" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ArticlesFeed", $$ArticlesFeed, { "articlesData": articles })} ` })}`;
}, "C:/Users/zivavu/Desktop/atomic-hub/src/pages/artykuly/index.astro", void 0);

const $$file$2 = "C:/Users/zivavu/Desktop/atomic-hub/src/pages/artykuly/index.astro";
const $$url$2 = "/artykuly";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const prerender = true;
async function getStaticPaths() {
  const posts = await getCollection("articles");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$;
  const article = Astro2.props;
  const { Content } = await article.render();
  return renderTemplate`${renderComponent($$result, "RootLayout", $$RootLayout, { "title": article.data.title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> <div class="prose-lg w-full"> <h1>${article.data.title}</h1> ${renderComponent($$result2, "Content", Content, {})} </div> </div> ` })}`;
}, "C:/Users/zivavu/Desktop/atomic-hub/src/pages/artykuly/[...slug].astro", void 0);

const $$file$1 = "C:/Users/zivavu/Desktop/atomic-hub/src/pages/artykuly/[...slug].astro";
const $$url$1 = "/artykuly/[...slug]";

const ____slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file$1,
  getStaticPaths,
  prerender,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

/** @returns {void} */

function run(fn) {
	return fn();
}

function blank_object() {
	return Object.create(null);
}

/**
 * @param {Function[]} fns
 * @returns {void}
 */
function run_all(fns) {
	fns.forEach(run);
}

let current_component;

/** @returns {void} */
function set_current_component(component) {
	current_component = component;
}

const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;

/**
 * Note: this method is performance sensitive and has been optimized
 * https://github.com/sveltejs/svelte/pull/5701
 * @param {unknown} value
 * @returns {string}
 */
function escape(value, is_attr = false) {
	const str = String(value);
	const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
	pattern.lastIndex = 0;
	let escaped = '';
	let last = 0;
	while (pattern.test(str)) {
		const i = pattern.lastIndex - 1;
		const ch = str[i];
		escaped += str.substring(last, i) + (ch === '&' ? '&amp;' : ch === '"' ? '&quot;' : '&lt;');
		last = i + 1;
	}
	return escaped + str.substring(last);
}

let on_destroy;

/** @returns {{ render: (props?: {}, { $$slots, context }?: { $$slots?: {}; context?: Map<any, any>; }) => { html: any; css: { code: string; map: any; }; head: string; }; $$render: (result: any, props: any, bindings: any, slots: any, context: any) => any; }} */
function create_ssr_component(fn) {
	function $$render(result, props, bindings, slots, context) {
		const parent_component = current_component;
		const $$ = {
			on_destroy,
			context: new Map(context || (parent_component ? parent_component.$$.context : [])),
			// these will be immediately discarded
			on_mount: [],
			before_update: [],
			after_update: [],
			callbacks: blank_object()
		};
		set_current_component({ $$ });
		const html = fn(result, props, bindings, slots);
		set_current_component(parent_component);
		return html;
	}
	return {
		render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
			on_destroy = [];
			const result = { title: '', head: '', css: new Set() };
			const html = $$render(result, props, {}, $$slots, context);
			run_all(on_destroy);
			return {
				html,
				css: {
					code: Array.from(result.css)
						.map((css) => css.code)
						.join('\n'),
					map: null // TODO
				},
				head: result.title + result.head
			};
		},
		$$render
	};
}

/** @returns {string} */
function add_attribute(name, value, boolean) {
	if (value == null || (boolean )) return '';
	const assignment = `="${escape(value, true)}"`;
	return ` ${name}${assignment}`;
}

/* C:/Users/zivavu/Desktop/atomic-hub/src/components/UI/Button.svelte generated by Svelte v4.2.17 */

const baseClasses = "inline-block text-white shadow-md hover:shadow-lg rounded focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out";

const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { href = "" } = $$props;
	let { target = "_self" } = $$props;
	let { disabled = false } = $$props;
	let { className = "" } = $$props;
	let { variant = "primary" } = $$props;
	let { type = "button" } = $$props;
	let { size = "medium" } = $$props;

	let { onClick = () => {
		
	} } = $$props;

	const sizeClasses = {
		small: "px-4 py-2 text-xs",
		medium: "px-6 py-2.5 text-sm",
		large: "px-8 py-3 text-base",
		huge: "px-10 py-4 text-lg"
	};

	const variantClasses = {
		primary: "bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800",
		secondary: "bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-800",
		success: "bg-green-600 hover:bg-green-700 focus:bg-green-700 active:bg-green-800",
		danger: "bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800",
		warning: "bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-600 active:bg-yellow-700"
	};

	const allClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className || ""}`;
	if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
	if ($$props.target === void 0 && $$bindings.target && target !== void 0) $$bindings.target(target);
	if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
	if ($$props.className === void 0 && $$bindings.className && className !== void 0) $$bindings.className(className);
	if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
	if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
	if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
	if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0) $$bindings.onClick(onClick);

	return `${href
	? `<a${add_attribute("href", href, 0)}${add_attribute("target", target, 0)} class="${[
			escape(allClasses, true),
			(disabled ? "opacity-50" : "") + ' ' + (disabled ? "cursor-not-allowed" : "")
		].join(' ').trim()}"${add_attribute("aria-disabled", disabled, 0)}><p>${slots.default ? slots.default({}) : ``}</p></a>`
	: `<button${add_attribute("type", type, 0)} ${disabled ? "disabled" : ""} class="${[
			escape(allClasses, true),
			(disabled ? "opacity-50" : "") + ' ' + (disabled ? "cursor-not-allowed" : "")
		].join(' ').trim()}"><p>${slots.default ? slots.default({}) : ``}</p></button>`}`;
});

function setCookie(name, value, days = 7) {
  let expires = "";
  if (days) {
    const date = /* @__PURE__ */ new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1e3);
    expires = `; expires=${date.toUTCString()}`;
  }
  return `${name}=${value }${expires}; path=/`;
}

const frontmatter = {
  "title": "Atomowy Manifest",
  "description": "Wierzymy, że może być inaczej. Chcemy świata, w którym każdy człowiek czuje się doceniony, wysłuchany i ma realny wpływ na otaczającą go rzeczywistość."
};
function _createMdxContent(props) {
  const _components = {
    h1: "h1",
    h2: "h2",
    li: "li",
    ol: "ol",
    p: "p",
    strong: "strong",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "atomowy-manifest",
      children: "Atomowy Manifest"
    }), "\n", createVNode(_components.p, {
      children: "Świat, który znamy, nie działa. Zamiast współpracy - rywalizacja. Zamiast empatii - obojętność. Zamiast prawdy - propaganda. Systemy polityczne, ekonomiczne i społeczne, które miały służyć ludzkości, zbyt często trzymają nas w szachu, dzieląc, ogłupiając, odbierając podmiotowość."
    }), "\n", createVNode(_components.p, {
      children: "Dość tego."
    }), "\n", createVNode(_components.p, {
      children: "Wierzymy, że może być inaczej. Chcemy świata, w którym każdy człowiek czuje się doceniony, wysłuchany i ma realny wpływ na otaczającą go rzeczywistość. Świata, w którym technologia służy dobru wspólnemu, a nie manipulacji i kontroli. Świata, w którym współpraca i dzielenie się wiedzą są podstawą rozwoju, a nie rywalizacja i chciwość."
    }), "\n", createVNode(_components.p, {
      children: "Atomowa Wizja to nie utopia, ale realny cel. To wizja społeczeństwa, w którym każdy z nas jest jak atom - mały, ale ważny element większej całości. Gdzie różnorodność jest siłą, a współpraca kluczem do sukcesu. Gdzie informacja przepływa swobodnie, a technologia służy dobru wspólnemu."
    }), "\n", createVNode(_components.h2, {
      id: "atomowa-wizja-opiera-się-na-kilku-fundamentalnych-zasadach",
      children: "Atomowa Wizja opiera się na kilku fundamentalnych zasadach:"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Jawność i transparentność:"
        }), " Informacje powinny być dostępne dla każdego. Koniec z ukrywaniem, manipulacją i cenzurą. Tylko prawda może nas wyzwolić."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Współpraca i współdzielenie:"
        }), " Zamiast konkurować, powinniśmy współpracować i dzielić się wiedzą, umiejętnościami i zasobami."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Samostanowienie i odpowiedzialność:"
        }), " Każdy ma prawo decydować o sobie i swoim życiu, ale też ponosi odpowiedzialność za swoje wybory."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Technologia w służbie człowieka:"
        }), " Nowoczesne technologie mają służyć ludziom, ułatwiać im życie i rozwiązywać problemy."]
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "jak-to-osiągnąć",
      children: "Jak to osiągnąć?"
    }), "\n", createVNode(_components.p, {
      children: "Przemiana zaczyna się od każdego z nas. Od zmiany naszego myślenia, naszych nawyków, naszych wyborów."
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Zadawaj pytania, myśl krytycznie:"
        }), " Nie przyjmuj bezkrytycznie tego, co mówią Ci media, politycy, autorytety. Weryfikuj fakty, szukaj różnych źródeł informacji, wyciągaj własne wnioski."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Bądź aktywny i zaangażowany:"
        }), " Nie czekaj, aż ktoś inny coś zrobi. Działaj lokalnie, angażuj się w sprawy społeczne, bierz udział w debatach publicznych. Twój głos ma znaczenie."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Wspieraj innowacje i technologie, które służą dobru wspólnemu:"
        }), " Szukaj i promuj rozwiązania, które zwiększają transparentność, ułatwiają współpracę, dają ludziom większą kontrolę nad swoim życiem."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Buduj relacje oparte na zaufaniu i empatii:"
        }), " Słuchaj innych, staraj się zrozumieć ich perspektywę, nawet jeśli się z nią nie zgadzasz. Wspieraj się nawzajem, twórzcie wspólnoty oparte na wartościach."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.strong, {
          children: "Bądź zmianą, którą chcesz widzieć w świecie:"
        }), " Każdy mały krok ma znaczenie. Twoje codzienne wybory, Twoje postawy, Twoje działania - to wszystko składa się na większą całość."]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Atomowa Wizja to nie utopia, to realna możliwość. Już dziś widzimy pierwsze oznaki tej zmiany. Ludzie coraz częściej domagają się prawdy, transparentności, sprawiedliwości. Nowe technologie dają nam narzędzia do budowania lepszego świata. A w każdym z nas drzemie potencjał do stania się świadomym, odpowiedzialnym i współtwórczym Atomem nowego, lepszego świata."
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/zivavu/Desktop/atomic-hub/src/pages/_manifest.mdx";
__astro_tag_component__(Content, 'astro:jsx');

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  Astro2.response.headers.set("Set-Cookie", setCookie("manifest_read", "true"));
  return renderTemplate`${renderComponent($$result, "RootLayout", $$RootLayout, { "title": "Manifest Atomowy" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col justify-center items-center mx-auto px-6 py-12 max-w-4xl"> <div class="prose-lg"> ${renderComponent($$result2, "Manifest", Content, {})} </div> ${renderComponent($$result2, "Button", Button, { "className": "mt-12", "href": "/artykuly", "variant": "secondary", "size": "large" }, { "default": ($$result3) => renderTemplate`
Dowiedz się więcej
` })} </div> ` })}`;
}, "C:/Users/zivavu/Desktop/atomic-hub/src/pages/index.astro", void 0);

const $$file = "C:/Users/zivavu/Desktop/atomic-hub/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { ____slug_ as _, index as a, index$1 as i };