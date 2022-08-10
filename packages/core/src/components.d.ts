/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { IconFlipOptions, IconVariant } from "./components/atoms/icon/icon.component";
import { RotateOptions, TextSizeOptions } from "./utils/types";
import { IconFlipOptions as IconFlipOptions1, IconVariant as IconVariant1 } from "./components/atoms/icon/icon.component";
import { IllustrationVariant } from "./components/atoms/illustration/illustration.component";
import { Observable } from "rxjs";
import { Placement } from "@popperjs/core";
export namespace Components {
    interface PAccordion {
        /**
          * Wether the accordion can be closed
         */
        "closeable": boolean;
        /**
          * Header of the accordion
         */
        "header": string;
        /**
          * Wether the accordion is open
         */
        "open": boolean;
        /**
          * Wether the accordion can be opened
         */
        "openable": boolean;
    }
    interface PAvatar {
        /**
          * The default image to show on errors
         */
        "defaultImage": string;
        /**
          * The size of the avatar
         */
        "size": 'small' | 'medium' | 'large';
        /**
          * The image used for the avatar
         */
        "src": string;
        /**
          * The variant of the avatar
         */
        "variant": 'user' | 'company';
    }
    interface PAvatarGroup {
        /**
          * The amount to show after the avatars
         */
        "extra": number;
    }
    interface PButton {
        /**
          * Wether to show a chevron or not
         */
        "chevron": boolean | 'up' | 'down';
        /**
          * Wether the button is disabled
         */
        "disabled": boolean;
        /**
          * Href in case of "text" version
         */
        "href": string;
        /**
          * Icon to show on the button
         */
        "icon": IconVariant;
        /**
          * Icon flip
         */
        "iconFlip": IconFlipOptions;
        /**
          * Wether the button is icon only
         */
        "iconOnly": boolean;
        /**
          * Icon position
         */
        "iconPosition": 'start' | 'end';
        /**
          * Icon rotate
         */
        "iconRotate": RotateOptions;
        /**
          * Wether the button should inherit text styles
         */
        "inheritText": boolean;
        /**
          * Wether to show a loader or not
         */
        "loading": boolean;
        /**
          * The size of the button
         */
        "size": 'small' | 'medium';
        /**
          * Target in case of "text" version
         */
        "target": string;
        /**
          * The variant of the button
         */
        "variant": 'primary' | 'secondary' | 'text';
    }
    interface PCardBody {
        /**
          * Wether the button should inherit text styles
         */
        "inheritText": boolean;
    }
    interface PCardContainer {
        /**
          * Wether the card should be hoverable
         */
        "hoverable": boolean;
    }
    interface PCardHeader {
        /**
          * Enable the title arrow
         */
        "arrow": boolean;
        /**
          * Content of the card header
         */
        "header": string;
    }
    interface PCounter {
    }
    interface PDivider {
    }
    interface PDropdown {
        /**
          * Wether to automatically close the dropdown menu after clicking inside
         */
        "disableTriggerClick": boolean;
        /**
          * Wether to automatically close the dropdown menu after clicking inside
         */
        "insideClick": boolean;
        /**
          * The content of the dropdown menu
         */
        "placement": 'bottom' | 'top';
        /**
          * Wether to show the dropdown menu
         */
        "show": boolean;
    }
    interface PDropdownMenuContainer {
    }
    interface PDropdownMenuItem {
        /**
          * Wether the dropdown menu item is active
         */
        "active": boolean;
    }
    interface PHelper {
    }
    interface PIcon {
        /**
          * Wether to flip the icon horizontally or vertically
         */
        "flip": IconFlipOptions;
        /**
          * Wether to rotate the icon x degrees
         */
        "rotate": RotateOptions;
        /**
          * The size of the icon, using tailwind sizes
         */
        "size": TextSizeOptions;
        /**
          * The icon the be displayed
         */
        "variant": IconVariant;
    }
    interface PIllustration {
        /**
          * The icon the be displayed
         */
        "variant": IllustrationVariant;
    }
    interface PInfoPanel {
        /**
          * Wether the panel can be closed
         */
        "closeable": boolean;
        /**
          * The content of the info panel
         */
        "content": string;
        /**
          * The header of the info panel
         */
        "header": string;
        /**
          * The variant of the info panel
         */
        "variant": 'info' | 'negative' | 'positive' | 'unbiased';
    }
    interface PLoader {
        /**
          * Color of the loader
         */
        "color": 'indigo' | 'white' | 'storm';
        /**
          * !NOT IMPLEMENTED! Modal description for modal variant
         */
        "modalDescription": string;
        /**
          * !NOT IMPLEMENTED! Modal title for modal variant
         */
        "modalTitle": string;
        /**
          * Wether to show or hide the loader
         */
        "show": boolean | Observable<boolean>;
        /**
          * Variant of loader
         */
        "variant": 'inline' | 'full-width' | 'full-screen' | 'modal';
    }
    interface PModal {
        /**
          * The Header of the modal
         */
        "header": string;
        /**
          * Wether to show the modal or not
         */
        "show": boolean;
        /**
          * The size of the modal container
         */
        "size": 'sm' | 'md' | 'lg' | 'xl';
        /**
          * The variant of the modal body
         */
        "variant": 'default' | 'table';
    }
    interface PModalBackdrop {
    }
    interface PModalBody {
        /**
          * The variant of the modal body
         */
        "variant": 'default' | 'table';
    }
    interface PModalContainer {
        /**
          * The size of the modal container
         */
        "size": 'sm' | 'md' | 'lg' | 'xl';
    }
    interface PModalFooter {
    }
    interface PModalHeader {
    }
    interface PNavigationItem {
        /**
          * Wether the navigation item is active
         */
        "active": boolean;
        /**
          * Icon of the navigation item
         */
        "counter": number | string;
        /**
          * The href of the navigation item
         */
        "href": string;
        /**
          * Icon of the navigation item
         */
        "icon": IconVariant;
        /**
          * The target of the navigation item
         */
        "target": string;
    }
    interface PPagination {
        /**
          * The current page
         */
        "page": number;
        /**
          * The amount of items per page
         */
        "pageSize": number;
        /**
          * The total amount of items
         */
        "total": number;
    }
    interface PPaginationItem {
        /**
          * Wether the pagination item is active
         */
        "active": boolean;
    }
    interface PProfile {
    }
    interface PSegmentContainer {
    }
    interface PSegmentItem {
        /**
          * Wether the segment item is active
         */
        "active": boolean;
        /**
          * Icon to show on the segment item
         */
        "icon": IconVariant;
        /**
          * Icon flip
         */
        "iconFlip": IconFlipOptions;
        /**
          * Icon rotate
         */
        "iconRotate": RotateOptions;
    }
    interface PStatus {
        /**
          * Icon to show on the status
         */
        "icon": IconVariant;
        /**
          * Icon flip
         */
        "iconFlip": IconFlipOptions;
        /**
          * Icon rotate
         */
        "iconRotate": RotateOptions;
        /**
          * The variant of the status
         */
        "variant": 'default' | 'positive' | 'unbiased' | 'negative';
    }
    interface PStepper {
        /**
          * The currently active step
         */
        "activeStep": number;
        /**
          * The direction of the stepper
         */
        "direction": 'horizontal' | 'vertical';
    }
    interface PStepperLine {
        /**
          * Wether the line is active
         */
        "active": boolean;
        /**
          * The direction of the stepper line
         */
        "direction": 'horizontal' | 'vertical';
    }
    interface PStepperStep {
        /**
          * Wether the step is active
         */
        "active": boolean;
        /**
          * The alignment of the step content
         */
        "align": 'start' | 'center' | 'end';
        /**
          * The direction of the stepper step
         */
        "direction": 'horizontal' | 'vertical';
        /**
          * Wether the step is finished
         */
        "finished": boolean;
    }
    interface PTabGroup {
    }
    interface PTabItem {
        /**
          * Wether the tab item is active
         */
        "active": boolean;
    }
    interface PTooltip {
        /**
          * Wether to someone can manually close the popover
         */
        "canManuallyClose": boolean;
        /**
          * The content of the popover
         */
        "placement": Placement;
        /**
          * The content of the popover
         */
        "popover": any;
        /**
          * Wether to show the popover
         */
        "show": boolean;
        /**
          * The variant of the popover
         */
        "variant": 'hover' | 'click' | 'error';
    }
}
export interface PAccordionCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLPAccordionElement;
}
export interface PButtonCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLPButtonElement;
}
export interface PDropdownCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLPDropdownElement;
}
export interface PPaginationCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLPPaginationElement;
}
declare global {
    interface HTMLPAccordionElement extends Components.PAccordion, HTMLStencilElement {
    }
    var HTMLPAccordionElement: {
        prototype: HTMLPAccordionElement;
        new (): HTMLPAccordionElement;
    };
    interface HTMLPAvatarElement extends Components.PAvatar, HTMLStencilElement {
    }
    var HTMLPAvatarElement: {
        prototype: HTMLPAvatarElement;
        new (): HTMLPAvatarElement;
    };
    interface HTMLPAvatarGroupElement extends Components.PAvatarGroup, HTMLStencilElement {
    }
    var HTMLPAvatarGroupElement: {
        prototype: HTMLPAvatarGroupElement;
        new (): HTMLPAvatarGroupElement;
    };
    interface HTMLPButtonElement extends Components.PButton, HTMLStencilElement {
    }
    var HTMLPButtonElement: {
        prototype: HTMLPButtonElement;
        new (): HTMLPButtonElement;
    };
    interface HTMLPCardBodyElement extends Components.PCardBody, HTMLStencilElement {
    }
    var HTMLPCardBodyElement: {
        prototype: HTMLPCardBodyElement;
        new (): HTMLPCardBodyElement;
    };
    interface HTMLPCardContainerElement extends Components.PCardContainer, HTMLStencilElement {
    }
    var HTMLPCardContainerElement: {
        prototype: HTMLPCardContainerElement;
        new (): HTMLPCardContainerElement;
    };
    interface HTMLPCardHeaderElement extends Components.PCardHeader, HTMLStencilElement {
    }
    var HTMLPCardHeaderElement: {
        prototype: HTMLPCardHeaderElement;
        new (): HTMLPCardHeaderElement;
    };
    interface HTMLPCounterElement extends Components.PCounter, HTMLStencilElement {
    }
    var HTMLPCounterElement: {
        prototype: HTMLPCounterElement;
        new (): HTMLPCounterElement;
    };
    interface HTMLPDividerElement extends Components.PDivider, HTMLStencilElement {
    }
    var HTMLPDividerElement: {
        prototype: HTMLPDividerElement;
        new (): HTMLPDividerElement;
    };
    interface HTMLPDropdownElement extends Components.PDropdown, HTMLStencilElement {
    }
    var HTMLPDropdownElement: {
        prototype: HTMLPDropdownElement;
        new (): HTMLPDropdownElement;
    };
    interface HTMLPDropdownMenuContainerElement extends Components.PDropdownMenuContainer, HTMLStencilElement {
    }
    var HTMLPDropdownMenuContainerElement: {
        prototype: HTMLPDropdownMenuContainerElement;
        new (): HTMLPDropdownMenuContainerElement;
    };
    interface HTMLPDropdownMenuItemElement extends Components.PDropdownMenuItem, HTMLStencilElement {
    }
    var HTMLPDropdownMenuItemElement: {
        prototype: HTMLPDropdownMenuItemElement;
        new (): HTMLPDropdownMenuItemElement;
    };
    interface HTMLPHelperElement extends Components.PHelper, HTMLStencilElement {
    }
    var HTMLPHelperElement: {
        prototype: HTMLPHelperElement;
        new (): HTMLPHelperElement;
    };
    interface HTMLPIconElement extends Components.PIcon, HTMLStencilElement {
    }
    var HTMLPIconElement: {
        prototype: HTMLPIconElement;
        new (): HTMLPIconElement;
    };
    interface HTMLPIllustrationElement extends Components.PIllustration, HTMLStencilElement {
    }
    var HTMLPIllustrationElement: {
        prototype: HTMLPIllustrationElement;
        new (): HTMLPIllustrationElement;
    };
    interface HTMLPInfoPanelElement extends Components.PInfoPanel, HTMLStencilElement {
    }
    var HTMLPInfoPanelElement: {
        prototype: HTMLPInfoPanelElement;
        new (): HTMLPInfoPanelElement;
    };
    interface HTMLPLoaderElement extends Components.PLoader, HTMLStencilElement {
    }
    var HTMLPLoaderElement: {
        prototype: HTMLPLoaderElement;
        new (): HTMLPLoaderElement;
    };
    interface HTMLPModalElement extends Components.PModal, HTMLStencilElement {
    }
    var HTMLPModalElement: {
        prototype: HTMLPModalElement;
        new (): HTMLPModalElement;
    };
    interface HTMLPModalBackdropElement extends Components.PModalBackdrop, HTMLStencilElement {
    }
    var HTMLPModalBackdropElement: {
        prototype: HTMLPModalBackdropElement;
        new (): HTMLPModalBackdropElement;
    };
    interface HTMLPModalBodyElement extends Components.PModalBody, HTMLStencilElement {
    }
    var HTMLPModalBodyElement: {
        prototype: HTMLPModalBodyElement;
        new (): HTMLPModalBodyElement;
    };
    interface HTMLPModalContainerElement extends Components.PModalContainer, HTMLStencilElement {
    }
    var HTMLPModalContainerElement: {
        prototype: HTMLPModalContainerElement;
        new (): HTMLPModalContainerElement;
    };
    interface HTMLPModalFooterElement extends Components.PModalFooter, HTMLStencilElement {
    }
    var HTMLPModalFooterElement: {
        prototype: HTMLPModalFooterElement;
        new (): HTMLPModalFooterElement;
    };
    interface HTMLPModalHeaderElement extends Components.PModalHeader, HTMLStencilElement {
    }
    var HTMLPModalHeaderElement: {
        prototype: HTMLPModalHeaderElement;
        new (): HTMLPModalHeaderElement;
    };
    interface HTMLPNavigationItemElement extends Components.PNavigationItem, HTMLStencilElement {
    }
    var HTMLPNavigationItemElement: {
        prototype: HTMLPNavigationItemElement;
        new (): HTMLPNavigationItemElement;
    };
    interface HTMLPPaginationElement extends Components.PPagination, HTMLStencilElement {
    }
    var HTMLPPaginationElement: {
        prototype: HTMLPPaginationElement;
        new (): HTMLPPaginationElement;
    };
    interface HTMLPPaginationItemElement extends Components.PPaginationItem, HTMLStencilElement {
    }
    var HTMLPPaginationItemElement: {
        prototype: HTMLPPaginationItemElement;
        new (): HTMLPPaginationItemElement;
    };
    interface HTMLPProfileElement extends Components.PProfile, HTMLStencilElement {
    }
    var HTMLPProfileElement: {
        prototype: HTMLPProfileElement;
        new (): HTMLPProfileElement;
    };
    interface HTMLPSegmentContainerElement extends Components.PSegmentContainer, HTMLStencilElement {
    }
    var HTMLPSegmentContainerElement: {
        prototype: HTMLPSegmentContainerElement;
        new (): HTMLPSegmentContainerElement;
    };
    interface HTMLPSegmentItemElement extends Components.PSegmentItem, HTMLStencilElement {
    }
    var HTMLPSegmentItemElement: {
        prototype: HTMLPSegmentItemElement;
        new (): HTMLPSegmentItemElement;
    };
    interface HTMLPStatusElement extends Components.PStatus, HTMLStencilElement {
    }
    var HTMLPStatusElement: {
        prototype: HTMLPStatusElement;
        new (): HTMLPStatusElement;
    };
    interface HTMLPStepperElement extends Components.PStepper, HTMLStencilElement {
    }
    var HTMLPStepperElement: {
        prototype: HTMLPStepperElement;
        new (): HTMLPStepperElement;
    };
    interface HTMLPStepperLineElement extends Components.PStepperLine, HTMLStencilElement {
    }
    var HTMLPStepperLineElement: {
        prototype: HTMLPStepperLineElement;
        new (): HTMLPStepperLineElement;
    };
    interface HTMLPStepperStepElement extends Components.PStepperStep, HTMLStencilElement {
    }
    var HTMLPStepperStepElement: {
        prototype: HTMLPStepperStepElement;
        new (): HTMLPStepperStepElement;
    };
    interface HTMLPTabGroupElement extends Components.PTabGroup, HTMLStencilElement {
    }
    var HTMLPTabGroupElement: {
        prototype: HTMLPTabGroupElement;
        new (): HTMLPTabGroupElement;
    };
    interface HTMLPTabItemElement extends Components.PTabItem, HTMLStencilElement {
    }
    var HTMLPTabItemElement: {
        prototype: HTMLPTabItemElement;
        new (): HTMLPTabItemElement;
    };
    interface HTMLPTooltipElement extends Components.PTooltip, HTMLStencilElement {
    }
    var HTMLPTooltipElement: {
        prototype: HTMLPTooltipElement;
        new (): HTMLPTooltipElement;
    };
    interface HTMLElementTagNameMap {
        "p-accordion": HTMLPAccordionElement;
        "p-avatar": HTMLPAvatarElement;
        "p-avatar-group": HTMLPAvatarGroupElement;
        "p-button": HTMLPButtonElement;
        "p-card-body": HTMLPCardBodyElement;
        "p-card-container": HTMLPCardContainerElement;
        "p-card-header": HTMLPCardHeaderElement;
        "p-counter": HTMLPCounterElement;
        "p-divider": HTMLPDividerElement;
        "p-dropdown": HTMLPDropdownElement;
        "p-dropdown-menu-container": HTMLPDropdownMenuContainerElement;
        "p-dropdown-menu-item": HTMLPDropdownMenuItemElement;
        "p-helper": HTMLPHelperElement;
        "p-icon": HTMLPIconElement;
        "p-illustration": HTMLPIllustrationElement;
        "p-info-panel": HTMLPInfoPanelElement;
        "p-loader": HTMLPLoaderElement;
        "p-modal": HTMLPModalElement;
        "p-modal-backdrop": HTMLPModalBackdropElement;
        "p-modal-body": HTMLPModalBodyElement;
        "p-modal-container": HTMLPModalContainerElement;
        "p-modal-footer": HTMLPModalFooterElement;
        "p-modal-header": HTMLPModalHeaderElement;
        "p-navigation-item": HTMLPNavigationItemElement;
        "p-pagination": HTMLPPaginationElement;
        "p-pagination-item": HTMLPPaginationItemElement;
        "p-profile": HTMLPProfileElement;
        "p-segment-container": HTMLPSegmentContainerElement;
        "p-segment-item": HTMLPSegmentItemElement;
        "p-status": HTMLPStatusElement;
        "p-stepper": HTMLPStepperElement;
        "p-stepper-line": HTMLPStepperLineElement;
        "p-stepper-step": HTMLPStepperStepElement;
        "p-tab-group": HTMLPTabGroupElement;
        "p-tab-item": HTMLPTabItemElement;
        "p-tooltip": HTMLPTooltipElement;
    }
}
declare namespace LocalJSX {
    interface PAccordion {
        /**
          * Wether the accordion can be closed
         */
        "closeable"?: boolean;
        /**
          * Header of the accordion
         */
        "header": string;
        /**
          * Open change event
         */
        "onIsOpen"?: (event: PAccordionCustomEvent<boolean>) => void;
        /**
          * Wether the accordion is open
         */
        "open"?: boolean;
        /**
          * Wether the accordion can be opened
         */
        "openable"?: boolean;
    }
    interface PAvatar {
        /**
          * The default image to show on errors
         */
        "defaultImage"?: string;
        /**
          * The size of the avatar
         */
        "size"?: 'small' | 'medium' | 'large';
        /**
          * The image used for the avatar
         */
        "src": string;
        /**
          * The variant of the avatar
         */
        "variant"?: 'user' | 'company';
    }
    interface PAvatarGroup {
        /**
          * The amount to show after the avatars
         */
        "extra"?: number;
    }
    interface PButton {
        /**
          * Wether to show a chevron or not
         */
        "chevron"?: boolean | 'up' | 'down';
        /**
          * Wether the button is disabled
         */
        "disabled"?: boolean;
        /**
          * Href in case of "text" version
         */
        "href"?: string;
        /**
          * Icon to show on the button
         */
        "icon"?: IconVariant;
        /**
          * Icon flip
         */
        "iconFlip"?: IconFlipOptions;
        /**
          * Wether the button is icon only
         */
        "iconOnly"?: boolean;
        /**
          * Icon position
         */
        "iconPosition"?: 'start' | 'end';
        /**
          * Icon rotate
         */
        "iconRotate"?: RotateOptions;
        /**
          * Wether the button should inherit text styles
         */
        "inheritText"?: boolean;
        /**
          * Wether to show a loader or not
         */
        "loading"?: boolean;
        /**
          * Button click event
         */
        "onOnClick"?: (event: PButtonCustomEvent<MouseEvent>) => void;
        /**
          * The size of the button
         */
        "size"?: 'small' | 'medium';
        /**
          * Target in case of "text" version
         */
        "target"?: string;
        /**
          * The variant of the button
         */
        "variant"?: 'primary' | 'secondary' | 'text';
    }
    interface PCardBody {
        /**
          * Wether the button should inherit text styles
         */
        "inheritText"?: boolean;
    }
    interface PCardContainer {
        /**
          * Wether the card should be hoverable
         */
        "hoverable"?: boolean;
    }
    interface PCardHeader {
        /**
          * Enable the title arrow
         */
        "arrow"?: boolean;
        /**
          * Content of the card header
         */
        "header"?: string;
    }
    interface PCounter {
    }
    interface PDivider {
    }
    interface PDropdown {
        /**
          * Wether to automatically close the dropdown menu after clicking inside
         */
        "disableTriggerClick"?: boolean;
        /**
          * Wether to automatically close the dropdown menu after clicking inside
         */
        "insideClick"?: boolean;
        /**
          * Open change event
         */
        "onIsOpen"?: (event: PDropdownCustomEvent<boolean>) => void;
        /**
          * The content of the dropdown menu
         */
        "placement"?: 'bottom' | 'top';
        /**
          * Wether to show the dropdown menu
         */
        "show"?: boolean;
    }
    interface PDropdownMenuContainer {
    }
    interface PDropdownMenuItem {
        /**
          * Wether the dropdown menu item is active
         */
        "active"?: boolean;
    }
    interface PHelper {
    }
    interface PIcon {
        /**
          * Wether to flip the icon horizontally or vertically
         */
        "flip"?: IconFlipOptions;
        /**
          * Wether to rotate the icon x degrees
         */
        "rotate"?: RotateOptions;
        /**
          * The size of the icon, using tailwind sizes
         */
        "size"?: TextSizeOptions;
        /**
          * The icon the be displayed
         */
        "variant": IconVariant;
    }
    interface PIllustration {
        /**
          * The icon the be displayed
         */
        "variant": IllustrationVariant;
    }
    interface PInfoPanel {
        /**
          * Wether the panel can be closed
         */
        "closeable"?: boolean;
        /**
          * The content of the info panel
         */
        "content"?: string;
        /**
          * The header of the info panel
         */
        "header"?: string;
        /**
          * The variant of the info panel
         */
        "variant"?: 'info' | 'negative' | 'positive' | 'unbiased';
    }
    interface PLoader {
        /**
          * Color of the loader
         */
        "color"?: 'indigo' | 'white' | 'storm';
        /**
          * !NOT IMPLEMENTED! Modal description for modal variant
         */
        "modalDescription"?: string;
        /**
          * !NOT IMPLEMENTED! Modal title for modal variant
         */
        "modalTitle"?: string;
        /**
          * Wether to show or hide the loader
         */
        "show"?: boolean | Observable<boolean>;
        /**
          * Variant of loader
         */
        "variant"?: 'inline' | 'full-width' | 'full-screen' | 'modal';
    }
    interface PModal {
        /**
          * The Header of the modal
         */
        "header"?: string;
        /**
          * Wether to show the modal or not
         */
        "show"?: boolean;
        /**
          * The size of the modal container
         */
        "size"?: 'sm' | 'md' | 'lg' | 'xl';
        /**
          * The variant of the modal body
         */
        "variant"?: 'default' | 'table';
    }
    interface PModalBackdrop {
    }
    interface PModalBody {
        /**
          * The variant of the modal body
         */
        "variant"?: 'default' | 'table';
    }
    interface PModalContainer {
        /**
          * The size of the modal container
         */
        "size"?: 'sm' | 'md' | 'lg' | 'xl';
    }
    interface PModalFooter {
    }
    interface PModalHeader {
    }
    interface PNavigationItem {
        /**
          * Wether the navigation item is active
         */
        "active"?: boolean;
        /**
          * Icon of the navigation item
         */
        "counter"?: number | string;
        /**
          * The href of the navigation item
         */
        "href"?: string;
        /**
          * Icon of the navigation item
         */
        "icon"?: IconVariant;
        /**
          * The target of the navigation item
         */
        "target"?: string;
    }
    interface PPagination {
        "onPageChange"?: (event: PPaginationCustomEvent<number>) => void;
        /**
          * The current page
         */
        "page"?: number;
        /**
          * The amount of items per page
         */
        "pageSize"?: number;
        /**
          * The total amount of items
         */
        "total": number;
    }
    interface PPaginationItem {
        /**
          * Wether the pagination item is active
         */
        "active"?: boolean;
    }
    interface PProfile {
    }
    interface PSegmentContainer {
    }
    interface PSegmentItem {
        /**
          * Wether the segment item is active
         */
        "active"?: boolean;
        /**
          * Icon to show on the segment item
         */
        "icon"?: IconVariant;
        /**
          * Icon flip
         */
        "iconFlip"?: IconFlipOptions;
        /**
          * Icon rotate
         */
        "iconRotate"?: RotateOptions;
    }
    interface PStatus {
        /**
          * Icon to show on the status
         */
        "icon"?: IconVariant;
        /**
          * Icon flip
         */
        "iconFlip"?: IconFlipOptions;
        /**
          * Icon rotate
         */
        "iconRotate"?: RotateOptions;
        /**
          * The variant of the status
         */
        "variant"?: 'default' | 'positive' | 'unbiased' | 'negative';
    }
    interface PStepper {
        /**
          * The currently active step
         */
        "activeStep"?: number;
        /**
          * The direction of the stepper
         */
        "direction"?: 'horizontal' | 'vertical';
    }
    interface PStepperLine {
        /**
          * Wether the line is active
         */
        "active"?: boolean;
        /**
          * The direction of the stepper line
         */
        "direction"?: 'horizontal' | 'vertical';
    }
    interface PStepperStep {
        /**
          * Wether the step is active
         */
        "active"?: boolean;
        /**
          * The alignment of the step content
         */
        "align"?: 'start' | 'center' | 'end';
        /**
          * The direction of the stepper step
         */
        "direction"?: 'horizontal' | 'vertical';
        /**
          * Wether the step is finished
         */
        "finished"?: boolean;
    }
    interface PTabGroup {
    }
    interface PTabItem {
        /**
          * Wether the tab item is active
         */
        "active"?: boolean;
    }
    interface PTooltip {
        /**
          * Wether to someone can manually close the popover
         */
        "canManuallyClose"?: boolean;
        /**
          * The content of the popover
         */
        "placement"?: Placement;
        /**
          * The content of the popover
         */
        "popover"?: any;
        /**
          * Wether to show the popover
         */
        "show"?: boolean;
        /**
          * The variant of the popover
         */
        "variant"?: 'hover' | 'click' | 'error';
    }
    interface IntrinsicElements {
        "p-accordion": PAccordion;
        "p-avatar": PAvatar;
        "p-avatar-group": PAvatarGroup;
        "p-button": PButton;
        "p-card-body": PCardBody;
        "p-card-container": PCardContainer;
        "p-card-header": PCardHeader;
        "p-counter": PCounter;
        "p-divider": PDivider;
        "p-dropdown": PDropdown;
        "p-dropdown-menu-container": PDropdownMenuContainer;
        "p-dropdown-menu-item": PDropdownMenuItem;
        "p-helper": PHelper;
        "p-icon": PIcon;
        "p-illustration": PIllustration;
        "p-info-panel": PInfoPanel;
        "p-loader": PLoader;
        "p-modal": PModal;
        "p-modal-backdrop": PModalBackdrop;
        "p-modal-body": PModalBody;
        "p-modal-container": PModalContainer;
        "p-modal-footer": PModalFooter;
        "p-modal-header": PModalHeader;
        "p-navigation-item": PNavigationItem;
        "p-pagination": PPagination;
        "p-pagination-item": PPaginationItem;
        "p-profile": PProfile;
        "p-segment-container": PSegmentContainer;
        "p-segment-item": PSegmentItem;
        "p-status": PStatus;
        "p-stepper": PStepper;
        "p-stepper-line": PStepperLine;
        "p-stepper-step": PStepperStep;
        "p-tab-group": PTabGroup;
        "p-tab-item": PTabItem;
        "p-tooltip": PTooltip;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "p-accordion": LocalJSX.PAccordion & JSXBase.HTMLAttributes<HTMLPAccordionElement>;
            "p-avatar": LocalJSX.PAvatar & JSXBase.HTMLAttributes<HTMLPAvatarElement>;
            "p-avatar-group": LocalJSX.PAvatarGroup & JSXBase.HTMLAttributes<HTMLPAvatarGroupElement>;
            "p-button": LocalJSX.PButton & JSXBase.HTMLAttributes<HTMLPButtonElement>;
            "p-card-body": LocalJSX.PCardBody & JSXBase.HTMLAttributes<HTMLPCardBodyElement>;
            "p-card-container": LocalJSX.PCardContainer & JSXBase.HTMLAttributes<HTMLPCardContainerElement>;
            "p-card-header": LocalJSX.PCardHeader & JSXBase.HTMLAttributes<HTMLPCardHeaderElement>;
            "p-counter": LocalJSX.PCounter & JSXBase.HTMLAttributes<HTMLPCounterElement>;
            "p-divider": LocalJSX.PDivider & JSXBase.HTMLAttributes<HTMLPDividerElement>;
            "p-dropdown": LocalJSX.PDropdown & JSXBase.HTMLAttributes<HTMLPDropdownElement>;
            "p-dropdown-menu-container": LocalJSX.PDropdownMenuContainer & JSXBase.HTMLAttributes<HTMLPDropdownMenuContainerElement>;
            "p-dropdown-menu-item": LocalJSX.PDropdownMenuItem & JSXBase.HTMLAttributes<HTMLPDropdownMenuItemElement>;
            "p-helper": LocalJSX.PHelper & JSXBase.HTMLAttributes<HTMLPHelperElement>;
            "p-icon": LocalJSX.PIcon & JSXBase.HTMLAttributes<HTMLPIconElement>;
            "p-illustration": LocalJSX.PIllustration & JSXBase.HTMLAttributes<HTMLPIllustrationElement>;
            "p-info-panel": LocalJSX.PInfoPanel & JSXBase.HTMLAttributes<HTMLPInfoPanelElement>;
            "p-loader": LocalJSX.PLoader & JSXBase.HTMLAttributes<HTMLPLoaderElement>;
            "p-modal": LocalJSX.PModal & JSXBase.HTMLAttributes<HTMLPModalElement>;
            "p-modal-backdrop": LocalJSX.PModalBackdrop & JSXBase.HTMLAttributes<HTMLPModalBackdropElement>;
            "p-modal-body": LocalJSX.PModalBody & JSXBase.HTMLAttributes<HTMLPModalBodyElement>;
            "p-modal-container": LocalJSX.PModalContainer & JSXBase.HTMLAttributes<HTMLPModalContainerElement>;
            "p-modal-footer": LocalJSX.PModalFooter & JSXBase.HTMLAttributes<HTMLPModalFooterElement>;
            "p-modal-header": LocalJSX.PModalHeader & JSXBase.HTMLAttributes<HTMLPModalHeaderElement>;
            "p-navigation-item": LocalJSX.PNavigationItem & JSXBase.HTMLAttributes<HTMLPNavigationItemElement>;
            "p-pagination": LocalJSX.PPagination & JSXBase.HTMLAttributes<HTMLPPaginationElement>;
            "p-pagination-item": LocalJSX.PPaginationItem & JSXBase.HTMLAttributes<HTMLPPaginationItemElement>;
            "p-profile": LocalJSX.PProfile & JSXBase.HTMLAttributes<HTMLPProfileElement>;
            "p-segment-container": LocalJSX.PSegmentContainer & JSXBase.HTMLAttributes<HTMLPSegmentContainerElement>;
            "p-segment-item": LocalJSX.PSegmentItem & JSXBase.HTMLAttributes<HTMLPSegmentItemElement>;
            "p-status": LocalJSX.PStatus & JSXBase.HTMLAttributes<HTMLPStatusElement>;
            "p-stepper": LocalJSX.PStepper & JSXBase.HTMLAttributes<HTMLPStepperElement>;
            "p-stepper-line": LocalJSX.PStepperLine & JSXBase.HTMLAttributes<HTMLPStepperLineElement>;
            "p-stepper-step": LocalJSX.PStepperStep & JSXBase.HTMLAttributes<HTMLPStepperStepElement>;
            "p-tab-group": LocalJSX.PTabGroup & JSXBase.HTMLAttributes<HTMLPTabGroupElement>;
            "p-tab-item": LocalJSX.PTabItem & JSXBase.HTMLAttributes<HTMLPTabItemElement>;
            "p-tooltip": LocalJSX.PTooltip & JSXBase.HTMLAttributes<HTMLPTooltipElement>;
        }
    }
}
