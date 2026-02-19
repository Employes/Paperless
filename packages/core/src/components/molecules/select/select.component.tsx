import { Strategy } from '@floating-ui/dom';
import {
	AttachInternals,
	Component,
	Element,
	Event,
	EventEmitter,
	h,
	Listen,
	Prop,
	State,
	Watch,
} from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../internal/themed-host.component';
import { IconVariant } from '../../../types/icon';
import { childOfComposed, cn } from '../../../utils';
import { SELECT_DEFAULT_MAX_DISPLAYED_ITEMS } from '../../../utils/constants';

const multiContainer = cva([
	'flex items-center gap-2',
	'h-full min-w-0 flex-1',
	'pointer-events-none overflow-hidden',
]);

const multiItem = cva([
	'item group/item',
	'pointer-events-auto cursor-pointer',
	'flex h-[1.625rem] items-center gap-2',
	'h-[1.625rem] px-2',
	'whitespace-nowrap text-sm font-semibold',
	'rounded-lg',
	'bg-indigo-100',
	'dark:bg-white/15',
]);

const textContainer = cva('block w-full overflow-hidden text-start', {
	variants: {
		variant: {
			placeholder: `
     text-storm-400
     dark:text-white
   `,
			default: null,
		},
		enableTextWrap: {
			true: false,
			false: 'text-ellipsis whitespace-nowrap',
		},
		error: {
			true: `
     text-negative-red-700
     group-hover/button:text-negative-red-800
     dark:text-negative-red-alternative
   `,
			false: null,
		},
	},
});

