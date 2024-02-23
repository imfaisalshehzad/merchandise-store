import {getBackendUrl} from "lib/utils";
import axios, {AxiosError} from "axios";
import {toast} from "@/components/ui/use-toast";

export async function updateProduct(id: string, name: string, price: number) {
    try {
        const output = await axios.put(
            `${getBackendUrl()}/api/products/${id}`,
            {
                name,
                price,
            },
            {withCredentials: true}
        );
        return output.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
            toast({
                title: "Invalid email or password",
            });
        } else {
            console.error(error);
            toast({
                title: "An error occurred",
            });
        }
    }
    return false;
}