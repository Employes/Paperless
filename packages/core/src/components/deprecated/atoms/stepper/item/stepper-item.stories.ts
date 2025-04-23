import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Deprecated/Atoms/Stepper/Item',
	component: 'p-stepper-item',
};

export default meta;

export const Default = {
	render: ({
		align,
		direction,
		'content-position': contentPosition,
		finished,
		active,
	}) => html`<p-stepper-item
		align=${align ?? nothing}
		direction=${direction ?? nothing}
		content-position=${contentPosition ?? nothing}
		finished=${finished ?? nothing}
		active=${active ?? nothing}
	/>`,
	tags: ['!dev'],
};