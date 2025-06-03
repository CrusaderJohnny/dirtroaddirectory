"use client"
import { Button, Center, Container, Flex, Text } from "@mantine/core";
import Link from "next/link";
import Board from "@/app/_components/tiktaktoe/board";

export default function Home() {
  return (
    <Container>
      <Center>
        <Container>
          <Text p={20}>Hello World, What the....</Text>
          <Flex direction="column" gap={20}>
            <Button component={Link} href="market">Market Map</Button>
            <Button component={Link} href='map'>Map</Button>
            <Button component={Link} href='header'>Header</Button>
            <Button component={Link} href='vendors'>Vendors</Button>
            <Button component={Link} href='userpage'>User Profile</Button>
            <Board/>
          </Flex>
        </Container>
      </Center>
    </Container>
  );
}