@Component({
	tag: 'p-select',
	styleUrl: 'select.component.css',
	formAssociated: true,
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
	@Prop() iconKey: string = 'icon';

	/**
	 * The key of the class we can apploy to the icon
	 */
	@Prop() iconClassKey: string = 'iconClass';

	/**
	 * Wether to apply the item's icon on the selected item display
	 */
	@Prop() showIconOnSelectedItem: string;

	/**
	 * The key of a class in an item to apply
	 */
	@Prop() classKey: string = 'class';

	/**
	 * Wether to apply the item's class also on the selected item
	 */
	@Prop() applyClassOnSelectedItem: boolean;

	/**
	 * Wether to apply the item's class also on the selected item within the menu
	 */
	@Prop() applyClassOnSelectedItemInMenu: boolean;

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
	@Prop() maxDisplayedItems: number = SELECT_DEFAULT_MAX_DISPLAYED_ITEMS;

	/**
	 * Wether to enable autocomplete
	 */
	@Prop() enableAutocomplete: boolean = true;

	/**
	 * Wether to enable wrapping the text to a new line in the dropdown menu
	 */
	@Prop() enableTextWrap?: boolean = false;

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
	 * Wether to show optional when not required
	 */
	@Prop({ reflect: true }) showOptional: boolean = true;

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
								class='
          text-xs text-indigo-500
          group-hover/item:text-indigo-800
          dark:text-white/15
          dark:group-hover/item:text-white
        '
								variant='negative'
							/>
						</div>
					))}

					<div class='extra pointer-events-none hidden text-sm text-storm-100'>
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
		this._selectValue(null);
	}

	// formDisabledCallback(disabled: boolean) {
	// 	if (!this._internals.form) {
	// 		return;
	// 	}
	//
	// 	//this.disabled = disabled;
	// }
	//
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
		let buttonIcon = this.icon;

		if (
			this._selectedItem &&
			!this.avatarKey &&
			!!this.iconKey &&
			this._selectedItem?.[this.iconKey] &&
			!this.showIconOnSelectedItem
		) {
			buttonIcon = this._selectedItem[this.iconKey];
		}

		if (
			(this.avatarKey && this._selectedItem?.[this.avatarKey]) ||
			(this.avatarLettersKey && this._selectedItem?.[this.avatarLettersKey])
		) {
			buttonIcon = null;
		}

		if (this.error?.length) {
			buttonIcon = 'warning';
		}

		return (
			<ThemedHost>
				<p-field-container
					error={this.error}
					forceShowTooltip={!!this.error?.length && !this._showDropdown}
					helper={this.helper}
					label={this.label}
					prefix={this.prefix}
					required={this.required}
					showOptional={this.showOptional}
					variant='write'
				>
					<p-dropdown
						applyChevron={false}
						applyFullWidth={true}
						applyMaxWidth={false}
						disable-trigger-click={this.disabled}
						insideClick={true}
						manual={true}
						manualChevron={true}
						scrollable={this.enableAutocomplete ? 'large' : true}
						show={this._showDropdown}
						slot='content'
						strategy={this.strategy}
						onIsOpen={ev => this._onDropdownOpen(ev)}
					>
						<p-button
							active={this._showDropdown}
							chevron={
								this.showChevron ? (this._showDropdown ? 'up' : 'down') : false
							}
							class='w-full'
							error={!!this.error?.length}
							icon={buttonIcon}
							iconClass={
								this.applyClassOnSelectedItem &&
								this._selectedItem?.[this.iconClassKey]
							}
							size={this.size}
							slot='trigger'
							variant='secondary'
							onClick={ev => this._onClick(ev)}
						>
							<div
								class='relative min-w-0 flex-1'
								ref={ref => (this._inputRef = ref)}
							>
								{this._displayValue}
							</div>
						</p-button>
						{this.loading ? this._getLoadingItems() : this._getItems()}
						{this.showAddItem && this._getAddItem()}
					</p-dropdown>
				</p-field-container>
			</ThemedHost>
		);
	}

	@Listen('click', { target: 'document', capture: true })
	protected documentClickHandler(event) {
		if (!this._showDropdown || childOfComposed(event, this._el)) {
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
			if (value.length === 0) {
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

		this._selectValue(item ?? value, false);
	}

	private _selectValue(item, forceBlur = true) {
		let value =
			!!this.valueKey &&
			this.valueKey !== 'false' &&
			item !== null &&
			!this.loading
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
		this._onBlur(forceBlur);

		if (value === this.value) {
			return;
		}

		this.value = value;
		this.valueChange.emit(value);
	}

	private _onClick(event) {
		const composed = event?.composedPath();

		for (const item of composed) {
			if (item.nodeName.toLowerCase() === 'p-button') {
				break;
			}

			if (item.classList?.contains('item')) {
				return;
			}
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
		let items = this._items.map(item => {
			const isSelected =
				this.multi && !!this._selectedItem && Array.isArray(this._selectedItem)
					? this._selectedItem.some(
							i => i[this._identifierKey] === item[this._identifierKey]
						)
					: item[this._identifierKey] ===
						this._selectedItem?.[this._identifierKey];
			return (
				<p-dropdown-menu-item
					active={isSelected}
					checkbox={this.multi ? true : false}
					enableTextWrap={this.enableTextWrap}
					slot='items'
					useContainer={false}
					onClick={() => this._selectValue(item)}
				>
					{this._getDisplay(item, false, isSelected)}
				</p-dropdown-menu-item>
			);
		});

		if (this._items.length === 0) {
			items = [
				<p
					class='
       w-full p-2 text-center text-sm text-storm-400
       dark:text-hurricane-200
     '
					slot='items'
				>
					{this.emptyStateText}
				</p>,
			];
		}

		if (this.enableSelectAll && this._items.length > 0) {
			items.unshift(
				<p-dropdown-menu-item
					active={this._allSelected}
					slot='items'
					useContainer={false}
					checkbox
					onClick={() => this._selectAllChange()}
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
				slot='items'
				useContainer={false}
				onClick={() => this.add.emit()}
			>
				<span class='flex items-center gap-1 font-semibold text-indigo-600'>
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
					class='h-6 w-full rounded'
					variant='ghost'
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
				class='sticky top-0 z-10 mb-3 h-8'
				slot='items'
			>
				<p-field
					class='block'
					placeholder={this.autocompletePlaceholder}
					value={this.query}
					onInputRefChange={ev => (this.autocompleteInputRef = ev.detail)}
					onValueChange={ev => this._onAutoComplete(ev)}
				/>
			</div>
		);
	}

	private _setMultiContainerMaxWidth() {
		if (!this._inputRef || !this._multiContainerRef) {
			return;
		}

		const calced = this._inputRef.clientWidth - 16;
		this._multiContainerRef.style.maxWidth = `${Math.max(calced, 16)}px`;
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

		setTimeout(() => this.autocompleteInputRef.focus(), 100);
	}

	private _selectAllChange() {
		this._allSelected = !this._allSelected;
		this.selectAllChange.emit(this._allSelected);
	}

	private _getDisplay(item, isSelection = false, isSelectedInMenu = false) {
		let content = (
			<div
				class={textContainer({
					variant: 'default',
					error: !!this.error?.length,
					enableTextWrap: this.enableTextWrap && !isSelection,
				})}
			>
				{
					item[
						isSelection
							? (this.selectionDisplayKey ?? this.displayKey)
							: this.displayKey
					]
				}
			</div>
		);

		if (this.avatarKey) {
			content = (
				<span class='flex items-center gap-2'>
					<p-avatar
						letters={item[this.avatarLettersKey]}
						size='sm'
						src={item[this.avatarKey]}
					></p-avatar>
					<div
						class={textContainer({
							variant: 'default',
							error: !!this.error?.length,
							enableTextWrap: this.enableTextWrap && !isSelection,
						})}
					>
						{item[this.dropdownDisplayKey ?? this.displayKey]}
					</div>
				</span>
			);
		}

		if (this.iconKey && (!isSelection || this.showIconOnSelectedItem)) {
			content = (
				<span class='flex items-center gap-2'>
					{item[this.iconKey] && (
						<p-icon
							class={cn(
								`
          text-storm-300
          dark:text-hurricane-200
        `,
								(!isSelection || !!this.applyClassOnSelectedItem) &&
									(!isSelectedInMenu || !!this.applyClassOnSelectedItemInMenu)
									? (item?.[this.iconClassKey] ?? '')
									: ''
							)}
							variant={item[this.iconKey] as IconVariant}
						/>
					)}
					<div
						class={textContainer({
							variant: 'default',
							error: !!this.error?.length,
							enableTextWrap: this.enableTextWrap && !isSelection,
						})}
					>
						{item[this.dropdownDisplayKey ?? this.displayKey]}
					</div>
				</span>
			);
		}

		if (
			(!isSelection || !!this.applyClassOnSelectedItem) &&
			(!isSelectedInMenu || !!this.applyClassOnSelectedItemInMenu) &&
			!!item?.[this.classKey]?.length
		) {
			return <div class={item[this.classKey]}>{content}</div>;
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
