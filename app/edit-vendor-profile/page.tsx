'use client';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from 'react';
import NavMT from "@/app/_components/navcomps/navmt";
import {
    AppShell,
    AppShellHeader,
    AppShellMain,
    Title,
    Container,
    Center,
    Text,
    Loader,
    Paper
} from '@mantine/core';

import vendorsAPI from '../_components/apicomps/vendorsCRUD';


import VendorOwnerEditForm from '../_components/dashboardcomps/vendor_owner_edit_form';
import { VendorsInterface } from '@/app/_types/interfaces';


export default function EditVendorProfilePage() {
    const [vendorData, setVendorData] = useState<VendorsInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { isLoaded, isSignedIn, user } = useUser();

    // Use the Clerk user's ID as the UUID to fetch the vendor
    const UUID = user?.id;

    useEffect(() => {
        if (isLoaded && isSignedIn && UUID) {
            // If Clerk is loaded but the user is not signed in, stop loading and clear data.
            const fetchVendor = async () => {
                setLoading(true);
                setError(null);
                try {
                    const data = await vendorsAPI.getVendorByUuid(UUID);
                    setVendorData(data);
                } catch (err) {
                    console.error("Error fetching vendor by UUID:", err);
                    setError(err instanceof Error ? err.message : 'An unknown error occurred.');
                } finally {
                    setLoading(false);
                }
            };
            fetchVendor();
        } else if (isLoaded && !isSignedIn) {
            setLoading(false);
            setVendorData(null);
            setError("Please sign in to view vendor data.");
        } else {
            // This handles the initial render before Clerk fully loads
            setLoading(true);
            setVendorData(null);
            setError(null);
        }
    }, [isLoaded, isSignedIn, UUID]);

    if (!isLoaded || !isSignedIn) {
        return null; // Handle loading or not signed in state
    }

    return (
        <AppShell>
            <AppShellHeader>
                <NavMT />
            </AppShellHeader>
            <AppShellMain style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Container size="lg" py="xl">
                    <Title ta="center" order={2} mb="lg">
                        Edit Vendor Profile
                    </Title>
                    <Center>
                        <Paper shadow="xs" p="lg" withBorder style={{ width: '100%', maxWidth: '800px' }}>
                            {loading && <Loader />}
                            {error && <Text color="red">Error: {error}</Text>}
                            {vendorData && (
                                // COMPONENT AND PROP CHANGED TO VENDOR VERSIONS
                                <VendorOwnerEditForm initialVendor={vendorData} />
                            )}
                            {!loading && !vendorData && !error && (
                                <Text>No vendor found for the provided UUID.</Text>
                            )}
                        </Paper>
                    </Center>
                </Container>
            </AppShellMain>
        </AppShell>
    );
}
