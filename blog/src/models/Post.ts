export interface IPost {
    $id?: string;
    title: string;
    content: string;
    featuredImage: string;
    status: string;
    userId?: string;
    slug: string;
}