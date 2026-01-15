import { newSpecPage } from '@stencil/core/testing';

import { DropdownMenuContainer } from '../dropdown-menu-container.component';

describe('p-dropdown-menu-container', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [DropdownMenuContainer],
			html: '<p-dropdown-menu-container></p-dropdown-menu-container>',
		});
		expect(root).toEqualHtml(`
      <p-divider class="p-dropdown-menu-container">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-divider>
    `);
	});
});
