
import {Center, Box, Title, Text, Image, Spoiler} from '@mantine/core';
import {useState} from "react";

interface CurrentUpdateProps {
    update: UpdateArticle | null;
}

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
            >
                {update.title}
            </Title>

            {/* Date */}
            <Text>{update.date}</Text>

            {/* Page Image Here */}
            <Center>

                <Image
                    src={update.imgLink}
                    h={'20rem'}
                    w='auto'
                    fit='contain'
                    radius='md'
                    m='5px'
                    alt={`Article Image for ${update.title}`}
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