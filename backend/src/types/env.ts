const checkIsString = (constant: string | undefined): string => {
    if (typeof constant === 'string') {
        return constant;
    } else {
        throw new Error('This type of constant is undefined. You have to set the string value in this constant.');
    }
};

const checkIsStringAndParseInt = (constant: string | undefined): number => {
    if (typeof constant === 'string') {
        return parseInt(constant);
    } else {
        throw new Error('This type of constant is undefined. You have to set the number value in this constant.');
    }
};

export { checkIsString, checkIsStringAndParseInt };
