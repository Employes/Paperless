import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

import { ThemedHost } from '../../../../internal/themed-host.component';
import { IconVariant } from '../../../../types/icon';
import { cn } from '../../../../utils';

@Component({
	tag: 'p-submenu-item',
	styleUrl: 'submenu-item.component.css',
	shadow: true,
})
export class SubmenuItem {
	/**
	 * Wether the submenu is active or not
	 */
	@Prop({ reflect: true }) active: boolean = false;

	/**
	 * Icon to show on the label
	 */
	@Prop({ reflect: true }) icon: IconVariant = 'placeholder';

	/**
	 * Event when the active state changes
	 */
	@Event({
		bubbles: false,
	})
	activeChange: EventEmitter<boolean>;

	private _lastActiveState = this.active;

	componentDidRender() {
		if (this._lastActiveState === this.active) {
			return;
		}

		this._lastActiveState = this.active;
		this.activeChange.emit(this.active);
	}

	render() {
		return (
			<ThemedHost>
				<div
					class={cn([
						'flex items-center',
						'h-8 w-full pl-[calc(3rem+2px)]',
						'cursor-pointer',
						'group/submenu-item',
					])}
				>
					<div
						class={cn('flex items-center gap-2 transition-colors', {
							'text-storm-400 dark:text-hurricane-100': !this.active,
							'text-indigo-600': this.active,
						})}
					>
						<p-icon variant={this.icon} />

						<slot />
					</div>
				</div>
			</ThemedHost>
		);
	}
}
