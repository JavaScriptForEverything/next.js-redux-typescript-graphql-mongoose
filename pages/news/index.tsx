import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

const News = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {

	return (
		<>
			{data}
		</>
	)
}
export default News


export const getStaticProps = (ctx: GetStaticPropsContext) => {
	const { preview } = ctx

	return {
		props: {
			data: preview ? 'data of preview mode enabled' : 'Regular data'
		}
	}
}