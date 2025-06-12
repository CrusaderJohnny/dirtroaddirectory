const baseContent = `Curabitur convallis laoreet vulputate. Fusce tristique, quam nec placerat facilisis, justo justo pretium urna,
sit amet lobortis metus metus vel augue. Ut suscipit ligula et vehicula venenatis. Vestibulum aliquam tortor
at libero pretium, eget gravida risus gravida. Aenean molestie a dolor a rutrum. Donec sed sodales nunc.
Vestibulum pharetra ultricies magna, in sagittis purus suscipit sit amet. Nullam id lacinia nisl. Maecenas
consequat diam id lacus malesuada aliquet bibendum eget dolor. Curabitur malesuada placerat finibus`;

const testContent = baseContent.repeat(4);

const newsData = [
    {
        id: 1,
        title: 'Seasonal Delights: What\'s Ripe and Ready This Week',
        date: 'June 1,  2025',
        content: testContent,
        imgLink: 'https://media.istockphoto.com/id/1193489879/photo/counter-with-fresh-vegetables-and-a-sign-of-local-products.jpg?s=2048x2048&w=is&k=20&c=S2ZrZqmzx8G4sgiic3ljJFhcblLey_Wf3LJ_4kSLUUE=',
        featured: false,
        summery: baseContent,
    },
    {
        id: 2,
        title: 'Meet Your Farmers: Stories Behind Your Food',
        date: 'January 3, 2025',
        content: testContent,
        imgLink: 'https://media.istockphoto.com/id/1178386881/vector/farmer-market-stall-woman-selling-organic-food.webp?s=2048x2048&w=is&k=20&c=_-h1krxXdcbIOLTnsEvxTVl-SB0M9pzxmjjHWxqs24I=',
        featured: false,
        summery: baseContent,
    },
    {
        id: 3,
        title: 'Beyond the Basket: Easy Recipes for Your Market Haul',
        date: 'February  1,  2025',
        content: testContent,
        imgLink: 'https://media.istockphoto.com/id/1147569801/photo/couple-shop-at-outdoor-summer-fruit-market.webp?s=2048x2048&w=is&k=20&c=UcolUvg9v0WNn3PvdKZtak7pcOr6AO4ZulmgsSWqvVM=',
        featured: false,
        summery: baseContent,
    },
    {
        id: 4,
        title: 'Market Day Magic: Tips for the Best Farmers\' Market Experience',
        date: 'February  14,  2025',
        content: testContent,
        imgLink: 'https://media.istockphoto.com/id/1391188178/vector/farmers-market-logo-template-vector-illustration.webp?s=2048x2048&w=is&k=20&c=NH9AKl_dkO0eSpl4r51fNZrfjRiAtQ4tvKz5ZMcxQlo=',
        featured: false,
        summery: baseContent,
    },
    {
        id: 5,
        title: 'From Farm to Table: The Benefits of Shopping Local',
        date: 'March  7,  2025',
        content: testContent,
        imgLink: 'https://media.istockphoto.com/id/1145393791/vector/farm-animals-sign.webp?s=2048x2048&w=is&k=20&c=Dzywbr_gy-0d9-0iRXzXP_owd0WwzuW8QXA4IAuiURk=',
        featured: false,
        summery: baseContent,
    },
    {
        id: 6,
        title: 'Know Your Market',
        date: 'March  20,  2025',
        content: testContent,
        imgLink: 'https://media.istockphoto.com/id/1901819383/vector/hand-drawn-illustration-of-vegetables-and-fruits-in-box-vector.webp?s=2048x2048&w=is&k=20&c=hPDBupLPPXHlr8Mp94TXoC9IPgHHvmIf59o_LD-XkIM=',
        featured: false,
        summery: baseContent,
    },
    {
        id: 7,
        title: 'Spotlight On: This Week\'s Featured Vendor',
        date: 'April 1,  2025',
        content: testContent,
        imgLink: 'https://media.istockphoto.com/id/466182342/photo/vegetable-composition.webp?s=2048x2048&w=is&k=20&c=rkTvKrZbxOanzVLlwFCO42vV78LYFF6kyCJlrCiSeio=',
        featured: false,
        summery: baseContent,
    },
    {
        id: 8,
        title: 'Harvest Health: How Farmers\' Market Produce Boosts Your Wellness',
        date: 'April 20,  2025',
        content: testContent,
        imgLink: 'https://media.istockphoto.com/id/853307414/vector/fast-delivery-of-fresh-vegetables-the-box-on-wheels-with-vegetables-delivery-of-organic-food.webp?s=2048x2048&w=is&k=20&c=0DDcuCZn_25-gf6F70b0eOYVKKrePZPYoO2yzXv2gac=',
        featured: false,
        summery: baseContent,
    },
];

export default newsData;