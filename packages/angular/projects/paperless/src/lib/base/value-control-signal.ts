import {
	DestroyRef,
	Directive,
	ElementRef,
	HostListener,
	Renderer2,
	effect,
	inject,
	model,
	output,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

export type SignalControlElement = HTMLElement & Record<string, unknown>;

@Directive()
export abstract class BaseSignalControl<T> {
	protected readonly el = inject(ElementRef<SignalControlElement>);
	private readonly _renderer = inject(Renderer2);
	private readonly _destroyRef = inject(DestroyRef);

	readonly touch = output<void>();
	protected lastValue: T | undefined;

	@HostListener('focusout')
	protected _handleBlurEvent() {
		this.touch.emit();
	}

	protected listen(
		eventName: string,
		handler: (event: CustomEvent<T>) => void
	) {
		const unlisten = this._renderer.listen(
			this.el.nativeElement,
			eventName,
			handler
		);

		this._destroyRef.onDestroy(unlisten);
	}
}

@Directive()
export class BaseSignalValueControl<T>
	extends BaseSignalControl<T>
	implements FormValueControl<T | undefined>
{
	readonly value = model<T>();

	constructor() {
		super();

		this.listen('valueChange', event => this.handleChangeEvent(event.detail));

		effect(() => this.writeValue(this.value()));
	}

	protected writeValue(value: T | undefined) {
		this.lastValue = value;
		this.el.nativeElement['value'] = value == null ? '' : value;
	}

	protected handleChangeEvent(value: T) {
		if (value === this.lastValue) {
			return;
		}

		this.lastValue = value;
		this.value.set(value);
	}
}
