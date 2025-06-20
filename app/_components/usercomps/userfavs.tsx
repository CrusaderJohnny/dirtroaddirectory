import {Grid, GridCol} from "@mantine/core";
import MarketCard from "@/app/_components/marketaccordian/marketcard";
import {MarketGridProps, MarketsInterface} from "@/app/_types/interfaces";
import React from "react";



export default function UserFavs({data} : MarketGridProps){
    return (
        <Grid gutter="xl">
            {data.map((market: MarketsInterface) => (
                <GridCol span={{base: 12, sm: 6, md: 4}} key={market.id}>
                    <MarketCard key={market.id} market={market}/>
                </GridCol>
            ))}
        </Grid>
    )
}