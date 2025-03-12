import { newSpecPage } from '@stencil/core/testing';
import { FieldContainer } from '../field-container.component';

describe('p-field-container', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [FieldContainer],
			html: '<p-field-container></p-field-container>',
		});
		expect(root).toEqualHtml(`
      <p-field-container class="p-field-container">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-field-container>
    `);
	});
});
