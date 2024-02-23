import {getBackendUrl} from "lib/utils";
import axios, {AxiosError} from "axios";
import {toast} from "@/components/ui/use-toast";

export async function logIn(email: string, password: string) {
    try {
        console.log("getBackendUrl()", getBackendUrl());
        await axios.post(
            `${getBackendUrl()}/login`,
            {
                email: email,
                password: password,
            },
            {withCredentials: true}
        );
        return true;
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