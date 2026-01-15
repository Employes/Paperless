import { newSpecPage } from '@stencil/core/testing';

import { Calendar } from '../calendar.component';

describe('p-calendar', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Calendar],
			html: '<p-calendar></p-calendar>',
		});
		expect(root).toEqualHtml(`
      <p-calendar class="p-calendar">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-calendar>
    `);
	});
});
