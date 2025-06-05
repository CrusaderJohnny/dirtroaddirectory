'use client';

import {useSearchParams} from 'next/navigation';
import {Container, Grid, Title, Space, Divider, Text, Image, Button, AppShell} from '@mantine/core';
import vendorList from '@/app/_components/vendorcomps/vendordata';
import VendorCard from '@/app/_components/vendorcomps/vendorcard';
import NavMT from "@/app/_components/navcomps/navmt";

export default function VendorsPage() {
    const searchParams = useSearchParams();
    const vendorIdParam = searchParams.get('vendorId');
    const selectedVendor = vendorList.find((v) => v.id === Number(vendorIdParam));

    if (selectedVendor) {
        return (
            <AppShell>
                <AppShell.Header
                    component={NavMT}/>
                <AppShell.Main>
                    <Container size="lg">
                        <Image src={selectedVendor.image} alt={selectedVendor.name} height={300} radius="md"/>

                        <Title order={1} className="text-green-700" ta="center">{selectedVendor.name}</Title>

                        <Divider my="md"/>

                        <Text ta="center" fw={700} size="lg" c="green">{selectedVendor.category}</Text>

                        <Space h="md"/>

                        <Text><strong>Location:</strong> {selectedVendor.location}</Text>

                        <Text><strong>Contact:</strong> {selectedVendor.contact || 'N/A'}</Text>

                        <Text><strong>Markets:</strong> {selectedVendor.markets?.join(', ') || 'N/A'}</Text>

                        <Text
                            mt="md"><strong>Description:</strong> {selectedVendor.description || 'No description available'}
                        </Text>

                        <Space h="xl"/>

                        <Button component="a" href="/vendors" variant="light">Back to all vendors</Button>
                    </Container>
                </AppShell.Main>
            </AppShell>
        );
    }

    return (
        <AppShell
        >
            <AppShell.Header component={NavMT}/>
            <AppShell.Main>
                <Container size="xl" py="xl">
                    <Title order={1} className="text-3xl font-bold mb-6 text-center">Our Vendors</Title>
                    <Grid gutter="xl">
                        {vendorList.map((vendor) => (
                            <Grid.Col span={{base: 12, sm: 6, md: 4}} key={vendor.id}>
                                <VendorCard vendor={vendor}/>
                            </Grid.Col>
                        ))}
                    </Grid>
                </Container>
            </AppShell.Main>
        </AppShell>

    );
}
