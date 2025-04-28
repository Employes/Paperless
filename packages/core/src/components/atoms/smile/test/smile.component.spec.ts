import { newSpecPage } from '@stencil/core/testing';
import { Smile } from '../smile.component';

describe('p-smile', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Smile],
			html: '<p-smile></p-smile>',
		});
		expect(root).toEqualHtml(`
      <p-smile class="p-smile">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-smile>
    `);
	});
});
