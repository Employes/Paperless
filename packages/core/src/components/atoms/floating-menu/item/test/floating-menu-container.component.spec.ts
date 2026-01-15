import { newSpecPage } from '@stencil/core/testing';

import { FloatingMenuItem } from '../floating-menu-item.component';

describe('p-floating-menu-item', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [FloatingMenuItem],
			html: '<p-floating-menu-item></p-floating-menu-item>',
		});
		expect(root).toEqualHtml(`
      <p-floating-menu-item class="p-floating-menu-item">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-floating-menu-item>
    `);
	});
});
