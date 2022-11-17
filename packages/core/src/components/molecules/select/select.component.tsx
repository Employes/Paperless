import {
    Component,
    Element,
    Event,
    EventEmitter,
    h,
    Host,
    Listen,
    Prop,
    State,
    Watch,
} from '@stencil/core';
import { childOf } from '../../../utils';

@Component({
    tag: 'p-select',
    styleUrl: 'select.component.scss',
    shadow: false,
})
export class Select {
    /**
     * The items to show in the dropdown
     */
    @Prop() items: string | any[];

    /**
     * The current query
     */
    @Prop() query: string;

    /**
     * The placeholder of the input
     */
    @Prop() placeholder: string;

    /**
     * The placeholder of the input when auto completing
     */
    @Prop() autocompletePlaceholder: string;

    /**
     * The current value
     */
    @Prop() value: any;

    /**
     * The key of the object to display
     */
    @Prop() displayKey: string = 'text';

    /**
     * The key of the object to return
     */
    @Prop() valueKey: string = 'value';

    /**
     * The key of the object to display
     */
    @Prop() queryKey?: string;

    /**
     * Wether to automatically select the first item
     */
    @Prop() autoSelectFirst: boolean = true;

    /**
     * The maximum amount of items to display
     */
    @Prop() maxDisplayedItems: number = 10;

    /**
     * Wether to enable autocomplete
     */
    @Prop() enableAutocomplete: boolean = true;

    /**
     * Wether the input uses async filtering
     */
    @Prop() asyncFilter: boolean = false;

    /**
     * Wether to show loading items
     */
    @Prop() loading: boolean = false;

    /**
     * Event when the query of the autocomplete changes
     */
    @Event() queryChange: EventEmitter<string>;

    /**
     * Event when the value changes
     */
    @Event() valueChange: EventEmitter<any>;

    /**
     * The size of the input group used by the select
     */
    @Prop() size: 'small' | 'medium' = 'medium';

    /**
     * The prefix of the input group used by the select
     */
    @Prop() prefix: string;

    /**
     * The label of the input group used by the select
     */
    @Prop() label: string;

    /**
     * The helper of the input group used by the select
     */
    @Prop() helper: string;

    /**
     * The helper of the input group used by the select
     */
    @Prop({ reflect: true }) error: string;

    /**
     * Wether the input group is disabled used by the select
     */
    @Prop({ reflect: true }) disabled: boolean = false;

    /**
     * The host element
     */
    @Element() private _el: HTMLElement;

    @State() private _showDropdown: any = false;
    @State() private _selectedItem: any = null;

    private _isAutoCompleting: boolean = false;

    private _inputRef: HTMLInputElement;

    get _items() {
        if (!this.items || this.loading) {
            return [];
        }

        let items =
            typeof this.items === 'string'
                ? JSON.parse(this.items)
                : this.items;

        if (typeof items?.[0] === 'string') {
            this.displayKey = 'text';
            this.valueKey = 'value';

            items = items.map((str) => ({
                value: str,
                text: str,
            }));
        }

        if (this._isAutoCompleting && this.query?.length && !this.asyncFilter) {
            items = items.filter((item) => {
                if (this.queryKey) {
                    return this._checkvalue(this.queryKey, item);
                }

                return (
                    this._checkvalue(this.valueKey, item) ||
                    this._checkvalue(this.displayKey, item)
                );
            });
        }

        return items?.slice(0, this.maxDisplayedItems);
    }

    get _displayValue() {
        if (this._isAutoCompleting) {
            return this.query;
        }

        return this._selectedItem?.[this.displayKey];
    }

    get _placeholder() {
        return this._isAutoCompleting && this.autocompletePlaceholder?.length
            ? this.autocompletePlaceholder
            : this.placeholder;
    }

    componentDidLoad() {
        if (this.value) {
            this._valueChange(this.value);
            return;
        }

        if (this.autoSelectFirst) {
            this._selectedItem = this._items?.[0];
        }
    }

