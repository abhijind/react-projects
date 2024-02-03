import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config.service";
import { IPost } from "../models";
import { Container, PostForm } from "../components";


function EditPost() {
    const [post, setPost] = useState<IPost | null>(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((p) => {
                if (p) {
                    setPost(p as unknown as IPost);
                }
            })
        } else {
            navigate('/');
        }
    }, [slug, navigate]);
    return (
        post ? (
            <div className="py-8">
                <Container>
                    <PostForm post={post} />
                </Container>
            </div>
        ) : null
    )
}

export default EditPost