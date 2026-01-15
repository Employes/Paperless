import { newSpecPage } from '@stencil/core/testing';

import { Attachment } from '../attachment.component';

describe('p-attachment', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Attachment],
			html: '<p-attachment></p-attachment>',
		});
		expect(root).toEqualHtml(`
      <p-attachment class="p-attachment">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-attachment>
    `);
	});
});
