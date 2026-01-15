import { newSpecPage } from '@stencil/core/testing';

import { TabItem } from '../tab-item.component';

describe('p-tab-item', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [TabItem],
			html: '<p-tab-item></p-tab-item>',
		});
		expect(root).toEqualHtml(`
      <p-tab-item class="p-tab-item">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-tab-item>
    `);
	});
});
