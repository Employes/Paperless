import { newSpecPage } from '@stencil/core/testing';

import { Badge } from '../badge.component';

describe('p-badge', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Badge],
			html: '<p-badge></p-badge>',
		});
		expect(root).toEqualHtml(`
      <p-badge class="p-badge">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-badge>
    `);
	});
});
