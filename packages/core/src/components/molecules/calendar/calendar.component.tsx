import {
	Component,
	Element,
	Event,
	EventEmitter,
	h,
	Host,
	Prop,
	State,
	Watch,
} from '@stencil/core';
import { cva } from 'class-variance-authority';
import {
	addDays,
	addMonths,
	addYears,
	endOfMonth,
	format,
	getDay,
	getDaysInMonth,
	getYear,
	isAfter,
	isBefore,
	isSameDay,
	isSameMonth,
	isSameYear,
	isValid,
	setDate,
	setMonth,
	setYear,
	startOfDay,
	startOfMonth,
} from 'date-fns';
import { cn } from '../../../utils/cn';

const calendar = cva(['p-calendar bg-white w-[17.5rem] flex flex-col gap-4'], {
	variants: {
		variant: {
			default: ['p-2 rounded-lg drop-shadow-2', 'border border-black-teal-100'],
			embedded: 'p-1',
		},
	},
});

const header = cva(
	['flex items-center gap-1', 'w-full p-2', 'bg-off-white-300 rounded-lg'],
	{
		variants: {
			type: {
				day: 'justify-between',
				month: 'justify-between',
				year: 'justify-center',
			},
		},
	}
);

const view = cva(['flex flex-col gap-2', 'w-full'], {
	variants: {
		view: {
			day: 'h-auto min-h-[12rem]',
			month: null,
			year: 'max-h-[14rem]',
		},
	},
});

@Component({
	tag: 'p-calendar',
	styleUrl: 'calendar.component.css',
})
export class Calendar {
	/**
	 * The variant of the button
	 */
	@Prop() variant: 'default' | 'embedded' = 'default';

	/**
	 * The current value
	 */
	@Prop() value?: Date | string;

	/**
	 * Wether to automatically preselect today
	 */
	@Prop() preselectToday: boolean = false;

	/**
	 * Disabled dates
	 */
	@Prop() disabledDates?: Array<Date | string> | string;

	/**
	 * Min date
	 */
	@Prop() minDate: Date | string = new Date(1970, 0, 1);

	/**
	 * Max date
	 */
	@Prop() maxDate: Date | string = this._getAutomaticMax();

	/**
	 * Wether to disable the weekends
	 */
	@Prop() disableWeekends: boolean = false;

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
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	private _today = new Date();
	@State() private _view: 'year' | 'month' | 'day' = this.mode;
	@State() private _viewDate = this._today;

	@State() private _value: Date;
	@State() private _minDate: Date;
	@State() private _maxDate: Date;
	@State() private _disabledDates: Date[] = [];

	private _weekDays = Array.from(Array(7).keys());

	componentWillLoad() {
		if (this.disabledDates) {
			this._parseDisabledDates(this.disabledDates);
		}

		if (this.minDate) {
			this._parseMinDate(this.minDate);
		}

		if (this.maxDate) {
			this._parseMaxDate(this.maxDate);
		}

		this._parseValue(this.value);

		if (this._value) {
			this._viewDate = this._value;
		}

		if (isBefore(this._viewDate, this._minDate)) {
			this._viewDate = this._minDate;
		}

		if (isAfter(this._viewDate, this._maxDate)) {
			this._viewDate = this._maxDate;
		}
	}

	componentDidRender() {
		if (this._view === 'year') {
			this._scrollYearIntoView();
		}
	}

	@Watch('value')
	private _parseValue(value: string | Date) {
		if (!value && this.preselectToday) {
			value = new Date();
		}

		if (typeof value === 'string') {
			value = new Date(value);
		}

		if (isValid(value) && !isSameDay(value, this._viewDate)) {
			this._viewDate = value;
		}

		this._setValue(value);
	}

	@Watch('minDate')
	private _parseMinDate(minDate: string | Date) {
		if (typeof minDate === 'string') {
			minDate = new Date(minDate);
		}

		if (!isValid(minDate)) {
			return;
		}

		this._minDate = minDate;

		if (isBefore(this._viewDate, this._minDate)) {
			this._viewDate = this._minDate;
		}
	}

	@Watch('maxDate')
	private _parseMaxDate(maxDate: string | Date) {
		if (typeof maxDate === 'string') {
			maxDate = new Date(maxDate);
		}

		if (!isValid(maxDate)) {
			return;
		}

		this._maxDate = maxDate;

		if (isAfter(this._viewDate, this._maxDate)) {
			this._viewDate = this._maxDate;
		}
	}

	@Watch('disabledDates')
	private _parseDisabledDates(disabledDates: Array<string | Date> | string) {
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
	}

	render() {
		return (
			<Host class={calendar({ variant: this.variant })}>{this._getView()}</Host>
		);
	}

