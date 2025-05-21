import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Molecules/Attachment',
	component: 'p-attachment',
	args: {
		mode: 'write',
	},
};

export default meta;

export const Default = {
	render: ({
		value,
		mode,
		label,
		helper,
		required,
		error,
		loading,
		accept,
		'enable-camera-on-mobile': enableCameraOnMobile,
		'file-id': fileId,
	}) => html`<p-attachment
		mode=${mode ?? nothing}
		error=${error ?? nothing}
		value=${value ?? nothing}
		label=${label ?? nothing}
		helper=${helper ?? nothing}
		required=${required ?? nothing}
		file-id=${fileId ?? nothing}
		enable-camera-on-mobile=${enableCameraOnMobile ?? nothing}
		accept=${accept ?? nothing}
		loading=${loading ?? nothing}
		@download=${action('download')}
		@delete=${action('delete')}
		@upload=${action('upload')}
	>
	</p-attachment>`,
	tags: ['!dev'],
};
