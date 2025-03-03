import { API_URL } from "./config";
import { TPlantImage } from "./getImages";



export async function getImage(imageId:string): Promise<TPlantImage> {

    try {
        console.log(imageId);
        const response = await fetch(`${API_URL}/plantImageSync/${imageId}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        const data = await response.json(); // Properly wait for the JSON to be parsed
        console.log("Getting images response:", data);
        return data;
    } catch (error) {
        console.error("API call to get images failed:", error);
        throw new Error('Failed to fetch image'); //a
    }
}



