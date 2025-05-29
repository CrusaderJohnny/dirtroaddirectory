
// Author: Daniel Asefa

import { Container, Title, useMantineTheme, Image, Button } from '@mantine/core';



export default function BoxComp() {

    const theme = useMantineTheme()

    return (
        <Container size='lg'
                   style={{
                       height: '220px',
                       width: '50%',
                       backgroundColor: theme.colors.gray[3]
                   }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '1%',
                    width: '100%',

                }}
            >
                <Image
                    src='https://media.istockphoto.com/id/185311615/photo/slice-of-orange.webp?s=2048x2048&w=is&k=20&c=I35c-cVuWW6-AiONaCqAmpOXwqgglI8suZWwm153LXw='
                    h={150}
                    w='auto'
                    fit='contain'
                    radius='md'
                    m= '5px'
                />
                <div>
                    <Title order={2}>
                        Section Header One
                    </Title>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae
                        purus turpis. Vestibulum ante ipsum primis in faucibus orci luctus et
                        ultrices posuere cubilia curae; Nullam a consectetur elit.
                    </div>

                    <Button
                        radius='md'
                        style={{
                            marginTop:'5px',
                            marginBottom:'5px'

                        }}
                    >
                        Place Holder
                    </Button>
                </div>
            </div>
        </Container>
    );
}