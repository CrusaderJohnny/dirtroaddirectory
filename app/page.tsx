
import {Button, Center, Container, Flex, Text} from "@mantine/core";
import Link from "next/link";
import Board from "@/app/_components/tiktaktoe/board";
import NavMT from "@/app/_components/navcomps/navmt";
import {checkRole} from "@/utils/roles";

export default async function Home() {
  const isAdmin = await checkRole('admin');
  return (
      <>
      <NavMT/>
        <Container>
          <Center>
            <Container>
              <Text p={20}>Hello World, What the....</Text>
              <Flex direction="column" gap={20}>
                <Button component={Link} href="market">Market Map</Button>
                <Button component={Link} href='map'>Map</Button>
                <Button component={Link} href='header'>Header</Button>
                <Button component={Link} href='vendor'>Vendors</Button>
                <Button component={Link} href='userpage'>User Profile</Button>
                {isAdmin ?(
                    <Button component={Link} href='admin'>Admin tools</Button>
                ): null}
              </Flex>
              <Center>
                <Container mt={20}>
                  <Board/>
                </Container>
              </Center>
            </Container>
          </Center>
        </Container>
      </>
  );
}
