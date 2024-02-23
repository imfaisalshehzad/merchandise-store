import {Inter} from "next/font/google";
import {useContext, useEffect, useState} from "react";
import {useRouter} from 'next/router'
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {listProducts} from "@/lib/services/products/list";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {deleteProduct} from "@/lib/services/products/delete";

const inter = Inter({subsets: ["latin"]});

export default function Dashboard() {
    const router = useRouter()


    const [products, setProducts] = useState([]);

    useEffect(() => {
        listProducts().then((res) => {
            setProducts(res)
        })
    }, []);

    const deleteProductBtn = (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure you want to delete this product?")) {
            deleteProduct(id).then(() => {
                setProducts(products.filter((product) => product.id !== id))
            })
        }
    }


    return (
        <div className={`flex w-screen h-screen items-center justify-center ${inter.className}`}>
            <div className="flex flex-col min-h-screen items-center justify-center w-[1000px]">
                <div className="flex justify-between w-full mb-5">
                    <h1 className="text-4xl font-bold">
                        Products
                    </h1>
                    <Button asChild><Link href={"/products"}>Create +</Link></Button>
                </div>
                <Table>
                    <TableCaption>A list of your products.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell className="text-right">
                                    <button className="text-blue-500 mr-2" onClick={() => {
                                        router.push(`/products/view/${product.id}`)
                                    }}>View
                                    </button>
                                    <button className="text-blue-500 mr-2" onClick={() => {
                                        router.push(`/products/edit/${product.id}`)
                                    }}>Edit
                                    </button>
                                    <button className="text-red-500" onClick={(e) => {
                                        e.preventDefault();
                                        deleteProductBtn(product.id)
                                    }}>Delete
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>


            </div>
        </div>
    );
}