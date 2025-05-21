import { newSpecPage } from '@stencil/core/testing';
import { ListingLine } from '../listing-line.component';

describe('p-listing-line', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [ListingLine],
			html: '<p-listing-line></p-listing-line>',
		});
		expect(root).toEqualHtml(`
      <p-listing-line class="p-listing-line">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-listing-line>
    `);
	});
});
