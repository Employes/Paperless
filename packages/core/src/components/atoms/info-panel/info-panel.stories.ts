import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Atoms/Info panel',
	component: 'p-info-panel',
	args: {
		variant: 'neutral',
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
