import { action } from '@storybook/addon-actions';
import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Molecules/Dropzone',
	component: 'p-dropzone',
	args: {
		content: ''
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
		icon,
		'show-icon': showIcon,
		'accept-group': acceptGroup,
		'file-id': fileId,
		uploaded,
		loading,
		content,
		'allow-multiple': allowMultiple,

	}) =>
		content.length > 0
			? html`
				<p-dropzone
					icon=${icon ?? nothing}
					show-icon=${showIcon ?? nothing}
					accept-group=${acceptGroup ?? nothing}
					allow-multiple=${allowMultiple ?? nothing}
					file-id=${fileId ?? nothing}
					uploaded=${uploaded ?? nothing}
					loading=${loading ?? nothing}
					@upload=${action('upload')}
				>
					${content}
				</p-dropzone>
			`
			: html`
				<p-dropzone
					icon=${icon ?? nothing}
					show-icon=${showIcon ?? nothing}
					accept-group=${acceptGroup ?? nothing}
					allow-multiple=${allowMultiple ?? nothing}
					file-id=${fileId ?? nothing}
					uploaded=${uploaded ?? nothing}
					loading=${loading ?? nothing}
					@upload=${action('upload')}
				/>
			`,
};
