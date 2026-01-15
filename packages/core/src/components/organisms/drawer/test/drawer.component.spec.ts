import { newSpecPage } from '@stencil/core/testing';

import { Drawer } from '../drawer.component';

describe('p-drawer', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Drawer],
			html: '<p-drawer></p-drawer>',
		});
		expect(root).toEqualHtml(`
      <p-drawer class="p-drawer">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-drawer>
    `);
	});
});
