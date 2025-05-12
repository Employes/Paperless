import { html, nothing } from 'lit';
import { icons } from '../../../../packages/core/src/utils/icons';

const meta = {
	title: 'Design System/Molecules/Card',
	component: 'p-card',
	args: {
		header: 'Header',
		body: 'Body content',
		headerVariant: 'curve',
		headerIcon: 'none',
		showHeaderButton: true,
		containerHoverable: false,
		containerShadow: true,
	},
	argTypes: {
		header: {
			type: 'string',
		},
		body: {
			type: 'string',
		},
		headerVariant: {
			type: 'select',
			options: ['default', 'curve'],
		},
		showHeaderButton: {
			type: 'boolean',
		},
		headerIcon: {
			type: 'select',
			options: ['none', ...Object.keys(icons)],
		},
		containerHoverable: {
			type: 'boolean',
		},
		containerShadow: {
			type: 'boolean',
		},
	},
};

export default meta;

export const Default = {
	render: ({
		header,
		body,
		headerVariant,
		headerIcon,
		showHeaderButton,
		containerHoverable,
		containerShadow,
	}) => html`<p-card-container
		hoverable=${containerHoverable}
		shadow=${containerShadow}
	>
		<p-card-header
			variant=${headerVariant}
			icon=${headerIcon !== 'none' ? headerIcon : nothing}
		>
			${header}
			${showHeaderButton
				? html`<p-dropdown
					slot="suffix"
				>
					<p-button
						icon="pencil"
						variant="secondary"
						slot="trigger"
					  >
						Edit
					</p-button>
					<slot slot="items">
        			    <p-dropdown-menu-item>Item 1</p-dropdown-menu-item>
        			    <p-dropdown-menu-item>Item 2</p-dropdown-menu-item>
        			    <p-dropdown-menu-item>Item 3</p-dropdown-menu-item>
        			</slot>
				</p-dropdown>`
				: ''}
		</p-card-header>
		<p-card-body>${body}</p-card-body>
	</p-card-container>`,
	tags: ['!dev'],
};
