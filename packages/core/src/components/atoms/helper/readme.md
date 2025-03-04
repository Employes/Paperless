# Helper

## Usage:

```html
<p-helper>Content of the tooltip</p-helper>
```

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                           | Type                                                                                                                                                                 | Default      |
| ----------- | ----------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `placement` | `placement` | The placement of the helper popover   | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'top'`      |
| `strategy`  | `strategy`  | The strategy of the popover placement | `"absolute" \| "fixed"`                                                                                                                                              | `'absolute'` |


## Dependencies

### Used by

 - [p-input-group](../../molecules/input-group)

### Depends on

- [p-tooltip](../tooltip)

### Graph
```mermaid
graph TD;
  p-helper --> p-tooltip
  p-input-group --> p-helper
  style p-helper fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
