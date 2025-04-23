import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Deprecated/Molecules/Stepper',
	component: 'p-stepper',
};

export default meta;

export const Default = {
	render: ({
		'active-step': activeStep,
		'enable-auto-status': enableAutoStatus,
		direction,
		'content-position': contentPosition,
	}) => html`<p-stepper
		active-step=${activeStep ?? nothing}
		enable-auto-status=${enableAutoStatus ?? nothing}
		direction=${direction ?? nothing}
		content-position=${contentPosition ?? nothing}
	/>`,
	tags: ['!dev'],
};