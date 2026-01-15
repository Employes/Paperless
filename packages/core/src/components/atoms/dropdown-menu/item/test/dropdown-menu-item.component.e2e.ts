import { newE2EPage } from '@stencil/core/testing';

describe('p-dropdown-menu-item', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<p-dropdown-menu-item>Test</p-dropdown-menu-item>');
		const element = await page.find('p-dropdown-menu-item');
		expect(element).toHaveClass('hydrated');
	});

	it('renders changes to the content', async () => {
		const page = await newE2EPage();

		await page.setContent('<p-dropdown-menu-item>Test</p-dropdown-menu-item>');
		// const component = await page.find('p-button');
		const element = await page.find('p-dropdown-menu-item');
		expect(element.textContent).toEqual(`Test`);

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
