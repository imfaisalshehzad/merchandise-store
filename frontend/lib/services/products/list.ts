import {getBackendUrl} from "lib/utils";
import axios, {AxiosError} from "axios";
import {toast} from "@/components/ui/use-toast";

export async function listProducts() {
    try {
        const output = await axios.get(
            `${getBackendUrl()}/api/products`,
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