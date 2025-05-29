import { Card, Text, Image } from '@mantine/core';
import {VendorsInterface} from "@/app/_types/interfaces";
import Link from "next/link";

export default function VendorCard({ vendor} : VendorsInterface) {
    return (
        <Card withBorder component={Link} href="/" className="w-full max-w-4xl mx-auto cursor-pointer p-4" radius="md">
            <div className="flex items-center gap-4">
                <div className="w-40 flex-shrink-0 flex items-center">
                    <Image src={vendor.image} alt={vendor.name} width={160} height={160} radius="md" fit="cover"/>
                </div>

                <div className="flex flex-col justify-center">
                    <Text fw={600} size="lg">{vendor.name}</Text>
                    <Text size="sm" className='text-gray-500'> Category: {vendor.category} </Text>
                    <Text size="sm" className='text-gray-500'> Location: {vendor.location} </Text>
                </div>
            </div>
        </Card>
    );
}

