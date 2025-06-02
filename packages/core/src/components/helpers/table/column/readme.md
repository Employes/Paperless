# p-table-column



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                           | Type                                                         | Default     |
| ------------- | -------------- | ----------------------------------------------------- | ------------------------------------------------------------ | ----------- |
| `align`       | `align`        | The alignment of the column                           | `"center" \| "end" \| "start"`                               | `'start'`   |
| `hasCheckbox` | `has-checkbox` | Wether the column should have a checkbox              | `boolean`                                                    | `false`     |
| `name`        | `name`         | The name of the column                                | `string`                                                     | `undefined` |
| `parsedSizes` | `parsed-sizes` | Parsed sizes based on the complete set of columns     | `TableColumnSizes`                                           | `undefined` |
| `path`        | `path`         | The path of the value of the item you want to display | `string`                                                     | `undefined` |
| `sizes`       | `sizes`        | The sizes of the column                               | `"auto" \| "full" \| "hidden" \| TableColumnSizes \| number` | `'auto'`    |
| `type`        | `type`         | The type of the column                                | `"td" \| "th"`                                               | `'td'`      |
| `useSlot`     | `use-slot`     | Wether the column should use the slot                 | `boolean`                                                    | `false`     |


## Events

| Event                    | Description                                     | Type                   |
| ------------------------ | ----------------------------------------------- | ---------------------- |
| `tableDefinitionChanged` | Event to let the table know it has to re render | `CustomEvent<boolean>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
