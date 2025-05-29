import {
    Group,
    Avatar,
    Text,
    Accordion,
    AccordionItem,
    AccordionControl,
    AccordionPanel,
    Container,
    Button,
    Flex,
} from "@mantine/core";
import Link from "next/link";
import {MarketsInterface} from "@/app/_types/interfaces";
const charactersList = [
    //all information taken from respective websites for each individual farmers market. Pictures taken from their websites. Image URL was copied as well as description and content was taken from the websites for each respective market
    {
        id: "cfm",
        image:
            "https://calgary-farmers-market-v1747430046.websitepro-cdn.com/wp-content/uploads/2024/01/CFM-logo@2x.png",
        label: "Calgary Farmers Market",
        description: "Home to over 100 incredible local vendors.",
        content:
            "In the spirit of reconciliation, we acknowledge we live, work, and play on the traditional territories of the Blackfoot Confederacy (Siksika, Kainai, Piikani), the Tsuut’ina, the Îyâxe Nakoda Nations, the Métis Nation (Region 3), and all people who make their homes in the Treaty 7 region of Southern Alberta.",
        link: "https://www.calgaryfarmersmarket.ca/",
    },
    {
        id: "cochrane",
        image:
            "https://www.albertafarmersmarket.com/wp-content/uploads/Cochrane1-2-wpcf_225x225.jpg",
        label: "Cochrane Farmers’ Market",
        description: "The market in the heart of Big Hill Country",
        content:
            "The Cochrane Environmental Action Committee (CEAC) sponsors and operates the Cochrane Farmers’ Market. The market is run entirely by CEAC volunteers, and proceeds from the market are used to support CEAC in its efforts to make Cochrane a more environmentally aware and active community.",
        link: "https://cochranefarmersmarket.ca/",
    },
    {
        id: "dalhousie",
        image:
            "https://www.albertafarmersmarket.com/wp-content/uploads/DalhousieFarmersMarketLogo-wpcf_225x225.png",
        label: "Dalhousie Farmers’ Market",
        description:
            "The Dalhousie Farmers’ Market adhere’s to the “Made, Baked, or Grown” in Alberta Rule.",
        content:
            "The Dalhousie Farmers’ Market adhere’s to the “Made, Baked, or Grown” in Alberta Rule. 80% of our vendors must have products that are Alberta Made, Baked or Grown. We are an Approved Farmer’s Market and follow rules and regulations set by the Alberta Agricultural Society. By hosting a market, Dalhousie is enabling entrepreneurs to test their products and ideas while keeping costs low, interacting with the community, and learning new business skills. All funds raised by this market will go directly towards community improvement projects.",
        link: "https://www.dalhousiecalgary.ca/farmers-market/",
    },
];
//displays the information before the accordion is opened
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
//displays the accordion information. essentially a read more pop out
export default function MarketAccordion() {
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
        <Container>
            <Accordion chevronPosition="right" variant="contained">
                {items}
            </Accordion>
        </Container>
    );
}
