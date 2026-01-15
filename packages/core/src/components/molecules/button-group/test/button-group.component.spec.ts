import { newSpecPage } from '@stencil/core/testing';

import { ButtonGroup } from '../button-group.component';

describe('p-button-group', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [ButtonGroup],
			html: '<p-button-group>Test</p-button-group>',
		});
		expect(root).toEqualHtml(`
      <p-button>
        <mock:shadow-root>
          <button class="btn-primary">
            Test
          </button>
        </mock:shadow-root>
      </p-button>
    `);
	});

	it('renders with values', async () => {
		const { root } = await newSpecPage({
			components: [ButtonGroup],
			html: `<p-button variation="secondary">I have content</p-button>`,
		});
		expect(root).toEqualHtml(`
      <p-button name="World">
        <mock:shadow-root>
          <button class="btn-secondary">
            I have content
          </button>
        </mock:shadow-root>
      </p-button>
    `);
	});
});
