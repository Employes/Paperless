# Input Group

## Usage:

```html
<p-input-group icon="icon" label="Name" helper="Helper">
    <input slot="input" />
</p-input-group>

<!-- or -->

<p-input-group icon="icon">
    <span slot="label">Name</span>
    <span slot="helper">Helper</span>
    <input slot="input" />
</p-input-group>
```

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                        | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Default     |
| ------------ | ------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `disabled`   | `disabled`    | Wether the input group is disabled | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `false`     |
| `error`      | `error`       | The helper of the input group      | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `undefined` |
| `focused`    | `focused`     | Wether the input group is focused  | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `false`     |
| `helper`     | `helper`      | The helper of the input group      | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `undefined` |
| `icon`       | `icon`        | Icon of the navigation item        | `"arrow" \| "attachment" \| "bread" \| "calendar" \| "car" \| "checklist" \| "checkmark" \| "chevron" \| "clock" \| "cogs" \| "comment" \| "document" \| "download" \| "envelope" \| "explanation" \| "eye" \| "filter" \| "folder" \| "grid" \| "headset" \| "integration" \| "list" \| "location" \| "megaphone" \| "minus" \| "negative" \| "pagination" \| "payment" \| "pencil" \| "person" \| "plus" \| "question" \| "receipt" \| "report" \| "search" \| "settings" \| "sick" \| "tachometer" \| "task" \| "template" \| "tool" \| "trash" \| "turn" \| "upload" \| "warning"` | `undefined` |
| `iconFlip`   | `icon-flip`   | Icon flip                          | `"horizontal" \| "vertical"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `undefined` |
| `iconRotate` | `icon-rotate` | Icon rotate                        | `-135 \| -180 \| -225 \| -25 \| -270 \| -315 \| -45 \| -90 \| 0 \| 135 \| 180 \| 225 \| 25 \| 270 \| 315 \| 45 \| 90`                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `undefined` |
| `label`      | `label`       | The label of the input group       | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `undefined` |
| `prefix`     | `prefix`      | The prefix of the input group      | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `undefined` |
| `suffix`     | `suffix`      | The suffix of the input group      | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `undefined` |


## Dependencies

### Depends on

- [p-helper](../../atoms/helper)
- [p-icon](../../atoms/icon)
- [p-tooltip](../../atoms/tooltip)

### Graph
```mermaid
graph TD;
  p-input-group --> p-helper
  p-input-group --> p-icon
  p-input-group --> p-tooltip
  p-helper --> p-tooltip
  style p-input-group fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*