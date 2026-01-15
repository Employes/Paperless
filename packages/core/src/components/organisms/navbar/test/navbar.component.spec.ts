import { newSpecPage } from '@stencil/core/testing';

import { Navbar } from '../navbar.component';

describe('p-navbar', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Navbar],
			html: '<p-navbar></p-navbar>',
		});
		expect(root).toEqualHtml(`
      <p-navbar class="p-navbar">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-navbar>
    `);
	});
});
