import { newSpecPage } from '@stencil/core/testing';

import { Toast } from '../toast.component';

describe('p-toast', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Toast],
			html: '<p-toast></p-toast>',
		});
		expect(root).toEqualHtml(`
      <p-toast class="p-toast">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-toast>
    `);
	});
});
