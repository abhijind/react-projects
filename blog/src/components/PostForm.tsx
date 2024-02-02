import { FieldValues, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Post, User } from "../models";
import bucketService from "../appwrite/bucket.service";
import service from "../appwrite/config.service";
import { useCallback, useEffect } from "react";
import { Button, Input, Select, TextEditor } from ".";

export interface PostFormProps {
    post: Post
}

function PostForm({ post }: PostFormProps) {
    const { register, handleSubmit, watch, control, getValues, setValue } = useForm({
        defaultValues: {
            title: post.title ?? '',
            slug: post.slug ?? '',
            content: post?.content ?? '',
            status: post.status ?? 'active',
        }
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state: { user: { userData: User } }) => state.user.userData);


    const submit = async (data: FieldValues) => {
        const file = data.image[0] ? bucketService.uploadFile(data.image[0]) : null;
        let dbPost = undefined;

        if (post) {
            if (file) {
                bucketService.deleteFile(post.featuredImage);
            }

            dbPost = await service.updatePost(
                post.slug, {
                    ...data,
                    featuredImage: file ? (await file).$id : undefined,
                } as Post
            );

        } else {
            if (file) {
                data.featuredImage = (await file).$id;
                dbPost = await service.createPost({
                    ...data,
                    userId: userData.$id
                } as Post)

            }
        }

        if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
        }
    }

    const slugTransform = useCallback((value: any) => {
        if (value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-');
        return '';
    }, []);


    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e: { currentTarget: { value: any; }; }) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <TextEditor label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={String(bucketService.getFilePreview(post.featuredImage))}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    <>{post ? "Update" : "Submit"}</>
                </Button>
            </div>
        </form>
    )
}

export default PostForm