import { newSpecPage } from '@stencil/core/testing';
import { Modal } from '../modal.component';

describe('p-modal', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Modal],
			html: '<p-modal></p-modal>',
		});
		expect(root).toEqualHtml(`
      <p-modal class="p-modal">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-modal>
    `);
	});
});
