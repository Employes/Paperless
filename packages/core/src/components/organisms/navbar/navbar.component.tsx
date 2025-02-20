import { Component, h, Host, Listen, Prop, State } from '@stencil/core';
import { cva } from 'class-variance-authority';

const sidebarAndTopbar = cva([
	'bg-off-white-300',
	'border-0 border-solid border-off-white-700',
	'p-4',
]);

const sidebar = cva(
	[
		'flex flex-col',

		'fixed left-0 top-0 z-navbar h-screen w-60',
		'w-full max-w-[16.5rem]',
		'layout-1280:relative layout-1280:z-0 layout-1280:max-w-none layout-1280:h-full',
		'gap-6',

		'transition-all',
		'will-change-transform',
		'-translate-x-full transform-gpu layout-1280:translate-x-0',

		'border-r',

		'safe-sidebar',
	],
	{
		variants: {
			show: {
				false: null,
				true: 'show',
			},
		},
	}
);

const topbar = cva([
	'flex w-full justify-between items-center',
	'relative z-navbar-topbar',
	'border-b',
	'layout-1280:hidden',
	'safe-topbar',
]);

const backdrop = cva(
	['z-navbar-backdrop layout-1280:hidden transition-opacity'],
	{
		variants: {
			show: {
				false: 'opacity-0 pointer-events-none',
				true: 'opacity-100',
			},
		},
	}
);

@Component({
	tag: 'p-navbar',
	styleUrl: 'navbar.component.scss',
	shadow: true,
})
export class Navbar {
	/**
	 * The text to display for the menu button & sidebar title
	 */
	@Prop() menuText = 'Menu';

	@State() private _show = false;

	render() {
		return (
			<Host class='p-navbar w-full max-h-screen-safe layout-1280:w-60 layout-1680:w-72'>
				<p-backdrop
					class={backdrop({ show: this._show })}
					scrollLock={this._show}
					onClicked={() => (this._show = false)}
				></p-backdrop>
				<div class={sidebar({ class: sidebarAndTopbar(), show: this._show })}>
					<div class='flex w-full items-center justify-between layout-1280:hidden'>
						<p class='m-0 text-xl font-semibold text-storm-dark'>
							{this.menuText}
						</p>

						<p-button
							variant='secondary'
							icon='negative'
							iconPosition='end'
							iconOnly={true}
							size='small'
							onClick={() => (this._show = false)}
						></p-button>
					</div>
					<div class='flex w-full flex-col items-stretch'>
						<slot name='company' />
					</div>
					<div class='flex w-full flex-col gap-6 overflow-y-auto'>
						<slot name='content' />
					</div>

					<div class='mt-auto hidden w-full flex-col layout-1280:flex'>
						<slot name='user' />
					</div>
				</div>
				<div class={topbar({ class: sidebarAndTopbar() })}>
					<p-button
						variant='secondary'
						iconOnly={true}
						icon='menu'
						size='small'
						onClick={() => (this._show = true)}
					></p-button>

					<slot name='topbar' />
				</div>
			</Host>
		);
	}

	@Listen('closeNavbar', { target: 'window' })
	handleCloseNavbar() {
		this._show = false;
	}

	@Listen('openNavbar', { target: 'window' })
	handleOpenNavbar() {
		this._show = true;
	}
}
