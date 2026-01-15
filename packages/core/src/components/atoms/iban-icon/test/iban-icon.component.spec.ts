import { newSpecPage } from '@stencil/core/testing';

import { IbanIcon } from '../iban-icon.component';

describe('p-iban-icon', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [IbanIcon],
			html: '<p-iban-icon></p-iban-icon>',
		});
		expect(root).toEqualHtml(`
      <p-iban-icon class="p-iban-icon">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-iban-icon>
    `);
	});
});
