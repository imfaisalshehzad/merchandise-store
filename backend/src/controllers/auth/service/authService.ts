import fs from 'fs/promises';
import {ProductTypes} from "../../../types/product.types";
import path from "path";
import {UserTypes} from "../../../types/user.types";

const USERS_FILE_PATH = path.join(process.cwd(), "/src/user.json");

export const readUserData = async (): Promise<UserTypes[]> => {
    const data = await fs.readFile(USERS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
};

export const writeUserData = async (user: UserTypes[]): Promise<void> => {
    await fs.writeFile(USERS_FILE_PATH, JSON.stringify(user, null, 2));
};
