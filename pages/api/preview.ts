import { NextApiHandler } from 'next'


/* What is Preview Mode ? Why we need it ?
		- As we know static site Generation, create pages on built-time, after built any change 
			to data not effect on generated page, we have to re-build to get update.

				. ISR solve this problems, but still to get update, we need to hit 2 times.
				. Preview Mode enable SSG to act like as SSR, when preview mode enabled
						. No need development skills to update SSG page.

	Let's See Preview Mode Examples:
		. /news 												: Go to /news page without preview Mode
		. /api/preview?redirect=/news 	: Go to /api/preview to enable preview mode then redirect to /news page

		. /api/disable-preview 					: Go to this route to Disable preview mode
*/ 

const previewHandler: NextApiHandler = (req, res) => {
	res.setPreviewData({})

	const { redirect } = req.query 	
	if(!redirect || Array.isArray(redirect)) return res.end()

	res.redirect(redirect) 	
}

export default previewHandler