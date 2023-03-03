
import {createClient} from '@sanity/client'


export const client = createClient({
  projectId: '7bhpbc4l',
  dataset: 'production',
  useCdn: false, // set to `true` to fetch from edge cache
  apiVersion: '2023-01-12', // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

// // uses GROQ to query content: https://www.sanity.io/docs/groq
// export async function getPosts() {
//     const posts = await client.fetch('*[_type == "post"]')
//     return posts;
//   }