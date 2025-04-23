import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Deprecated/Molecules/Attachment',
	component: 'p-attachment',
	args: {
		content: 'Attachment',
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
		mode,
		loading,
		error,
		downloading,
	}) => html`<p-attachment
		mode=${mode ?? nothing}
		loading=${loading ?? nothing}
		error=${error ?? nothing}
		downloading=${downloading ?? nothing}
		@download=${action('download')}
		@delete=${action('delete')}
	>
		${content}
	</p-attachment>`,
	tags: ['!dev'],
};