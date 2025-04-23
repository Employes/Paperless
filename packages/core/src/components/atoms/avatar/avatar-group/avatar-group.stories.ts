import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Avatar/Avatar group',
	component: 'p-avatar-group',
	args: {
		content: 'AvatarGroup',
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
		extra,
	}) => html`<p-avatar-group
		extra=${extra ?? nothing}
	>
		${content}
	</p-avatar-group>`,
	tags: ['!dev'],
};