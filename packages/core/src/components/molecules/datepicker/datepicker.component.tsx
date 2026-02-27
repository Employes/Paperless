import { Placement, Strategy } from '@floating-ui/dom';
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
import {
	format,
	isAfter,
	isBefore,
	isSameDay,
	isValid,
	isWeekend,
	parse,
	startOfDay,
	startOfMonth,
	startOfYear,
	addYears,
	getYear,
	setYear,
	subYears,
} from 'date-fns';
import { enUS, nl } from 'date-fns/locale';

import { state } from '../../../state';
import { childOf, isMobileBrowser } from '../../../utils';
import { asBoolean } from '../../../utils/as-boolean';

@Component({
	tag: 'p-datepicker',
	styleUrl: 'datepicker.component.css',
	shadow: false,
	formAssociated: true,
})
export class Datepicker {
	/**
	 * The placeholder of the input
	 */
	@Prop() placeholder: string;

	/**
	 * The current value
	 */
	@Prop() value: Date | string | null | undefined;

	/**
	 * Wethter to automatically preselect today
	 */
	@Prop() preselectToday: boolean = false;

	/**
	 * Enable native picker for mobile devices
	 */
	@Prop() enableNativePicker: boolean = true;

	/**
	 * Disabled dates
	 */
	@Prop() disabledDates?: Array<Date | string> | string;

	/**
	 * Min date
	 */
	@Prop() minDate?: Date | string | null = null;

	/**
	 * Max date
	 */
	@Prop() maxDate?: Date | string | null = null;

	/**
	 * Wether to disable the weekends
	 */
	@Prop() disableWeekends: boolean = false;

	/**
	 * Wether to enable the today button
	 */
	@Prop() enableToday: boolean = true;

	/**
	 * The text to display on the today tooltip
	 */
	@Prop() todayText: string = 'today';

	/**
	 * The mode of the datepicker
	 */
	@Prop() mode: 'year' | 'month' | 'day' = 'day';

	/**
	 * Event when the value changes
	 */
	@Event({
		bubbles: false,
	})
	valueChange: EventEmitter<any>;

	/**
	 * The display & parse format to use
	 */
	@Prop() format: string = 'dd-MM-yyyy';

	/**
	 * Hides the icon when filled
	 */
	@Prop() hideIconWhenFilled: boolean = false;

	/**
	 * The size of the input group used by the datepicker
	 */
	@Prop() size: 'sm' | 'base' = 'base';

	/**
	 * The prefix of the input group used by the datepicker
	 */
	@Prop() prefix: string;

	/**
	 * The label of the input group used by the datepicker
	 */
	@Prop() label: string;

	/**
	 * Wether the field is loading
	 */
	@Prop() loading: boolean = false;

	/**
	 * The helper of the input group used by the datepicker
	 */
	@Prop() helper: string;

	/**
	 * Wether the field is required
	 */
	@Prop({ reflect: true }) required: boolean;

	/**
	 * Wether to show optional when not required
	 */
	@Prop({ reflect: true }) showOptional: boolean = true;

	/**
	 * The helper of the input group used by the datepicker
	 */
	@Prop({ reflect: true }) error: string;

	/**
	 * Wether the input group is disabled used by the datepicker
	 */
	@Prop({ reflect: true }) disabled: boolean = false;

	/**
	 * The strategy of the dropdown placement
	 */
	@Prop() strategy: Strategy = 'absolute';

	/**
	 * The placement of the dropdown
	 */
	@Prop({ reflect: true }) placement: Placement = 'bottom-start';

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	@State() private _showDropdown: any = false;
	@State() private _value: Date;
	@State() private _minDate: Date;
	@State() private _maxDate: Date;
	@State() private _disabledDates: Date[] = [];
	@State() private _isMobileBrowser: boolean = false;

	@AttachInternals() _internals: ElementInternals;

	private _onInputTimeout: NodeJS.Timeout;
	private _inputRef: HTMLInputElement | HTMLTextAreaElement;
	private _dateInputRef: HTMLInputElement;

	private _defaultFormats = {
		year: 'yyyy',
		month: 'LLLL, yyyy',
		day: 'dd-MM-yyyy',
		dayNoDashes: 'ddMMyyyy',
	};

	@Watch('value')
	protected parseValue(value: string | Date) {
		if (!value && this.preselectToday) {
			value = new Date();
		}

		if (typeof value === 'string') {
			value = new Date(value);
		}

		this._setValue(value);
	}

