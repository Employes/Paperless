import { newSpecPage } from '@stencil/core/testing';
import { ModalContainer } from '../modal-container.component';

describe('p-modal-container', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [ModalContainer],
			html: '<p-modal-container></p-modal-container>',
		});
		expect(root).toEqualHtml(`
      <p-modal-container class="p-modal-container">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-modal-container>
    `);
	});
});
