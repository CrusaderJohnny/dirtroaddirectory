const baseContent = `Seasonal produce brings unbeatable flavor and freshness. This week, strawberries are bursting with sweetness, perfect for snacking or baking. Crisp snap peas and tender asparagus make ideal salad additions, while radishes add a spicy crunch. Leafy greens like spinach and arugula thrive in cooler weather, ideal for light, nutritious meals. Rhubarb, tart and vibrant, pairs beautifully with desserts. Eating in season supports local farms and ensures peak taste—so head to your nearest market and savor nature’s freshest offerings.`;

const testContent = baseContent.repeat(4);

const newsData = [
    {
        id: 1,
        title: 'Seasonal Delights: What\'s Ripe and Ready This Week',
        date: 'June 1,  2025',
        content: testContent,
        imgLink: 'https://media.istockphoto.com/id/1193489879/photo/counter-with-fresh-vegetables-and-a-sign-of-local-products.jpg?s=2048x2048&w=is&k=20&c=S2ZrZqmzx8G4sgiic3ljJFhcblLey_Wf3LJ_4kSLUUE=',
        featured: false,
        summary: baseContent,
    },
    {
        id: 2,
        title: 'Meet Your Farmers: Stories Behind Your Food',
        date: 'January 3, 2025',
        content: testContent,
        imgLink: 'https://media.istockphoto.com/id/1178386881/vector/farmer-market-stall-woman-selling-organic-food.webp?s=2048x2048&w=is&k=20&c=_-h1krxXdcbIOLTnsEvxTVl-SB0M9pzxmjjHWxqs24I=',
        featured: false,
        summary: baseContent,
    },
    {
        id: 3,
        title: 'Beyond the Basket: Easy Recipes for Your Market Haul',
        date: 'February  1,  2025',
        content: testContent,
        imgLink: 'https://media.istockphoto.com/id/1147569801/photo/couple-shop-at-outdoor-summer-fruit-market.webp?s=2048x2048&w=is&k=20&c=UcolUvg9v0WNn3PvdKZtak7pcOr6AO4ZulmgsSWqvVM=',
        featured: false,
        summary: baseContent,
    },
    {
        id: 4,
        title: 'Market Day Magic: Tips for the Best Farmers\' Market Experience',
        date: 'February  14,  2025',
        content: testContent,
        imgLink: 'https://media.istockphoto.com/id/1391188178/vector/farmers-market-logo-template-vector-illustration.webp?s=2048x2048&w=is&k=20&c=NH9AKl_dkO0eSpl4r51fNZrfjRiAtQ4tvKz5ZMcxQlo=',
        featured: false,
        summary: baseContent,
    },
    {
        id: 5,
        title: 'From Farm to Table: The Benefits of Shopping Local',
        date: 'March  7,  2025',
        content: testContent,
        imgLink: 'https://media.istockphoto.com/id/1145393791/vector/farm-animals-sign.webp?s=2048x2048&w=is&k=20&c=Dzywbr_gy-0d9-0iRXzXP_owd0WwzuW8QXA4IAuiURk=',
        featured: false,
        summary: baseContent,
    },
    {
        id: 6,
        title: 'Know Your Market',
        date: 'March  20,  2025',
        content: testContent,
        imgLink: 'https://media.istockphoto.com/id/1901819383/vector/hand-drawn-illustration-of-vegetables-and-fruits-in-box-vector.webp?s=2048x2048&w=is&k=20&c=hPDBupLPPXHlr8Mp94TXoC9IPgHHvmIf59o_LD-XkIM=',
        featured: false,
        summary: baseContent,
    },
    {
        id: 7,
        title: 'Spotlight On: This Week\'s Featured Vendor',
        date: 'April 1,  2025',
        content: testContent,
        imgLink: 'https://media.istockphoto.com/id/466182342/photo/vegetable-composition.webp?s=2048x2048&w=is&k=20&c=rkTvKrZbxOanzVLlwFCO42vV78LYFF6kyCJlrCiSeio=',
        featured: false,
        summary: baseContent,
    },
    {
        id: 8,
        title: 'Harvest Health: How Farmers\' Market Produce Boosts Your Wellness',
        date: 'April 20,  2025',
        content: testContent,
        imgLink: 'https://media.istockphoto.com/id/853307414/vector/fast-delivery-of-fresh-vegetables-the-box-on-wheels-with-vegetables-delivery-of-organic-food.webp?s=2048x2048&w=is&k=20&c=0DDcuCZn_25-gf6F70b0eOYVKKrePZPYoO2yzXv2gac=',
        featured: false,
        summary: baseContent,
    },
];

export default newsData;