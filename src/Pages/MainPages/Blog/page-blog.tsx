import Post1 from "Components/Posts/Post1";
import { Helmet } from "react-helmet-async";

function PageBlog() {
    return (
        <>
            <Helmet>
                <title>Blog</title>
                <meta
                    name="description"
                    content="Jak morsować. Czy morsowanie jest bezpieczne. Zimna woda korzyści. Jak zostać morsem"
                />
                <link rel="canonical" href="/blog" />
            </Helmet>

            <Post1 />
        </>
    );
}

export default PageBlog;
