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
import { useEffect, useState, useRef } from "react";
import {MarketsInterface} from "@/app/_types/interfaces";

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
    onCardSelect?: (node: HTMLElement | null, marketId: number | null) => void; // New prop for sending ref to parent
}

//displays the accordion information. essentially a read more pop out
export default function MarketAccordion({defaultOpenItemId,onCardSelect}: MarketAccordionProps) {
    const [activeItem, setActiveItem] = useState<number | null>(defaultOpenItemId ?? null); // if defaultOpenItemId is null or undefined set to null
    const [markets, setMarkets] = useState<MarketsInterface[]>([]); // State to store fetched markets
    const [loading, setLoading] = useState<boolean>(true); // State for loading indicator
    const [error, setError] = useState<string | null>(null); // State for error messages

    // Ref to store a map of item IDs to their respective HTML elements
    const itemRefs = useRef<Map<number, HTMLElement>>(new Map());

    // Function to set the ref for a specific item
    const setItemRef = (id: number, node: HTMLElement | null) => {
        if (node) {
            itemRefs.current.set(id, node);
        } else {
            itemRefs.current.delete(id);
        }
    };

    // rerender the component when changing the value of "defaultOpenItemId"
    useEffect(() => {
        setActiveItem(defaultOpenItemId ?? null);

        // If a defaultOpenItemId is provided and the onCardSelect callback exists,
        // attempt to get the ref and call the callback.
        if (defaultOpenItemId !== null && defaultOpenItemId !== undefined && onCardSelect) {
            // We need to wait for the next tick for the itemRefs to be populated
            // after the AccordionItems have rendered.
            // A common pattern is to use setTimeout with 0 delay for this.
            // However, a more robust solution in this context might be to
            // ensure the AccordionItems are rendered before this effect tries to access them.
            // For initial load, the `markets` data needs to be present first.
            // Let's assume `markets` is already loaded when `defaultOpenItemId` might change
            // or we handle the initial load within the fetch effect if defaultOpenItemId is present from start.

            // To ensure the ref is available, this part often requires careful timing.
            // For simplicity and assuming AccordionItems are already rendered if defaultOpenItemId is set,
            // we can try to access it directly. If not, a setTimeout(..., 0) might be needed,
            // or triggering this after `markets` is set.
            const node = itemRefs.current.get(defaultOpenItemId) || null;
            if (node) {
                onCardSelect(node, defaultOpenItemId);
            } else {
                // If the node isn't immediately available (e.g., due to initial render order),
                // you might need a more sophisticated approach, like a separate effect
                // that runs when `markets` is loaded and `defaultOpenItemId` is set.
                // For now, if the node isn't found, we'll try to find it after a short delay.
                // This is a common workaround for rendering timing issues.
                const timeoutId = setTimeout(() => {
                    const delayedNode = itemRefs.current.get(defaultOpenItemId) || null;
                    if (delayedNode) {
                        onCardSelect(delayedNode, defaultOpenItemId);
                    }
                }, 0); // Short delay to allow DOM to update

                return () => clearTimeout(timeoutId); // Cleanup timeout
            }
        } else if (defaultOpenItemId === null && onCardSelect) {
            // If defaultOpenItemId becomes null, also signal that no card is selected
            onCardSelect(null, null);
        }
    }, [defaultOpenItemId, onCardSelect, markets]);


    // Effect to fetch market data when the component mounts
    useEffect(() => {
        const loadMarkets = async () => {
            setLoading(true); // Start loading
            setError(null); // Clear any previous errors
            try {
                const response = await fetch(`/api/markets/`)
                const data = await response.json();
                setMarkets(data);
                //const fetchedData = await marketsAPI.getMarkets(); // Call the async function
                //setMarkets(fetchedData); // Set the fetched data to state
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

        // If a callback is provided, call it with the selected node
        if (onCardSelect) {
        const selectedNode = numericValue
            ? itemRefs.current.get(numericValue) || null
            : null;
        onCardSelect(selectedNode, numericValue);
        }
    };

    const items = markets.map((item) => (
        <AccordionItem value={String(item.id)} key={item.label} ref={(node) => setItemRef(item.id, node)}>
            <AccordionControl>
                <AccordionLabel {...item} />
            </AccordionControl>
            <AccordionPanel>
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