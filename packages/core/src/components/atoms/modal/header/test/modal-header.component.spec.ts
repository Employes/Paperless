import { newSpecPage } from '@stencil/core/testing';

import { ModalHeader } from '../modal-header.component';

describe('p-modal-header', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [ModalHeader],
			html: '<p-modal-header></p-modal-header>',
		});
		expect(root).toEqualHtml(`
      <p-modal-header class="p-modal-header">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-modal-header>
    `);
	});
});
