# p-loader



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                           | Type                                                              | Default     |
| ------------------ | ------------------- | ----------------------------------------------------- | ----------------------------------------------------------------- | ----------- |
| `color`            | `color`             | Color of the loader                                   | `"indigo" \| "off-white" \| "storm" \| "white"`                   | `'indigo'`  |
| `modalDescription` | `modal-description` | !NOT IMPLEMENTED! Modal description for modal variant | `string`                                                          | `undefined` |
| `modalTitle`       | `modal-title`       | !NOT IMPLEMENTED! Modal title for modal variant       | `string`                                                          | `undefined` |
| `show`             | `show`              | Wether to show or hide the loader                     | `Observable<boolean> \| boolean`                                  | `true`      |
| `variant`          | `variant`           | Variant of loader                                     | `"full-screen" \| "full-width" \| "ghost" \| "inline" \| "modal"` | `'inline'`  |


## Dependencies

### Used by

 - [p-button](../../molecules/button)
 - [p-field-container](../../molecules/field/container)
 - [p-floating-menu-item](../floating-menu/item)
 - [p-navigation-item](../../molecules/navigation/item)
 - [p-select](../../molecules/select)
 - [p-table](../../organisms/table)
 - [p-table-cell](../../molecules/table/cell)
 - [p-table-header](../../molecules/table/header)

### Graph
```mermaid
graph TD;
  p-button --> p-loader
  p-field-container --> p-loader
  p-floating-menu-item --> p-loader
  p-navigation-item --> p-loader
  p-select --> p-loader
  p-table --> p-loader
  p-table-cell --> p-loader
  p-table-header --> p-loader
  style p-loader fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
