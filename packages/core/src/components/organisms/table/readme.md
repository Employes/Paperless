# Table

## Usage:

```html
<p-table>
    <p-table-definition />
</p-table>
```

<!-- Auto Generated Below -->


## Properties

| Property                      | Attribute                        | Description                                 | Type                        | Default              |
| ----------------------------- | -------------------------------- | ------------------------------------------- | --------------------------- | -------------------- |
| `activeQuickFilterIdentifier` | `active-quick-filter-identifier` | Active quick filter identifier              | `string`                    | `undefined`          |
| `canSelectKey`                | `can-select-key`                 | A key to determine if a row can be selected | `string`                    | `undefined`          |
| `editButtonTemplate`          | --                               | The template for the edit button text       | `(value: number) => string` | `undefined`          |
| `enableEdit`                  | `enable-edit`                    | Wether to show the edit button              | `boolean`                   | `true`               |
| `enableExport`                | `enable-export`                  | Wether to enable export                     | `boolean`                   | `true`               |
| `enableFilter`                | `enable-filter`                  | Wether to show the filter button            | `boolean`                   | `true`               |
| `enablePageSize`              | `enable-page-size`               | Wether to enable page size select           | `boolean`                   | `true`               |
| `enablePagination`            | `enable-pagination`              | Wether to enable pagination                 | `boolean`                   | `true`               |
| `enableRowSelection`          | `enable-row-selection`           | Wether to enable selection                  | `boolean`                   | `true`               |
| `enableSearch`                | `enable-search`                  | Wether to show the search input             | `boolean`                   | `true`               |
| `filterButtonTemplate`        | --                               | The template for the filter button text     | `(value: number) => string` | `undefined`          |
| `items`                       | `items`                          | The items to be fed to the table            | `string`                    | `undefined`          |
| `page`                        | `page`                           | The current page                            | `number`                    | `1`                  |
| `pageSize`                    | `page-size`                      | The amount of items per page                | `number`                    | `defaultSize`        |
| `pageSizeOptions`             | --                               | The options for the page size               | `number[]`                  | `defaultSizeOptions` |
| `query`                       | `query`                          | The query to show in the search bar         | `string`                    | `undefined`          |
| `quickFilters`                | --                               | Quick filters to show                       | `QuickFilter[]`             | `[]`                 |
| `selectedFiltersAmount`       | `selected-filters-amount`        | The amount of filters being selected        | `number`                    | `undefined`          |
| `selectedRows`                | --                               | The current selection of items              | `any[]`                     | `[]`                 |
| `selectionKey`                | `selection-key`                  | The key to determine if a row is selected   | `string`                    | `undefined`          |
| `total` _(required)_          | `total`                          | The total amount of items                   | `number`                    | `undefined`          |


## Events

| Event                | Description                                    | Type                       |
| -------------------- | ---------------------------------------------- | -------------------------- |
| `edit`               | Event when the edit button is clicked          | `CustomEvent<null>`        |
| `export`             | Event whenever the page changes                | `CustomEvent<number>`      |
| `filter`             | Event when the filter button is clicked        | `CustomEvent<null>`        |
| `pageChange`         | Event whenever the page changes                | `CustomEvent<number>`      |
| `pageSizeChange`     | Event whenever the page changes                | `CustomEvent<number>`      |
| `queryChange`        | Event when the query changes                   | `CustomEvent<string>`      |
| `quickFilter`        | Event when one of the quick filters is clicked | `CustomEvent<QuickFilter>` |
| `rowClick`           | Event whenever a row is clicked                | `CustomEvent<any>`         |
| `rowDeselected`      | Event whenever a row is deselected             | `CustomEvent<any>`         |
| `rowSelected`        | Event whenever a row is selected               | `CustomEvent<any>`         |
| `selectedRowsChange` | Event whenever the current selection changes   | `CustomEvent<any>`         |


## Dependencies

### Depends on

- [p-table-container](../../atoms/table-container)
- [p-table-header](../../molecules/table-header)
- [p-table-footer](../../molecules/table-footer)
- [p-table-row](../../molecules/table-row)

### Graph
```mermaid
graph TD;
  p-table --> p-table-container
  p-table --> p-table-header
  p-table --> p-table-footer
  p-table --> p-table-row
  p-table-header --> p-segment-container
  p-table-header --> p-segment-item
  p-table-header --> p-input-group
  p-table-header --> p-button
  p-table-header --> p-tag
  p-segment-item --> p-icon
  p-input-group --> p-helper
  p-input-group --> p-icon
  p-input-group --> p-tooltip
  p-helper --> p-tooltip
  p-button --> p-icon
  p-button --> p-loader
  p-table-footer --> p-page-size-select
  p-table-footer --> p-pagination
  p-table-footer --> p-button
  p-page-size-select --> p-dropdown
  p-page-size-select --> p-button
  p-page-size-select --> p-dropdown-menu-item
  p-dropdown --> p-dropdown-menu-container
  p-dropdown-menu-item --> p-icon
  p-pagination --> p-icon
  p-pagination --> p-pagination-item
  p-table-row --> p-divider
  style p-table fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*