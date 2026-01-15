import { newSpecPage } from '@stencil/core/testing';

import { Divider } from '../divider.component';

describe('p-divider', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Divider],
			html: '<p-divider></p-divider>',
		});
		expect(root).toEqualHtml(`
      <p-divider class="p-divider">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-divider>
    `);
	});
});
