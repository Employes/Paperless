import { newE2EPage } from '@stencil/core/testing';

describe('button', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<p-button>test</p-button>');
		const element = await page.find('p-button');
		expect(element).toHaveClass('hydrated');
	});

	it('renders changes to the name data', async () => {
		const page = await newE2EPage();

		await page.setContent('<p-button>Hello world!</p-button>');
		// const component = await page.find('p-button');
		const element = await page.find('p-button >>> button');
		expect(element.textContent).toEqual(`Hello world!`);

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
