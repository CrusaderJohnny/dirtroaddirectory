import {
    Image,
    Divider,
    Flex,
    Text,
    Title,
    Card,
    Group,
} from "@mantine/core";
import {SignInButton, SignUpButton} from "@clerk/nextjs";

export default function UserLoginModal() {
    return (
        <Card
            style={{
                backgroundColor: '#ebfbee',
            }}
            w='100%'
        >
            <Flex
                justify='center'
                align='center'
            >
                <Title
                    order={5} c='Black'>
                    User Accounts
                </Title>
            </Flex>
            <Divider size="sm"/>
            <Text>
                Sign in to manage your favorite farmers markets!
            </Text>
            <Text pt='1rem'>
                Don&#39;t have am account? Create a new account today!
            </Text>
            <Divider
                size="sm"
                pb='0.5rem'
                labelPosition="center"
                label={
                    <>
                        <Image
                            src='https://media.istockphoto.com/id/1170724138/vector/farmers-market-hand-drawn-lettering.jpg?s=1024x1024&w=is&k=20&c=EI--kDMvBM9pvC9jFJcaoepQHcDbTxp-De6fgIVqy_8='
                            h={40}
                            w='auto'
                            fit='contain'
                            radius='md'
                            alt="Farmers Market Logo"
                        />
                    </>
                }
            />
            <Image
                alt='Image from unsplash.com'
                src='https://images.unsplash.com/photo-1485637701894-09ad422f6de6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFybWVycyUyMG1hcmtldHxlbnwwfHwwfHx8MA%3D%3D'
            />
            <Group
                justify='space-around'
            >
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
            </Group>
        </Card>
    );
}