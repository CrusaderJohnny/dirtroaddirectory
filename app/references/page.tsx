import {
    AppShell,
    AppShellHeader,
    AppShellMain,
    Container,
    Grid,
    GridCol,
    Card,
    Image,
    Text,
    Title,
    Anchor,
    Flex, Divider
} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import referenceData from "@/app/references/dataFile";
import {ReferencesInterface} from "@/app/_types/interfaces";

export default function Page() {
    return (
        <AppShell>
            <AppShellHeader>
                <NavMT/>
            </AppShellHeader>
            <AppShellMain>
                <Container size="xl" py="xl">
                    <Card mb="xl"
                          style={{
                              background: 'linear-gradient(135deg, #226a38 0%, #dee2e6 50%, #226a38 100%)', // A rainbow-like gradient at an angle
                              color: 'black', // Text color
                          }}
                    >
                        <Title order={1} ta="center" pb="md">Technologies Used</Title>
                        <Divider/>
                    </Card>

                    <Grid gutter="xl">
                        {referenceData.map((reference: ReferencesInterface) => (
                            <GridCol key={reference.title} span={{base: 12, sm: 6, lg: 3}}>
                                <Card
                                    withBorder
                                    radius="md"
                                    shadow="sm"
                                    p="md"
                                    h="100%"
                                    style={{display: 'flex', flexDirection: 'column'}}
                                >
                                    {/* Logo Image */}
                                    {reference.logo_image && (
                                        <Image
                                            src={reference.logo_image}
                                            alt={`${reference.title} Logo`}
                                            h={120} // Fixed height for logos
                                            fit="contain" // Ensures the logo fits without cropping
                                            mb="md"
                                        />
                                    )}
                                    {/* Content/Summary */}
                                    <Text size="sm" c="dimmed" style={{flexGrow: 1}}>
                                        {reference.content}
                                    </Text>

                                    {/* Website Link */}
                                    {reference.website && (
                                        <Flex mt="md" justify="flex-end">
                                            <Anchor href={reference.website} target="_blank" rel="noopener noreferrer">
                                                Visit {reference.title}
                                            </Anchor>
                                        </Flex>
                                    )}
                                </Card>
                            </GridCol>
                        ))}
                    </Grid>
                </Container>
            </AppShellMain>
        </AppShell>
    );
}
