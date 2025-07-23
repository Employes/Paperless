import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { cva } from 'class-variance-authority';

const avatar = cva(
	[
		'p-avatar p-[1px] flex items-center justify-center font-ambit leading-none font-bold',
		'ring-inset ring-1 ring-storm/20',
	],
	{
		variants: {
			variant: {
				secondary: 'bg-off-white text-storm-300 aspect-branding rounded-full',
				primary: 'bg-indigo text-storm rounded',
			},
			size: {
				xs: 'h-4 text-xxs',
				sm: 'h-6 text-xs',
				base: 'h-8 text-base',
				lg: 'h-10 text-xl',
				xl: 'h-14 text-xl',
				'2xl': 'h-20 text-4xl',
				'3xl': 'h-[6.5rem] text-[3.5rem] leading-[4rem]',
				'4xl': 'h-[8.5rem] text-[4.5rem] leading-[5rem]',
			},
		},
		compoundVariants: [
			{
				size: 'xs',
				variant: 'primary',
				class: 'w-4',
			},
			{
				size: 'sm',
				variant: 'primary',
				class: 'w-6',
			},
			{
				size: 'base',
				variant: 'primary',
				class: 'w-8',
			},
			{
				size: 'lg',
				variant: 'primary',
				class: 'w-10',
			},
			{
				size: 'xl',
				variant: 'primary',
				class: 'w-14',
			},
			{
				size: '2xl',
				variant: 'primary',
				class: 'w-20',
			},
			{
				size: '3xl',
				variant: 'primary',
				class: 'w-[6.5rem]',
			},
			{
				size: '4xl',
				variant: 'primary',
				class: 'w-[8.5rem]',
			},
		],
	}
);

@Component({
	tag: 'p-avatar',
	styleUrl: 'avatar.component.css',
	// shadow: true,
})
export class Avatar {
	/**
	 * The variant of the avatar in case of "letters"
	 */
	@Prop() variant: 'secondary' | 'primary' = 'secondary';

	/**
	 * The size of the avatar
	 */
	@Prop({ reflect: true }) size:
		| 'xs'
		| 'sm'
		| 'base'
		| 'lg'
		| 'xl'
		| '2xl'
		| '3xl'
		| '4xl' = 'base';

	/**
	 * The default image to show on errors
	 */
	@Prop() defaultImage: string;

	/**
	 * The image used for the avatar
	 */
	@Prop() src!: string;

	/**
	 * The letters to show on the empty state variant
	 */
	@Prop() letters: string;

	@State() private _src: string;
	@State() private _failed: boolean = false;

	@Watch('src')
	onSrchChange(src: string) {
		this._failed = false;
		this._src = src;
	}

	componentWillLoad() {
		this.onSrchChange(this.src);
		if (!this._src) {
			this._setFailed();
		}
	}

	render() {
		return (
			<Host
				class={avatar({
					size: this.size,
					variant: this.variant,
				})}
			>
				{this._failed ? (
					<span>{this.letters?.[0] ?? ' '}</span>
				) : (
					<img
						src={this._src}
						class='z-0 aspect-branding h-full rounded-full object-cover'
						onError={() => this._setFailed()}
					/>
				)}
			</Host>
		);
	}

	private _setFailed() {
		this._failed = true;
		this._src = undefined;
	}
}
