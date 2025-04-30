import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Molecules/Button',
	component: 'p-button',
	args: {
		label: 'Button',
	},
};

export default meta;

export const Default = {
	render: ({
		label,
		as,
		variant,
		active,
		underline,
		href,
		target,
		size,
		type,
		loading,
		chevron,
		'chevron-position': chevronPosition,
		disabled,
		icon,
		'icon-only': iconOnly,
		'icon-position': iconPosition,
		'icon-flip': iconFlip,
		'icon-rotate': iconRotate,
		'inherit-text': inheritText,
		'button-group-position': buttonGroupPosition,
		class: className,
	}) => html`<p-button
		label=${label ?? nothing}
		as=${as ?? nothing}
		variant=${variant ?? nothing}
		active=${active ?? nothing}
		underline=${underline ?? nothing}
		href=${href ?? nothing}
		target=${target ?? nothing}
		size=${size ?? nothing}
		type=${type ?? nothing}
		loading=${loading ?? nothing}
		chevron=${chevron ?? nothing}
		chevron-position=${chevronPosition ?? nothing}
		disabled=${disabled ?? nothing}
		icon=${icon ?? nothing}
		icon-only=${iconOnly ?? nothing}
		icon-position=${iconPosition ?? nothing}
		icon-flip=${iconFlip ?? nothing}
		icon-rotate=${iconRotate ?? nothing}
		inherit-text=${inheritText ?? nothing}
		button-group-position=${buttonGroupPosition ?? nothing}
		class=${className ?? nothing}
		@onClick=${action('onClick')}
	>
	</p-button>`,
	tags: ['!dev'],
};
