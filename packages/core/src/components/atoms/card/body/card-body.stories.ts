import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Card/Body',
	component: 'p-card-body',
	args: {
		content: 'CardBody',
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
};

export default meta;

export const Default = {
	render: ({ content, 'inherit-text': inheritText }) => html`
		<p-card-body inherit-text=${inheritText ?? nothing}>
			${content}
		</p-card-body>
	`,
};
