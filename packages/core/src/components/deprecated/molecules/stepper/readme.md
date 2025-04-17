# p-stepper



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                                               | Type                         | Default        |
| ------------------ | -------------------- | --------------------------------------------------------- | ---------------------------- | -------------- |
| `activeStep`       | `active-step`        | The currently active step                                 | `number`                     | `1`            |
| `contentPosition`  | `content-position`   | The position of the content in case of vertical direction | `"end" \| "start"`           | `'end'`        |
| `direction`        | `direction`          | The direction of the stepper                              | `"horizontal" \| "vertical"` | `'horizontal'` |
| `enableAutoStatus` | `enable-auto-status` | Wether to automatically apply active & finished to items  | `boolean`                    | `true`         |


## Dependencies

### Depends on

- [p-stepper-line](../../atoms/stepper/line)

### Graph
```mermaid
graph TD;
  p-stepper --> p-stepper-line
  style p-stepper fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
