import { newSpecPage } from '@stencil/core/testing';

import { CardHeader } from '../card-header.component';

describe('p-card-header', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [CardHeader],
			html: '<p-card-header>test</p-card-header>',
		});
		expect(root).toEqualHtml(`
      <p-card-header class="p-card-header">
        <mock:shadow-root>
          test
        </mock:shadow-root>
      </p-card-header>
    `);
	});
});
