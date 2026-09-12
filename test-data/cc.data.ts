const expirationDate = new Date();
expirationDate.setMonth(expirationDate.getMonth() + 3);
const month = (expirationDate.getMonth() + 1).toString().padStart(2, '0');
const year = expirationDate.getFullYear();

export const testCC = {
    number: '1111-1111-1111-1111',
    expirationDate: `${month}/${year}`,
    cvvCode: '111',
    cardHolderName: 'any name'
}
