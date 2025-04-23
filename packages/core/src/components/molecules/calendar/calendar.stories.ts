import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Molecules/Calendar',
	component: 'p-calendar',
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
		mode,
	}) => html`<p-calendar
		variant=${variant ?? nothing}
		value=${value ?? nothing}
		preselect-today=${preselectToday ?? nothing}
		disabled-dates=${disabledDates ?? nothing}
		min-date=${minDate ?? nothing}
		max-date=${maxDate ?? nothing}
		disable-weekends=${disableWeekends ?? nothing}
		mode=${mode ?? nothing}
		@valueChange=${action('valueChange')}
	/>`,
	tags: ['!dev'],
};