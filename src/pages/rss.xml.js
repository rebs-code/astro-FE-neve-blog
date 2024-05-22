import rss from '@astrojs/rss';
import { getSanity } from '../lib/api';

export async function GET(context) {

    // Fetch blog posts from Sanity
    const posts = await getSanity([`*[_type == "blog"]`]);

    // Map posts to RSS items
    const items = posts.map(post => ({
        title: post.title,
        link: `${context.site}/${post.slug.current}`,
        description: post.subtitle, // Replace with your actual description field
        pubDate: new Date(post.publishedAt).toUTCString(), // Replace with your actual publication date field
    }));

    return rss({
        // `<title>` field in output xml
        title: 'Neve Blog',
        // `<description>` field in output xml
        description: 'The latest blog posts from Neve.',
        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#contextsite
        site: context.site,
        // Array of `<item>`s in output xml
        // See "Generating items" section for examples using content collections and glob imports
        items: items,
        // (optional) inject custom xml
        customData: `<language>en-us</language>`,
    });
}