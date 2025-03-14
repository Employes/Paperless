import { newE2EPage } from '@stencil/core/testing';

describe('p-checkbox', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent('<p-checkbox></p-checkbox>');

		const element = await page.find('p-checkbox');
		expect(element).toHaveClass('hydrated');
	});
});
