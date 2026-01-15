import { action } from '@storybook/addon-actions';
import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Radio',
	component: 'p-radio',
	args: {
		content: 'Radio',
	},
	argTypes: {
		content: {
			type: 'string',
		},
	},
};

export default meta;

export const Default = {
	render: ({ content, value, disabled, required, id, name, checked }) => html`
		<p-radio
			value=${value ?? nothing}
			disabled=${disabled ?? nothing}
			required=${required ?? nothing}
			id=${id ?? nothing}
			name=${name ?? nothing}
			checked=${checked ?? nothing}
			@checkedChange=${action('checkedChange')}
		>
			${content}
		</p-radio>
	`,
};
