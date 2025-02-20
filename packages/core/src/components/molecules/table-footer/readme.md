# p-table-footer



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                                        | Type       | Default              |
| -------------------- | --------------------- | -------------------------------------------------- | ---------- | -------------------- |
| `enableExport`       | `enable-export`       | Wether to enable export                            | `boolean`  | `true`               |
| `enablePageSize`     | `enable-page-size`    | Wether to enable page size select                  | `boolean`  | `true`               |
| `enablePagination`   | `enable-pagination`   | Wether to enable pagination                        | `boolean`  | `true`               |
| `hideOnSinglePage`   | `hide-on-single-page` | Wether to hide when there is only 1 page available | `boolean`  | `true`               |
| `loading`            | `loading`             | Wether we want to show loading state               | `boolean`  | `false`              |
| `page`               | `page`                | The current page                                   | `number`   | `1`                  |
| `pageSize`           | `page-size`           | The amount of items per page                       | `number`   | `defaultSize`        |
| `pageSizeOptions`    | --                    | The options for the page size                      | `number[]` | `defaultSizeOptions` |
| `total` _(required)_ | `total`               | The total amount of items                          | `number`   | `undefined`          |


## Events

| Event            | Description                     | Type                  |
| ---------------- | ------------------------------- | --------------------- |
| `export`         | Event whenever the page changes | `CustomEvent<number>` |
| `pageChange`     | Event whenever the page changes | `CustomEvent<number>` |
| `pageSizeChange` | Event whenever the page changes | `CustomEvent<number>` |


## Dependencies

### Used by

 - [p-table](../../organisms/table)

### Depends on

- [p-page-size-select](../page-size-select)
- [p-loader](../../atoms/loader)
- [p-pagination](../pagination)
- [p-button](../button)

### Graph
```mermaid
graph TD;
  p-table-footer --> p-page-size-select
  p-table-footer --> p-loader
  p-table-footer --> p-pagination
  p-table-footer --> p-button
  p-page-size-select --> p-dropdown
  p-page-size-select --> p-button
  p-page-size-select --> p-dropdown-menu-item
  p-dropdown --> p-portal
  p-dropdown --> p-dropdown-menu-container
  p-button --> p-icon
  p-button --> p-loader
  p-dropdown-menu-item --> p-icon
  p-pagination --> p-icon
  p-pagination --> p-pagination-item
  p-table --> p-table-footer
  style p-table-footer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
