# p-drawer-header



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

 - [p-drawer](../../../organisms/drawer)

### Depends on

- [p-button](../../../../molecules/button)

### Graph
```mermaid
graph TD;
  p-drawer-header --> p-button
  p-button --> p-icon
  p-button --> p-loader
  p-drawer --> p-drawer-header
  style p-drawer-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
