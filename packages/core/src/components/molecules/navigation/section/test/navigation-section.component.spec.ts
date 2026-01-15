import { newSpecPage } from '@stencil/core/testing';

import { NavigationSection } from '../navigation-section.component';

describe('p-navigation-section', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [NavigationSection],
			html: '<p-navigation-section></p-navigation-title>',
		});
		expect(root).toEqualHtml(`
      <p-navigation-section class="p-navigation-title">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-navigation-section>
    `);
	});
});
