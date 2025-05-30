import { notFound } from "next/navigation";
import { Text, Title, Container } from "@mantine/core";
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
    <Container size="md" py="xl">
      <Title order={1} className="text-3xl font-bold mb-4">
        {vendor.name}
      </Title>

      <Text size="sm" className="mb-2 text-gray-600">
        <strong>Category:</strong> {vendor.category}
      </Text>
      <Text size="sm" className="mb-2 text-gray-600">
        <strong>Location:</strong> {vendor.location}
      </Text>
      <Text size="sm" className="mb-2 text-gray-600">
        <strong>Contact:</strong> {vendor.contact || "Not available"}
      </Text>
      <Text size="sm" className="mb-2 text-gray-600">
        <strong>Markets:</strong> {vendor.markets?.join(", ") || "Not listed"}
      </Text>
      <Text size="sm" className="text-gray-800 mt-4">
        <strong>Description:</strong> {vendor.description || "No description available."}
      </Text>
    </Container>
  );
}
