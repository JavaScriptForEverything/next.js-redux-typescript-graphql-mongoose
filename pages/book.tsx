import Image from 'next/image'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import img from '@public/books/1.jpg'

const books = ['1', '2', '3', '4', '5', '6']

const Book = () => {

	return (
		<>
			<Typography variant='h4' paragraph> Image show blur placeholder while image loading </Typography>
			<Typography color='textSecondary' paragraph>
				next/image add a features of dummy blurry image, from real image, so that layout not break by missing of image . while image loading 
			</Typography>

			<Image 
				src={img} 
				alt=''
				width={500}
				height={300}
				placeholder='blur'
			/>

			{books.map(book => (
				<Box key={book} >
					<Image 
						src={`/books/${book}.jpg`} 
						alt={`book-${book}.jpg`}
						width={200}
						height={400}
						placeholder='blur'
						blurDataURL={`/books/${book}.jpg`}
					/>
				</Box>
			))}
		</>
	)
}
export default Book
