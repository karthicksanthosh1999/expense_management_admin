export interface ITransactionsResponseType {
    id: string,
    amount: string,
    description: string,
    userid: string,
    categoryid: string,
    createdat: string,
    updatedat: string,
    expensetype: string,
    user: {
        id: string,
        fullName: string,
        email: string
    },
    category: {
        id: string,
        title: string,
        color: string
    }
}