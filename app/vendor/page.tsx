"use client";
import { useState } from "react";
import { Title, Modal, Text } from "@mantine/core";
import vendorList from "@/app/_components/vendorcomps/vendordata";
import VendorCard from "@/app/_components/vendorcomps/vendorcard";

export default function Page() {
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [opened, setOpened] = useState(false);

    const handleCardClick = (vendor) => {
        setSelectedVendor(vendor);
        setOpened(true);
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <Title order={1} className="text-3xl font-bold mb-6 text-center">
                Our Vendors
            </Title>x

            <div className="flex flex-col gap-4">
                {vendorList.map((vendor) => (
                    <VendorCard
                        key={vendor.id}
                        vendor={vendor}
                        onClick={handleCardClick}
                    />
                ))}
            </div>

            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title={selectedVendor?.name}
            >
                {selectedVendor && (
                    <div className="space-y-2 text-gray-700">
                        <Text>
                            <strong>Category:</strong> {selectedVendor.category}
                        </Text>
                        <Text>
                            <strong>Location:</strong> {selectedVendor.location}
                        </Text>
                        <Text>
                            <strong>Contact:</strong>{" "}
                            {selectedVendor.contact || "Not available"}
                        </Text>
                        <Text>
                            <strong>Markets:</strong>{" "}
                            {selectedVendor.markets?.join(", ") || "Not listed"}
                        </Text>
                        <strong>Description:</strong>{" "}
                        <Text>{selectedVendor.description || "No description available."}</Text>
                    </div>
                )}
            </Modal>
        </div>
    );
}
