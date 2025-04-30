import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Molecules/Table/Footer',
	component: 'p-table-footer',
	args: {
		total: 100,
	},
};

export default meta;

export const Default = {
	render: ({
		'enable-page-size': enablePageSize,
		'enable-pagination': enablePagination,
		'enable-export': enableExport,
		loading,
		page,
		total,
		'page-size': pageSize,
		'page-size-options': pageSizeOptions,
		'hide-on-single-page': hideOnSinglePage,
	}) => html`<p-table-footer
		enable-page-size=${enablePageSize ?? nothing}
		enable-pagination=${enablePagination ?? nothing}
		enable-export=${enableExport ?? nothing}
		loading=${loading ?? nothing}
		page=${page ?? nothing}
		total=${total ?? nothing}
		page-size=${pageSize ?? nothing}
		page-size-options=${pageSizeOptions ?? nothing}
		hide-on-single-page=${hideOnSinglePage ?? nothing}
		@pageChange=${action('pageChange')}
		@pageSizeChange=${action('pageSizeChange')}
		@export=${action('export')}
		@hidden=${action('hidden')}
	/>`,
};
