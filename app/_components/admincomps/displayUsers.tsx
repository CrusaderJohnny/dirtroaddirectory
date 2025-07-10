import {Card, Group, Stack, Text} from "@mantine/core";
import UserRoleActions from "@/app/_components/admincomps/userRoleActions";
import {AdminSearchProps} from "@/app/_types/interfaces";
import {EmailAddress} from "@clerk/backend";


export default function DisplayUsers({users, searchType}: AdminSearchProps) {
    return (
        <Stack gap="lg">
            {users.map((user) => (
                <Card
                    key={user.id}
                    shadow="lg"
                    padding="lg"
                    radius="md"
                    withBorder
                    style={{ backgroundColor: "#e9fbee" }}
                >
                    <Group>
                        <Stack gap={'xs'} w={'7rem'}>
                            <Text fw={600}>Username:</Text>
                            <Text fw={600}>Email:</Text>
                            <Text fw={600}>Role:</Text>
                            {user.publicMetadata.isMarket as boolean && (
                                <>
                                    <Text fw={600}>Is Market:</Text>
                                    <Text fw={600}>Market Name:</Text>
                                </>
                            )}
                            {user.publicMetadata.isVendor as boolean && (
                                <>
                                    <Text fw={600}>Is Vendor</Text>
                                    <Text fw={600}>Vendor Name:</Text>
                                </>
                            )}
                        </Stack>
                        <Stack gap="xs">
                            <Text>{user.firstName} {user.lastName}</Text>
                            <Text>{user.emailAddresses.find(
                                (email: EmailAddress) =>
                                    email.id === user.primaryEmailAddressId
                            )?.emailAddress
                            }
                            </Text>
                            <Text>{user.publicMetadata.role as string}</Text>
                            {user.publicMetadata.isMarket as boolean && (
                                <>
                                    <Text>{String(user.publicMetadata.isMarket)}</Text>
                                    <Text>{user.publicMetadata.marketName as string}</Text>
                                </>
                            )}
                            {user.publicMetadata.isVendor as boolean && (
                                <>
                                    <Text>{String(user.publicMetadata.isVendor)}</Text>
                                    <Text>{user.publicMetadata.vendorName as string}</Text>
                                </>
                            )}
                        </Stack>
                            <UserRoleActions userId={user.id} buttonType={searchType} />
                    </Group>
                </Card>
            ))}
        </Stack>
    )
}