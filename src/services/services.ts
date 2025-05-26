import api from "@/axiosInstance"

export const query = async (query: string) => {
  try {
    const response = await api.post("", {
      query: `${query}`
    });
    
    if (response.data.success) {
      console.log("DATA DARI BACK END");
      console.log(response.data)
      return {
        data: response.data.data, // Akan selalu dalam bentuk array yang mana object dalam array-nya adalah Object dari row hasil tersebut
        rowCount: response.data.rowCount // Banyaknya Object yang ada dalam array data tersebut
      };
    } else {
      throw new Error(response.data.error || "Query execution failed");
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || error.message || "An unknown error occurred";
    console.error(`Query error: ${errorMessage}`);
    throw new Error(errorMessage);
  }
}