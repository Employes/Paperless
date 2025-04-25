const rotateNumbers = {};

for (let i = 1; i < 360; i++) {
	rotateNumbers[`${i}`] = `${i}deg`;
	rotateNumbers[`-${i}`] = `-${i}deg`;
}

export default rotateNumbers;
