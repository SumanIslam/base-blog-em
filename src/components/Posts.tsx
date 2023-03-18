import { useState } from 'react';
import { useQuery, QueryFunction } from 'react-query';

interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

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

	const { data, status } = useQuery(['posts', currentPage], fetchPosts, {
		staleTime: 2000,
	});

  console.log(data);

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
					>
						{post.title}
					</li>
				))}
			</ul>
		</>
	);
}
