import { API_URL } from "./config";

export type TPlant = {
    _id: string,
    userId: string,
    type: string,
    order: number,
    developmentPhase: number,
    images: string[],
};

export async function getPlants(userID:string): Promise<TPlant[]> {
    try{
        const response = await fetch(`${API_URL}/user/${userID}/plants`);

        if (!response.ok) {
            throw new Error('Failed to fetch plant');
        }
        return response.json();
    }
    catch (error) {
        console.error("API call to get plants failed:", error);
        return [];
    }
}



