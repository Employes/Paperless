import { newE2EPage } from '@stencil/core/testing';

describe('p-navigation-item', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<p-navigation-item></p-navigation-item>');
		const element = await page.find('p-navigation-item');
		expect(element).toHaveClass('hydrated');
	});

	it('renders changes to the content', async () => {
		const page = await newE2EPage();

		await page.setContent('<p-navigation-item>Test</p-navigation-item>');
		// const component = await page.find('p-button');
		const element = await page.find('p-divider');
		expect(element.textContent).toEqual(`test`);

		// component.setProperty('name', 'World');
		// await page.waitForChanges();
		// expect(element.textContent).toEqual(`Hello, World!`);

		// component.setProperty('name', 'Bob');
		// await page.waitForChanges();
		// expect(element.textContent).toEqual(`Hello, Bob!`);

		// component.setProperty('name', 'Earl');
		// await page.waitForChanges();
		// expect(element.textContent).toEqual(`Hello, Earl!`);
	});
});
