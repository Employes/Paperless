# p-page-size-select



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                        | Type                        | Default                       |
| ----------------- | ------------------ | -------------------------------------------------- | --------------------------- | ----------------------------- |
| `buttonSize`      | `button-size`      | The size of the button                             | `"base" \| "sm"`            | `'sm'`                        |
| `buttonTemplate`  | --                 | The template for the data view                     | `(value: number) => string` | `this._defaultButtonTemplate` |
| `chevronPosition` | `chevron-position` | Chevron position                                   | `"end" \| "start"`          | `'start'`                     |
| `hidden`          | `hidden`           | Wether to hide when there is only 1 page available | `boolean`                   | `false`                       |
| `itemTemplate`    | --                 | The template for the data view                     | `(value: number) => string` | `this._defaultItemTemplate`   |
| `size`            | `size`             | The current page                                   | `number`                    | `defaultSize`                 |
| `sizeOptions`     | --                 | The available sizes                                | `number[]`                  | `defaultSizeOptions`          |


## Events

| Event        | Description                     | Type                  |
| ------------ | ------------------------------- | --------------------- |
| `sizeChange` | Event whenever the size changes | `CustomEvent<number>` |


## Dependencies

### Used by

 - [p-table-footer](../table-footer)

### Depends on

- [p-dropdown](../dropdown)
- [p-button](../button)
- [p-dropdown-menu-item](../../atoms/dropdown-menu-item)

### Graph
```mermaid
graph TD;
  p-page-size-select --> p-dropdown
  p-page-size-select --> p-button
  p-page-size-select --> p-dropdown-menu-item
  p-dropdown --> p-portal
  p-dropdown --> p-dropdown-menu-container
  p-button --> p-icon
  p-button --> p-loader
  p-dropdown-menu-item --> p-icon
  p-dropdown-menu-item --> p-checkbox
  p-checkbox --> p-icon
  p-table-footer --> p-page-size-select
  style p-page-size-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
