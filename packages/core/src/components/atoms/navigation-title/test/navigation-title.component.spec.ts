import { newSpecPage } from '@stencil/core/testing';
import { NavigationTitle } from '../navigation-title.component';

describe('p-navigation-title', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [NavigationTitle],
			html: '<p-navigation-title></p-navigation-title>',
		});
		expect(root).toEqualHtml(`
      <p-navigation-title class="p-navigation-title">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-navigation-title>
    `);
	});
});
