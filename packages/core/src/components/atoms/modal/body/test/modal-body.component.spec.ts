import { newSpecPage } from '@stencil/core/testing';
import { ModalBody } from '../modal-body.component';

describe('p-modal-body', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [ModalBody],
			html: '<p-modal-body></p-modal-body>',
		});
		expect(root).toEqualHtml(`
      <p-modal-body class="p-modal-body">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-modal-body>
    `);
	});
});
