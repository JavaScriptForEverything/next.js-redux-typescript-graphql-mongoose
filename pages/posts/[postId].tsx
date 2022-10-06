import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import type { Post } from './index'

import Typography from '@mui/material/Typography'


const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {

	return (
		<>
			<Typography>{post.id}</Typography>
			<Typography>{post.title}</Typography>
			<Typography>{post.body}</Typography>
		</>
	)
}
export default Post


const emptyPost: Post = {
	id: 0,
	userId: 0,
	title: '',
	body: ''
}
export const getStaticProps = async (ctx: GetStaticPropsContext) => {
	const { params } = ctx
	if(!params) return { props: { post: emptyPost }} 

	const { postId } = params
	const post: Post = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(res => res.json())
	return {
		props: { post }
	}
}

export const getStaticPaths = async () => {
	const posts: Post[] = await fetch(`https://jsonplaceholder.typicode.com/posts`).then( res => res.json())
	const paths = posts.map(post => ({ 
		params: {
			postId: post.id.toString() 				// convert number to string: { postId: '1' }
		}
	}))

	return {
		paths,
		fallback: false
	}
}