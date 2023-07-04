export const getRandomWord = async (url: string, headers: object) =>
	fetch(url, {
		headers: { ...headers },
	});
