# p-accordion



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute   | Description                        | Type                       | Default     |
| --------------------- | ----------- | ---------------------------------- | -------------------------- | ----------- |
| `closeable`           | `closeable` | Wether the accordion can be closed | `boolean`                  | `true`      |
| `header` _(required)_ | `header`    | Header of the accordion            | `string`                   | `undefined` |
| `open`                | `open`      | Wether the accordion is open       | `boolean`                  | `false`     |
| `openable`            | `openable`  | Wether the accordion can be opened | `boolean`                  | `true`      |
| `variant`             | `variant`   | The variant of the accordion       | `"primary" \| "secondary"` | `'primary'` |


## Events

| Event    | Description       | Type                   |
| -------- | ----------------- | ---------------------- |
| `isOpen` | Open change event | `CustomEvent<boolean>` |


## Dependencies

### Depends on

- [p-icon](../../atoms/icon)
- [p-divider](../../atoms/divider)

### Graph
```mermaid
graph TD;
  p-accordion --> p-icon
  p-accordion --> p-divider
  style p-accordion fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
