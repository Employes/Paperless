import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Card/Header',
	component: 'p-card-header',
};

export default meta;

export const Default = {
	render: ({
		header,
		variant,
		divider,
		icon,
		'icon-rotate': iconRotate,
		'icon-flip': iconFlip,
	}) => html`<p-card-header
		header=${header ?? nothing}
		variant=${variant ?? nothing}
		divider=${divider ?? nothing}
		icon=${icon ?? nothing}
		icon-rotate=${iconRotate ?? nothing}
		icon-flip=${iconFlip ?? nothing}
	/>`,
};
