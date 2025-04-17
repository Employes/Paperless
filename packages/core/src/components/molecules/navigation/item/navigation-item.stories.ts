import { html } from 'lit';

const meta = {
	title: 'Design System/Molecules/Navigation/Item',
	component: 'p-navigation-item',
	args: {
		content: 'Navigation item',
	},
	argTypes: {
		content: {
			type: {
				required: true,
			},
		},
	},
};

export default meta;

export const Default = {
	render: ({
		content,
		active,
		as,
		class: classInput,
		counter,
		href,
		icon,
		loading,
		target,
	}) =>
		html`<p-navigation-item
			active=${active}
			as=${as}
			class=${classInput}
			counter=${counter}
			href=${href}
			icon=${icon}
			loading=${loading}
			target=${target}
		>
			${content}
		</p-navigation-item>`,
	tags: ['!dev'],
};
