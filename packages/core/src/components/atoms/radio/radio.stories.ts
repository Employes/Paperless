import { html } from 'lit';

const meta = {
	title: 'Design System/Atoms/Radio',
	component: 'p-radio',
	args: {
		content: 'Label',
	},
	argTypes: {
		content: {
			control: {
				type: 'text',
			},
		},
	},
};

export default meta;

export const Default = {
	render: ({
		content,
		checked,
		disabled,
		id,
		name,
		required,
		value,
		checkedChange,
	}) => html` <p-radio
		checked=${checked}
		disabled=${disabled}
		id=${id}
		name=${name}
		required=${required}
		value=${value}
		@checkedChange=${checkedChange}
	>
		${content}
	</p-radio>`,
	tags: ['!dev'],
};
