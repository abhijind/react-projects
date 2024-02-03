import { useEffect, useState } from 'react'
import service from '../appwrite/config.service';
import { IPost } from '../models';
import { Container, PostCard } from '../components';

function AllPosts() {

    const [posts, setPosts] = useState<Array<IPost>>([]);

    useEffect(() => {
        service.getPosts([]).then((posts) => setPosts(posts.documents as unknown as IPost[]));
    }, []);

    return (
        <div className='py-8 w-full'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <PostCard key={post.$id} $id={post.$id ?? ''} {...post}></PostCard>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts