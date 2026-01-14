import { action } from '@storybook/addon-actions';
import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Molecules/Datepicker',
	component: 'p-datepicker',
	args: {
		label: 'Label',
	},
	argTypes: {
		'min-date': {
			type: 'date',
		},
		'max-date': {
			type: 'date',
		},
	},
	parameters: {
		docs: {
			iframeHeight: 600,
			story: {
				height: '700px',
			},
		},
	},
};

export default meta;

export const Default = {
	render: ({
		placeholder,
		value,
		'preselect-today': preselectToday,
		'enable-native-picker': enableNativePicker,
		'disabled-dates': disabledDates,
		'min-date': minDate,
		'max-date': maxDate,
		'disable-weekends': disableWeekends,
		'enable-today': enableToday,
		'today-text': todayText,
		mode,
		format,
		'hide-icon-when-filled': hideIconWhenFilled,
		size,
		prefix,
		label,
		loading,
		helper,
		required,
		'show-optional': showOptional,
		error,
		disabled,
		strategy,
		placement,
	}) => html`
		<p-datepicker
			placeholder=${placeholder ?? nothing}
			value=${value ?? nothing}
			preselect-today=${preselectToday ?? nothing}
			enable-native-picker=${enableNativePicker ?? nothing}
			disabled-dates=${disabledDates ?? nothing}
			min-date=${minDate ?? nothing}
			max-date=${maxDate ?? nothing}
			disable-weekends=${disableWeekends ?? nothing}
			enable-today=${enableToday ?? nothing}
			today-text=${todayText ?? nothing}
			mode=${mode ?? nothing}
			format=${format ?? nothing}
			hide-icon-when-filled=${hideIconWhenFilled ?? nothing}
			size=${size ?? nothing}
			prefix=${prefix ?? nothing}
			label=${label ?? nothing}
			loading=${loading ?? nothing}
			helper=${helper ?? nothing}
			required=${required ?? nothing}
			show-optional=${showOptional ?? nothing}
			error=${error ?? nothing}
			disabled=${disabled ?? nothing}
			strategy=${strategy ?? nothing}
			placement=${placement ?? nothing}
			@valueChange=${action('valueChange')}
		></p-datepicker>
	`,
};
