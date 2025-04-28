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
		class="w-[20.5rem]"
		hoverable=${containerHoverable}
		shadow=${containerShadow}
	>
		<p-card-header
			variant=${headerVariant}
			icon=${headerIcon !== 'none' ? headerIcon : nothing}
		>
			${header}
			${showHeaderButton
				? html`<p-button
						slot="suffix"
						icon="pencil"
						variant="secondary"
				  >
						Edit
				  </p-button>`
				: ''}
		</p-card-header>
		<p-card-body>${body}</p-card-body>
	</p-card-container>`,
	tags: ['!dev'],
};
