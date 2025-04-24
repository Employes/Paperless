import { Component, h, Host } from '@stencil/core';

@Component({
	tag: 'p-smile-footer',
	styleUrl: 'smile-footer.component.css',
})
export class SmileFooter {
	render() {
		return (
			<Host
				class="content-[' '] rounded-[50% 50% 0 0/100% 100% 0 0] aspect-[15/1] w-full bg-off-white-500"
				style={{ 'border-radius': '0 0 50% 50%/0 0 100% 100%' }}
			></Host>
		);
	}
}
