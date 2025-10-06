# p-pagination-size



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                        | Type                        | Default                                |
| -------------- | --------------- | -------------------------------------------------- | --------------------------- | -------------------------------------- |
| `hidden`       | `hidden`        | Wether to hide when there is only 1 page available | `boolean`                   | `false`                                |
| `itemTemplate` | `item-template` | The template for the data view                     | `(value: number) => string` | `this._defaultItemTemplate`            |
| `size`         | `size`          | The current page                                   | `number`                    | `PAGINATION_DEFAULT_PAGE_SIZE`         |
| `sizeOptions`  | `size-options`  | The available sizes                                | `number[]`                  | `PAGINATION_DEFAULT_PAGE_SIZE_OPTIONS` |


## Events

| Event        | Description                     | Type                  |
| ------------ | ------------------------------- | --------------------- |
| `sizeChange` | Event whenever the size changes | `CustomEvent<number>` |


## Dependencies

### Used by

 - [p-pagination](../pagination)

### Depends on

- [p-dropdown](../../dropdown)
- [p-icon](../../../atoms/icon)
- [p-dropdown-menu-item](../../../atoms/dropdown-menu/item)

### Graph
```mermaid
graph TD;
  p-pagination-size --> p-dropdown
  p-pagination-size --> p-icon
  p-pagination-size --> p-dropdown-menu-item
  p-dropdown --> p-dropdown-menu-container
  p-dropdown-menu-item --> p-icon
  p-dropdown-menu-item --> p-checkbox
  p-checkbox --> p-icon
  p-pagination --> p-pagination-size
  style p-pagination-size fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
