import { newE2EPage } from '@stencil/core/testing';

describe('p-floating-menu-container', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent(
			'<p-floating-menu-container></p-floating-menu-container>'
		);
		const element = await page.find('p-floating-menu-container');
		expect(element).toHaveClass('hydrated');
	});

	it('renders changes to the content', async () => {
		const page = await newE2EPage();

		await page.setContent(
			'<p-floating-menu-container></p-floating-menu-container>'
		);
		// const component = await page.find('p-button');
		const element = await page.find('p-floating-menu-container');
		expect(element.textContent).toEqual(``);

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
