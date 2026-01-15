import { newSpecPage } from '@stencil/core/testing';

import { Range } from '../range.component';

describe('p-range', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Range],
			html: '<p-range></p-range>',
		});
		expect(root).toEqualHtml(`
      <p-range class="p-range">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-range>
    `);
	});
});
