# p-table-cell



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                        | Type                                              | Default                                         |
| ----------------- | ------------------- | ---------------------------------- | ------------------------------------------------- | ----------------------------------------------- |
| `checkbox`        | `checkbox`          | The checkbox to show               | `any`                                             | `undefined`                                     |
| `definition`      | `definition`        | The definition of the table column | `TableColumn`                                     | `undefined`                                     |
| `index`           | `index`             | The index of the column            | `number`                                          | `undefined`                                     |
| `item`            | `item`              | The item in question               | `any`                                             | `undefined`                                     |
| `rowIndex`        | `row-index`         | The index of the row               | `number`                                          | `undefined`                                     |
| `tableHasActions` | `table-has-actions` | Wether the table has actions       | `boolean`                                         | `false`                                         |
| `template`        | `template`          | The template to show               | `(data: TableDefinitionData) => any`              | `({ 		value, 	}: TableDefinitionData) => value` |
| `value`           | `value`             | The value of the column            | `any`                                             | `undefined`                                     |
| `variant`         | `variant`           | The variant of the column          | `"actions" \| "default" \| "header" \| "loading"` | `'default'`                                     |


## Dependencies

### Used by

 - [p-table](../../../organisms/table)

### Depends on

- [p-loader](../../../atoms/loader)

### Graph
```mermaid
graph TD;
  p-table-cell --> p-loader
  p-table --> p-table-cell
  style p-table-cell fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
