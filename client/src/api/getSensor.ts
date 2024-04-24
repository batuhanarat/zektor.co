import { API_URL } from "./config";

export type TSensor = {
    _id: string,
    userId: string,
    temperature: Number,
    humidity: Number,
};

export async function getPlant(userId:string): Promise<TSensor> {
        const response = await fetch(`${API_URL}/sensor/${userId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch plants');
        }
        return response.json();

}



