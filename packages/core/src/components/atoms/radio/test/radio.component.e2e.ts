import { newE2EPage } from '@stencil/core/testing';

describe('p-radio', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p-radio></p-radio>');

    const element = await page.find('p-radio');
    expect(element).toHaveClass('hydrated');
  });
});
