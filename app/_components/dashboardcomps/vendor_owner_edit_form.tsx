'use client'
import React, { useState, useEffect } from 'react';
import {
    Button,
    Group,
    TextInput,
    Textarea,
    MultiSelect,
    Text,
    Divider,
    Box,
    Flex,
    Loader,
    Modal
} from '@mantine/core';
import { useForm, isNotEmpty, isEmail } from '@mantine/form';
import { MarketsInterface, VendorsInterface } from "@/app/_types/interfaces";
import { notifications } from '@mantine/notifications';
import marketsAPI from '@/app/_components/apicomps/marketsCRUD'; // Used to fetch the list of all markets
import vendorsAPI from '@/app/_components/apicomps/vendorsCRUD'; // Used for the update/delete operations
import { IconEdit, IconTrash } from '@tabler/icons-react';

interface VendorOwnerEditFormProps {
    initialVendor: VendorsInterface;
}

export default function VendorOwnerEditForm({ initialVendor }: VendorOwnerEditFormProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingMarkets, setLoadingMarkets] = useState(true);
    const [allMarketsForSelection, setAllMarketsForSelection] = useState<MarketsInterface[]>([]);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            ...initialVendor,
            // Convert the products array back to a comma-separated string for the input field
            products: initialVendor.products ? initialVendor.products.join(', ') : '',
        },
        validate: {
            name: isNotEmpty('Vendor Name is required'),
            category: isNotEmpty('Category is required'),
            location: isNotEmpty('Location is required'),
            image: (value) => (value && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value) ? 'Invalid URL for image link' : null),
            contact: (value) => {
                if (!value) return null;
                const phoneRegex = /^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
                if (!phoneRegex.test(value)) {
                    return 'Invalid phone number format (e.g., 123-456-7890 or +1 123-456-7890)';
                }
                return null;
            },
            email: (value) => (value && !isEmail(value) ? 'Invalid email' : null),
            website: (value) => (value && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value) ? 'Invalid URL for website' : null),
            description: isNotEmpty('Description is required'),
        },
    });

    // Effect to fetch all markets to populate the MultiSelect component
    useEffect(() => {
        const fetchMarkets = async () => {
            setLoadingMarkets(true);
            try {
                const marketsData = await marketsAPI.getMarkets();
                setAllMarketsForSelection(marketsData);
            } catch (err) {
                console.error('Failed to fetch markets:', err);
                notifications.show({
                    title: 'Error!',
                    message: 'Failed to load markets. Please try again.',
                    color: 'red',
                    autoClose: false,
                });
            } finally {
                setLoadingMarkets(false);
            }
        };
        fetchMarkets();
    }, []);

    const handleSubmit = async (values: typeof form.values) => {
        setIsSaving(true);

        const vendorData: Partial<VendorsInterface> = {
            id: initialVendor.id, // Ensure the ID is passed for the update
            name: values.name,
            category: values.category,
            location: values.location,
            image: values.image || '',
            contact: values.contact || '',
            email: values.email || '',
            website: values.website || '',
            // Convert comma-separated string to an array of trimmed strings
            products: values.products ? values.products.split(',').map(s => s.trim()).filter(Boolean) : [],
            description: values.description,
            markets: values.markets,
            uuid: values.uuid,
        };

        try {
            await vendorsAPI.updateVendor(initialVendor.id, vendorData as VendorsInterface);
            notifications.show({
                title: 'Success!',
                message: `Your vendor "${values.name}" has been updated.`,
                color: 'blue',
                autoClose: 5000,
            });
        } catch (error) {
            console.error('Error saving vendor:', error);
            notifications.show({
                title: 'Error!',
                message: `Failed to update your vendor: ${error instanceof Error ? error.message : 'Unknown error'}`,
                color: 'red',
                autoClose: false,
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteClick = async () => {
        setIsSaving(true);
        try {
            await vendorsAPI.deleteVendor(initialVendor.id);
            notifications.show({
                title: 'Deleted!',
                message: `Your vendor "${initialVendor.name}" deleted successfully.`,
                color: 'orange',
                autoClose: 5000,
            });
            // Redirect the user after successful deletion
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Error deleting vendor:', error);
            notifications.show({
                title: 'Error!',
                message: `Failed to delete your vendor: ${error instanceof Error ? error.message : 'Unknown error'}`,
                color: 'red',
                autoClose: false,
            });
        } finally {
            setIsSaving(false);
            setIsModalOpen(false); // Close the modal
        }
    };

    // Prepare data for the Mantine MultiSelect component (for markets)
    const marketMultiSelectData = allMarketsForSelection.map((market) => ({
        value: String(market.id),
        label: `${market.label} (ID: ${market.id})`,
    }));

    if (loadingMarkets) {
        return (
            <Flex justify="center" align="center" style={{ minHeight: '300px' }}>
                <Loader size="lg" />
                <Text ml="md">Loading markets...</Text>
            </Flex>
        );
    }

    return (
        <Box p="lg" style={{ maxWidth: '500px', margin: 'auto' }}>
            <Text size="lg" mb="sm" fw={700}>Edit Your Vendor</Text>
            <Divider my="xs" label={`Vendor: ${initialVendor.name}`} labelPosition="center" />
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    withAsterisk
                    label="Vendor Name"
                    placeholder="e.g., The Happy Bakery"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                    mb="md"
                    disabled={isSaving}
                />
                <TextInput
                    withAsterisk
                    label="Category"
                    placeholder="e.g., Produce, Crafts, Baked Goods"
                    key={form.key('category')}
                    {...form.getInputProps('category')}
                    mb="md"
                    disabled={isSaving}
                />
                <TextInput
                    withAsterisk
                    label="Location"
                    placeholder="e.g., Calgary, AB"
                    key={form.key('location')}
                    {...form.getInputProps('location')}
                    mb="md"
                    disabled={isSaving}
                />
                <TextInput
                    label="Image Link (URL)"
                    placeholder="e.g., https://example.com/images/vendor.jpg"
                    key={form.key('image')}
                    {...form.getInputProps('image')}
                    mb="md"
                    disabled={isSaving}
                />
                <TextInput
                    label="Phone Number"
                    placeholder="e.g., 123-456-7890"
                    key={form.key('contact')}
                    {...form.getInputProps('contact')}
                    mb="md"
                    disabled={isSaving}
                />
                <TextInput
                    label="Email"
                    placeholder="e.g., info@vendor.com"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                    mb="md"
                    disabled={isSaving}
                />
                <TextInput
                    label="Website Link (URL)"
                    placeholder="e.g., https://thehappybakery.com"
                    key={form.key('website')}
                    {...form.getInputProps('website')}
                    mb="md"
                    disabled={isSaving}
                />
                <TextInput
                    label="Products (comma-separated)"
                    placeholder="e.g., Apples, Carrots, Honey"
                    key={form.key('products')}
                    {...form.getInputProps('products')}
                    mb="md"
                    disabled={isSaving}
                />
                <Textarea
                    withAsterisk
                    label="Description"
                    placeholder="Detailed description about the vendor and their offerings..."
                    key={form.key('description')}
                    {...form.getInputProps('description')}
                    rows={5}
                    mb="md"
                    disabled={isSaving}
                />
                <MultiSelect
                    withAsterisk
                    label="Markets Vendor Is At"
                    placeholder="Select markets"
                    data={marketMultiSelectData}
                    value={form.values.markets?.map(String)} // Use optional chaining and map
                    onChange={(values) => form.setFieldValue('markets', values.map(Number))}
                    searchable
                    clearable
                    mb="md"
                    w="100%"
                    disabled={isSaving}
                />
                <Group justify="flex-end" mt="xl">
                    <Button variant="outline" onClick={() => form.reset()} disabled={isSaving}>
                        Reset
                    </Button>
                    <Button
                        variant="filled"
                        color="red"
                        onClick={() => setIsModalOpen(true)}
                        leftSection={<IconTrash size={16} />}
                        disabled={isSaving}
                    >
                        Delete Vendor
                    </Button>
                    <Button type="submit" leftSection={<IconEdit size={16} />} disabled={isSaving}>
                        Update Vendor
                    </Button>
                </Group>
            </form>

            {/* Modal for delete confirmation */}
            <Modal
                opened={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Confirm Deletion"
                centered
            >
                <Text>
                    Are you sure you want to delete your vendor "{initialVendor.name}"?
                    This action cannot be undone.
                </Text>
                <Group justify="flex-end" mt="md">
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button color="red" onClick={handleDeleteClick}>
                        Delete
                    </Button>
                </Group>
            </Modal>
        </Box>
    );
}