    render() {
        return (
            <Host class="p-select">
                <p-dropdown
                    disableTriggerClick={true}
                    calculateWidth={true}
                    insideClick={true}
                    show={this._showDropdown}
                >
                    <p-input-group
                        slot="trigger"
                        icon="chevron"
                        iconPosition="end"
                        size={this.size}
                        prefix={this.prefix}
                        label={this.label}
                        helper={this.helper}
                        error={this.error}
                        disabled={this.disabled}
                        focused={this._showDropdown}
                    >
                        <input
                            slot="input"
                            type="text"
                            placeholder={this._placeholder}
                            value={this._displayValue}
                            class={`p-input cursor-pointer ${
                                !this._isAutoCompleting && 'read-only'
                            }`}
                            onFocus={() => this._onFocus()}
                            onMouseDown={(ev) => this._onMouseDown(ev)}
                            onClick={() => this._onClick()}
                            onInput={(ev) => this._onChange(ev)}
                            ref={(ref) => (this._inputRef = ref)}
                        />
                    </p-input-group>
                    <div slot="items">
                        {this.loading
                            ? this._getLoadingItems()
                            : this._getItems()}
                    </div>
                </p-dropdown>
            </Host>
        );
    }

    @Listen('click', { target: 'document', capture: true })
    protected documentClickHandler({ target }) {
        if (!this._showDropdown || childOf(target, this._el)) {
            return;
        }

        this._showDropdown = false;
        this._isAutoCompleting = false;
    }

    @Watch('value')
    private _valueChange(value: any) {
        this._preselectItem(value);
    }

    @Watch('items')
    public itemChanges() {
        this._preselectItem();
    }

    private _preselectItem(value?: any) {
        value = value ?? this.value;

        const parsedValue =
            typeof this._items?.[0]?.[this.valueKey] === 'number' &&
            !isNaN(value)
                ? parseInt(value, 10)
                : value;

        const item = this._items.find(
            (i) => i?.[this.valueKey] === parsedValue
        );

        this._selectedItem = item;
    }

    private _selectValue(item) {
        this._selectedItem = item;
        const value = item[this.valueKey];

        this.value = value;
        this.valueChange.emit(this.value);

        this._onBlur(true);
    }

    private _onFocus() {
        if (!this.enableAutocomplete) {
            this._inputRef.blur();
            if (!this._showDropdown) {
                this._showDropdown = true;
            }
            return;
        }

        this._isAutoCompleting = true;
        this._showDropdown = true;
    }

    private _onMouseDown(ev) {
        if (this.enableAutocomplete) {
            return;
        }

        ev.preventDefault();
    }

    private _onClick() {
        if (this.enableAutocomplete) {
            return;
        }

        this._showDropdown = !this._showDropdown;
    }

    private _onBlur(force = false) {
        if (!this.enableAutocomplete && !force) {
            return;
        }

        this._isAutoCompleting = false;
        this._showDropdown = false;
    }

    private _onChange(ev) {
        if (!this._isAutoCompleting) {
            return;
        }

        this.query = ev.target.value;
        this.queryChange.emit(this.query);
    }

    private _checkvalue(key, item) {
        return (
            item?.[key]
                ?.toString()
                ?.toLowerCase()
                .indexOf(this.query?.toLowerCase()) >= 0
        );
    }

    private _getItems() {
        return this._items.map((item) => (
            <p-dropdown-menu-item
                onClick={() => this._selectValue(item)}
                active={
                    item[this.valueKey] === this._selectedItem?.[this.valueKey]
                }
            >
                {item[this.displayKey]}
            </p-dropdown-menu-item>
        ));
    }

    private _getLoadingItems() {
        return [0, 0, 0].map(() => (
            <p-dropdown-menu-item enableHover={false}>
                <p-loader variant="ghost" class="w-full h-6 rounded" />
            </p-dropdown-menu-item>
        ));
    }
}
