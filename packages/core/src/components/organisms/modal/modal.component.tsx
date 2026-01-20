import {
	Component,
	Element,
	Event,
	EventEmitter,
	h,
	Listen,
	Prop,
	State,
} from '@stencil/core';

@Component({
	tag: 'p-modal',
	shadow: true,
})
export class Modal {
	/**
	 * The size of the modal container
	 */
	@Prop() size: 'xs' | 'base' | 'lg' | 'xl' | '2xl' = 'base';

	/**
	 * The Header of the modal
	 */
	@Prop() header?: string;

	/**
	 * Wether to show the modal or not
	 */
	@Prop() show: boolean = false;

	/**
	 * Wether to apply blur to the backdrop
	 */
	@Prop() applyBlur: boolean = false;

	/**
	 * Wether to show the close button in the header
	 */
	@Prop() showClose = true;

	/**
	 * Wether to show the footer on mobile
	 */
	@Prop() showMobileFooter = false;

	/**
	 * Wether to hide the modal when the backdrop is clicked
	 */
	@Prop() backdropClickClose = true;

	/**
	 * Wether we should scroll lock the body
	 */
	@Prop() scrollLock: boolean = true;

	/**
	 * Close click event
	 */
	@Event({
		bubbles: false,
	})
	closeClicked: EventEmitter<MouseEvent>;

	/**
	 * Closed event
	 */
	@Event({
		bubbles: false,
	})
	closed: EventEmitter<string>;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	private _hasFooterSlot = false;
	private _hasHeaderSlot = false;

	@State() private _closing = false;

	componentWillLoad() {
		this._hasFooterSlot = !!this._el.querySelector(':scope > [slot="footer"]');
		this._hasHeaderSlot = !!this._el.querySelector(':scope > [slot="header"]');
	}

	render() {
		if (!this.show) {
			return;
		}

		const headerContent = <slot name='header' />;
		const bodyContent = <slot name='content' />;
		const footerContent = <slot name='footer' />;

		return (
			<p-backdrop
				applyBlur={this.applyBlur}
				closing={this._closing}
				scrollLock={this.scrollLock}
				onClicked={ev => this._backdropClick(ev.detail)}
			>
				<p-modal-container
					closing={this._closing}
					size={this.size}
				>
					{(this.header?.length || this._hasHeaderSlot) && (
						<p-modal-header
							showClose={this.showClose}
							onClose={ev => this.close('button', ev.detail)}
						>
							{this._hasHeaderSlot ? headerContent : this.header}
						</p-modal-header>
					)}
					<p-modal-body
						roundedBottom={!this._hasFooterSlot}
						roundedTop={!this._hasHeaderSlot && !this.header?.length}
					>
						{bodyContent}
					</p-modal-body>
					{this._hasFooterSlot && (
						<p-modal-footer>{footerContent}</p-modal-footer>
					)}
				</p-modal-container>
			</p-backdrop>
		);
	}

	private _backdropClick(ev: MouseEvent) {
		if (!this.backdropClickClose) {
			return;
		}

		const modal = this._findModal(ev.target as HTMLElement);
		if (modal) {
			return;
		}

		this.close('backdrop', ev);
	}

	private _findModal(el: HTMLElement | null): any {
		if (!el) {
			return null;
		}

		if (el.nodeName.toLowerCase() === 'p-modal-container') {
			return el;
		}

		if (el?.nodeName?.toLowerCase() === 'p-backdrop') {
			return null;
		}

		return this._findModal(el?.parentElement);
	}

	public close(reason: string, ev?: MouseEvent) {
		this.closeClicked.emit(ev);

		this._closing = true;

		setTimeout(() => {
			this.show = false;
			this._closing = false;

			this.closed.emit(reason);
		}, 550);
	}

	@Listen('closeModal', { target: 'window' })
	handleCloseModal() {
		this.close('event');
	}
}
