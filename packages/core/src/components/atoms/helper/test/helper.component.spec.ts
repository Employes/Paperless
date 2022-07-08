import { newSpecPage } from '@stencil/core/testing';
import { Helper } from '../helper.component';

describe('helper', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [Helper],
      html: '<p-helper>Test</p-helper>',
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
      components: [Helper],
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
