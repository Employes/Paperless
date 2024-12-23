import { Component, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-card-header',
	styleUrl: 'card-header.component.scss',
})
export class CardHeader {
	/**
	 * Content of the card header
	 */
	@Prop() header: string;

	/**
	 * Enable the title arrow
	 */
	@Prop() arrow: boolean = false;

	render() {
		return (
			<Host class='p-card-header'>
				<slot name='prefix' />

				{(this.header?.length || this.arrow) && (
					<div class='title'>
						<span>{this.header ?? ''}</span>
						{this.arrow && (
							<p-icon
								variant='arrow'
								class='group-hover:text-indigo'
							/>
						)}
					</div>
				)}

				<slot name='suffix' />
			</Host>
		);
	}
}
