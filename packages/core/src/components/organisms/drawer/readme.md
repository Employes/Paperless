# p-drawer



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute              | Description                                            | Type      | Default     |
| -------------------- | ---------------------- | ------------------------------------------------------ | --------- | ----------- |
| `applyBlur`          | `apply-blur`           | Wether to apply blur to the backdrop                   | `boolean` | `false`     |
| `backdropClickClose` | `backdrop-click-close` | Wether to hide the drawer when the backdrop is clicked | `boolean` | `true`      |
| `canClose`           | `can-close`            | Wether the drawer can be closed                        | `boolean` | `true`      |
| `header`             | `header`               | The Header of the drawer                               | `string`  | `undefined` |
| `scrollLock`         | `scroll-lock`          | Wether we should scroll lock the body                  | `boolean` | `true`      |
| `show`               | `show`                 | Wether to show the drawer or not                       | `boolean` | `false`     |
| `showClose`          | `show-close`           | Wether to show the close on mobile in the header       | `boolean` | `true`      |


## Events

| Event          | Description       | Type                                                                                                            |
| -------------- | ----------------- | --------------------------------------------------------------------------------------------------------------- |
| `closeClicked` | Close click event | `CustomEvent<{ event: MouseEvent; canClose: boolean; source: "close" \| "unknown" \| "backdrop" \| "event"; }>` |
| `closed`       | Closed event      | `CustomEvent<null>`                                                                                             |


## Dependencies

### Depends on

- [p-backdrop](../../atoms/backdrop)
- [p-drawer-container](../../atoms/drawer/container)
- [p-drawer-header](../../atoms/drawer/header)
- [p-drawer-body](../../atoms/drawer/body)

### Graph
```mermaid
graph TD;
  p-drawer --> p-backdrop
  p-drawer --> p-drawer-container
  p-drawer --> p-drawer-header
  p-drawer --> p-drawer-body
  p-drawer-header --> p-button
  p-drawer-header --> p-smile
  p-button --> p-icon
  p-button --> p-loader
  style p-drawer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
