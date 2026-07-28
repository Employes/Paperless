import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Molecules/Submenu/Menu',
	component: 'p-submenu',
	args: {
		title: "Submenu",
		subtitle: "Submenu subtitle",
		index: 1,
	},
	parameters: {
		docs: {
			iframeHeight: 600,
			story: {
				height: '700px',
			},
		},
	},
};

export default meta;

export const Default = {
	render: ({ active, open, title, subtitle, index, showIndex }) =>
			html`
				<p-submenu
					title=${title ?? nothing}
					subtitle=${subtitle ?? nothing}
					active=${active ?? nothing}
					open=${open ?? nothing}
					index=${index ?? nothing}
					show-index=${showIndex ?? nothing}
				>
					<p-submenu-item>Item 2</p-submenu-item>
					<p-submenu-item>Item 3</p-submenu-item>
					<p-submenu-item>Item 4</p-submenu-item>
				</p-submenu>
			`
};
