import {Image, Divider, Flex, Text, Title} from "@mantine/core";
import {SignInButton, SignUpButton} from "@clerk/nextjs";

// https://images.unsplash.com/photo-1485637701894-09ad422f6de6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFybWVycyUyMG1hcmtldHxlbnwwfHwwfHx8MA%3D%3D

export default function UserLoginModal() {

    return (
        <>
            <Flex
                justify='center'
                align='center'
            >
                <Image
                    src='https://media.istockphoto.com/id/1170724138/vector/farmers-market-hand-drawn-lettering.jpg?s=1024x1024&w=is&k=20&c=EI--kDMvBM9pvC9jFJcaoepQHcDbTxp-De6fgIVqy_8='
                    h={40}
                    w='auto'
                    fit='contain'
                    radius='md'
                    alt="Farmers Market Logo"
                    mr='sm'
                />
                <Title
                    order={5} c='Black'>
                    User Accounts
                </Title>
            </Flex>
            <Divider/>
            <Text>
                Keep track of your favorite farmers markets, discover seasonal produce, and get updates on local vendors
                – all in one place.
            </Text>
            {/*<Flex*/}
            {/*    justify='center'*/}
            {/*    align='center'*/}
            {/*>*/}
                <Image
                    alt='Image from unsplash.com'
                    w='100%'
                    src='https://images.unsplash.com/photo-1485637701894-09ad422f6de6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFybWVycyUyMG1hcmtldHxlbnwwfHwwfHx8MA%3D%3D'
                />
            {/*</Flex>*/}
            <Text>
                Ready to get started?
            </Text>

            <Flex
                gap="xl"
                justify="center"
                align="center"
                direction="row"
                wrap="nowrap"
            >
                {/*Group the buttons to fit the modal better*/}
                <SignInButton>
                    {/*Clerk does not like nesting Mantine 'Button' so use HTML 'button'*/}
                    <button className='signin-button'>
                        Sign In
                    </button>
                </SignInButton>
                <SignUpButton>
                    <button className='signup-button'>
                        Sign Up
                    </button>
                </SignUpButton>
            </Flex>
        </>
    );
}