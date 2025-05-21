# p-attachment



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                         | Type                        | Default              |
| ----------------- | ------------------ | --------------------------------------------------- | --------------------------- | -------------------- |
| `deleteTooltip`   | `delete-tooltip`   | The text for the delete tooltip                     | `string`                    | `'Delete'`           |
| `downloadTooltip` | `download-tooltip` | The text for the download tooltip                   | `string`                    | `'Download'`         |
| `error`           | `error`            | The error to show                                   | `string`                    | `undefined`          |
| `helper`          | `helper`           | The helper of the attachment                        | `HTMLSlotElement \| string` | `undefined`          |
| `label`           | `label`            | The label of the attachment                         | `HTMLSlotElement \| string` | `undefined`          |
| `loading`         | `loading`          | Wether the attachment is loading                    | `boolean`                   | `false`              |
| `mode`            | `mode`             | The variant of the attachment                       | `"read" \| "write"`         | `'read'`             |
| `placeholder`     | `placeholder`      | The placeholder of the attachment                   | `string`                    | `'Upload a file...'` |
| `required`        | `required`         | Wether the attachment is required                   | `boolean`                   | `true`               |
| `uploadTooltip`   | `upload-tooltip`   | The text for the upload tooltip                     | `string`                    | `'Upload'`           |
| `value`           | `value`            | The value of the attachment (usually the file name) | `string`                    | `undefined`          |


## Events

| Event      | Description                    | Type                |
| ---------- | ------------------------------ | ------------------- |
| `delete`   | Event when delete is pressed   | `CustomEvent<void>` |
| `download` | Event when download is pressed | `CustomEvent<void>` |
| `upload`   | Event when upload is pressed   | `CustomEvent<void>` |


## Dependencies

### Depends on

- [p-icon](../../atoms/icon)
- [p-loader](../../atoms/loader)
- [p-field-container](../field/container)
- [p-tooltip](../../atoms/tooltip)
- [p-button](../button)

### Graph
```mermaid
graph TD;
  p-attachment --> p-icon
  p-attachment --> p-loader
  p-attachment --> p-field-container
  p-attachment --> p-tooltip
  p-attachment --> p-button
  p-field-container --> p-loader
  p-field-container --> p-helper
  p-field-container --> p-tooltip
  p-helper --> p-tooltip
  p-helper --> p-icon
  p-tooltip --> p-portal
  p-button --> p-icon
  p-button --> p-loader
  style p-attachment fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
