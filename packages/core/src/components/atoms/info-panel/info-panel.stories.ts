import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Atoms/Info panel',
	component: 'p-info-panel',
	args: {
		variant: 'feedback',
		header: 'Info panel',
		content: 'More information can be put here.',
		closeable: true,
	},
};

export default meta;

export const Default = {
	render: ({ variant, header, content, closeable }) => html`<p-info-panel
		variant=${variant ?? nothing}
		header=${header ?? nothing}
		content=${content ?? nothing}
		closeable=${closeable ?? nothing}
		@closed=${action('closed')}
	/>`,
	tags: ['!dev'],
};

export const WithIcons = {
	render: ({ variant, header, content, closeable }) => html`<p-info-panel
		variant=${variant ?? nothing}
		content=${content ?? nothing}
		closeable=${closeable ?? nothing}
		@closed=${action('closed')}
	>
		<div
			class="flex items-center gap-2"
			slot="header"
		>
			<p-icon variant="placeholder"></p-icon>
			${header ?? nothing}
			<p-icon variant="placeholder"></p-icon>
		</div>
	</p-info-panel>`,
	tags: ['!dev'],
};
