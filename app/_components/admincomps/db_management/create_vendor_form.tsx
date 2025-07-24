'use client'
import React, { useState, useEffect, useMemo } from 'react';
import {
    Button,
    Group,
    TextInput,
    Textarea,
    Select,
    MultiSelect,
    Text,
    Divider,
    Box,
    Flex,
    Loader
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { isNotEmpty, isEmail } from '@mantine/form';
import { MarketsInterface, VendorsInterface } from "@/app/_types/interfaces"; // Import both interfaces
import { notifications } from '@mantine/notifications';
import marketsAPI from '@/app/_components/apicomps/marketsCRUD'; // Import marketsAPI to fetch market list
import vendorsAPI from '@/app/_components/apicomps/vendorsCRUD'; // Import vendorsAPI for CRUD operations
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';

export default function CreateVendorForm() {
    const [allVendors, setAllVendors] = useState<VendorsInterface[]>([]);
    const [allMarketsForSelection, setAllMarketsForSelection] = useState<MarketsInterface[]>([]); // To populate MultiSelect
    const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); // Loading state for initial fetch
    const [isSaving, setIsSaving] = useState(false); // State for save/delete operations

    const vendorToEdit = useMemo(() => {
        return allVendors.find((v) => v.id === Number(selectedVendorId));
    }, [allVendors, selectedVendorId]);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            category: '',
            location: '',
            image: '',
            contact: '',
            email: '',
            website: '',
            products: '', // Will be a comma-separated string in the input
            description: '',
            markets: [] as number[], // Array of market IDs
        },
        validate: {
            name: isNotEmpty('Vendor Name is required'),
            category: isNotEmpty('Category is required'),
            location: isNotEmpty('Location is required'),
            image: (value) => (value && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value) ? 'Invalid URL for image link' : null),
            contact: (value) => {
                if (!value) { // It's optional, so no error if empty
                    return null;
                }
                // Flexible regex for North American phone numbers (e.g., 123-456-7890, (123) 456-7890, +1 123-456-7890)
                const phoneRegex = /^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
                if (!phoneRegex.test(value)) {
                    return 'Invalid phone number format (e.g., 123-456-7890 or +1 123-456-7890)';
                }
                return null;
            },
            email: (value) => (value && !isEmail(value) ? 'Invalid email' : null),
            website: (value) => (value && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value) ? 'Invalid URL for website' : null),
            description: isNotEmpty('Description is required'),
            // 'markets' doesn't need isNotEmpty directly if MultiSelect handles 0 items correctly
        },
    });

    // Function to fetch all vendors and all markets
    const fetchVendorsAndMarkets = async () => {
        setLoading(true);
        try {
            const [vendorsData, marketsData] = await Promise.all([
                vendorsAPI.getVendors(),
                marketsAPI.getMarkets()
            ]);
            setAllVendors(vendorsData);
            setAllMarketsForSelection(marketsData);
        } catch (err) {
            console.error('Failed to fetch data:', err);
            notifications.show({
                title: 'Error!',
                message: 'Failed to load vendors or markets. Please try again.',
                color: 'red',
                autoClose: false,
            });
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch all data on component mount
    useEffect(() => {
        fetchVendorsAndMarkets();
    }, []);

    // Effect to populate form when selectedVendorId changes
    useEffect(() => {
        if (vendorToEdit) {
            form.setValues({
                name: vendorToEdit.name || '',
                category: vendorToEdit.category || '',
                location: vendorToEdit.location || '',
                image: vendorToEdit.image || '',
                contact: vendorToEdit.contact || '',
                email: vendorToEdit.email || '',
                website: vendorToEdit.website || '',
                products: vendorToEdit.products ? vendorToEdit.products.join(', ') : '', // Join array to string for input
                description: vendorToEdit.description || '',
                markets: vendorToEdit.markets || [], // Set selected markets
            });
        } else {
            form.reset(); // Reset form if no vendor is selected (e.g., for new creation)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vendorToEdit]); // Depend on vendorToEdit

    const handleSubmit = async (values: typeof form.values) => {
        setIsSaving(true);

        const vendorData: Omit<VendorsInterface, 'id'> = {
            name: values.name,
            category: values.category,
            location: values.location,
            image: values.image || '',
            contact: values.contact || '',
            email: values.email || '',
            website: values.website || '',
            products: values.products ? values.products.split(',').map(s => s.trim()).filter(Boolean) : [], // Split string to array
            description: values.description,
            markets: values.markets, // This is already number[]
        };

        try {
            if (vendorToEdit && vendorToEdit.id) {
                // UPDATE existing vendor
                const updatedVendor = await vendorsAPI.updateVendor(vendorToEdit.id, { id: vendorToEdit.id, ...vendorData } as VendorsInterface);
                notifications.show({
                    title: 'Success!',
                    message: `Vendor "${updatedVendor.name}" updated successfully!`,
                    color: 'blue',
                    autoClose: 5000,
                });
            } else {
                // CREATE new vendor
                const newVendor = await vendorsAPI.createVendor(vendorData);
                notifications.show({
                    title: 'Success!',
                    message: `Vendor "${newVendor.name}" created successfully! ID: ${newVendor.id}`,
                    color: 'teal',
                    autoClose: 5000,
                });
            }
            form.reset(); // Clear the form after successful submission
            setSelectedVendorId(null); // Clear selection after save
            await fetchVendorsAndMarkets(); // Re-fetch all data to update dropdowns
        } catch (error) {
            console.error('Error saving vendor:', error);
            notifications.show({
                title: 'Error!',
                message: `Failed to save vendor: ${error instanceof Error ? error.message : 'Unknown error'}`,
                color: 'red',
                autoClose: false,
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteClick = async () => {
        if (vendorToEdit && vendorToEdit.id) {
            if (window.confirm(`Are you sure you want to delete "${vendorToEdit.name}"? This action cannot be undone.`)) {
                setIsSaving(true);
                try {
                    await vendorsAPI.deleteVendor(vendorToEdit.id);
                    notifications.show({
                        title: 'Deleted!',
                        message: `Vendor "${vendorToEdit.name}" deleted successfully.`,
                        color: 'orange',
                        autoClose: 5000,
                    });
                    form.reset(); // Clear form
                    setSelectedVendorId(null); // Clear selection
                    await fetchVendorsAndMarkets(); // Re-fetch all data to update dropdowns
                } catch (error) {
                    console.error('Error deleting vendor:', error);
                    notifications.show({
                        title: 'Error!',
                        message: `Failed to delete vendor: ${error instanceof Error ? error.message : 'Unknown error'}`,
                        color: 'red',
                        autoClose: false,
                    });
                } finally {
                    setIsSaving(false);
                }
            }
        }
    };

    const handleCancel = () => {
        form.reset();
        setSelectedVendorId(null); // Clear selection and reset to "create new" mode
        notifications.show({
            title: 'Cancelled',
            message: 'Form has been reset.',
            color: 'gray',
            autoClose: 3000,
        });
    };

    const handleCreateNewClick = () => {
        setSelectedVendorId(null); // Set to null to switch to create mode
        form.reset(); // Reset form values
        notifications.show({
            title: 'New Vendor Mode',
            message: 'Form is ready to create a new vendor.',
            color: 'blue',
            autoClose: 3000,
        });
    };

    // Prepare data for the Mantine Select component (for vendors)
    const vendorSelectData = allVendors.map((vendor) => ({
        value: String(vendor.id),
        label: `${vendor.name} (ID: ${vendor.id})`,
    }));

    // Prepare data for the Mantine MultiSelect component (for markets)
    const marketMultiSelectData = allMarketsForSelection.map((market) => ({
        value: String(market.id),
        label: `${market.label} (ID: ${market.id})`,
    }));

    if (loading) {
        return (
            <Flex justify="center" align="center" style={{ minHeight: '300px' }}>
                <Loader size="lg" />
                <Text ml="md">Loading vendors and markets...</Text>
            </Flex>
        );
    }

    return (
        <Box
            mb="5rem"
            p="lg"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                maxWidth: '500px',
                width: '100%',
                margin: 'auto',
                backdropFilter: 'blur(5px)'
            }}
        >
            <Text size="lg" mb="sm" fw={700}>Vendor Management</Text>
            <Text c="dimmed" mb="md">Select an existing vendor to edit/delete, or create a new one.</Text>

            <Group grow mb="md">
                <Select
                    placeholder="Select an existing vendor"
                    searchable
                    clearable
                    data={vendorSelectData}
                    value={selectedVendorId}
                    onChange={setSelectedVendorId}
                    disabled={isSaving}
                />
                <Button
                    onClick={handleCreateNewClick}
                    leftSection={<IconPlus size={16} />}
                    variant="outline"
                    disabled={isSaving}
                >
                    Create New Vendor
                </Button>
            </Group>

            <Divider my="xs" label={vendorToEdit ? "Edit Existing Vendor" : "Create New Vendor"} labelPosition="center" />

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    withAsterisk
                    label="Vendor Name"
                    placeholder=""
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
                    placeholder=""
                    key={form.key('location')}
                    {...form.getInputProps('location')}
                    mb="md"
                    disabled={isSaving}
                />

                <TextInput
                    label="Image Link (URL)"
                    placeholder=""
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
                    placeholder=""
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
                    value={form.values.markets.map(String)} // Convert number[] to string[] for MultiSelect
                    onChange={(values) => form.setFieldValue('markets', values.map(Number))} // Convert string[] back to number[]
                    searchable
                    clearable
                    mb="md"
                    w="100%"
                    disabled={isSaving}
                />

                <Group justify="flex-end" mt="xl">
                    <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                        Cancel / Clear Form
                    </Button>
                    {vendorToEdit && vendorToEdit.id && (
                        <Button
                            variant="filled"
                            color="red"
                            onClick={handleDeleteClick}
                            leftSection={<IconTrash size={16} />}
                            disabled={isSaving}
                        >
                            Delete Vendor
                        </Button>
                    )}
                    <Button type="submit" leftSection={vendorToEdit ? <IconEdit size={16} /> : <IconPlus size={16} />} disabled={isSaving}>
                        {vendorToEdit ? 'Update Vendor' : 'Create Vendor'}
                    </Button>
                </Group>
            </form>
        </Box>
    );
}