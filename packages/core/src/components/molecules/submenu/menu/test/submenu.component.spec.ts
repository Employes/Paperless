import { newSpecPage } from '@stencil/core/testing';

import { Submenu } from '../submenu.component';

describe('p-submenu', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Submenu],
			html: '<p-submenu></p-submenu>',
		});
		expect(root).toEqualHtml(`
      <p-submenu class="p-submenu">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-submenu>
    `);
	});
});
