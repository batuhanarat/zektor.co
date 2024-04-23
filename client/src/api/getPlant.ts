import { API_URL } from "./config";
import { TPlant } from "./getPlants";


export async function getPlant(plantId:string): Promise<TPlant> {
        const response = await fetch(`${API_URL}/plant/${plantId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch plants');
        }
        return response.json();

}



