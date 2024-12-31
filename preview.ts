import {
  asset,
  clientStore,
  editor,
  system,
} from "@silverbulletmd/silverbullet/syscalls";
import { encodeBase64 } from "@std/encoding";

export async function updateMindMapPreview() {
  try {
    if (!(await clientStore.get("enableMindMapPreview"))) {
      return;
    }
    const content = await editor.getText();
    const contentBase64 = encodeBase64(content);

    const css = await asset.readAsset("markdown", "assets/preview.css");
    const js = await asset.readAsset("markdown", "assets/preview.js");

    const mindmapJS = `
loadJsByUrl("https://cdn.jsdelivr.net/npm/markmap-lib", "sha256-ulWyGiHbVRTYcTWQHIHT/r9sLSbO/4M6ZwoGj08JKcE=").then(() => {

  const { Transformer } = window.markmap;
  const transformer = new Transformer();
  const { root } = transformer.transform(atob("${contentBase64}"));
  loadJsByUrl("https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js", "sha256-8glLv2FBs1lyLE/kVOtsSw8OQswQzHr5IfwVj864ZTk=").then(() => {
    loadJsByUrl("https://cdn.jsdelivr.net/npm/markmap-view@0.18.4/dist/browser/index.js", "sha256-t0E4SeDTbZw4QNtQ/RqxPvK+wvw4oSYO1k4x0I1RKAE=").then(() => {
      ((getMarkmap, getOptions, root22, jsonOptions) => {
        const markmap = getMarkmap();
        window.mm = markmap.Markmap.create(
          "svg#mindmap",
          (getOptions || markmap.deriveOptions)(jsonOptions),
          root22
        );
      })(() => window.markmap, null, root, null)
    });
  });
});
  `

    const customStyles = await editor.getUiOption("customStyles");
    const toolbar = renderToolbar();
    await editor.showPanel(
      "rhs",
      2,
      `
      <link rel="stylesheet" href="/.client/main.css" />
      <style>
        ${css}
        ${customStyles ?? ""}
        * {
          margin: 0;
          padding: 0;
        }
        #mindmap {
          display: block;
          width: 100vw;
          height: 100vh;
        }
      </style>
      <div id="root" class="sb-preview">${toolbar}<svg id="mindmap"></svg></div>
    `,
      js + mindmapJS,
    );
  } catch (err) {
    console.error("plugin failed", err);
  }
}

function renderToolbar(): string {
  return `<div class="sb-mindmap-toolbar">
            <button onClick="window.print()">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="feather feather-printer">
                <polyline points="6 9 6 2 18 2 18 9"/>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                <rect x="6" y="14" width="12" height="8"/>
              </svg>
            </button>
          </div>`;
}

export async function previewClickHandler(e: any) {
  const [eventName, arg] = JSON.parse(e);
  // console.log("Got click", eventName, arg);
  switch (eventName) {
    case "pos":
      // console.log("Moving cursor to", +arg);
      await editor.moveCursor(+arg, true);
      break;
    case "command":
      await system.invokeCommand(arg);
      break;
  }
}
