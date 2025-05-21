import { newSpecPage } from '@stencil/core/testing';
import { Accordion } from '../accordion.component';

describe('p-accordion', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Accordion],
			html: '<p-accordion></p-accordion>',
		});
		expect(root).toEqualHtml(`
      <p-accordion class="p-accordion">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-accordion>
    `);
	});
});
