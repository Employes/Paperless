# p-dropdown



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                                                   | Type                                                                                                                                                                 | Default          |
| --------------------- | ----------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `allowOverflow`       | `allow-overflow`        | Wether to allow overflow in the container                                     | `boolean`                                                                                                                                                            | `false`          |
| `applyChevron`        | `apply-chevron`         | Wether to apply chevron automatically                                         | `boolean`                                                                                                                                                            | `true`           |
| `applyFullWidth`      | `apply-full-width`      | Wether to apply the full width                                                | `boolean`                                                                                                                                                            | `true`           |
| `applyMaxWidth`       | `apply-max-width`       | Wether to apply the max width                                                 | `boolean`                                                                                                                                                            | `true`           |
| `chevronDirection`    | `chevron-direction`     | Chevron direction                                                             | `"down" \| "up"`                                                                                                                                                     | `undefined`      |
| `chevronPosition`     | `chevron-position`      | Chevron position                                                              | `"end" \| "start"`                                                                                                                                                   | `'end'`          |
| `containerClass`      | `container-class`       | The class of the dropdown container                                           | `string`                                                                                                                                                             | `undefined`      |
| `disableTriggerClick` | `disable-trigger-click` | Wether to automatically close the dropdown menu after clicking inside         | `boolean`                                                                                                                                                            | `false`          |
| `insideClick`         | `inside-click`          | Wether to automatically close the dropdown menu after clicking inside         | `boolean`                                                                                                                                                            | `false`          |
| `isDatepicker`        | `is-datepicker`         | Wether the dropdown container is a datepicker dropdown                        | `boolean`                                                                                                                                                            | `false`          |
| `manual`              | `manual`                | Wether to open the dropdown manually                                          | `boolean`                                                                                                                                                            | `false`          |
| `offset`              | `offset`                | The offset of the dropdown menu                                               | `number`                                                                                                                                                             | `8`              |
| `placement`           | `placement`             | The content of the dropdown menu                                              | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom-start'` |
| `scrollable`          | `scrollable`            | Wether the dropdown container should be scrollable when the threshold is met. | `"default" \| "large" \| boolean`                                                                                                                                    | `false`          |
| `show`                | `show`                  | Wether to show the dropdown menu                                              | `boolean`                                                                                                                                                            | `false`          |
| `strategy`            | `strategy`              | The strategy of the dropdown placement                                        | `"absolute" \| "fixed"`                                                                                                                                              | `'absolute'`     |
| `variant`             | `variant`               | The variant of the dropdown                                                   | `"default" \| "storm"`                                                                                                                                               | `'default'`      |


## Events

| Event    | Description       | Type                   |
| -------- | ----------------- | ---------------------- |
| `isOpen` | Open change event | `CustomEvent<boolean>` |


## Dependencies

### Used by

 - [p-datepicker](../datepicker)
 - [p-pagination-size](../pagination/size)
 - [p-profile](../profile)
 - [p-select](../select)

### Depends on

- [p-dropdown-menu-container](../../atoms/dropdown-menu/container)

### Graph
```mermaid
graph TD;
  p-dropdown --> p-dropdown-menu-container
  p-datepicker --> p-dropdown
  p-pagination-size --> p-dropdown
  p-profile --> p-dropdown
  p-select --> p-dropdown
  style p-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
