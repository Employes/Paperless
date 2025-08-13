import { Component, h, Listen, State } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { ThemedHost } from '../../../internal/themed-host.component';

const sidebarAndTopbar = cva([
	'transition',
	'bg-off-white-300 dark:bg-storm-500',
	'border-0 border-solid border-off-white-700 dark:border-black/10',
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
	['z-navbar-backdrop layout-1280:hidden transition-opacity relative'],
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
	styleUrl: 'navbar.component.css',
	shadow: true,
})
export class Navbar {
	@State() private _show = false;

	render() {
		return (
			<ThemedHost>
				<p-backdrop
					class={backdrop({ show: this._show })}
					scrollLock={this._show}
					onClicked={() => (this._show = false)}
				></p-backdrop>
				<div class={sidebar({ class: sidebarAndTopbar(), show: this._show })}>
					<div class='flex w-full items-center justify-end layout-1280:hidden'>
						<p-button
							variant='secondary'
							icon='menu-arrow'
							iconFlip='horizontal'
							iconOnly={true}
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
						icon='menu-arrow'
						onClick={() => (this._show = true)}
					></p-button>

					<slot name='topbar' />
				</div>
			</ThemedHost>
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
