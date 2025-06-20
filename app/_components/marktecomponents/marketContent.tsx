"use client";

import { useSearchParams } from "next/navigation";
import {
  Button,
  Card,
  Container,
  Group,
  Image,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import {
  IconPhone,
  IconMapPin,
  IconClockHour4,
  IconBrandFacebook,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import MarketCard from "@/app/_components/marketaccordian/marketcard";
import data from "../../_res/markets.json";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
  padding: "1.5rem",
};

export default function MarketContent() {
  const searchParams = useSearchParams();
  const marketId = searchParams.get("marketId");
  const selectedMarket = data.find((v) => v.id === Number(marketId));

  return (
    <Container size="lg" py="xl">
      {selectedMarket ? (
        <>
          {/* Market Detail View */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <Card style={{ ...cardStyle, padding: 0, overflow: "hidden", marginBottom: "1.5rem" }}>
              <Image src={selectedMarket.image} alt={selectedMarket.label} height={250} fit="cover" />
            </Card>
            <Title order={1} c="#1f4d2e" ta="center" fw={800} mb="md">
              {selectedMarket.label}
            </Title>
          </motion.div>

          {/* Description */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <Card style={{ ...cardStyle, marginBottom: "1.5rem" }}>
              <Group align="center" mb="xs">
                <Title order={4} c="#1f4d2e" m={0}>Description</Title>
              </Group>
              <Text size="sm">{selectedMarket.description || "No description available"}</Text>
            </Card>
          </motion.div>

          {/* Location & Hours */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mb="lg">
              <Card style={cardStyle}>
                <Group align="center" mb="xs">
                  <IconMapPin size={20} color="#f26522" />
                  <Title order={5} c="#1f4d2e" m={0}>Location</Title>
                </Group>
                <Text>{selectedMarket.link}</Text>
              </Card>
              <Card style={cardStyle}>
                <Group align="center" mb="xs">
                  <IconClockHour4 size={20} color="#f26522" />
                  <Title order={5} c="#1f4d2e" m={0}>Hours of Operation</Title>
                </Group>
                <Text>{selectedMarket.hours}</Text>
              </Card>
            </SimpleGrid>
          </motion.div>

          {/* Contact & Social */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mb="lg">
              <Card style={cardStyle}>
                <Group align="center" mb="xs">
                  <IconPhone size={20} color="#f26522" />
                  <Title order={5} c="#1f4d2e" m={0}>Contact Us</Title>
                </Group>
                <Text><strong>Phone:</strong> {selectedMarket.contact?.phone || "Not available"}</Text>
                <Text><strong>Email:</strong> {selectedMarket.contact?.email || "Not available"}</Text>
              </Card>
              <Card style={cardStyle}>
                <Group align="center" mb="xs">
                  <IconBrandFacebook size={20} color="#f26522" />
                  <Title order={5} c="#1f4d2e" m={0}>Social Media</Title>
                </Group>
                <Group gap="sm" mt="xs">
                  {selectedMarket.socials?.facebook && (
                    <Button variant="light" color="orange" component="a" href={selectedMarket.socials.facebook} target="_blank" leftSection={<IconBrandFacebook size={16} />}>
                      Facebook
                    </Button>
                  )}
                  {selectedMarket.socials?.instagram && (
                    <Button variant="light" color="green" component="a" href={selectedMarket.socials.instagram} target="_blank" leftSection={<IconBrandInstagram size={16} />}>
                      Instagram
                    </Button>
                  )}
                </Group>
              </Card>
            </SimpleGrid>
          </motion.div>

          {/* Events */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <Card style={{ ...cardStyle, backgroundColor: "#f4f1e8", marginBottom: "1.5rem" }}>
              <Group align="center" mb="xs">
                <Title order={4} c="#f26522" m={0}>Events</Title>
              </Group>
              <Text size="sm">
                {selectedMarket.events?.length ? selectedMarket.events.join(", ") : "No upcoming events listed."}
              </Text>
            </Card>
          </motion.div>

          {/* Vendors */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <Card style={cardStyle}>
              <Group align="center" mb="xs">
                <Title order={4} c="#1f4d2e" m={0}>Vendors at this Market</Title>
              </Group>
              {Array.isArray(selectedMarket.vendors) && selectedMarket.vendors.length > 0 ? (
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="sm">
                  {selectedMarket.vendors.map((vendor) => (
                    <Card
                      key={vendor.id}
                      component="a"
                      href={`/vendors?vendorId=${vendor.id}`}
                      withBorder
                      shadow="xs"
                      radius="md"
                      p="md"
                      style={{
                        borderRadius: "10px",
                        background: "#fafafa",
                        cursor: "pointer",
                        transition: "transform 0.2s ease-in-out",
                      }}
                    >
                      <Text fw={600}>{vendor.name}</Text>
                      <Text size="xs" c="dimmed">{vendor.category || "No category"}</Text>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <Text size="sm" c="dimmed">No vendors listed.</Text>
              )}
            </Card>
          </motion.div>

          <Group justify="center" mt="xl">
            <Button component="a" href="/markets" variant="outline" color="orange">
              ← Back to all markets
            </Button>
          </Group>
        </>
      ) : (
        <>
          {/* All Markets Listing */}
          <Title order={1} mb="xl" c="#1f4d2e" fw={800}>Explore All Markets</Title>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {data.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </SimpleGrid>
        </>
      )}
    </Container>
  );
}

