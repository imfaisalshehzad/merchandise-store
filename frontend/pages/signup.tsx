import {Inter} from "next/font/google";
import {useContext} from "react";
import {Button} from "../components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../components/ui/form";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Link from "next/link";
import {z} from "zod";
import {loginFormSchema} from "@/schema/authSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {useRouter} from 'next/router'
import {signup} from "@/lib/services/auth/signup";

const inter = Inter({subsets: ["latin"]});

export default function Signup() {
    const router = useRouter()

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(formValues: z.infer<typeof loginFormSchema>) {
        const res = await signup(formValues.email, formValues.password);

        if (res) {
            form.reset();
            router.push("/");
        }
    }

    return (
        <div className={`flex w-screen h-screen items-center justify-center ${inter.className}`}>
            <div className="flex min-h-screen items-center justify-center">
                <Form {...form}>
                    <Card className="flex flex-col gap-2 p-4">
                        <Label className="text-lg">Signup</Label>
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
                            <Label>Already a user? Login </Label>
                            <Link className="hover:underline" href={"/"}>
                              here
                            </Link>
                        </span>
                    </Card>
                </Form>
            </div>
        </div>
    );
}