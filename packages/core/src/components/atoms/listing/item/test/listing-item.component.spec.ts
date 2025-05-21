import { newSpecPage } from '@stencil/core/testing';
import { ListingItem } from '../listing-item.component';

describe('p-listing-item', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [ListingItem],
			html: '<p-listing-item></p-listing-item>',
		});
		expect(root).toEqualHtml(`
      <p-listing-item class="p-listing-item">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-listing-item>
    `);
	});
});
