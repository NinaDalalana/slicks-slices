import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export default {
    siteMetadata: {
        title: `Slicks Slices`,
        siteUrl: 'https://gatsby.pizza',
        description:   'The best pizza place in Hamilton!',
        twitter: '@slicksSlices',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-styled-components',
        {
            //this is the name of the plugin you are adding
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: '1ay0axrr',
                dataset: 'production',
                watchMode: true,
                token: process.env.SANITY_TOKEN,
            },
        },
    ],
};