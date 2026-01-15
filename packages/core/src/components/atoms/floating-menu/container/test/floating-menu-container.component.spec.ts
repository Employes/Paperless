import { newSpecPage } from '@stencil/core/testing';

import { FloatingMenuContainer } from '../floating-menu-container.component';

describe('p-floating-menu-container', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [FloatingMenuContainer],
			html: '<p-floating-menu-container></p-floating-menu-container>',
		});
		expect(root).toEqualHtml(`
      <p-floating-menu-container class="p-floating-menu-container">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-floating-menu-container>
    `);
	});
});
