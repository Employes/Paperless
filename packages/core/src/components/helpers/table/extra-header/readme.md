# p-table-column



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute  | Description                                                                 | Type                                                         | Default     |
| ------------- | ---------- | --------------------------------------------------------------------------- | ------------------------------------------------------------ | ----------- |
| `align`       | `align`    | The alignment of the column                                                 | `"center" \| "end" \| "start"`                               | `"start"`   |
| `name`        | `name`     | The name of the column                                                      | `string`                                                     | `undefined` |
| `parsedSizes` | --         | Parsed sizes based on the complete set of columns                           | `TableColumnSizes`                                           | `undefined` |
| `sizes`       | `sizes`    | The sizes of the column                                                     | `"auto" \| "full" \| "hidden" \| TableColumnSizes \| number` | `"auto"`    |
| `sticky`      | `sticky`   | Wether the column should be sticky (Only works on angular variant of table) | `"secondary" \| boolean`                                     | `false`     |
| `useSlot`     | `use-slot` | Wether the column should use the slot                                       | `boolean`                                                    | `true`      |


## Events

| Event                    | Description                                     | Type                   |
| ------------------------ | ----------------------------------------------- | ---------------------- |
| `tableDefinitionChanged` | Event to let the table know it has to re render | `CustomEvent<boolean>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