	@Watch('minDate')
	protected parseMinDate(minDate: string | Date | null) {
		if (minDate === null || minDate === '') {
			this.minDate = new Date(getYear(subYears(new Date(), 100)), 0, 1);
			return;
		}

		if (typeof minDate === 'string') {
			minDate = new Date(minDate);
		}

		if (!isValid(minDate)) {
			return;
		}

		this._minDate = minDate;

		if (isBefore(this._value, this._minDate)) {
			this._setValue(null);
		}
	}

	@Watch('maxDate')
	protected parseMaxDate(maxDate: string | Date | null) {
		if (maxDate === null || maxDate === '') {
			this.maxDate = this._getAutomaticMax();
			return;
		}

		if (typeof maxDate === 'string') {
			maxDate = new Date(maxDate);
		}

		if (!isValid(maxDate)) {
			return;
		}

		this._maxDate = maxDate;

		if (isAfter(this._value, this._maxDate)) {
			this._setValue(null);
		}
	}

	@Watch('disabledDates')
	protected parseDisabledDates(disabledDates: Array<string | Date> | string) {
		if (typeof disabledDates === 'string') {
			disabledDates = JSON.parse(disabledDates);
		}

		if (!disabledDates || !Array.isArray(disabledDates)) {
			return;
		}

		// normalize all to date
		this._disabledDates = disabledDates
			.map(date => {
				if (typeof date === 'string') {
					return new Date(date);
				}

				return date;
			})
			.filter(date => isValid(date));

		if (this._isDisabledDay(this._value)) {
			this._setValue(null);
		}
	}

	formResetCallback() {
		this._setValue(null);
	}

	formDisabledCallback(disabled: boolean) {
		if (!this._internals.form) {
			return;
		}

		this.disabled = disabled;
	}

	componentWillLoad() {
		if (this.disabledDates) {
			this.parseDisabledDates(this.disabledDates);
		}

		this.parseMinDate(this.minDate);
		this.parseMaxDate(this.maxDate);

		this._isMobileBrowser = isMobileBrowser();

		this.parseValue(this.value);
	}

	componentWillRender() {
		if (this.mode !== 'day' && this.format === this._defaultFormats['day']) {
			this.format = this._defaultFormats[this.mode];
		}
	}

	render() {
		return (
			<p-dropdown
				allowOverflow={true}
				applyFullWidth={false}
				applyMaxWidth={false}
				disableTriggerClick={true}
				insideClick={true}
				isDatepicker={true}
				placement={this.placement}
				show={this._showDropdown}
				strategy={this.strategy}
			>
				<p-field
					autoShowError={false}
					disabled={asBoolean(this.disabled)}
					error={this.error}
					focused={this._showDropdown}
					forceShowTooltip={!!this.error?.length && !this._showDropdown}
					helper={this.helper}
					icon={
						this.hideIconWhenFilled && !!this._value ? null : 'calendar-multi'
					}
					iconPosition='start'
					label={this.label}
					loading={this.loading}
					placeholder={this.placeholder}
					prefix={this.prefix}
					required={asBoolean(this.required)}
					showOptional={asBoolean(this.showOptional)}
					size={this.size}
					slot='trigger'
					value={this._getFormattedDate()}
					onBlur={(ev: FocusEvent) => this._onBlur(ev)}
					onFocus={() => this._onFocus()}
					onInputRefChange={ev => (this._inputRef = ev.detail)}
					onValueChange={ev => this._onValueChange(ev.detail as string)}
				></p-field>

				{this.enableNativePicker && this._isMobileBrowser && (
					<input
						class='
							pointer-events-none absolute left-0 top-0 z-[-10] overflow-hidden
							opacity-0
						'
						max={
							this.maxDate &&
							format(new Date(this.maxDate), 'yyyy-MM-dd', {
								locale: state.locale === 'nl' ? nl : enUS,
							})
						}
						min={
							this._minDate &&
							format(new Date(this._minDate), 'yyyy-MM-dd', {
								locale: state.locale === 'nl' ? nl : enUS,
							})
						}
						ref={ref => (this._dateInputRef = ref)}
						slot='trigger'
						type={this.mode === 'day' ? 'date' : 'month'}
						value={
							this._value &&
							format(this._value, 'yyyy-MM-dd', {
								locale: state.locale === 'nl' ? nl : enUS,
							})
						}
						onInput={ev => this._onNativeInput(ev)}
					/>
				)}
				<div
					slot='items'
					tabIndex={-1}
				>
					<p-calendar
						disableWeekends={this.disableWeekends}
						disabledDates={this.disabledDates}
						enableToday={this.enableToday}
						maxDate={this.maxDate}
						minDate={this.minDate}
						mode={this.mode}
						preselectToday={this.preselectToday}
						todayText={this.todayText}
						value={this._value}
						variant='embedded'
						onValueChange={({ detail }) => (this.value = detail)}
					/>
				</div>
			</p-dropdown>
		);
	}

