import { newSpecPage } from '@stencil/core/testing';

import { Select } from '../select.component';

describe('p-select', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Select],
			html: '<p-select></p-select>',
		});
		expect(root).toEqualHtml(`
      <p-select class="p-select">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-select>
    `);
	});
});
