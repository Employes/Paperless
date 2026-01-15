import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Molecules/Navigation/Section',
	component: 'p-navigation-section',
	args: {
		content: 'NavigationSection',
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
};

export default meta;

export const Default = {
	render: ({ content, header }) => html`
		<p-navigation-section header=${header ?? nothing}>
			${content}
		</p-navigation-section>
	`,
};
