import {Card, Flex, Group, Stack, Text} from "@mantine/core";
import UserRoleActions from "@/app/_components/admincomps/userRoleActions";
import {AdminSearchProps} from "@/app/_types/interfaces";
import {EmailAddress} from "@clerk/backend";

export default function DisplayUsers({users}: AdminSearchProps) {
    return (
        <Stack gap="lg">
            {users.map((user) => (
                <Card
                    key={user.id}
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    style={{ backgroundColor: "#ffffff" }}
                >
                    <Flex justify="space-between" align="flex-start" wrap="wrap">
                        <Stack gap="xs">
                            <Group>
                                <Text fw={600}>Username:</Text>
                                <Text>{user.firstName} {user.lastName}</Text>
                            </Group>
                            <Group>
                                <Text fw={600}>Email:</Text>
                                <Text>
                                    {
                                        user.emailAddresses.find(
                                            (email: EmailAddress) =>
                                                email.id === user.primaryEmailAddressId
                                        )?.emailAddress
                                    }
                                </Text>
                            </Group>
                            <Group>
                                <Text fw={600}>Role:</Text>
                                <Text>{user.publicMetadata.role as string}</Text>
                            </Group>

                            {user.publicMetadata.isMarket as boolean && (
                                <Group>
                                    <Text fw={600}>Is Market:</Text>
                                    <Text>{String(user.publicMetadata.isMarket)}</Text>
                                </Group>
                            )}
                            {user.publicMetadata.isVendor as boolean && (
                                <Group>
                                    <Text fw={600}>Is Vendor:</Text>
                                    <Text>{String(user.publicMetadata.isVendor)}</Text>
                                </Group>
                            )}


                        </Stack>
                        <UserRoleActions userId={user.id} />
                    </Flex>
                </Card>
            ))}
        </Stack>
    )
}