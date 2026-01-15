import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Card/Container',
	component: 'p-card-container',
	args: {
		content: 'CardContainer',
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
		content,
		hoverable,
		shadow,
		variant,
		'bg-class': bgClass,
		border,
	}) => html`
		<p-card-container
			hoverable=${hoverable ?? nothing}
			shadow=${shadow ?? nothing}
			border=${border ?? nothing}
			bg-class=${bgClass ?? nothing}
			variant=${variant ?? nothing}
		>
			${content}
		</p-card-container>
	`,
};
