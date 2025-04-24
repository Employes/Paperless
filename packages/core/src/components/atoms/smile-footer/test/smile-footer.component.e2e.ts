import { newE2EPage } from '@stencil/core/testing';

describe('p-smile-footer', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<p-smile-footer></p-smile-footer>');
		const element = await page.find('p-smile-footer');
		expect(element).toHaveClass('hydrated');
	});

	it('renders changes to the content', async () => {
		const page = await newE2EPage();

		await page.setContent('<p-smile-footer></p-smile-footer>');
		// const component = await page.find('p-button');
		const element = await page.find('p-smile-footer');
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
