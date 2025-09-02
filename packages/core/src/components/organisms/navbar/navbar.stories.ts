import { html, nothing } from 'lit';

const meta = {
	title: 'Design System/Organisms/Navbar',
	component: 'p-navbar',
};

export default meta;

export const Default = {
	render: () => html`<p-navbar>
		<div
			class="flex w-full flex-col"
			slot="company"
			*ngrxLet="accesses$ as accesses"
		>
			<p-profile>
				<p-avatar
					slot="avatar"
					letters="Company name"
				></p-avatar>
				<span slot="title">Company Name</span>
				<div slot="dropdown">
					<p-dropdown-menu-item icon="company"> Data </p-dropdown-menu-item>
					<p-dropdown-menu-item icon="users"> Users </p-dropdown-menu-item>
					<p-dropdown-menu-item icon="tag">
						Subscription and billing
					</p-dropdown-menu-item>
					<p-divider></p-divider>
					<p-dropdown-menu-item icon="plus"> Add company </p-dropdown-menu-item>
				</div>
			</p-profile>
		</div>

		<p-navigation-section
			header="title"
			slot="content"
		>
			<p-navigation-item icon="user">Item</p-navigation-item>
			<p-navigation-item
				active
				icon="user"
				>Item</p-navigation-item
			>
		</p-navigation-section>

		<p-profile slot="user">
			<p-avatar
				slot="avatar"
				letters="Displayname"
			></p-avatar>
			<span slot="title">Displayname</span>
			<span slot="subtitle"> Employer </span>
			<div slot="dropdown">
				<p-profile class="inline-block px-2">
					<span slot="title">Display name</span>
					<span slot="subtitle">User email yada yada</span>
				</p-profile>
				<p-divider></p-divider>
				<p-dropdown-menu-item icon="user"> Person </p-dropdown-menu-item>
				<p-dropdown-menu-item
					variant="negative"
					icon="wave"
					icon-wave
				>
					Signout
				</p-dropdown-menu-item>
			</div>
		</p-profile>
	</p-navbar>`,
};
