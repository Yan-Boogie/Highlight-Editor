<h1 align="center">SkyEye-Highlight-Editor</h1>

<p align="center">Providing 'A4N Highlighting' functionality on top of Slate framework.</p>

<p align="center">
  <img src="https://i.imgur.com/DZTKVX9.png" />
</p>

## Packages

SkyEye-Highlight-Editor is a monorepo managed with [Lerna](https://lerna.js.org/).
It currently has one package which is:

| **Package**                                                     | **Description**                                                  | **Status** |
| --------------------------------------------------------------- | ---------------------------------------------------------------- | ---------- |
| [`skyeye-highlight-editor`](./packages/skyeye-highlight-editor) | Provides main highlighter functionalities by custom hooks format | `Complete` |

## Demo

Check out the demo by the following setup instructions:

> Clone the repo

```bash
git clone git@github.com:scoutAsia/SkyEye-Highlight-Editor.git
```

> Install package dependencies

```bash
yarn || npm install
```

> Build packages

```bash
yarn build:rollup || npm run build:rollup
```

> Run Next.js project in split terminal

```bash
yarn start || npm run start
```

> Open website

```bash
yarn open || npm run open
```

## Run test

```bash
yarn highlight-editor:test || npm run highlight-editor:test
```
