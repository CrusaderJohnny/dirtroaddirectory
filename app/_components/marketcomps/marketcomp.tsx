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
import {MarketItem, MarketsInterface} from "@/app/_types/interfaces";
import data from "../../_res/markets.json";

const charactersList: MarketItem[] = data;
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
    defaultOpenItemId?: string | null; // ? allows the prompt to be optional
}

//displays the accordion information. essentially a read more pop out
export default function MarketAccordion({defaultOpenItemId}: MarketAccordionProps) {
    const [activeItem, setActiveItem] = useState<string | null>(defaultOpenItemId ?? null); // if defaultOpenItemId is null or undefined set to null

    // rerender the component when changing the value of "defaultOpenItemId"
    useEffect(() => {
        setActiveItem(defaultOpenItemId ?? null);
    }, [defaultOpenItemId]);


    const items = charactersList.map((item) => (
        <AccordionItem value={item.id} key={item.label}>
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
            value={activeItem} // Control the active item
            onChange={setActiveItem} // Update the active item when a user clicks 
            // FIX BUG HERE ------ closing the item doesn't set active to null
            >
                {items}
            </Accordion>
    );
}