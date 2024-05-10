import { API_URL } from "./config";

export type TSensor = {
    _id: string,
    userId: string,
    temperature: number,
    humidity: number,
    lightIntensity: number,
    co2Level: number,
    date: Date,
};

export async function getSensor(userId:string): Promise<TSensor[]> {
        const response = await fetch(`${API_URL}/sensor/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to get sensor');
        }
        return response.json();

}



