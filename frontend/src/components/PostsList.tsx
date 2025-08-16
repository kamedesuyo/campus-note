import type { post_data } from "../types/post_data"

type PostListProps = {
    posts: post_data[]
}

export default function PostsList({ posts }: PostListProps) {
    return (
        <div id="posts">
            <h3>投稿一覧</h3>
            {posts.map((post) => (
                <p key={post.post_uuid}><img src={post.send_user_icon_url} alt="userIcon" />{post.send_user}: {post.message}</p>
            ))}
        </div>
    )
}