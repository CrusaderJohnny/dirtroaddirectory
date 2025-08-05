import { Card, Grid, GridCol } from "@mantine/core";

import UserFavs from "@/app/_components/usercomps/other/userfavs";

export default function UserContentCard() {
    return (
        <Card withBorder shadow="sm" radius="md" p="lg">
            <Grid gutter="xl">
                <GridCol span={{base: 12, sm: 6, md: 4}}>
                    <UserFavs/>
                </GridCol>
                <GridCol span={{base: 12, sm: 6, md: 4}}>
                    <UserFavs/>
                </GridCol>
                <GridCol span={{base: 12, sm: 6, md: 4}}>
                    <UserFavs/>
                </GridCol>
                <GridCol span={{base: 12, sm: 6, md: 4}}>
                    <UserFavs/>
                </GridCol>
                <GridCol span={{base: 12, sm: 6, md: 4}}>
                    <UserFavs/>
                </GridCol>
                <GridCol span={{base: 12, sm: 6, md: 4}}>
                    <UserFavs/>
                </GridCol>
            </Grid>>
        </Card>
    );
}
