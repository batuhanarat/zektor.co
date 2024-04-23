import { API_URL } from "./config";

export type TUser = {
    _id: string,
    plants?: string[],

};

export async function getUser(userID:string): Promise<TUser> {
    const response = await fetch(`${API_URL}/user/${userID}`);
    return response.json();
}


