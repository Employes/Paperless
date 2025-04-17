import { newSpecPage } from '@stencil/core/testing';
import { SliderIndicator } from '../slider-indicator.component';

describe('p-slider-indicator', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [SliderIndicator],
			html: '<p-slider-indicator></p-slider-indicator>',
		});
		expect(root).toEqualHtml(`
      <p-slider-indicator class="p-slider-indicator">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-slider-indicator>
    `);
	});
});
