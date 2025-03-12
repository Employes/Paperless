# p-input-error



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                      | Type      | Default     |
| ------------------ | -------------------- | -------------------------------- | --------- | ----------- |
| `error`            | `error`              | The error to show                | `string`  | `undefined` |
| `forceShowTooltip` | `force-show-tooltip` | Wether to force show the tooltip | `boolean` | `false`     |


## Dependencies

### Used by

 - [p-attachment](../attachment)

### Depends on

- [p-tooltip](../../atoms/tooltip)
- [p-icon](../../atoms/icon)

### Graph
```mermaid
graph TD;
  p-input-error --> p-tooltip
  p-input-error --> p-icon
  p-tooltip --> p-portal
  p-attachment --> p-input-error
  style p-input-error fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
