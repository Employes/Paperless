import { newSpecPage } from '@stencil/core/testing';

import { DropdownMenuItem } from '../dropdown-menu-item.component';

describe('p-dropdown-menu-item', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [DropdownMenuItem],
			html: '<p-dropdown-menu-item>Test</p-dropdown-menu-item>',
		});
		expect(root).toEqualHtml(`
      <p-divider class="p-dropdown-menu-item">
        <mock:shadow-root>
          Test
        </mock:shadow-root>
      </p-divider>
    `);
	});
});
