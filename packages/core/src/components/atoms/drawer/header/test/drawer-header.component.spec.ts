import { newSpecPage } from '@stencil/core/testing';

import { DrawerHeader } from '../drawer-header.component';

describe('p-drawer-header', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [DrawerHeader],
			html: '<p-drawer-header></p-drawer-header>',
		});
		expect(root).toEqualHtml(`
      <p-drawer-header class="p-drawer-header">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-drawer-header>
    `);
	});
});
