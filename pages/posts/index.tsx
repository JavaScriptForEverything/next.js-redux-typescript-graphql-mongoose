import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'

const Posts = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {

	return (
		<>
			<Typography>Posts</Typography>

			{posts.map(post => (
				<Box key={post.id} sx={{ my: 2 }}>
					<Link href={`/posts/${post.id}`} passHref>
						<MuiLink color='inherit'>
							<Typography paragraph>{post.id} | {post.title}</Typography>
						</MuiLink>
					</Link>
					<Typography color='textSecondary'>{post.body}</Typography>
				</Box>
			))}
		</>
	)
}
export default Posts


export type Post = {
	id: number
	userId: number
	title: string
	body: string
}

export const getStaticProps = async () => {
	const posts: Post[] = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())

	return {
		props: {
			posts
		}
	}
}