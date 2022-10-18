# Table Header

## Usage:

```html
<p-table-header>
    <!-- content -->
</p-table-header>
```

<!-- Auto Generated Below -->


## Properties

| Property                      | Attribute                        | Description                             | Type                         | Default                                                                                                                                                                                                                                                                 |
| ----------------------------- | -------------------------------- | --------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `activeQuickFilterIdentifier` | `active-quick-filter-identifier` | Active quick filter identifier          | `string`                     | `undefined`                                                                                                                                                                                                                                                             |
| `canEdit`                     | `can-edit`                       | Wether to enable the edit button        | `boolean`                    | `false`                                                                                                                                                                                                                                                                 |
| `editButtonTemplate`          | --                               | The template for the edit button text   | `(amount: number) => string` | `(amount: number) =>         formatTranslation(             amount === 0                 ? this._locales.edit                 : amount === 1                 ? this._locales.edit_single                 : this._locales.edit_plural,             { amount }         )` |
| `enableEdit`                  | `enable-edit`                    | Wether to show the edit button          | `boolean`                    | `true`                                                                                                                                                                                                                                                                  |
| `enableFilter`                | `enable-filter`                  | Wether to show the filter button        | `boolean`                    | `true`                                                                                                                                                                                                                                                                  |
| `enableSearch`                | `enable-search`                  | Wether to show the search input         | `boolean`                    | `true`                                                                                                                                                                                                                                                                  |
| `filterButtonTemplate`        | --                               | The template for the filter button text | `() => string`               | `() =>         formatTranslation(this._locales.filter)`                                                                                                                                                                                                                 |
| `itemsSelectedAmount`         | `items-selected-amount`          | The amount of items that are selected   | `number`                     | `0`                                                                                                                                                                                                                                                                     |
| `query`                       | `query`                          | The query to show in the search bar     | `string`                     | `undefined`                                                                                                                                                                                                                                                             |
| `quickFilters`                | --                               | Quick filters to show                   | `QuickFilter[]`              | `[]`                                                                                                                                                                                                                                                                    |
| `selectedFiltersAmount`       | `selected-filters-amount`        | The amount of filters being selected    | `number`                     | `undefined`                                                                                                                                                                                                                                                             |


## Events

| Event         | Description                                    | Type                       |
| ------------- | ---------------------------------------------- | -------------------------- |
| `edit`        | Event when the edit button is clicked          | `CustomEvent<null>`        |
| `filter`      | Event when the filter button is clicked        | `CustomEvent<null>`        |
| `queryChange` | Event when the query changes                   | `CustomEvent<string>`      |
| `quickFilter` | Event when one of the quick filters is clicked | `CustomEvent<QuickFilter>` |


## Dependencies

### Used by

 - [p-table](../../organisms/table)

### Depends on

- [p-segment-container](../../atoms/segment-container)
- [p-segment-item](../../atoms/segment-item)
- [p-input-group](../input-group)
- [p-button](../../atoms/button)
- [p-tag](../../atoms/tag)

### Graph
```mermaid
graph TD;
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
  p-table --> p-table-header
  style p-table-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*