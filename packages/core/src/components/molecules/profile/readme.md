# Profile

## Usage:

```html
<p-profile>
    <p-avatar slot="avatar" />
    <span slot="title">John Doe</span>
    <span slot="subtitle">Software Engineer</span>
</p-profile>
```

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                    | Type                                                                | Default   |
| --------- | --------- | ------------------------------ | ------------------------------------------------------------------- | --------- |
| `size`    | `size`    | The size of the profile avatar | `"large" \| "medium" \| "small" \| "table" \| "xlarge" \| "xsmall"` | `'small'` |
| `variant` | `variant` | The variant of the profile     | `"company" \| "user"`                                               | `'user'`  |


## Dependencies

### Depends on

- [p-dropdown](../dropdown)
- [p-icon](../../atoms/icon)

### Graph
```mermaid
graph TD;
  p-profile --> p-dropdown
  p-profile --> p-icon
  p-dropdown --> p-portal
  p-dropdown --> p-dropdown-menu-container
  style p-profile fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
