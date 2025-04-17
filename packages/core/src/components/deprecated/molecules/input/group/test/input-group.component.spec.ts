import { newSpecPage } from '@stencil/core/testing';
import { InputGroup } from '../input-group.component';

describe('p-input-group', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [InputGroup],
			html: '<p-input-group></p-input-group>',
		});
		expect(root).toEqualHtml(`
      <p-input-group class="p-input-group">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-input-group>
    `);
	});
});
