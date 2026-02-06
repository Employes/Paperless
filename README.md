<div class="pb-10">
  <p align="center">

  <a href="https://paperless.employes.nl">
      <img src="https://github.com/Employes/paperless/raw/main/packages/core/src/assets/images/paperless.png" alt="Employes UI" width="400" />
  </a>
  <br />

  <span>
  A collection of Web, React & Angular components that conform to the Employes design system.
  </span>

  </p>

  <div align="center">

[![](https://badgen.net/npm/v/@paperless/core/latest?label=@paperless/core)](https://www.npmjs.com/package/@paperless/core)
[![](https://badgen.net/npm/v/@paperless/angular/latest?label=@paperless/angular)](https://www.npmjs.com/package/@paperless/angular)
[![](https://badgen.net/npm/v/@paperless/react/latest?label=@paperless/react)](https://www.npmjs.com/package/@paperless/react)
[![](https://badgen.net/npm/v/@paperless/conventions/latest?label=@paperless/conventions)](https://www.npmjs.com/package/@paperless/conventions)

  </div>

  <div align="center" >
    <a href="https://paperless.employes.nl">https://paperless.employes.nl</a>
  </div>
</div>

## 📦 Install

#### React

```bash
npm install @paperless/core @paperless/react
```

```bash
yarn add @paperless/core @paperless/react
```

#### Angular

```bash
npm install @paperless/core @paperless/angular
```

```bash
yarn add @paperless/core @paperless/angular
```

#### Web Components

```bash
npm install @paperless/core
```

```bash
yarn add @paperless/core
```

## 🚀 Usage

#### React

```jsx
// setup
import { applyPolyfills, defineCustomElements } from '@paperless/core/loader';

applyPolyfills().then(() => defineCustomElements());

// usage
import { Button } from '@employes/paperless';

const App = () => <Button>Click me!</Button>;
```

#### Angular

```jsx
import { PButton } from '@paperless/angular';

@Component({
	templateUrl: `
      <p-button>Click me!</p-button>
    `,
	imports: [PButton],
})
export class MyComponent {}
```

#### Web Components

Add the following code snippet in your project to start using the components

```javascript
import { defineCustomElements } from '@paperless/core/loader';
defineCustomElements();
```

And in your html:

```html
<p-button>Click me!</p-button>
```

## ⌨️ Typescript

The library is javascript based but types are supported with `d.ts` files.
You should get the types automatically when installing `@paperless/core`.

## 🤝 Contributing [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

We welcome contributions to @paperless!

Read our [contributing
guide](https://github.com/Employes/paperless/blob/main/CONTRIBUTING.md) and help us build or improve our components.

## 📝 License

This project is offered under [Apache
License 2.0](https://github.com/employes/paperless/blob/main/LICENSE).
