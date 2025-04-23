import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';

const meta = {
	title: 'Design System/Atoms/Toggle',
	component: 'p-toggle',
	args: {
		content: 'Toggle',
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
		checked,
		indeterminate,
		disabled,
		required,
		id,
		name,
	}) => html`<p-toggle
		checked=${checked ?? nothing}
		indeterminate=${indeterminate ?? nothing}
		disabled=${disabled ?? nothing}
		required=${required ?? nothing}
		id=${id ?? nothing}
		name=${name ?? nothing}
		@checkedChange=${action('checkedChange')}
		@indeterminateChange=${action('indeterminateChange')}
	>
		${content}
	</p-toggle>`,
	tags: ['!dev'],
};