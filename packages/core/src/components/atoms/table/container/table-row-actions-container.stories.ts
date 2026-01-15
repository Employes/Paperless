import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Table/Row Actions Container',
	component: 'p-table-row-actions-container',
	args: {
		content: 'Table Row Actions Container',
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
};

export default meta;

export const Default = {
	render: ({ content, shadow }) => html`
		<p-table-row-actions-container shadow=${shadow ?? nothing}>
			${content}
		</p-table-row-actions-container>
	`,
};
