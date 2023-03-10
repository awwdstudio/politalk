import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import imageUrlBuilder from "@sanity/image-url";

import styles from '../styles/Home.module.css';

import { client } from '@/client'

export default function Home({posts}) {

  const router = useRouter();
  const[receivedPosts, setReceivedPosts] = useState([]);

  useEffect(() => {
    if (posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: "7bhpbc4l",
        dataset: "production",
      });
      setReceivedPosts(
        posts.map((post) => {
          return {
            ...post,
            mainImage: imgBuilder.image(post.mainImage),
          };
        })
      );
    } else {
      setReceivedPosts([]);
    }
  }, [posts]);

  return (
    <div className={styles.main}>
      <h1>Welcome to Blog Page</h1>
      <div className={styles.feed}>
        {receivedPosts.length ? (
          receivedPosts.map((post, index) => (
            <div
              key={index}
              className={styles.post}
              onClick={() => router.push(`/post/${post.slug.current}`)}
            >
              <img
                className={styles.img}
                src={post.mainImage}
                alt="post thumbnail"
              />
              <h3>{post.title}</h3>
            </div>
          ))
        ) : (
          <>No Posts</>
        )}
      </div>
    </div>
  );
}

export const getStaticProps = async (pageContext) => {
    const query = `*[_type == "post"]`
    const posts = await client.fetch(query)
    return {
      props: {
        posts
      }
    }
};