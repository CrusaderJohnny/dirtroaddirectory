import { notFound } from "next/navigation";
import { Text, Title, Container, Image, Divider, Space, Grid, Card } from "@mantine/core";
import vendorList from "@/app/_components/vendorcomps/vendordata";

interface VendorParams {
  params: {
    vendorId: string;
  };
}

export default async function VendorDetailPage({ params }: VendorParams) {
  const { vendorId } = await params;
  const vendor = vendorList.find((v) => v.id === parseInt(vendorId));

  if (!vendor) {
    notFound();
  }
  
  return (
    <Container size="lg" py="xl">
      <Image
        src={vendor.image}
        alt={vendor.name}
        radius="md"
        height={300}
        fit="cover"
        mb="lg"
      />

      <Title order={1} className="text-green-700" ta="center">
        {vendor.name.toUpperCase()}
      </Title>

      <Divider my="sm" />

      <Text ta="center" fw={700} size="lg" c="green">
        {vendor.category.toUpperCase()}
      </Text>

      <Space h="xl" />

      <Title order={2} mb="sm"> About </Title>
      <Text size="sm" className="text-gray-800">
        {vendor.description || "No description available."}
      </Text>

      <Space h="xl" />
      
      <Card withBorder radius="md" shadow="sm" p="md">
        <Title order={3} className="mb-2 text-green-700">Markets</Title>
        <Text size="sm">{vendor.markets?.join(", ") || "Not listed"}</Text>
      </Card>

      <Space h="xl" />

      <Card withBorder radius="md" shadow="sm" p="md" mb="xl">
        <Title order={3} className="mb-2 text-green-700">Contact</Title>
        <Text size="sm"><strong>Email:</strong> {vendor.contact || "Not available"}</Text>
        <Text size="sm"><strong>Website:</strong> www.vendorwebsite.com</Text>
      </Card>

    </Container>
  );
}
