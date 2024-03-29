import { Link } from 'react-router-dom'
import bucketService from '../appwrite/bucket.service'

export interface PostCardProps {
    $id: string,
    title: string,
    featuredImage: string,
}

function PostCard({ $id, title, featuredImage }: PostCardProps) {
    return (
        <Link to={`post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img className='rounded-xl' src={String(bucketService.getFilePreview(featuredImage))} alt={title} />
                </div>
                <h2
                    className='text-xl font-bold'
                >
                    {title}
                </h2>
            </div>
        </Link>
    );
}

export default PostCard