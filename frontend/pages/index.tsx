import {Inter} from "next/font/google";
import {useContext} from "react";
import {Button} from "../components/ui/button";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form} from "../components/ui/form";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Link from "next/link";
import {z} from "zod";
import {loginFormSchema} from "@/schema/authSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {logIn} from "@/lib/services/auth/login";
import {Card} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import { useRouter } from 'next/router'

const inter = Inter({subsets: ["latin"]});

export default function Home() {
    const router = useRouter()

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(formValues: z.infer<typeof loginFormSchema>) {
        const res = await logIn(formValues.email, formValues.password);

        if (res) {
            form.reset();
            router.push("/dashboard");
        }
    }


    return (
        <div className={`flex w-screen h-screen items-center justify-center ${inter.className}`}>
            <div className="flex min-h-screen items-center justify-center">
                <Form {...form}>
                    <Card className="flex flex-col gap-2 p-4">
                        <Label className="text-lg">Please enter your details to log in</Label>
                        <Separator/>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-4"
                        >
                            {/* email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            {/* password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                        <span className="flex items-center text-sm gap-1 pt-2">
                            <Label>New user? Sign-up </Label>
                            <Link className="hover:underline" href={"/signup"}>
                              here
                            </Link>
                        </span>
                    </Card>
                </Form>
            </div>
        </div>
    );
}