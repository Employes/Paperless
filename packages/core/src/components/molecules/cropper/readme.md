# p-cropper



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                       | Type                   | Default     |
| ------------ | ------------- | --------------------------------- | ---------------------- | ----------- |
| `returnType` | `return-type` | The return type of the onchange   | `"base64" \| "canvas"` | `'base64'`  |
| `value`      | `value`       | The image to crop (url or base64) | `string`               | `undefined` |


## Events

| Event         | Description                  | Type               |
| ------------- | ---------------------------- | ------------------ |
| `valueChange` | Event when the value changes | `CustomEvent<any>` |


## Dependencies

### Depends on

- [p-range](../range)

### Graph
```mermaid
graph TD;
  p-cropper --> p-range
  p-range --> p-icon
  style p-cropper fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
