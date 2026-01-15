import { newSpecPage } from '@stencil/core/testing';

import { ModalFooter } from '../modal-footer.component';

describe('p-modal-footer', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [ModalFooter],
			html: '<p-modal-footer></p-modal-footer>',
		});
		expect(root).toEqualHtml(`
      <p-modal-footer class="p-modal-footer">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-modal-footer>
    `);
	});
});
