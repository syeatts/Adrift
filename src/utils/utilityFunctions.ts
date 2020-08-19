const getRandomNum = (max: number): number => {
    const min = Math.ceil(0);
    const flooredMax = Math.floor(max);
    const randomized = Math.floor(Math.random() * (flooredMax - min + 1)) + min;
    return randomized;
};

const capitalizeFirstLetter = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export { getRandomNum, capitalizeFirstLetter };