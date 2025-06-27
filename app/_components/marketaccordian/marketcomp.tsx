"use client"
import {
    Group,
    Avatar,
    Text,
    Accordion,
    AccordionItem,
    AccordionControl,
    AccordionPanel,
    Button,
    Flex,
} from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import {MarketsInterface} from "@/app/_types/interfaces";
import { fetchMarketsAsJson } from "../apicomps/marketfetch";

// All information taken from respective websites for each individual farmers market. Pictures taken from their websites.
// Image URL was copied as well as description and content was taken from the websites for each respective market





// Displays the information before the accordion is opened
function AccordionLabel({ label, image, description } : MarketsInterface) {
    return (
        <Group wrap="nowrap">
            <Avatar src={image} radius="xl" size="lg" />
            <div>
                <Text>{label}</Text>
                <Text size="sm" c="dimmed" fw={400}>
                    {description}
                </Text>
            </div>
        </Group>
    );

}

// Define props for MarketAccordion()
interface MarketAccordionProps {
    defaultOpenItemId?: number | null; // ? allows the prompt to be optional
}

//displays the accordion information. essentially a read more pop out
export default function MarketAccordion({defaultOpenItemId}: MarketAccordionProps) {
    const [activeItem, setActiveItem] = useState<number | null>(defaultOpenItemId ?? null); // if defaultOpenItemId is null or undefined set to null
    const [markets, setMarkets] = useState<MarketsInterface[]>([]); // State to store fetched markets
    const [loading, setLoading] = useState<boolean>(true); // State for loading indicator
    const [error, setError] = useState<string | null>(null); // State for error messages

    // rerender the component when changing the value of "defaultOpenItemId"
    useEffect(() => {
        setActiveItem(defaultOpenItemId ?? null);
    }, [defaultOpenItemId]);


    // Effect to fetch market data when the component mounts
    useEffect(() => {
        const loadMarkets = async () => {
            setLoading(true); // Start loading
            setError(null); // Clear any previous errors
            try {
                const fetchedData = await fetchMarketsAsJson(); // Call the async function
                setMarkets(fetchedData); // Set the fetched data to state
            } catch (err) {
                console.error("Failed to load markets:", err);
                setError(err instanceof Error ? err.message : "Failed to load market data."); // Set error message
            } finally {
                setLoading(false); // End loading
            }
        };

        loadMarkets(); // Execute the fetch
    }, []); // Empty dependency array means this runs once on mount

    // Conditional rendering based on loading/error state
    if (loading) {
        return <Text>Loading markets...</Text>;
    }

    if (error) {
        return <Text c="red">Error: {error}</Text>;
    }

    if (markets.length === 0) {
        return <Text>No markets found.</Text>;
    }

    const handleAccordionChange = (value: string | null) => {
        // convert the string value back to a number, or null if it's null
        const numericValue = value !== null ? parseInt(value, 10) : null;
        setActiveItem(numericValue);
    };

    const items = markets.map((item) => (
        <AccordionItem value={String(item.id)} key={item.label}>
            <AccordionControl>
                <AccordionLabel {...item} />
            </AccordionControl>
            <AccordionPanel>
                <Text size="sm">{item.content}</Text>
                <Flex justify="flex-end">
                    <Button component={Link} target="_blank" href={item.link}>
                        Directions
                    </Button>
                </Flex>
            </AccordionPanel>
        </AccordionItem>
    ));
    return (
            <Accordion chevronPosition="right" variant="contained"
            value={String(activeItem)} // Control the active item
            onChange={handleAccordionChange} // Update the active item when a user clicks
            // FIX BUG HERE ------ closing the item doesn't set active to null
            >
                {items}
            </Accordion>
    );
}