	@Listen('click', { target: 'document', capture: true })
	protected documentClickHandler({ target }) {
		if (!this._showDropdown || childOf(target, this._el)) {
			return;
		}

		this._showDropdown = false;
	}

	private _onFocus() {
		if (this._isMobileBrowser && this._dateInputRef) {
			this._dateInputRef.focus();
			this._dateInputRef.showPicker();
			this._inputRef.blur();
			return;
		}

		this._showDropdown = true;
	}

	private _onBlur(ev: FocusEvent, parseFormat?: string) {
		parseFormat = parseFormat || this.format;

		if (this._isMobileBrowser && this._dateInputRef) {
			return;
		}

		if (ev.relatedTarget && !childOf(ev.relatedTarget, this._el)) {
			this._showDropdown = false;
		}

		const target = this._inputRef;

		if (target.value === null) {
			return;
		}

		const value = parse(target.value, parseFormat, new Date(), {
			locale: state.locale === 'nl' ? nl : enUS,
		});

		if (value === this._value) {
			return;
		}

		const valid = isValid(value);
		if (!valid && parseFormat === this.format && this.mode === 'day') {
			return this._onBlur(ev, this._defaultFormats['dayNoDashes']);
		}

		if (!valid || this._isDisabledDay(value)) {
			target.value = this._getFormattedDate();
			return;
		}

		this._setValue(value, false);
	}

	private _onValueChange(value: string, parseFormat = this.format) {
		if (this._onInputTimeout) {
			clearTimeout(this._onInputTimeout);
			this._onInputTimeout = null;
		}

		this._onInputTimeout = setTimeout(() => {
			if (value.length === 0) {
				if (this._value === null) {
					return;
				}

				this._setValue(null);
				return;
			}

			const parsedValue = parse(value, parseFormat, new Date());

			if (
				!isValid(parsedValue) ||
				format(parsedValue, parseFormat, {
					locale: state.locale === 'nl' ? nl : enUS,
				}) !== value
			) {
				if (this.mode === 'day') {
					this._onValueChange(value, this._defaultFormats['dayNoDashes']);
				}

				return;
			}

			this._setValue(parsedValue, false);
		}, 300);
	}

	private _onNativeInput(ev) {
		if (!ev.target) {
			return;
		}

		if (this._onInputTimeout) {
			clearTimeout(this._onInputTimeout);
			this._onInputTimeout = null;
		}

		this._onInputTimeout = setTimeout(() => {
			this._setValue(
				ev.target.value === '' ? null : new Date(ev.target.value),
				false
			);
		});
	}

	private _setValue(value: Date | null, hideDropdown = true) {
		if (value === null) {
			this._value = null;
			this.valueChange.emit(null);
			return;
		}

		if (!isValid(value)) {
			return;
		}

		if (this._isDisabledDay(value)) {
			if (this._dateInputRef?.value) {
				this._dateInputRef.value = this._value
					? format(this._value, 'yyyy-MM-dd', {
							locale: state.locale === 'nl' ? nl : enUS,
						})
					: null;
			}

			return;
		}

		value =
			this.mode === 'day'
				? startOfDay(value)
				: this.mode === 'month'
					? startOfMonth(value)
					: startOfYear(value);
		const isSameValue = isSameDay(value, this._value);

		if (isSameValue) {
			return;
		}

		if (hideDropdown) {
			this._showDropdown = false;
		}

		this._value = value;
		this.valueChange.emit(value);
	}

	private _isDisabledDay(day: Date) {
		return (
			(this.disableWeekends && isWeekend(day)) ||
			(isBefore(day, this._minDate) && !isSameDay(day, this._minDate)) ||
			(isAfter(day, this._maxDate) && !isSameDay(day, this._maxDate)) ||
			this._disabledDates.some(date => isSameDay(date, day))
		);
	}

	private _getFormattedDate() {
		if (!this._value) {
			return '';
		}

		return format(this._value, this.format, {
			locale: state.locale === 'nl' ? nl : enUS,
		});
	}

	private _getAutomaticMax() {
		const date = addYears(new Date(), 50);

		let year = getYear(date);
		year = Math.ceil(year / 10) * 10;

		return setYear(date, year);
	}
}
