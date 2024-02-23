import {Inter} from "next/font/google";
import {useContext, useEffect, useState} from "react";
import {useRouter} from 'next/router'
import {getProduct} from "@/lib/services/products/get";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Separator} from "@radix-ui/react-separator";
import Link from "next/link";

const inter = Inter({subsets: ["latin"]});

export default function ViewProduct() {
    const router = useRouter()
    const id = router.query.id;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (!id) return;
        getProduct(id).then((res) => {
            setProduct(res)
        })
    }, [id]);

    return (
        <div className={`flex w-screen h-screen items-center justify-center ${inter.className}`}>
            <div className="flex min-h-screen items-center justify-center">
                <Card className="w-[1000px]">
                    <CardHeader>
                        <CardTitle>Product Info: {product?.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>ID: {product?.id}</p>
                        <p>Name: {product?.name}</p>
                        <p>Price: {product?.price}</p>
                        <p>Created At: {product?.createdAt}</p>
                        <p>Updated At: {product?.updatedAt}</p>
                    </CardContent>
                    <CardFooter>
                        <Link href="/dashboard">Go Back &gt;&gt; </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
);
}