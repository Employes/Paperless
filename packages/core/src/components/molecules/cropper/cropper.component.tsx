import {
	Component,
	Event,
	EventEmitter,
	Host,
	Listen,
	Prop,
	State,
	h,
} from '@stencil/core';
import { clsx } from 'clsx';
import 'cropperjs';
import { CropperImage, CropperSelection } from 'cropperjs';

@Component({
	tag: 'p-cropper',
	styleUrl: 'cropper.component.scss',
	shadow: true,
})
export class Cropper {
	/**
	 * Variant of the image that's being cropped
	 */
	@Prop({ reflect: true }) variant: 'user' | 'company' = 'user';

	/**
	 * The image to crop (url or base64)
	 */
	@Prop() value: any;

	/**
	 * The return type of the onchange
	 */
	@Prop() returnType: 'canvas' | 'base64' = 'base64';

	/**
	 * Event when the value changes
	 */
	@Event({
		bubbles: false,
	})
	valueChange: EventEmitter<any>;

	private _imageRef: CropperImage;
	private _selectionRef: CropperSelection;

	private _maxScale = 0;
	private _minScale = 0;

	private _resizeDebounceTimeout: NodeJS.Timeout | undefined;
	private _toCanvasDebounceTimeout: NodeJS.Timeout | undefined;

	@State()
	private _loaded = false;

	@State()
	private _currentScale = 0;

	@Listen('resize', { target: 'window' })
	onResize() {
		if (this._resizeDebounceTimeout) {
			clearTimeout(this._resizeDebounceTimeout);
		}

		this._resizeDebounceTimeout = setTimeout(() => {
			this._selectionRef.$center();
			this._imageRef.$center();
		}, 200);
	}

	componentDidLoad() {
		setTimeout(() => {
			this._loaded = true;
		}, 200);
	}

	render() {
		return (
			<Host class='p-cropper'>
				{this._loaded && (
					<cropper-canvas
						class='h-[17.5rem] w-full border-0 border-b border-solid border-mystic-medium bg-white'
						onAction={() => this._onAction()}
					>
						<cropper-image
							src={this.value}
							alt='Picture'
							ref={ref => this._setImageRef(ref as CropperImage)}
							scalable
							crossorigin='anonymous'
						/>
						<cropper-shade
							class={clsx({
								'rounded-round': this.variant === 'user',
								rounded: this.variant === 'company',
							})}
							theme-color='rgba(255, 255, 255, 0.5)'
							hidden
						/>
						<cropper-selection
							initial-coverage='0.7'
							aspect-ratio='1'
							ref={ref => (this._selectionRef = ref as CropperSelection)}
						/>

						<cropper-handle
							action='move'
							plain
						></cropper-handle>
					</cropper-canvas>
				)}

				<div class='flex w-full items-center gap-2 px-14 text-storm-vague tablet:max-w-xs tablet:px-1'>
					<p-icon variant='minus' />
					<input
						class='p-input w-full'
						type='range'
						min='0'
						max='100'
						value={this._currentScale}
						onInput={ev => this._onInput((ev.target as HTMLInputElement).value)}
						step='0.5'
					/>
					<p-icon variant='plus' />
				</div>
			</Host>
		);
	}

	private _setImageRef(ref: CropperImage) {
		if (this._imageRef) {
			return;
		}

		this._imageRef = ref;
		this._imageRef.$ready(image =>
			setTimeout(() => this._setInitialState(image), 200)
		);
	}

	private _setInitialState(image) {
		let scale: number;
		if (image.naturalWidth > image.naturalHeight) {
			// set scale by height
			scale = 200 / image.naturalHeight;
		}

		if (image.naturalHeight >= image.naturalWidth) {
			// set scale by width
			scale = 200 / image.naturalWidth;
		}

		const current = this._imageRef.$getTransform();

		this._minScale = scale;
		this._maxScale = current[0];

		this._selectionRef.$resize('nw-resize', 200, 200, 1);
		this._selectionRef.$center();

		this._setScale(scale);
		this._toCanvas();
	}

	private _onAction() {
		this._setCurrentScale();
		this._toCanvas();
	}

	private _setScale(
		scale: number,
		setCenter: boolean = true,
		setCurrentScale: boolean = true
	) {
		const transform = this._imageRef.$getTransform();
		this._imageRef.$setTransform([
			scale,
			0,
			0,
			scale,
			transform[4],
			transform[5],
		]);

		if (setCenter) {
			this._imageRef.$center();
		}

		if (setCurrentScale) {
			this._setCurrentScale();
		}
	}

	private _setCurrentScale() {
		const transform = this._imageRef.$getTransform();
		const current = transform[0];

		if (current < this._minScale) {
			this._setScale(this._minScale, true, false);
			this._currentScale = 0;
			return;
		}

		if (current > this._maxScale) {
			this._setScale(this._maxScale, true, false);
			this._currentScale = 100;
			return;
		}

		if (current === this._minScale) {
			this._currentScale = 0;
			return;
		}

		if (current === this._maxScale) {
			this._currentScale = 100;
			return;
		}

		const minMaxDiff = this._maxScale - this._minScale;
		const currentDiff = current - this._minScale;

		const percentage = (currentDiff / minMaxDiff) * 100;
		this._currentScale = percentage;
	}

	private _onInput(value) {
		const transform = this._imageRef.$getTransform();
		const current = transform[0];
		const minMaxDiff = this._maxScale - this._minScale;

		const toSet = minMaxDiff * (value / 100);

		if (toSet === current) {
			return;
		}

		this._setScale(toSet + this._minScale, false, false);
		this._currentScale = value;

		this._toCanvas();
	}

	private _toCanvas() {
		if (this._toCanvasDebounceTimeout) {
			clearTimeout(this._toCanvasDebounceTimeout);
		}

		this._toCanvasDebounceTimeout = setTimeout(async () => {
			const canvas = await this._selectionRef.$toCanvas();
			if (this.returnType === 'canvas') {
				this.valueChange.emit(canvas);
				return;
			}

			const data = canvas.toDataURL('image/png');
			this.valueChange.emit(data);
		}, 200);
	}
}
