import { newSpecPage } from '@stencil/core/testing';
import { Label } from '../label.component';

describe('p-label', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Label],
			html: '<p-label></p-label>',
		});
		expect(root).toEqualHtml(`
      <p-label class="p-label">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-label>
    `);
	});
});
