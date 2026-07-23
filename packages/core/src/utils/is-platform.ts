export const getOS = () => {
	const userAgent = navigator.userAgent;
	const platform =
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(navigator as any)?.userAgentData?.platform || navigator.platform;
	const macosPlatforms = ['macintosh', 'macintel', 'macppc', 'mac68k', 'macos'];
	const windowsPlatforms = ['win32', 'win64', 'windows', 'wince'];
	const iosPlatforms = ['iphone', 'ipad', 'ipod'];

	if (macosPlatforms.includes(platform.toLowerCase())) {
		return 'MacOS';
	}

	if (iosPlatforms.includes(platform.toLowerCase())) {
		return 'iOS';
	}

	if (windowsPlatforms.includes(platform.toLowerCase())) {
		return 'Windows';
	}

	if (/Android/.test(userAgent)) {
		return 'Android';
	}

	if (/Linux/.test(platform)) {
		return 'Linux';
	}

	return 'Unkown';
};

export const isApple = () => {
	const os = getOS();
	return os === 'MacOS' || os === 'iOS';
};

export const isMac = () => getOS() === 'MacOS';
export const isIOS = () => getOS() === 'iOS';

export const isWindows = () => getOS() === 'Windows';

export const isLinux = () => getOS() === 'Linux';

export const isAndroid = () => getOS() === 'Android';
