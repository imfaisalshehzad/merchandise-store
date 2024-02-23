import {Inter} from "next/font/google";
import {useContext, useState} from "react";
import {useRouter} from 'next/router'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {productCreateFormSchema, productUpdateFormSchema} from "@/schema/productSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {createProduct} from "@/lib/services/products/create";

const inter = Inter({subsets: ["latin"]});

export default function Dashboard() {
    const router = useRouter()
    const id = router.query.id;
    const form = useForm<z.infer<typeof productUpdateFormSchema>>({
        resolver: zodResolver(productUpdateFormSchema),

    })

    async function onSubmit(values: z.infer<typeof productCreateFormSchema>) {
        const res = await createProduct(values.name, values.price);
        if (res) {
            form.reset();
            router.push("/dashboard");
        }
    }


    return (
        <div className={`flex w-screen h-screen items-center justify-center ${inter.className}`}>
            <div className="flex min-h-screen items-center justify-center">
                <Card className="w-[1000px]">
                    <CardHeader>
                        <CardTitle>Product:</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Product Name:</FormLabel>
                                            <FormControl>
                                                <Input id="name" name="name" type="text"
                                                       {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>

                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Product Price:</FormLabel>
                                            <FormControl>
                                                <Input id="price" name="price" type="number"
                                                       {...field}
                                                       onChange={(e) => {
                                                           const value = parseFloat(e.target.value);
                                                           if (isNaN(value)) {
                                                               return;
                                                           }
                                                           field.onChange(value)
                                                       }}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>

                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>

                    </CardContent>
                    <CardFooter>
                        <Link href="/dashboard">Go Back >> </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}