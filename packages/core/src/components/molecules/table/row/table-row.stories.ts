import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Molecules/Table/Row',
	component: 'p-table-row',
	args: {
		content: 'TableRow',
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
		variant,
		'enable-hover': enableHover,
	}) => html`<p-table-row
		variant=${variant ?? nothing}
		enable-hover=${enableHover ?? nothing}
	>
		${content}
	</p-table-row>`,
	tags: ['!dev'],
};
