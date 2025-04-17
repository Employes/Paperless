import { newSpecPage } from '@stencil/core/testing';
import { SegmentContainer } from '../segment-container.component';

describe('p-segment-container', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [SegmentContainer],
			html: '<p-segment-container></p-segment-container>',
		});
		expect(root).toEqualHtml(`
      <p-segment-container class="p-segment-container">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-segment-container>
    `);
	});
});
