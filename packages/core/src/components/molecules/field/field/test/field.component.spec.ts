import { newSpecPage } from '@stencil/core/testing';
import { Field } from '../field.component';

describe('p-field', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Field],
			html: '<p-field></p-field>',
		});
		expect(root).toEqualHtml(`
      <p-field class="p-field">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-field>
    `);
	});
});
