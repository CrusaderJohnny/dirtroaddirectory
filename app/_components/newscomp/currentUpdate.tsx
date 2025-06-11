
import {Center, Box, Title, Text, Image, Spoiler} from '@mantine/core';
import {useState} from "react";


export default function CurrentUpdate() {
    const [expanded, setExpanded] = useState(false);


    return (
        <Box
        >
            {/* Name of article */}
            <Title order={2}
                style={{
                    fontFamily: 'Monospace',
                }}
            >Seasonal Delights: What&#39;s Ripe and Ready This Week</Title>

            {/* Date */}
            <Text>September 20, 2025</Text>

            {/* Page Image Here */}
            <Center>

            <Image
                src='https://media.istockphoto.com/id/1193489879/photo/counter-with-fresh-vegetables-and-a-sign-of-local-products.jpg?s=2048x2048&w=is&k=20&c=S2ZrZqmzx8G4sgiic3ljJFhcblLey_Wf3LJ_4kSLUUE='
                h={'20rem'}
                w='auto'
                fit='contain'
                radius='md'
                m='5px'
                alt='Article Image from istockphoto.com'
            />
            </Center>

            {/* Update Content Here */}
            <Spoiler
                maxHeight={200}
                showLabel="See More"
                hideLabel="See Less"
                expanded={expanded}
                onExpandedChange={setExpanded}
                transitionDuration={500}
            >
                Curabitur convallis laoreet vulputate. Fusce tristique, quam nec placerat facilisis, justo justo pretium urna,
                sit amet lobortis metus metus vel augue. Ut suscipit ligula et vehicula venenatis. Vestibulum aliquam tortor
                at libero pretium, eget gravida risus gravida. Aenean molestie a dolor a rutrum. Donec sed sodales nunc.
                Vestibulum pharetra ultricies magna, in sagittis purus suscipit sit amet. Nullam id lacinia nisl. Maecenas
                consequat diam id lacus malesuada aliquet bibendum eget dolor. Curabitur malesuada placerat finibus
                Curabitur convallis laoreet vulputate. Fusce tristique, quam nec placerat facilisis, justo justo pretium urna,
                sit amet lobortis metus metus vel augue. Ut suscipit ligula et vehicula venenatis. Vestibulum aliquam tortor
                at libero pretium, eget gravida risus gravida. Aenean molestie a dolor a rutrum. Donec sed sodales nunc.
                Vestibulum pharetra ultricies magna, in sagittis purus suscipit sit amet. Nullam id lacinia nisl. Maecenas
                consequat diam id lacus malesuada aliquet bibendum eget dolor. Curabitur malesuada placerat finibus
                Curabitur convallis laoreet vulputate. Fusce tristique, quam nec placerat facilisis, justo justo pretium urna,
                sit amet lobortis metus metus vel augue. Ut suscipit ligula et vehicula venenatis. Vestibulum aliquam tortor
                at libero pretium, eget gravida risus gravida. Aenean molestie a dolor a rutrum. Donec sed sodales nunc.
                Vestibulum pharetra ultricies magna, in sagittis purus suscipit sit amet. Nullam id lacinia nisl. Maecenas
                consequat diam id lacus malesuada aliquet bibendum eget dolor. Curabitur malesuada placerat finibus
                Curabitur convallis laoreet vulputate. Fusce tristique, quam nec placerat facilisis, justo justo pretium urna,
                sit amet lobortis metus metus vel augue. Ut suscipit ligula et vehicula venenatis. Vestibulum aliquam tortor
                at libero pretium, eget gravida risus gravida. Aenean molestie a dolor a rutrum. Donec sed sodales nunc.
                Vestibulum pharetra ultricies magna, in sagittis purus suscipit sit amet. Nullam id lacinia nisl. Maecenas
                consequat diam id lacus malesuada aliquet bibendum eget dolor. Curabitur malesuada placerat finibus
            </Spoiler>

        </Box>
    );
}