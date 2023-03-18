import React from 'react'
import { Post, Comment } from '../types/types';
import { useQuery, QueryFunction } from 'react-query';

const fetchComments: QueryFunction<Comment[], [string, number]> = async ({ queryKey }) => {
  const postId = queryKey[1];
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/comments?postId=${postId}`
	);
	return response.json();
}

export function PostDetail({ post }: { post: Post}) {
  const { data, status } = useQuery(['comments', post.userId], fetchComments);

  if(status === 'loading') return <div>Loading...</div>
  if(status === 'error') return <div>Oops, something went wrong!</div>;

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button>Delete</button> <button>Update Title</button>
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
