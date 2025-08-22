import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Table/Container',
	component: 'p-table-container',
	args: {
		content: 'TableContainer',
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
};

export default meta;

export const Default = {
	render: ({ content, shadow }) => html`<p-table-container
		shadow=${shadow ?? nothing}
	>
		${content}
	</p-table-container>`,
};
