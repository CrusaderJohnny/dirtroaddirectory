import {AppShell, AppShellHeader, AppShellMain} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
// import UserFavs from "@/app/_components/usercomps/other/userfavs";
// import rawData from "../_res/usermarkets.json";
import {currentUser} from "@clerk/nextjs/server";
// import {MarketsInterface} from "@/app/_types/interfaces";
import {redirect} from "next/navigation";
import UserFavouritePage from "@/app/_components/usercomps/userFavouritesPage";

export default async function Page() {
    const user = await currentUser();
    if(!user) {
        redirect('/');
    }

    // const data: MarketsInterface[] = rawData as MarketsInterface[];

    //fetching markets from DB and assigning type to them implicitly
    // const fetchMarkets = async () => {
    //     try {
    //         const response = await fetch('/api/markets'); // Your API endpoint
    //         if (!response.ok) {
    //             // Handle HTTP errors
    //             const errorData = await response.json();
    //             throw new Error(errorData.message || 'Failed to fetch markets');
    //         }
    //         const data: MarketsInterface[] = await response.json(); // <--- STILL TYPE IT HERE!
    //         return data;
    //     } catch (error) {
    //         console.error("Error fetching markets:", error);
    //         // Depending on your error handling strategy, you might return an empty array, re-throw, etc.
    //         throw error;
    //     }
    // }

    return (
        <AppShell
        >
            <AppShellHeader component={NavMT}/>
            <AppShellMain>
                <UserFavouritePage />

                {/*<Container size="xl" py="xl">*/}
                {/*    <Title order={1} className="text-3xl font-bold mb-6 text-center">{user?.firstName}&apos;s Favourites</Title>*/}
                {/*    <UserFavs data={data}/>*/}
                {/*</Container>*/}

            </AppShellMain>
        </AppShell>
    )
}