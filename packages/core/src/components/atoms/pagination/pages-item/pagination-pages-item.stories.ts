import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Pagination/Pages item',
	component: 'p-pagination-pages-item',
	args: {
		content: 'PaginationPagesItem',
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
};

export default meta;

export const Default = {
	render: ({ content, variant, active, hover, disabled }) => html`
		<p-pagination-pages-item
			variant=${variant ?? nothing}
			active=${active ?? nothing}
			hover=${hover ?? nothing}
			disabled=${disabled ?? nothing}
		>
			${content}
		</p-pagination-pages-item>
	`,
};
