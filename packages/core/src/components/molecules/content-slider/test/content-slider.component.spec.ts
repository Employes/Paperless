import { newSpecPage } from '@stencil/core/testing';
import { ContentSlider } from '../content-slider.component';

describe('p-content-slider', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [ContentSlider],
			html: '<p-content-slider></p-content-slider>',
		});
		expect(root).toEqualHtml(`
      <p-content-slider class="p-content-slider">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-content-slider>
    `);
	});
});
