# p-info-panel



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                    | Type                                               | Default     |
| ----------- | ----------- | ------------------------------ | -------------------------------------------------- | ----------- |
| `closeable` | `closeable` | Wether the panel can be closed | `boolean`                                          | `false`     |
| `content`   | `content`   | The content of the info panel  | `string`                                           | `undefined` |
| `header`    | `header`    | The header of the info panel   | `string`                                           | `undefined` |
| `variant`   | `variant`   | The variant of the info panel  | `"info" \| "negative" \| "positive" \| "unbiased"` | `'info'`    |


## Events

| Event    | Description                  | Type                |
| -------- | ---------------------------- | ------------------- |
| `closed` | When the backdrop is clicked | `CustomEvent<void>` |


## Dependencies

### Depends on

- [p-icon](../../../atoms/icon)

### Graph
```mermaid
graph TD;
  p-info-panel --> p-icon
  style p-info-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
