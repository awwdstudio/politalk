const BlockContent = require("@sanity/block-content-to-react");
import SyntaxHighlighter from "react-syntax-highlighter";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import imageUrlBuilder from "@sanity/image-url";
import styles from "../../styles/Home.module.css";

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;
  const particularPost = encodeURIComponent(
    `*[ _type == "post" && slug.current == "${pageSlug}" ]`
  );
  const url = `https://7bhpbc4l.api.sanity.io/v1/data/query/production?query=${particularPost}`;
  const postData = await fetch(url).then((res) => res.json());
  const postItem = postData.result[0];
  if (postItem) {
    return {
      props: {
        title: postItem.title,
        image: postItem.mainImage,
        body: postItem.body,
        slug: postItem.slug.current,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

export default function Post({ title, body, image, slug }) {

    const [imageUrl, setImageUrl] = useState();

//   const [modal, setModal] = useState(false);
//   const [updated, setUpdated] = useState(false);
//   const [visitTimes, setVisitTimes] = useState(0);
  // const { getData } = useVisitorData({ immediate: true });

  const router = useRouter();

  useEffect(() => {
    const imgBuilder = imageUrlBuilder({
      projectId: "7bhpbc4l",
      dataset: "production",
    });
    setImageUrl(imgBuilder.image(image));
  }, [image]);

  const serializers = {
    types: {
      code: (props) => (
        <div className="my-2">
          <SyntaxHighlighter language={props.node.language}>
            {props.node.code}
          </SyntaxHighlighter>
        </div>
      ),
    },
  };

  return (
    <>
      <div className={styles.postItem}>
        <div className={styles.postNav} onClick={() => router.push("/")}>
          &#x2190;
        </div>
        {imageUrl && <img src={imageUrl} alt={title} />}
        <div>
          <h1>
              <strong>{title}</strong>
          </h1>
        </div>
        <div className={styles.postBody}>
          <BlockContent
            blocks={body}
            serializers={serializers}
            imageOptions={{ w: 320, h: 240, fit: "max" }}
            projectId={"Your project_ID"}
            dataset={"production"}
          />
        </div>
      </div>
    </>
  );
}
