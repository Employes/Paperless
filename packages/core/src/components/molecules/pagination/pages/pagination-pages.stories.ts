import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Molecules/Pagination/Pages',
	component: 'p-pagination-pages',
	args: {
		total: 100,
	},
	parameters: {
		layout: 'centered',
	},
};

export default meta;

export const Default = {
	render: ({
		page,
		'page-size': pageSize,
		'hide-on-single-page': hideOnSinglePage,
		total,
	}) => html`<p-pagination-pages
		page=${page ?? nothing}
		page-size=${pageSize ?? nothing}
		hide-on-single-page=${hideOnSinglePage ?? nothing}
		total=${total ?? nothing}
		@pageChange=${action('pageChange')}
		@pagesChange=${action('pagesChange')}
	/>`,
	tags: ['!dev'],
};
