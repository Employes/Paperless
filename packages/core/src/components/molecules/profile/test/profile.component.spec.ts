import { newSpecPage } from '@stencil/core/testing';

import { Profile } from '../profile.component';

describe('p-profile', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Profile],
			html: '<p-profile></p-profile>',
		});
		expect(root).toEqualHtml(`
      <p-profile class="p-profile">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-profile>
    `);
	});
});
