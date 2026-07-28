import { newSpecPage } from '@stencil/core/testing';

import { SubmenuItem } from '../submenu-item.component';

describe('p-submenu-item', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [SubmenuItem],
			html: '<p-submenu-item></p-submenu-item>',
		});
		expect(root).toEqualHtml(`
      <p-submenu-item class="p-submenu-item">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-submenu-item>
    `);
	});
});
