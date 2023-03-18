import { useState, lazy, Suspense } from 'react';
import { useQuery, QueryFunction } from 'react-query';
import { Post } from '../types/types'
const PostDetail = lazy(() => import('./PostDetail').then(module => ({ default: module.PostDetail })));

const maxPostPage = 10;

const fetchPosts: QueryFunction<Post[], [string, number]> = async ({
	queryKey,
}) => {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${queryKey[1]}`
	);
	return response.json();
};

export function Posts() {
	const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

	const { data, status } = useQuery(['posts', currentPage], fetchPosts, {
		staleTime: 2000,
	});

	if (status === 'loading') return <div>Loading...</div>;
	if (status === 'error')
		return (
			<>
				<div>Oops, something went wrong!!</div>
			</>
		);

	return (
		<>
			<ul>
				{data?.map((post: Post) => (
					<li
						key={post.id}
						className='post-title'
						onClick={() => setSelectedPost(post)}
					>
						{post.title}
					</li>
				))}
			</ul>
			<div className='pages'>
				<button
					disabled={currentPage <= 1}
					onClick={() => {
						setCurrentPage((prevPage) => prevPage - 1);
					}}
				>
					Previous page
				</button>
				<span>Page {currentPage}</span>
				<button
					disabled={currentPage >= maxPostPage}
					onClick={() => {
						setCurrentPage((prevPage) => prevPage + 1);
					}}
				>
					Next page
				</button>
			</div>
			<hr />
			<Suspense fallback={<div>Loading post details...</div>}>
				{selectedPost && <PostDetail post={selectedPost} />}
			</Suspense>
		</>
	);
}
