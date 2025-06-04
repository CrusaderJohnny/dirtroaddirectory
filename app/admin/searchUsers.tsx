'use client'

import { usePathname, useRouter } from 'next/navigation'
import {Container, TextInput, Text, Group, Button} from "@mantine/core";
import {useState} from "react";

export const SearchUsers = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [searchUsers, setSearchUsers] = useState('');

    const handleSearch = () => {
        const trimmedSearchTerm = searchUsers.trim();
        if(trimmedSearchTerm) {
            router.push(pathname + '?search=' + trimmedSearchTerm);
        } else {
            router.push(pathname);
        }
    }

    return (
        <Container bg="lightgray">
            <Group>
                <Text>
                    Search for users
                </Text>
                <TextInput
                    value={searchUsers}
                    onChange={(event) => setSearchUsers(event.target.value)}
                    placeholder="Enter user name"
                />
                <Button onClick={handleSearch}>Submit</Button>
            </Group>
        </Container>
    )
}