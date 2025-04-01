# Pagination

## Usage:

```html
<p-pagination total="{100}" />
```

<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                 | Description                                        | Type       | Default              |
| ----------------------- | ------------------------- | -------------------------------------------------- | ---------- | -------------------- |
| `enablePaginationPages` | `enable-pagination-pages` | Wether to enable pagination pages                  | `boolean`  | `true`               |
| `enablePaginationSize`  | `enable-pagination-size`  | Wether to enable pagination size select            | `boolean`  | `true`               |
| `hideOnSinglePage`      | `hide-on-single-page`     | Wether to hide when there is only 1 page available | `boolean`  | `true`               |
| `page`                  | `page`                    | The current page                                   | `number`   | `1`                  |
| `pageSize`              | `page-size`               | The amount of items per page                       | `number`   | `defaultSize`        |
| `pageSizeOptions`       | --                        | The options for the page size                      | `number[]` | `defaultSizeOptions` |
| `total` _(required)_    | `total`                   | The total amount of items                          | `number`   | `undefined`          |


## Events

| Event            | Description                     | Type                  |
| ---------------- | ------------------------------- | --------------------- |
| `pageChange`     | Event whenever the page changes | `CustomEvent<number>` |
| `pageSizeChange` | Event whenever the page changes | `CustomEvent<number>` |


## Dependencies

### Depends on

- [p-pagination-size](../pagination-size)
- [p-divider](../../atoms/divider)
- [p-pagination-pages](../pagination-pages)

### Graph
```mermaid
graph TD;
  p-pagination --> p-pagination-size
  p-pagination --> p-divider
  p-pagination --> p-pagination-pages
  p-pagination-size --> p-dropdown
  p-pagination-size --> p-icon
  p-pagination-size --> p-dropdown-menu-item
  p-dropdown --> p-portal
  p-dropdown --> p-dropdown-menu-container
  p-dropdown-menu-item --> p-icon
  p-dropdown-menu-item --> p-checkbox
  p-checkbox --> p-icon
  p-pagination-pages --> p-pagination-pages-item
  p-pagination-pages --> p-icon
  style p-pagination fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
