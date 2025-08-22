import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Molecules/Pagination/Pagination',
	component: 'p-pagination',
	args: {
		total: 100,
	},
	parameters: {
		layout: 'centered',
		docs: {
			iframeHeight: 300,
			story: {
				height: '300px',
			},
		},
	},
};

export default meta;

export const Default = {
	render: ({
		'hide-on-single-page': hideOnSinglePage,
		'enable-pagination-size': enablePaginationSize,
		'enable-pagination-pages': enablePaginationPages,
		page,
		total,
		'page-size': pageSize,
		'page-size-options': pageSizeOptions,
	}) => html`<p-pagination
		hide-on-single-page=${hideOnSinglePage ?? nothing}
		enable-pagination-size=${enablePaginationSize ?? nothing}
		enable-pagination-pages=${enablePaginationPages ?? nothing}
		page=${page ?? nothing}
		total=${total ?? nothing}
		page-size=${pageSize ?? nothing}
		page-size-options=${pageSizeOptions ?? nothing}
		@pageChange=${action('pageChange')}
		@pageSizeChange=${action('pageSizeChange')}
	/>`,
};
