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
import { IconVariant } from '../../atoms/icon/icon.component';

@Component({
	tag: 'p-select',
	styleUrl: 'select.component.scss',
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
	 * Wether the field is required
	 */
	@Prop({ reflect: true }) required: boolean;

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

	private _inputRef: HTMLDivElement;
	private autocompleteInputRef: HTMLInputElement;
	private _multiContainerRef: HTMLElement;

	private _resizeObserver: ResizeObserver;
	private _resizeDebounceTimer: NodeJS.Timer;

	get _items() {
		return this._getParsedItems();
	}

	get _displayValue() {
		if (!this._selectedItem) {
			return this.placeholder;
		}

		if (this.multi) {
			if (this._selectedItem?.length === 0) {
				return this.placeholder;
			}

			return (
				<div
					class={`multi-container size-${this.size}`}
					ref={ref => (this._multiContainerRef = ref)}
				>
					{this._selectedItem.map(item => (
						<div
							class='item'
							onClick={() => this._selectValue(item)}
						>
							{item[this.selectionDisplayKey ?? this.displayKey]}
							<p-icon variant='negative' />
						</div>
					))}

					<div class='extra hidden'>+{this._amountHidden}</div>
				</div>
			);
		}

		return this._getDisplay(this._selectedItem, true);
	}

	get _identifierKey() {
		return this.identifierKey ?? this.valueKey ?? 'value';
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
					this._checkSelectedItems();
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
			this._checkSelectedItems();
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
				>
					<p-input-group
						slot='trigger'
						icon={this.icon}
						size={this.size}
						prefix={this.prefix}
						label={this.label}
						helper={this.helper}
						required={this.required}
						error={this.error}
						disabled={this.disabled}
						focused={this._showDropdown}
						forceShowTooltip={this.error?.length && this._showDropdown}
					>
						<div
							slot='input'
							class={`p-input read-only cursor-pointer ${
								this.showChevron ? 'max-w-[calc(100%-3rem)]' : 'w-full'
							} size-${this.size} ${
								this._displayValue === this.placeholder
									? 'font-medium text-storm-medium'
									: ''
							}`}
							contenteditable
							onFocus={ev => this._onFocus(ev)}
							onMouseDown={ev => this._onMouseDown(ev)}
							onClick={() => this._onClick()}
							ref={ref => (this._inputRef = ref)}
						>
							{this._displayValue}
						</div>

						{this.showChevron && (
							<p-icon
								variant='chevron'
								slot='suffix'
							/>
						)}
					</p-input-group>
					<div slot='items'>
						{this.loading ? this._getLoadingItems() : this._getItems()}
						{this.showAddItem && this._getAddItem()}
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
	}

	@Watch('value')
	private _valueChange() {
		setTimeout(() => this._preselectItem());
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

	private _onFocus(ev) {
		ev.preventDefault();
		this._inputRef.blur();

		if (!this._showDropdown) {
			this._showDropdown = true;
		}

		return;
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

		this.query = ev.target.value;
		this.queryChange.emit(ev.target.value);
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
				variant={this.multi ? 'checkbox' : 'default'}
				class='justify-start'
			>
				{this._getDisplay(item)}
			</p-dropdown-menu-item>
		));

		if (!this._items.length) {
			items = [
				<p class='w-full p-2 text-center text-sm text-storm-medium'>
					{this.emptyStateText}
				</p>,
			];
		}

		if (this.enableSelectAll && this._items.length) {
			items.unshift(
				<p-dropdown-menu-item
					useContainer={false}
					variant='checkbox'
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
			>
				<span class='flex items-center gap-1 font-semibold text-indigo'>
					{this.addItemText}
					<p-icon variant='plus' />
				</span>
			</p-dropdown-menu-item>
		);
	}

	private _getLoadingItems() {
		const items = [0, 0, 0].map(() => (
			<p-dropdown-menu-item enableHover={false}>
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
			<div class='sticky top-0 -mt-2 bg-white pt-2'>
				<input
					class='p-input size-small sticky top-2 mb-2'
					placeholder={this.autocompletePlaceholder}
					onInput={ev => this._onAutoComplete(ev)}
					ref={ref => (this.autocompleteInputRef = ref)}
					value={this.query}
				/>
			</div>
		);
	}

	private _setMultiContainerMaxWidth() {
		if (!this._inputRef || !this._multiContainerRef) {
			return;
		}

		this._multiContainerRef.style.maxWidth = `${
			this._inputRef.clientWidth - 16
		}px`;
	}

	private _checkSelectedItems() {
		if (!this._multiContainerRef) {
			return;
		}

		const containerRect = this._multiContainerRef.getBoundingClientRect();
		const items = Array.from(
			this._multiContainerRef.querySelectorAll('.item')
		) as HTMLElement[];

		let amountHidden = 0;

		for (const child of items) {
			child.classList.remove('hidden');

			const childRect = child.getBoundingClientRect();
			if (childRect.right > containerRect.right) {
				child.classList.add('hidden');
				amountHidden++;
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
			<div class='text-container'>
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
						size='xsmall'
						src={item[this.avatarKey]}
						letters={item[this.avatarLettersKey]}
					></p-avatar>
					<div class='text-container'>
						{item[this.dropdownDisplayKey ?? this.displayKey]}
					</div>
				</span>
			);
		}

		if (this.iconKey && (!isSelection || this.showIconInSelectedItem)) {
			content = (
				<span class='flex items-center gap-2'>
					<p-icon variant={item[this.iconKey] as IconVariant} />
					<div class='text-container'>
						{item[this.dropdownDisplayKey ?? this.displayKey]}
					</div>
				</span>
			);
		}

		return (
			<div
				class={
					!isSelection || this.applyClassOnSelectedItem
						? `max-w-full ${item?.class}`
						: 'max-w-full'
				}
			>
				{content}
			</div>
		);
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
