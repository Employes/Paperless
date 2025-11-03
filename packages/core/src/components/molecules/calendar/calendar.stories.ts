import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Molecules/Calendar',
	component: 'p-calendar',
	argTypes: {
		'min-date': {
			type: 'date',
		},
		'max-date': {
			type: 'date',
		},
	},
};

export default meta;

export const Default = {
	render: ({
		variant,
		value,
		'preselect-today': preselectToday,
		'disabled-dates': disabledDates,
		'min-date': minDate,
		'max-date': maxDate,
		'disable-weekends': disableWeekends,
		'enable-today': enableToday,
		'today-text': todayText,
		mode,
	}) => html`<p-calendar
		variant=${variant ?? nothing}
		value=${value ?? nothing}
		preselect-today=${preselectToday ?? nothing}
		disabled-dates=${disabledDates ?? nothing}
		min-date=${minDate ?? nothing}
		max-date=${maxDate ?? nothing}
		disable-weekends=${disableWeekends ?? nothing}
		enable-today=${enableToday ?? nothing}
		today-text=${todayText ?? nothing}
		mode=${mode ?? nothing}
		@valueChange=${action('valueChange')}
	/>`,
};
