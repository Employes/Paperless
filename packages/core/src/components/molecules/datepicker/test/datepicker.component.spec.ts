import { newSpecPage } from '@stencil/core/testing';

import { Datepicker } from '../datepicker.component';

describe('p-datepicker', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Datepicker],
			html: '<p-datepicker></p-datepicker>',
		});
		expect(root).toEqualHtml(`
      <p-datepicker class="p-datepicker">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-datepicker>
    `);
	});
});
