import { newSpecPage } from '@stencil/core/testing';
import { Illustration } from '../illustration.component';

describe('p-illustration', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [Illustration],
			html: `<p-illustration icon="document"></p-illustration>`,
		});
		expect(page.root).toEqualHtml(`
      <p-icon icon="document" class="p-icon inline-block text-auto hydrated" innerhtml="<?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?>
      <svg width=&quot;1em&quot; height=&quot;1em&quot; viewBox=&quot;0 0 16 16&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; xmlns:xlink=&quot;http://www.w3.org/1999/xlink&quot;>
            <title>20D69539-7C20-49F0-9BCF-AE6F4D356668@1x</title>
            <g id=&quot;✔️-Collections&quot; stroke=&quot;none&quot; stroke-width=&quot;1&quot; fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;>
                <g id=&quot;⚛️-Atoms---Icons&quot; transform=&quot;translate(-299.000000, -534.000000)&quot; fill=&quot;#989AB7&quot;>
                    <g id=&quot;Collection---Icons&quot; transform=&quot;translate(56.000000, 56.000000)&quot;>
                        <g id=&quot;icons&quot; transform=&quot;translate(0.000000, 152.000000)&quot;>
                            <g id=&quot;document&quot; transform=&quot;translate(0.000000, 326.000000)&quot;>
                                <g id=&quot;Rectangle-9&quot; transform=&quot;translate(243.000000, 0.000000)&quot;>
                                    <path d=&quot;M10.5857864,0 C10.8510029,-4.87194788e-17 11.1053568,0.10535684 11.2928932,0.292893219 L13.7071068,2.70710678 C13.8946432,2.89464316 14,3.14899707 14,3.41421356 L14,15 C14,15.5522847 13.5522847,16 13,16 L3,16 C2.44771525,16 2,15.5522847 2,15 L2,1 C2,0.44771525 2.44771525,1.01453063e-16 3,0 L10.5857864,0 Z M10.5,12 L5.5,12 C5.22385763,12 5,12.2238576 5,12.5 C5,12.7761424 5.22385763,13 5.5,13 L5.5,13 L10.5,13 C10.7761424,13 11,12.7761424 11,12.5 C11,12.2238576 10.7761424,12 10.5,12 L10.5,12 Z M10.5,10 L5.5,10 C5.22385763,10 5,10.2238576 5,10.5 C5,10.7761424 5.22385763,11 5.5,11 L5.5,11 L10.5,11 C10.7761424,11 11,10.7761424 11,10.5 C11,10.2238576 10.7761424,10 10.5,10 L10.5,10 Z M8.5,8 L5.5,8 C5.22385763,8 5,8.22385763 5,8.5 C5,8.77614237 5.22385763,9 5.5,9 L5.5,9 L8.5,9 C8.77614237,9 9,8.77614237 9,8.5 C9,8.22385763 8.77614237,8 8.5,8 L8.5,8 Z M10.072225,1.5009428 C10.025952,1.54774288 10,1.61090189 10,1.67671555 L10,3.91659843 C10,4.05466962 10.1119288,4.16659843 10.25,4.16659843 L12.5153972,4.16659843 C12.6534684,4.16659843 12.7653972,4.05466962 12.7653972,3.91659843 C12.7653972,3.84980357 12.7386677,3.78578633 12.6911699,3.73882347 L10.4257728,1.49894059 C10.3275904,1.40186397 10.1693016,1.40276039 10.072225,1.5009428 Z&quot;></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>"><!--?xml version="1.0" encoding="UTF-8"?-->
        <svg width="1em" height="1em" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>20D69539-7C20-49F0-9BCF-AE6F4D356668@1x</title>
            <g id="✔️-Collections" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="⚛️-Atoms---Icons" transform="translate(-299.000000, -534.000000)" fill="#989AB7">
                    <g id="Collection---Icons" transform="translate(56.000000, 56.000000)">
                        <g id="icons" transform="translate(0.000000, 152.000000)">
                            <g id="document" transform="translate(0.000000, 326.000000)">
                                <g id="Rectangle-9" transform="translate(243.000000, 0.000000)">
                                    <path d="M10.5857864,0 C10.8510029,-4.87194788e-17 11.1053568,0.10535684 11.2928932,0.292893219 L13.7071068,2.70710678 C13.8946432,2.89464316 14,3.14899707 14,3.41421356 L14,15 C14,15.5522847 13.5522847,16 13,16 L3,16 C2.44771525,16 2,15.5522847 2,15 L2,1 C2,0.44771525 2.44771525,1.01453063e-16 3,0 L10.5857864,0 Z M10.5,12 L5.5,12 C5.22385763,12 5,12.2238576 5,12.5 C5,12.7761424 5.22385763,13 5.5,13 L5.5,13 L10.5,13 C10.7761424,13 11,12.7761424 11,12.5 C11,12.2238576 10.7761424,12 10.5,12 L10.5,12 Z M10.5,10 L5.5,10 C5.22385763,10 5,10.2238576 5,10.5 C5,10.7761424 5.22385763,11 5.5,11 L5.5,11 L10.5,11 C10.7761424,11 11,10.7761424 11,10.5 C11,10.2238576 10.7761424,10 10.5,10 L10.5,10 Z M8.5,8 L5.5,8 C5.22385763,8 5,8.22385763 5,8.5 C5,8.77614237 5.22385763,9 5.5,9 L5.5,9 L8.5,9 C8.77614237,9 9,8.77614237 9,8.5 C9,8.22385763 8.77614237,8 8.5,8 L8.5,8 Z M10.072225,1.5009428 C10.025952,1.54774288 10,1.61090189 10,1.67671555 L10,3.91659843 C10,4.05466962 10.1119288,4.16659843 10.25,4.16659843 L12.5153972,4.16659843 C12.6534684,4.16659843 12.7653972,4.05466962 12.7653972,3.91659843 C12.7653972,3.84980357 12.7386677,3.78578633 12.6911699,3.73882347 L10.4257728,1.49894059 C10.3275904,1.40186397 10.1693016,1.40276039 10.072225,1.5009428 Z"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
      </p-icon>
    `);
	});
});
