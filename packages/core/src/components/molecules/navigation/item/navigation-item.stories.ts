import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Molecules/Navigation/Item',
	component: 'p-navigation-item',
	args: {
		content: 'NavigationItem',
	},
	argTypes: {
		content: {
			type: 'string',
		},
		counter: {
			type: 'string',
		},
	},
};

export default meta;

export const Default = {
	render: ({
		content,
		icon,
		active,
		loading,
		as,
		counter,
		href,
		target,
		class: className,
	}) => html`<p-navigation-item
		icon=${icon ?? nothing}
		active=${active ?? nothing}
		loading=${loading ?? nothing}
		as=${as ?? nothing}
		counter=${counter ?? nothing}
		href=${href ?? nothing}
		target=${target ?? nothing}
		class=${className ?? nothing}
	>
		${content}
	</p-navigation-item>`,
};
