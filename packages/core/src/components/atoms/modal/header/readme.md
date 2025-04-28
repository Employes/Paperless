# p-modal-header



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                               | Type      | Default |
| ----------- | ------------ | ----------------------------------------- | --------- | ------- |
| `showClose` | `show-close` | Wether to show the close button on mobile | `boolean` | `true`  |


## Events

| Event   | Description       | Type                      |
| ------- | ----------------- | ------------------------- |
| `close` | Close click event | `CustomEvent<MouseEvent>` |


## Dependencies

### Used by

 - [p-modal](../../../organisms/modal)

### Depends on

- [p-button](../../../molecules/button)
- [p-smile](../../smile)

### Graph
```mermaid
graph TD;
  p-modal-header --> p-button
  p-modal-header --> p-smile
  p-button --> p-icon
  p-button --> p-loader
  p-modal --> p-modal-header
  style p-modal-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