	private _getView() {
		if (this._view === 'year') {
			return this._getYearView();
		}

		if (this._view === 'month') {
			return this._getMonthView();
		}

		return this._getDayView();
	}

	/* With this, we shall hack the system in ways no one would ever have thought.
       <div class="col-start-1 col-start-2 col-start-3 col-start-4 col-start-5 col-start-6 col-start-7"></div>
   */
	private _getDayView() {
		const daysInMonth = this._generateDaysInMonth();
		return (
			<div class={view({ view: 'day' })}>
				{this._getHeader('day')}

				<div class='grid grid-cols-7 justify-between gap-1'>
					{this._weekDays.map(weekday => (
						<span class='w-8 text-center text-xs text-black-teal-200'>
							{format(addDays(new Date(2022, 7, 1), weekday), 'eee')}
						</span>
					))}
					{daysInMonth.map(day => {
						return day.active ? (
							<p-button
								variant='primary'
								class={cn('w-full', `col-start-${day.offset}`)}
								onClick={() => this._setValue(day.date)}
							>
								{/* class={`day ${day.active && 'active'} ${ */}
								{/* 	day.disabled && 'disabled' */}
								{/* } ${day.current && 'current'} ${ */}
								{/* 	day.offset !== false && */}
								{/* }`} */}
								{day.day}
							</p-button>
						) : (
							<time
								class={cn(
									'normal flex items-center justify-center rounded-lg',
									'h-8 w-8 text-sm text-black-teal-300',
									{
										'cursor-pointer hover:bg-white-600 hover:text-black-teal':
											!day.disabled,
									},
									`col-start-${day.offset}`,
									{ 'cursor-not-allowed opacity-60': day.disabled }
								)}
								onClick={() => this._setValue(day.date)}
							>
								{day.day}
							</time>
						);
					})}
				</div>
			</div>
		);
	}

	private _getMonthView() {
		const months = this._generateMonths();
		return (
			<div class={view({ view: 'month' })}>
				{this._getHeader('month')}

				<div class='flex flex-wrap items-start gap-2'>
					{months.map(month => (
						<p-button
							variant={month.active ? 'primary' : 'secondary'}
							disabled={month.disabled}
							onClick={() => this._setMonth(month.month)}
						>
							{format(setMonth(new Date(), month.month), 'MMMM')}
						</p-button>
					))}
				</div>
			</div>
		);
	}

	private _getYearView() {
		const years = this._generateYears();
		return (
			<div
				id='view-year'
				class={view({ view: 'year' })}
			>
				{this._getHeader('year')}
				<div
					id='items'
					class='grid h-full grid-cols-4 gap-2 overflow-scroll'
				>
					{years.map(year => (
						<p-button
							class='w-full'
							variant={year.active ? 'primary' : 'secondary'}
							onClick={() => this._setYear(year.year)}
							data-active={year.active}
							data-current={year.current}
						>
							{year.year}
						</p-button>
					))}
				</div>
			</div>
		);
	}

	private _getHeader(type: 'day' | 'month' | 'year' = 'day') {
		let nextFn = num => this._changeMonth(num);
		let nextType: 'month' | 'year' = 'month';

		if (type === 'month' || type === 'year') {
			nextFn = num => this._changeYear(num);
			nextType = 'year';
		}

		return (
			<div class={header({ type })}>
				{type !== 'year' && (
					<p-button
						variant='secondary'
						iconOnly
						icon='caret'
						iconRotate={90}
						size='sm'
						onClick={() => nextFn(-1)}
						disabled={!this._canSetAmount(nextType, -1)}
					/>
				)}

				<div class='flex gap-2'>
					{this.mode !== 'year' && (
						<p-button
							variant='secondary'
							size='sm'
							onClick={() => this._changeView('month')}
							disabled={!this._canChangeView('month')}
							active={this._view === 'month' && this.mode !== 'month'}
						>
							{format(this._viewDate, 'MMMM')}
						</p-button>
					)}

					<p-button
						variant='secondary'
						size='sm'
						onClick={() => this._changeView('year')}
						disabled={!this._canChangeView('year')}
						active={this._view === 'year' && this.mode !== 'year'}
					>
						{getYear(this._viewDate)}
					</p-button>
				</div>

				{type !== 'year' && (
					<p-button
						variant='secondary'
						iconOnly
						icon='caret'
						iconRotate={-90}
						size='sm'
						onClick={() => nextFn(1)}
						disabled={!this._canSetAmount(nextType, 1)}
					/>
				)}
			</div>
		);
	}

	private _setYear(year: number) {
		const date = setYear(this._viewDate, year);
		if (this.mode === 'year') {
			this._viewDate = date;
			this._setValue(setMonth(setDate(date, 1), 0));
			return;
		}

		this._viewDate = date;
		this._view = 'month';
	}

