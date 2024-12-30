# Silver Bullet plug for mindmap diagram (online)

This plug adds basic [Markmap](https://markmap.js.org) to Silver Bullet.

**Note:** The Markmap library itself is not bundled with this plug, it pulls the JavaScript from the JSDelivr CDN. This means _this plug will not work without an Internet connection_. The reason for this is primarily plug size (bundling the library would amount to 1.1MB). This way Mermaid/Plantuml is only loaded on pages with actual Mermaid/Plantuml diagrams rather than on every SB load.

## Installation

Run the {[Plugs: Add]} command and paste in: `github:malys/silverbullet-mindmap/mindmap.plug.js`

That's all!

## Use

Create a markdwon file using [MarkMap format](https://markmap.js.org/repl).

    ---
    title: markmap
    markmap:
    colorFreezeLevel: 2
    ---

    ## Links

    -[Website](https://markmap.js.org/)
    - [GitHub](https://github.com/gera2ld/markmap)

    ## Related Projects

    -[coc-markmap](https://github.com/gera2ld/coc-markmap) for Neovim
    - [markmap-vscode](https://marketplace.visualstudio.com/items?itemName=gera2ld.markmap-vscode) for VSCode
    - [eaf-markmap](https://github.com/emacs-eaf/eaf-markmap) for Emacs

    ## Features

    Note that if blocks and lists appear at the same level, the lists will be ignored.

    ### Lists

    -**strong** ~~del~~ *italic* ==highlight==
    - `inline code`
    - [x] checkbox
    - Katex: $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$ `<!-- markmap: fold -->`
    - [More Katex Examples](#?d=gist:af76a4c245b302206b16aec503dbe07b:katex.md)
    - Now we can wrap very very very very long text based on `maxWidth` option
    - Ordered list
    1. item 1
    2. item 2

    ### Blocks

    ``js     console.log('hello, JavaScript')     ``

| Products | Price |
| -------- | ----- |
| Apple    | 4     |
| Banana   | 2     |

    ![](https://markmap.js.org/favicon.png)

**Launch "Mindmap Preview: Toggle" and your md file is rendered to mindmap.**

Inspired by [*markdown plug*](https://github.com/silverbulletmd/silverbullet) from @Zef Hemel

