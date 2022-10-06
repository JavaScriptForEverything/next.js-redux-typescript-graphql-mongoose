import { NextApiHandler } from 'next'

const disablePreviewHandler: NextApiHandler = (req, res) => {
	res.clearPreviewData()
	res.end('Preview mode disabled')
}
export default disablePreviewHandler