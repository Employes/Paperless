import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Molecules/Profile',
	component: 'p-profile',
	args: {
		title: 'Title',
		subTitle: null,
		'dropdown-location': 'bottom-end',
	},
	argTypes: {
		title: {
			type: {
				required: true,
			},
		},
		subTitle: {
			type: 'string',
		},
	},
	parameters: {
		layout: 'centered',
		docs: {
			iframeHeight: 300,
			story: {
				height: '300px',
			},
		},
	},
};

export default meta;

export const Default = {
	render: ({ title, subTitle, 'dropdown-location': dropdownLocation }) => html`
		<p-profile dropdown-location=${dropdownLocation ?? nothing}>
			<span slot="title">${title}</span>
			<span slot="subtitle">${subTitle}</span>
			<p-avatar
				slot="avatar"
				letters="A"
			/>
		</p-profile>
	`,
};

export const Dropdown = {
	render: ({ title, subTitle, 'dropdown-location': dropdownLocation }) => html`
		<div class="flex w-full flex-col items-stretch">
			<p-profile dropdown-location=${dropdownLocation}>
				<span slot="title">${title}</span>
				<span slot="subtitle">${subTitle}</span>
				<div slot="dropdown">
					<p-dropdown-menu-item>Item 1</p-dropdown-menu-item>
					<p-dropdown-menu-item>Item 2</p-dropdown-menu-item>
					<p-dropdown-menu-item>Item 3</p-dropdown-menu-item>
				</div>
				<p-avatar
					slot="avatar"
					letters="A"
				/>
			</p-profile>
		</div>
	`,
};
