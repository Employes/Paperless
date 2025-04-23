import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Helpers/Table/Row action',
	component: 'p-table-row-action',
};

export default meta;

export const Default = {
	render: ({
		type,
		icon,
		'icon-only': iconOnly,
		'icon-flip': iconFlip,
		'icon-rotate': iconRotate,
		label,
		action,
		disabled,
		loading,
		'show-function': showFunction,
	}) => html`<p-table-row-action
		type=${type ?? nothing}
		icon=${icon ?? nothing}
		icon-only=${iconOnly ?? nothing}
		icon-flip=${iconFlip ?? nothing}
		icon-rotate=${iconRotate ?? nothing}
		label=${label ?? nothing}
		action=${action ?? nothing}
		disabled=${disabled ?? nothing}
		loading=${loading ?? nothing}
		show-function=${showFunction ?? nothing}
	/>`,
	tags: ['!dev'],
};