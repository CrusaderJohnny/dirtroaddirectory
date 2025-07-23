'use client'

import { usePathname, useRouter } from 'next/navigation'
import {TextInput, Text, Group, Button} from "@mantine/core";
import {useState} from "react";
import {SearchProps} from "@/app/_types/interfaces";


/*
    Searches for users by using the url pathname with a search criteria added and the term added behind.
    Will take any value, like name, email or possibly even phone number and searches
    Returns with a list of items that match search criteria
 */
export const SearchUsers = ({searchName} : SearchProps) => {
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
            <Group>
                <Text>
                    Search for {searchName}
                </Text>
                <TextInput
                    value={searchUsers}
                    onChange={(event) => setSearchUsers(event.target.value)}
                    placeholder="Enter user name"
                />
                <Button onClick={handleSearch}>Submit</Button>
            </Group>
    )
}