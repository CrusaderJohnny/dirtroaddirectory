'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { Button, Group, TextInput, Textarea, NumberInput, Select, Text, Divider, Box, Flex, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import { isNotEmpty } from '@mantine/form';
import {MarketsInterface} from "@/app/_types/interfaces";
import { postMarket } from '@/app/_components/apicomps/marketpost';
import { notifications } from '@mantine/notifications';
import marketsAPI from '@/app/_components/apicomps/marketsCRUD';
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';

// Define props for the form component
interface CreateMarketFormProps {
    onSubmissionSuccess: () => void; // Callback to notify parent component that a market was successfully posted
    onCancel: () => void; // Callback for when the user cancels
}

export default function CreateMarketForm() {
    const [allMarkets, setAllMarkets] = useState<MarketsInterface[]>([]);
    const [selectedMarketId, setSelectedMarketId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); // Loading state for initial fetch
    const [isSaving, setIsSaving] = useState(false); // State for save/delete operations

    const marketToEdit = useMemo(() => {
        return allMarkets.find((m) => m.id === Number(selectedMarketId));
    }, [allMarkets, selectedMarketId]);

    const [editingMarket, setEditingMarket] = useState<MarketsInterface | undefined>(undefined);

    const form = useForm({
        mode: 'uncontrolled', // 'uncontrolled' is good for simple forms or when integrating with external state
        initialValues: {
        image: '',
        label: '',
        description: '',
        link: '',
        lat: 0.0,
        lng: 0.0,
        },

        // Define validation rules for each field
        validate: {
        image: (value) => (value && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value) ? 'Invalid URL for website link' : null), // Optional URL validation for image link
        label: isNotEmpty('Market Name is required'), // Label cannot be empty
        link: (value) => (value && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value) ? 'Invalid URL for website link' : null), // Optional URL validation for link
            lat: (value) => {
                if (value === null || value === undefined) {
                    return 'Latitude is required'; // Catches cases where NumberInput might return null/undefined
                }
                if (typeof value !== 'number' || isNaN(value)) {
                    return 'Latitude must be a number';
                }
                if (value < -90 || value > 90) {
                    return 'Latitude must be between -90 and 90';
                }
                return null;
            },
            lng: (value) => {
                if (value === null || value === undefined) {
                    return 'Longitude is required'; // Catches cases where NumberInput might return null/undefined
                }
                if (typeof value !== 'number' || isNaN(value)) {
                    return 'Longitude must be a number';
                }
                if (value < -180 || value > 180) {
                    return 'Longitude must be between -180 and 180';
                }
                return null;
            },
        },
    });

    // Function to fetch all markets ---------------------------------------------------
    const fetchAllMarkets = async () => {
        setLoading(true);
        try {
            const data = await marketsAPI.getMarkets();
            setAllMarkets(data);
        } catch (err) {
            console.error('Failed to fetch markets:', err);
            notifications.show({
                title: 'Error!',
                message: 'Failed to load markets for selection. Please try again.',
                color: 'red',
                autoClose: false,
            });
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch all markets on component mount ---------------------------------------------------
    useEffect(() => {
        fetchAllMarkets();
    }, []);


    // Effect to populate form when selectedMarketId changes ---------------------------------------------------
    useEffect(() => {
        if (marketToEdit) {
            form.setValues({
                image: marketToEdit.image || '',
                label: marketToEdit.label || '',
                description: marketToEdit.description || '',
                link: marketToEdit.link || '',
                lat: marketToEdit.lat !== null ? Number(marketToEdit.lat) : 0.0,
                lng: marketToEdit.lng !== null ? Number(marketToEdit.lng) : 0.0,
            });
        } else {
            form.reset(); // Reset form if no market is selected (e.g., for new creation)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [marketToEdit]); // Depend on marketToEdit



    // Handle form submit ---------------------------------------------------
    const handleSubmit = async (values: typeof form.values) => {

        setIsSaving(true);
        const marketData: Omit<MarketsInterface, 'id'> = {
            ...values,
            lat: values.lat as number,
            lng: values.lng as number,
            description: values.description || '',
            link: values.link || '',
            image: values.image || '',
        };

        try {
            if (marketToEdit && marketToEdit.id) {
                // UPDATE existing market
                const updatedMarket = await marketsAPI.updateMarket(marketToEdit.id, { id: marketToEdit.id, ...marketData } as MarketsInterface);
                notifications.show({
                    title: 'Success!',
                    message: `Market "${updatedMarket.label}" updated successfully!`,
                    color: 'blue',
                    autoClose: 5000,
                });
            } else {
                // CREATE new market
                const newMarket = await marketsAPI.createMarket(marketData);
                notifications.show({
                    title: 'Success!',
                    message: `Market "${newMarket.label}" created successfully! ID: ${newMarket.id}`,
                    color: 'teal',
                    autoClose: 5000,
                });
            }
            form.reset(); // Clear the form after successful submission
            setSelectedMarketId(null); // Clear selection after save
            await fetchAllMarkets(); // Re-fetch all markets to update the dropdown and list
        } catch (error) {
            console.error('Error saving market:', error);
            notifications.show({
                title: 'Error!',
                message: `Failed to save market: ${error instanceof Error ? error.message : 'Unknown error'}`,
                color: 'red',
                autoClose: false,
            });
        } finally {
            setIsSaving(false);
        }
    };

    // Handle Delete ---------------------------------------------------
    const handleDeleteClick = async () => {
        if (marketToEdit && marketToEdit.id) {
            if (window.confirm(`Are you sure you want to delete "${marketToEdit.label}"? This action cannot be undone.`)) {
                setIsSaving(true);
                try {
                    await marketsAPI.deleteMarket(marketToEdit.id);
                    notifications.show({
                        title: 'Deleted!',
                        message: `Market "${marketToEdit.label}" deleted successfully.`,
                        color: 'orange',
                        autoClose: 5000,
                    });
                    form.reset(); // Clear form
                    setSelectedMarketId(null); // Clear selection
                    await fetchAllMarkets(); // Re-fetch all markets to update the dropdown and list
                } catch (error) {
                    console.error('Error deleting market:', error);
                    notifications.show({
                        title: 'Error!',
                        message: `Failed to delete market: ${error instanceof Error ? error.message : 'Unknown error'}`,
                        color: 'red',
                        autoClose: false,
                    });
                } finally {
                    setIsSaving(false);
                }
            }
        }
    };

    // Handle Cancel ---------------------------------------------------
    const handleCancel = () => {
        form.reset();
        setSelectedMarketId(null); // Clear selection and reset to "create new" mode
        notifications.show({
            title: 'Cancelled',
            message: 'Form has been reset.',
            color: 'gray',
            autoClose: 3000,
        });
    };


    const handleCreateNewClick = () => {
        setSelectedMarketId(null); // Set to null to switch to create mode
        form.reset(); // Reset form values
        notifications.show({
            title: 'New Market Mode',
            message: 'Form is ready to create a new market.',
            color: 'blue',
            autoClose: 3000,
        });
    };


    // Prepare data for the Mantine Select component
    const selectData = allMarkets.map((market) => ({
        value: String(market.id),
        label: `${market.label} (ID: ${market.id})`, // Include ID for clarity
    }));

    const handleSave = () => {

    }

    if (loading) {
        return (
            <Flex justify="center" align="center" style={{ minHeight: '300px' }}>
                <Loader size="lg" />
                <Text ml="md">Loading markets...</Text>
            </Flex>
        );
    }


    return (
        <Box p="lg"
        style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // White with 80% opacity
            borderRadius: '8px', // Rounded corners
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
            maxWidth: '800px', // Max width for better form readability
            margin: 'auto', // Center the box on the page
            backdropFilter: 'blur(5px)' // Optional: Adds a blur effect to content behind the box
        }}>
            <Text size="lg" mb="sm" fw={700}>Market Management</Text>
                <Text c="dimmed" mb="md">Select an existing market to edit/delete, or create a new one.</Text>

                <Group grow mb="md">
                    <Select
                        placeholder="Select an existing market"
                        searchable
                        clearable
                        data={selectData}
                        value={selectedMarketId}
                        onChange={setSelectedMarketId} // Directly update selectedMarketId
                        disabled={isSaving}
                    />
                    <Button
                        onClick={handleCreateNewClick}
                        leftSection={<IconPlus size={16} />}
                        variant="outline"
                        disabled={isSaving}
                    >
                        Create New Market
                    </Button>
                </Group>

            <Divider my="xs" label={marketToEdit ? "Edit Existing Market" : "Create New Market"} labelPosition="center" />


            <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                withAsterisk
                label="Market Name"
                placeholder=""
                key={form.key('label')}
                {...form.getInputProps('label')}
                mb="md" // Margin bottom
            />

            <TextInput
                withAsterisk
                label="Image Link (URL)"
                placeholder=""
                key={form.key('image')}
                {...form.getInputProps('image')}
                mb="md"
            />

            <Textarea
                label="Content"
                placeholder="Detailed description about the market..."
                key={form.key('description')}
                {...form.getInputProps('description')}
                rows={5}
                mb="md"
            />

            <TextInput
                label="Website Link (URL)"
                placeholder=""
                key={form.key('link')}
                {...form.getInputProps('link')}
                mb="md"
            />

            <Group grow mb="md"> {/* Group for lat/lng to be side-by-side */}
                <NumberInput
                withAsterisk
                label="Latitude"
                placeholder="e.g., 51.0447"
                key={form.key('lat')}
                {...form.getInputProps('lat')}
                decimalScale={6}
                />
                <NumberInput
                withAsterisk
                label="Longitude"
                placeholder="e.g., -114.0719"
                key={form.key('lng')}
                {...form.getInputProps('lng')}
                decimalScale={6}
                />
            </Group>


            <Group justify="flex-end" mt="xl"> {/* Increased margin for buttons */}
                <Button variant="outline" onClick={handleCancel} disabled={isSaving}>Cancel</Button>
                {marketToEdit && marketToEdit.id && (
                    <Button
                        variant="filled"
                        color="red"
                        onClick={handleDeleteClick}
                        leftSection={<IconTrash size={16} />}
                        disabled={isSaving}
                    >
                        Delete Market
                    </Button>
                )}
                <Button type="submit" leftSection={marketToEdit ? <IconEdit size={16} /> : <IconPlus size={16} />} disabled={isSaving}>
                    {marketToEdit ? 'Update Market' : 'Create Market'}
                </Button>
            </Group>
            </form>
        </Box>
    );
}