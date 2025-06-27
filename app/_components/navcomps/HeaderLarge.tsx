import Link from 'next/link';
import { Button, Group, Image, Title } from '@mantine/core';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export default function HeaderLarge() {
    return (
        // Test one tried adding "style={{ flexWrap: 'nowrap' }}" to main-group to stop it from wrapping
        <Group justify="space-between" w="100%" style={{ flexWrap: 'nowrap' }}>
            <Link href="/">
                <Group>
                    <Image
                        src="https://media.istockphoto.com/id/1170724138/vector/farmers-market-hand-drawn-lettering.jpg?s=1024x1024&w=is&k=20&c=EI--kDMvBM9pvC9jFJcaoepQHcDbTxp-De6fgIVqy_8="
                        h={40}
                        w="auto"
                        fit="contain"
                        radius="md"
                        alt="Farmers Market Logo"
                    />
                    <Title order={1} c="white">
                        Dirt Road Directory
                    </Title>
                </Group>
            </Link>

            <Group gap="md">
                <Button component="a" href="/markets" variant="subtle" color="white" size="lg">
                    Markets
                </Button>
                <Button component="a" href="/vendors" variant="subtle" color="white" size="lg">
                    Vendors
                </Button>
                <Button component="a" href="/map" variant="subtle" color="white" size="lg">
                    Market Map
                </Button>
                <Button component="a" href="/aboutus" variant="subtle" color="white" size="lg">
                    About Us
                </Button>
                <Button component="a" href="/contact" variant="subtle" color="white" size="lg">
                    Contact
                </Button>
            </Group>

            <Group>
                <SignedOut>
                    <SignInButton>
                        <button className="signin-button">Sign In</button>
                    </SignInButton>
                    <SignUpButton>
                        <button className="signup-button">Sign Up</button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <Button component="a" href="/userfavs" variant="subtle" c="white" size="lg">
                        Favs
                    </Button>
                    <UserButton />
                </SignedIn>
            </Group>
        </Group>
    );
}
