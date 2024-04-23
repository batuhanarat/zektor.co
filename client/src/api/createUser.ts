import { API_URL } from "./config";

export async function createUser() {
    const response = await fetch(`${API_URL}/user`, {
        method: "POST",
        body: JSON.stringify( {
        }),
        headers: {
          "Content-Type": "application/json",
        }
      });
      return response.json();
}
