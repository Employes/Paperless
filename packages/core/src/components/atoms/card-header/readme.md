# Card Header

## Usage:

```html
<p-card-header header="Title">
    <div slot="prefix">
        <!-- prefix content -->
    </div>
    <div slot="suffix">
        <!-- suffix content -->
    </div>
</p-card-header>
```

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                | Type      | Default     |
| -------- | --------- | -------------------------- | --------- | ----------- |
| `arrow`  | `arrow`   | Enable the title arrow     | `boolean` | `false`     |
| `header` | `header`  | Content of the card header | `string`  | `undefined` |


## Dependencies

### Depends on

- [p-icon](../icon)

### Graph
```mermaid
graph TD;
  p-card-header --> p-icon
  style p-card-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
