import bcrypt from "bcrypt";

export const hashToken = async (token: string) => {
    return await bcrypt.hash(token, 10);
};

export const compareToken = async (
    token: string,
    hash: string
) => {
    return await bcrypt.compare(token, hash);
};
