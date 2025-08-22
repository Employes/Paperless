import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Atoms/Dropdown menu/Container',
	component: 'p-dropdown-menu-container',
};

export default meta;

export const Default = {
	render: ({
		variant,
		'max-width': maxWidth,
		class: className,
		'full-width': fullWidth,
		'allow-overflow': allowOverflow,
		scrollable,
	}) => html`<p-dropdown-menu-container
		variant=${variant ?? nothing}
		max-width=${maxWidth ?? nothing}
		class=${className ?? nothing}
		full-width=${fullWidth ?? nothing}
		allow-overflow=${allowOverflow ?? nothing}
		scrollable=${scrollable ?? nothing}
	>
		<p-dropdown-menu-item variant=${variant ?? nothing}>
			Item 1
		</p-dropdown-menu-item>
		<p-dropdown-menu-item variant=${variant ?? nothing}>
			Item 2
		</p-dropdown-menu-item>
		<p-dropdown-menu-item
			active
			variant=${variant ?? nothing}
		>
			Item 3
		</p-dropdown-menu-item>
	</p-dropdown-menu-container>`,
};
