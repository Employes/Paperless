import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Deprecated/Molecules/Input/Error',
	component: 'p-input-error',
};

export default meta;

export const Default = {
	render: ({
		error,
		'force-show-tooltip': forceShowTooltip,
	}) => html`<p-input-error
		error=${error ?? nothing}
		force-show-tooltip=${forceShowTooltip ?? nothing}
	/>`,
	tags: ['!dev'],
};