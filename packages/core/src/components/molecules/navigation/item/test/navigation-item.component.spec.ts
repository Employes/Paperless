import { newSpecPage } from '@stencil/core/testing';

import { NavigationItem } from '../navigation-item.component';

describe('p-navigation-item', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [NavigationItem],
			html: '<p-navigation-item>Test</p-navigation-item>',
		});
		expect(root).toEqualHtml(`
      <p-navigation-item class="p-navigation-item">
        <mock:shadow-root>
          Test
        </mock:shadow-root>
      </p-navigation-item>
    `);
	});
});
