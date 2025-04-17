import { newSpecPage } from '@stencil/core/testing';
import { ModalContainer } from '../drawer-container.component';

describe('p-drawer-container', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [ModalContainer],
			html: '<p-drawer-container></p-drawer-container>',
		});
		expect(root).toEqualHtml(`
      <p-drawer-container class="p-drawer-container">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-drawer-container>
    `);
	});
});
