import { newSpecPage } from '@stencil/core/testing';

import { ToastContainer } from '../toast-container.component';

describe('p-toast-container', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [ToastContainer],
			html: '<p-toast-container></p-toast-container>',
		});
		expect(root).toEqualHtml(`
      <p-toast-container class="p-toast-container">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-toast-container>
    `);
	});
});
