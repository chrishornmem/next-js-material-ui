import { connect } from '../../src/utils/db';

export default async (req, res) => {

  let success = true;
  const MAXLENGTH = 500;
  const {
    query,
    method,
  } = req;
  let { keywords } = query;
  keywords = keywords?.slice(0, MAXLENGTH);
  const result = {
    pathname: '/coops',
    query: { keywords },
    success,
  }

  try {

    if (method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }

    if (!keywords) {
      return res.status(409).end(`Missing keywords param`);
    }

    const {
      isConnected, Coops,
    } = await connect();

    if (!isConnected) {
      throw new Error('db not connected');
    }

    let redirectCoopId = null;

    const coops = await Coops
      .find({ name: keywords })
      .collation({ locale: 'en', strength: 2 })
      .limit(2)
      .lean();

    if (coops?.length === 1 ) {
      redirectCoopId = JSON.parse(JSON.stringify(coops[0]._id));
      result.pathname = `/coop/${redirectCoopId}`;
      result.query = {};
    }
    return res.status(200).json(result);
    
  } catch (error) {
    result.success = false;
    console.error(error);
    return res.status(500).json(result);

  }
}