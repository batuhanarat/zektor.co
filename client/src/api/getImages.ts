import { API_URL } from "./config";

export type TPlantImage = {
    _id: string,
    plantId: string,
    url: string,
    date: Date,
};


export async function getImages(plantId:string): Promise<TPlantImage[]> {

    try{
        const response = await fetch(`${API_URL}/plant/${plantId}/images`);
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        const data = await response.json(); // Properly wait for the JSON to be parsed
        console.log("Getting images response:", data);
        return data;
    }

        catch (error) {
            console.error("API call to get images failed:", error);
            return [];
        }
}



