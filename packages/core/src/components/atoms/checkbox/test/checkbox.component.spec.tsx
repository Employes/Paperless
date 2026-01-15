import { newSpecPage } from '@stencil/core/testing';

import { Checkbox } from '../checkbox.component';

describe('p-checkbox', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [Checkbox],
			html: `<p-checkbox></p-checkbox>`,
		});
		expect(page.root).toEqualHtml(`
      <p-checkbox>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </p-checkbox>
    `);
	});
});
