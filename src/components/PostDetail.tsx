import React from 'react'
import { Post, Comment } from '../types/types';
import { useQuery, QueryFunction, useMutation } from 'react-query';

const fetchComments: QueryFunction<Comment[], [string, number]> = async ({ queryKey }) => {
  const postId = queryKey[1];
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/comments?postId=${postId}`
	);
	return response.json();
}

const deletePost = async (postId: number): Promise<void> => {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'DELETE',
  });
}

export function PostDetail({ post }: { post: Post}) {
  const { data, status } = useQuery(['comments', post.userId], fetchComments);

  const deletePostMutation = useMutation(deletePost);

  if(status === 'loading') return <div>Loading...</div>
  if(status === 'error') return <div>Oops, something went wrong!</div>;

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => deletePostMutation.mutate(post.id)}>Delete</button>
      {/* shows result depending on mutation status */}
      {deletePostMutation.isError && <p style={{color: 'red'}}>Error deleting the post</p>}
      {deletePostMutation.isLoading && <p style={{color: 'purple'}}>Deleting the post</p>}
      {deletePostMutation.isSuccess && <p style={{color: 'green'}}>Post has (not) been deleted</p>}
      {"  "}
      <button>Update Title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data?.map((comment: Comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  )
}
