import { newSpecPage } from '@stencil/core/testing';

import { SegmentItem } from '../segment-item.component';

describe('p-segment-item', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [SegmentItem],
			html: '<p-segment-item></p-segment-item>',
		});
		expect(root).toEqualHtml(`
      <p-segment-item class="p-segment-item">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-segment-item>
    `);
	});
});