	private _setMonth(month: number) {
		const date = setMonth(this._viewDate, month);
		if (this.mode === 'month') {
			this._viewDate = date;
			this._setValue(setDate(date, 1));
			return;
		}

		this._viewDate = date;
		this._view = 'day';
	}

	private _changeMonth(amount = 1) {
		const allowed = this._canSetAmount('month', amount);
		if (!allowed) {
			return;
		}

		const newDate = addMonths(this._viewDate, amount);
		this._viewDate = newDate;
	}

	private _changeYear(amount = 1) {
		const allowed = this._canSetAmount('year', amount);
		if (!allowed) {
			return;
		}

		let newDate = addYears(this._viewDate, amount);
		this._viewDate = newDate;
	}

	private _setValue(value: Date) {
		if (value === null) {
			this._value = null;
			this.valueChange.emit(null);
			return;
		}

		if (!isValid(value)) {
			return;
		}

		if (this._isDisabledDay(value)) {
			return;
		}

		value = startOfDay(value);
		const isSameValue = isSameDay(value, this._value);

		if (isSameValue) {
			return;
		}

		this._value = value;
		this.valueChange.emit(value);
	}

	private _generateDaysInMonth() {
		const days = Array.from(Array(getDaysInMonth(this._viewDate)).keys());

		return days.map(day => {
			day = day + 1;
			const date = setDate(this._viewDate, day);

			const dayOfWeek = getDay(date);
			return {
				day,
				date,
				offset: day === 1 ? (dayOfWeek === 0 ? 7 : dayOfWeek) : false,
				current: isSameDay(date, this._today),
				active: isSameDay(date, this._value),
				disabled: this._isDisabledDay(date),
			};
		});
	}

	private _isDisabledDay(day: Date) {
		return (
			(isBefore(day, this._minDate) && !isSameDay(day, this._maxDate)) ||
			(isAfter(day, this._maxDate) && !isSameDay(day, this._maxDate)) ||
			((getDay(day) === 0 || getDay(day) === 6) && this.disableWeekends) ||
			this._disabledDates.findIndex(date => isSameDay(date, day)) >= 0
		);
	}

	private _generateMonths() {
		const year = getYear(this._viewDate);
		const months = Array.from(Array(12).keys());

		return months.map(month => {
			const date = new Date(year, month, 1);
			return {
				month,
				current: isSameMonth(this._today, date),
				active: isSameMonth(this._value, date),
				disabled:
					isAfter(date, this._maxDate) ||
					isBefore(endOfMonth(date), this._minDate),
			};
		});
	}

	private _generateYears() {
		const maxYear = getYear(this._maxDate) + 1;
		const minYear = getYear(this._minDate);

		return Array.from(Array(maxYear - minYear).keys()).map(index => {
			const year = minYear + index;
			return {
				year,
				current: getYear(this._today) === year,
				active: getYear(this._value) === year,
			};
		});
	}

	private _scrollYearIntoView() {
		const items = this._el.querySelector('#view-year > #items');
		if (!items) {
			return;
		}

		const active = items.querySelector('p-button[data-active]') as HTMLElement;
		if (active) {
			return items.scrollTo({
				top: active.offsetTop - 100,
			});
		}

		const current = items.querySelector(
			'p-button[data-current]'
		) as HTMLElement;
		if (current) {
			return items.scrollTo({
				top: current.offsetTop - 100,
			});
		}
	}

	private _changeView(view: 'year' | 'month') {
		if (!this._canChangeView(view)) {
			return;
		}

		this._view = view;
	}

	private _canChangeView(view: 'year' | 'month') {
		if (view === 'year') {
			if (isSameYear(this._minDate, this._maxDate)) {
				return false;
			}

			return true;
		}

		if (isSameMonth(this._minDate, this._maxDate)) {
			return false;
		}

		return true;
	}

	private _canSetAmount(type: 'month' | 'year', amount = 1) {
		if (type === 'month') {
			const newDate = addMonths(this._viewDate, amount);
			const startNewDate = startOfMonth(newDate);
			if (
				(isBefore(startNewDate, startOfMonth(this._minDate)) &&
					!isSameDay(startNewDate, this._minDate)) ||
				isAfter(startNewDate, endOfMonth(this._maxDate))
			) {
				return false;
			}
		}

		if (type === 'year') {
			let newDate = addYears(this._viewDate, amount);
			const year = getYear(newDate);
			if (year < getYear(this._minDate) || year > getYear(this._maxDate)) {
				return false;
			}
		}

		return true;
	}

	private _getAutomaticMax() {
		const date = addYears(new Date(), 50);

		let year = getYear(date);
		year = Math.ceil(year / 10) * 10;

		return setYear(date, year);
	}
}
