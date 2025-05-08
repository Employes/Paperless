import {
    AttachInternals,
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
import { IconVariant } from '../../atoms/icon/icon.component';
import { Strategy } from '@floating-ui/dom';

import { cva } from 'class-variance-authority';

const multiContainer = cva([
	'flex items-center gap-2',
	'flex-1 min-w-0 h-full',
	'pointer-events-none overflow-hidden',
]);

const multiItem = cva([
	'item group/item',
	'pointer-events-auto cursor-pointer',
	'flex h-[1.625rem] items-center gap-2',
	'h-[1.625rem] px-2',
	'text-sm font-semibold whitespace-nowrap',
	'rounded-lg',
	'bg-supportive-lilac-100',
]);

const textContainer = cva(
	'block w-full overflow-hidden text-ellipsis whitespace-nowrap text-start',
	{
		variants: {
			variant: {
				placeholder: 'text-black-teal-400',
				default: null,
			},
		},
	}
);

@Component({
	tag: 'p-select',
	styleUrl: 'select.component.css',
	formAssociated: true
})
export class Select {
	/**
	 * The items to show in the dropdown
	 */
	@Prop() items: string | any[];

	/**
	 * Wether to enable multi select
	 */
	@Prop({ reflect: true }) multi: boolean;

	/**
	 * Wether to use a portal for the dropdown container of the select
	 */
	@Prop() usePortal: boolean = false;

	/**
	 * The strategy to use for the dropdown placement
	 */
	@Prop() strategy: Strategy = 'absolute';

	/**
	 * Icon of the select box
	 */
	@Prop() icon: IconVariant;

	/**
	 * The current query
	 */
	@Prop() query: string;

	/**
	 * The placeholder of the input
	 */
	@Prop() placeholder: string;

	/**
	 * The placeholder of the input used for auto complete
	 */
	@Prop() autocompletePlaceholder: string = 'Search...';

	/**
	 * The current value
	 */
	@Prop() value: any;

	/**
	 * The key of the object to display
	 */
	@Prop() displayKey: string = 'text';

	/**
	 * The key of the object to display in the dropdown (overwrites displayKey)
	 */
	@Prop() dropdownDisplayKey: string | undefined;

	/**
	 * The key of the object to display in the input (overwrites displayKey)
	 */
	@Prop() selectionDisplayKey: string | undefined;

	/**
	 * The key of the object to return
	 */
	@Prop() valueKey: string;

	/**
	 * The key of avatar within an item to show
	 */
	@Prop() avatarKey: string;

	/**
	 * The key of icon variant within an item to show
	 */
	@Prop() iconKey: string;

	/**
	 * Wether to show the icon also on the selected Item
	 */
	@Prop() showIconInSelectedItem: string;

	/**
	 * The key of a class in an item to apply
	 */
	@Prop() classKey: string = 'class';

	/**
	 * Wether to apply the item's class also on the selected item
	 */
	@Prop() applyClassOnSelectedItem: string;

	/**
	 * The key of avatar letters within an item to show when the avatar url doesn't work
	 */
	@Prop() avatarLettersKey: string;

	/**
	 * The key to identify an object
	 */
	@Prop() identifierKey: string;

	/**
	 * The key of the object to display
	 */
	@Prop() queryKey?: string;

	/**
	 * Wether to automatically select the first item
	 */
	@Prop() autoSelectFirst: boolean = true;

	/**
	 * Wether to show the chevron or not
	 */
	@Prop() showChevron: boolean = true;

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
	 * Wether to show the select all item with multi select
	 */
	@Prop() enableSelectAll: boolean = false;

	/**
	 * The text of the select all item
	 */
	@Prop() selectAllText: string = 'Select all';

	/**
	 * The icon to prefix for select all
	 */
	@Prop() selectAllIcon: IconVariant | undefined;

	/**
	 * Event when the query of the autocomplete changes
	 */
	@Event({
		bubbles: false,
	})
	queryChange: EventEmitter<string>;

	/**
	 * Event when the value changes
	 */
	@Event({
		bubbles: false,
	})
	valueChange: EventEmitter<any>;

	/**
	 * Event when the select all item has been selected or not
	 */
	@Event({
		bubbles: false,
	})
	selectAllChange: EventEmitter<any>;

	/**
	 * Event when the dropdown shows
	 */
	@Event({
		bubbles: false,
	})
	dropdownShown: EventEmitter<any>;

	/**
	 * The size of the input group used by the select
	 */
	@Prop() size: 'sm' | 'base' = 'base';

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
	 * Wether the field is required
	 */
	@Prop({ reflect: true }) required: boolean = true;

	/**
	 * The helper of the input group used by the select
	 */
	@Prop({ reflect: true }) error: string;

	/**
	 * Wether the input group is disabled used by the select
	 */
	@Prop({ reflect: true }) disabled: boolean = false;

	/**
	 * Wether to show a "add" item
	 */
	@Prop() showAddItem: boolean = false;

	/**
	 * The text to show when add item is being shown
	 */
	@Prop() addItemText: string = 'Add item';

	/**
	 * Event when the add item is clicked
	 */
	@Event({
		bubbles: false,
	})
	add: EventEmitter;

	/**
	 * The text to show when items is empty
	 */
	@Prop() emptyStateText: string = 'No items available';

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	@State() private _showDropdown: any = false;
	@State() private _selectedItem: any = null;

	@State() private _allSelected: boolean = false;

	@State() private _amountHidden = 0;

	@AttachInternals() _internals: ElementInternals;

	private _inputRef: HTMLDivElement;
	private autocompleteInputRef: HTMLInputElement | HTMLTextAreaElement;
	private _multiContainerRef: HTMLElement;

	private _resizeObserver: ResizeObserver;
	private _resizeDebounceTimer: NodeJS.Timeout | undefined;
	private _checkSelectedItemsTimeout: NodeJS.Timeout | undefined;

	get _items() {
		return this._getParsedItems();
	}

	get _displayValue() {
		const placeholder = (
			<div class={textContainer({ variant: 'placeholder' })}>
				{this.placeholder}
			</div>
		);

		if (!this._selectedItem) {
			return placeholder;
		}

		if (this.multi) {
			if (this._selectedItem?.length === 0) {
				return placeholder;
			}

			return (
				<div
					class={multiContainer()}
					ref={ref => (this._multiContainerRef = ref)}
				>
					{this._selectedItem.map(item => (
						<div
							class={multiItem()}
							onClick={() => this._selectValue(item)}
						>
							{item[this.selectionDisplayKey ?? this.displayKey]}
							<p-icon
								class='text-xs text-supportive-lilac group-hover/item:text-supportive-lilac-800'
								variant='negative'
							/>
						</div>
					))}

					<div class='extra pointer-events-none hidden text-sm text-black-teal-100'>
						+{this._amountHidden}
					</div>
				</div>
			);
		}

		return this._getDisplay(this._selectedItem, true);
	}

	get _identifierKey() {
		return this.identifierKey ?? this.valueKey ?? 'value';
	}

	formResetCallback() {
		this._selectValue(null)
	}

	formDisabledCallback(disabled: boolean) {
		if(!this._internals.form) {
			return;
		}

		this.disabled = disabled;
	}

	componentDidLoad() {
		if (!this.valueKey && !this.identifierKey) {
			throw new Error('You must provide a valueKey or identifierKey');
		}

		if (this.multi) {
			this._setMultiContainerMaxWidth();

			this._resizeObserver = new ResizeObserver(() => {
				if (this._resizeDebounceTimer) {
					clearTimeout(this._resizeDebounceTimer);
					this._resizeDebounceTimer = null;
				}

				this._resizeDebounceTimer = setTimeout(() => {
					this._setMultiContainerMaxWidth();
					this._setCheckSelectedItemsTimeout();
				}, 200);
			});
			this._resizeObserver.observe(this._el);
		}

		if (this.value) {
			this._valueChange();
			return;
		}

		this.itemChanges();
	}

	componentDidRender() {
		if (this.multi) {
			this._setMultiContainerMaxWidth();
		}
	}

	disconnectedCallback() {
		if (this.multi) {
			this._resizeObserver.disconnect();
		}
	}

	render() {
		return (
			<Host class='p-select'>
				<p-dropdown
					disableTriggerClick={true}
					calculateWidth={true}
					insideClick={true}
					scrollable={this.enableAutocomplete ? 'large' : true}
					show={this._showDropdown}
					onIsOpen={ev => this._onDropdownOpen(ev)}
					usePortal={this.usePortal}
					strategy={this.strategy}
				>
					<p-field-container
						slot='trigger'
						variant='write'
						prefix={this.prefix}
						label={this.label}
						helper={this.helper}
						required={this.required}
						error={this.error}
						errorPlacement='top-start'
						forceShowTooltip={this.error?.length && this._showDropdown}
					>
						<p-button
							class='w-full'
							slot='content'
							variant='secondary'
							size={this.size}
							chevron={this.showChevron}
							disabled={this.disabled}
							active={this._showDropdown}
							icon={this.icon}
							onClick={ev => this._onClick(ev)}
						>
							<div
								class='relative min-w-0 flex-1'
								ref={ref => (this._inputRef = ref)}
							>
								{this._displayValue}
							</div>
						</p-button>
					</p-field-container>
					{this.loading ? this._getLoadingItems() : this._getItems()}
					{this.showAddItem && this._getAddItem()}
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
	}

	@Watch('value')
	private _valueChange() {
		setTimeout(() => {
			this._preselectItem();
			this._setCheckSelectedItemsTimeout();
		});
	}

	@Watch('items')
	public itemChanges() {
		setTimeout(() => this._preselectItem());
	}

	@Watch('_showDropdown')
	public _showDropdownChanges() {
		this.dropdownShown.emit({
			value: this._showDropdown,
			query: this.query,
		});
	}

	@Watch('multi')
	public multiChanges() {
		if (this._selectedItem && !Array.isArray(this._selectedItem)) {
			this._selectedItem = [];
		}
	}

	private _preselectItem() {
		let value =
			typeof this.value === 'string' && this.multi
				? JSON.parse(this.value)
				: this.value;

		if (this.multi) {
			if (!Array.isArray(value)) {
				this.value = [];
				this.valueChange.emit(this.value);
				return;
			}

			this.value = value;
			if (!value.length) {
				this._selectedItem = [];
				return;
			}

			this._selectedItem =
				!!this.valueKey && this.valueKey !== 'false'
					? this._items.filter(i => value.includes(i?.[this.valueKey]))
					: [...value];
			return;
		}

		if (!this._selectedItem && !value && this.autoSelectFirst) {
			value = this._items[0];
		}

		const identifier =
			typeof value === 'object' && value !== null
				? value[this._identifierKey]
				: value;
		const parsedValue =
			typeof identifier === 'string' || typeof identifier === 'number'
				? identifier
				: JSON.stringify(identifier);

		const currentValue = this._selectedItem
			? this._selectedItem?.[this._identifierKey]
			: null;
		const currentParsedValue =
			typeof currentValue === 'string' || typeof currentValue === 'number'
				? currentValue
				: JSON.stringify(currentValue);

		if (this._selectedItem && currentParsedValue === parsedValue) {
			return;
		}

		if (!this._items?.length && value) {
			this._selectValue(value, false);
			return;
		}

		const items = this._getParsedItems(false);
		const item = items.find(i => {
			const itemIdentifier = i?.[this._identifierKey];
			const parsedItemIdentifier =
				typeof itemIdentifier === 'string' || typeof itemIdentifier === 'number'
					? itemIdentifier
					: JSON.stringify(itemIdentifier);

			return parsedItemIdentifier === parsedValue;
		});

		this._selectValue(!!item ? item : value, false);
	}

	private _selectValue(item, forceBlur = true) {
		let value =
			!!this.valueKey && this.valueKey !== 'false' && item !== null
				? item?.[this.valueKey]
				: item;

		if (this.multi) {
			if (!this._selectedItem || !Array.isArray(this._selectedItem)) {
				this._selectedItem = [];
			}

			if (!this.value || !Array.isArray(this.value)) {
				this.value = [];
			}

			const selectedItem = [...this._selectedItem];
			const valueArray = [...this.value];

			const includesIndex = selectedItem.findIndex(
				i => i[this._identifierKey] === item[this._identifierKey]
			);
			if (includesIndex === -1) {
				selectedItem.push(item);
				valueArray.push(value);
			} else {
				selectedItem.splice(includesIndex, 1);
				valueArray.splice(includesIndex, 1);
			}

			this._selectedItem = selectedItem;
			this.value = valueArray;
			this.valueChange.emit(valueArray);
			return;
		}

		this._selectedItem = item;
		this.value = value;
		this.valueChange.emit(value);

		this._onBlur(forceBlur);
	}

	private _findOnClickTarget(target: HTMLElement) {
		if (target.nodeName.toLowerCase() === 'p-button') {
			return true;
		}

		if (target.classList.contains('item')) {
			return false;
		}

		return this._findOnClickTarget(target.parentElement);
	}

	private _onClick(ev) {
		if (!this._findOnClickTarget(ev.target as HTMLElement)) {
			return;
		}

		this._showDropdown = !this._showDropdown;
	}

	private _onBlur(force = false) {
		if (this.enableAutocomplete && !force) {
			return;
		}

		this._showDropdown = false;
	}

	private _onAutoComplete(ev) {
		if (!this.enableAutocomplete) {
			return;
		}

		this._showDropdown = true;

		this.query = ev.detail;
		this.queryChange.emit(ev.detail);
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
		let items = this._items.map(item => (
			<p-dropdown-menu-item
				useContainer={false}
				onClick={() => this._selectValue(item)}
				active={
					this.multi &&
					!!this._selectedItem &&
					Array.isArray(this._selectedItem)
						? this._selectedItem.findIndex(
								i => i[this._identifierKey] === item[this._identifierKey]
						  ) >= 0
						: item[this._identifierKey] ===
						  this._selectedItem?.[this._identifierKey]
				}
				checkbox={this.multi ? true : false}
				slot='items'
			>
				{this._getDisplay(item)}
			</p-dropdown-menu-item>
		));

		if (!this._items.length) {
			items = [
				<p
					class='w-full p-2 text-center text-sm text-black-teal-400'
					slot='items'
				>
					{this.emptyStateText}
				</p>,
			];
		}

		if (this.enableSelectAll && this._items.length) {
			items.unshift(
				<p-dropdown-menu-item
					slot='items'
					useContainer={false}
					checkbox
					onClick={() => this._selectAllChange()}
					active={this._allSelected}
				>
					{this.selectAllIcon?.length ? (
						<span class='flex items-center gap-2'>
							<div class='flex w-6 justify-center text-lg'>
								<p-icon variant={this.selectAllIcon} />
							</div>{' '}
							{this.selectAllText}
						</span>
					) : (
						this.selectAllText
					)}
				</p-dropdown-menu-item>
			);
		}

		if (this.enableAutocomplete) {
			items.unshift(this._getAutoCompleteItem());
		}

		return items;
	}

	private _getAddItem() {
		return (
			<p-dropdown-menu-item
				onClick={() => this.add.emit()}
				useContainer={false}
				slot='items'
			>
				<span class='flex items-center gap-1 font-semibold text-teal-800'>
					{this.addItemText}
					<p-icon variant='plus' />
				</span>
			</p-dropdown-menu-item>
		);
	}

	private _getLoadingItems() {
		const items = [0, 0, 0].map(() => (
			<p-dropdown-menu-item
				enableHover={false}
				slot='items'
			>
				<p-loader
					variant='ghost'
					class='h-6 w-full rounded'
				/>
			</p-dropdown-menu-item>
		));

		if (this.enableAutocomplete) {
			items.unshift(this._getAutoCompleteItem());
		}

		return items;
	}

	private _getAutoCompleteItem() {
		return (
			<div
				class='sticky top-0 mb-3 h-8'
				slot='items'
			>
				<p-field
					class='block'
					placeholder={this.autocompletePlaceholder}
					onValueChange={ev => this._onAutoComplete(ev)}
					onInputRefChange={ev => (this.autocompleteInputRef = ev.detail)}
					value={this.query}
				/>
			</div>
		);
	}

	private _setMultiContainerMaxWidth() {
		if (!this._inputRef || !this._multiContainerRef) {
			return;
		}

		const calced = this._inputRef.clientWidth - 16;
		this._multiContainerRef.style.maxWidth = `${calced >= 16 ? calced : 16}px`;
	}

	private _setCheckSelectedItemsTimeout() {
		if (this._checkSelectedItemsTimeout) {
			clearTimeout(this._checkSelectedItemsTimeout);
		}

		this._checkSelectedItemsTimeout = setTimeout(
			() => this._checkSelectedItems(),
			50
		);
	}

	private _checkSelectedItems() {
		if (!this._multiContainerRef) {
			return;
		}

		const containerRect = this._multiContainerRef.getBoundingClientRect();
		const items = this._multiContainerRef.querySelectorAll('.item');

		let amountHidden = 0;

		for (const child of items) {
			child.classList.remove('hidden');
			child.classList.add('flex');

			const childRect = child.getBoundingClientRect();
			if (childRect.right > containerRect.right) {
				child.classList.remove('flex');
				child.classList.add('hidden');
				amountHidden++;

				continue;
			}
		}

		this._amountHidden = amountHidden;
		const extra = this._multiContainerRef.querySelector('.extra');
		if (!extra) {
			return;
		}

		if (!extra.classList.contains('hidden')) {
			extra.classList.add('hidden');
		}

		if (amountHidden > 0) {
			extra.classList.remove('hidden');
		}
	}

	private _onDropdownOpen(ev) {
		if (!ev.detail || !this.autocompleteInputRef) {
			return;
		}

		this.autocompleteInputRef.focus();
	}

	private _selectAllChange() {
		this._allSelected = !this._allSelected;
		this.selectAllChange.emit(this._allSelected);
	}

	private _getDisplay(item, isSelection = false) {
		let content = (
			<div class={textContainer({ variant: 'default' })}>
				{
					item[
						isSelection
							? this.selectionDisplayKey ?? this.displayKey
							: this.displayKey
					]
				}
			</div>
		);

		if (this.avatarKey) {
			content = (
				<span class='flex items-center gap-2'>
					<p-avatar
						size='sm'
						src={item[this.avatarKey]}
						letters={item[this.avatarLettersKey]}
					></p-avatar>
					<div class={textContainer({ variant: 'default' })}>
						{item[this.dropdownDisplayKey ?? this.displayKey]}
					</div>
				</span>
			);
		}

		if (this.iconKey && (!isSelection || this.showIconInSelectedItem)) {
			content = (
				<span class='flex items-center gap-2'>
					<p-icon variant={item[this.iconKey] as IconVariant} />
					<div class={textContainer({ variant: 'default' })}>
						{item[this.dropdownDisplayKey ?? this.displayKey]}
					</div>
				</span>
			);
		}

		if (
			(!isSelection || this.applyClassOnSelectedItem) &&
			!!item?.class?.length
		) {
			return <div class={item.class}>{content}</div>;
		}

		return content;
	}

	private _getParsedItems(applyPagination = true) {
		if (!this.items || this.loading) {
			return [];
		}

		let items =
			typeof this.items === 'string' ? JSON.parse(this.items) : this.items;

		if (typeof items?.[0] === 'string') {
			this.displayKey = 'text';
			this.valueKey = 'value';

			items = items.map(str => ({
				value: str,
				text: str,
			}));
		}

		if (this.query?.length && !this.asyncFilter) {
			items = items.filter(item => {
				if (this.queryKey) {
					return this._checkvalue(this.queryKey, item);
				}

				return (
					this._checkvalue(this._identifierKey, item) ||
					this._checkvalue(this.displayKey, item)
				);
			});
		}

		if (!applyPagination) {
			return items;
		}

		return items?.slice(0, this.maxDisplayedItems);
	}
}
