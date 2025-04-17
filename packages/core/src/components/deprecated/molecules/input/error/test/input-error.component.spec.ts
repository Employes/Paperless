import { newSpecPage } from '@stencil/core/testing';
import { InputError } from '../input-error.component';

describe('p-input-error', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [InputError],
			html: '<p-input-error></p-input-error>',
		});
		expect(root).toEqualHtml(`
      <p-input-error class="p-input-error">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-input-error>
    `);
	});
});
