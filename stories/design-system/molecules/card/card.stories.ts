import { html, nothing } from 'lit';

import { icons } from '../../../../packages/core/src/utils/icons';

const meta = {
	title: 'Design System/Molecules/Card',
	component: 'p-card',
	args: {
		header: 'Header',
		body: 'Body content',
		headerVariant: 'default',
		headerIcon: 'none',
		showHeaderButton: true,
		containerVariant: 'default',
		containerHoverable: false,
		containerShadow: true,
		containerBorder: true,
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
		containerVariant: {
			type: 'select',
			options: ['default', 'error'],
		},
		containerHoverable: {
			type: 'boolean',
		},
		containerShadow: {
			type: 'boolean',
		},
		containerBorder: {
			type: 'boolean',
		},
		containerBgClass: {
			type: 'string',
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
		containerVariant,
		containerHoverable,
		containerShadow,
		containerBorder,
		containerBgClass,
	}) => html`
		<p-card-container
			bg-class=${containerBgClass ?? nothing}
			variant=${containerVariant}
			hoverable=${containerHoverable}
			shadow=${containerShadow}
			border=${containerBorder}
		>
			<p-card-header
				variant=${headerVariant}
				icon=${headerIcon === 'none' ? nothing : headerIcon}
				enable-divider=${false}
				border=${false}
			>
				${header}
				${showHeaderButton
					? html`
							<p-dropdown slot="suffix">
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
							</p-dropdown>
						`
					: ''}
			</p-card-header>
			<p-card-body>${body}</p-card-body>
		</p-card-container>
	`,
};
