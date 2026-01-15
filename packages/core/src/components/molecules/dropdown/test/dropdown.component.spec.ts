import { newSpecPage } from '@stencil/core/testing';

import { Dropdown } from '../dropdown.component';

describe('p-dropdown', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Dropdown],
			html: '<p-dropdown></p-dropdown>',
		});
		expect(root).toEqualHtml(`
      <p-dropdown class="p-dropdown">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-dropdown>
    `);
	});
});
