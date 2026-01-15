import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Stepper/Item',
	component: 'p-stepper-item',
	args: {
		content: 'Stepper item',
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
};

export default meta;

export const Default = {
	render: ({
		align,
		direction,
		'content-position': contentPosition,
		finished,
		active,
		content,
	}) => html`
		<p-stepper-item
			align=${align ?? nothing}
			direction=${direction ?? nothing}
			content-position=${contentPosition ?? nothing}
			finished=${finished ?? nothing}
			active=${active ?? nothing}
			>${content}</p-stepper-item
		>
	`,
};
