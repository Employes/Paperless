import { newSpecPage } from '@stencil/core/testing';
import { Listing } from '../listing.component';

describe('p-listing', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Listing],
			html: '<p-listing></p-listing>',
		});
		expect(root).toEqualHtml(`
      <p-listing class="p-listing">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-listing>
    `);
	});
});
