import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Stepper/Line',
	component: 'p-stepper-line',
};

export default meta;

export const Default = {
	render: ({
		active,
		direction,
	}) => html`<p-stepper-line
		active=${active ?? nothing}
		direction=${direction ?? nothing}
	/>`,
};
