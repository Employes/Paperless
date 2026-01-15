import { newSpecPage } from '@stencil/core/testing';

import { Tooltip } from '../tooltip.component';

describe('p-tooltip', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [Tooltip],
			html: `<p-tooltip></p-tooltip>`,
		});
		expect(page.root).toEqualHtml(``);
	});
});
