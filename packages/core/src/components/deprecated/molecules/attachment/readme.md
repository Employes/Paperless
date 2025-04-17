# p-attachment



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                | Type                | Default     |
| ------------- | ------------- | ------------------------------------------ | ------------------- | ----------- |
| `downloading` | `downloading` | Wether the attachment is downloading       | `boolean`           | `false`     |
| `error`       | `error`       | The error to show                          | `string`            | `undefined` |
| `loading`     | `loading`     | Wether the attachment is uploading/loading | `boolean`           | `false`     |
| `mode`        | `mode`        | The variant of the button                  | `"read" \| "write"` | `'read'`    |


## Events

| Event      | Description                    | Type               |
| ---------- | ------------------------------ | ------------------ |
| `delete`   | Event when delete is pressed   | `CustomEvent<any>` |
| `download` | Event when download is pressed | `CustomEvent<any>` |


## Dependencies

### Depends on

- [p-icon](../../../atoms/icon)
- [p-loader](../../atoms/loader)
- [p-input-error](../input/error)
- [p-button](../../../molecules/button)

### Graph
```mermaid
graph TD;
  p-attachment --> p-icon
  p-attachment --> p-loader
  p-attachment --> p-input-error
  p-attachment --> p-button
  p-input-error --> p-tooltip
  p-input-error --> p-icon
  p-tooltip --> p-portal
  p-button --> p-icon
  p-button --> p-loader
  style p-attachment fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
