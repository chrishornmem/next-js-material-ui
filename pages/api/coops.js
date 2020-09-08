import { connect } from '../../src/utils/db';

export default async (req, res) => {

  try {

    const {
      query,
      method,
    } = req;

    if (method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }

    const {
      isConnected, Coops,
    } = await connect();

    if (!isConnected) {
      throw new Error('Not ready');
    }

    const PAGE_SIZE = 24;

    let {
      keywords,
      page = 1,
    } = query;

    page = parseInt(page) || 1;

    let { limit = PAGE_SIZE } = query;
    limit = String(limit === '0') ? PAGE_SIZE : limit;
    limit = limit ? Math.min(PAGE_SIZE, limit) : PAGE_SIZE;

    const result = {
      data: [],
      limit,
      page,
      pageCount: 0,
      total: 0,
      keywords,
    };
    const skip = page > 0 ? ((page - 1) * limit) : 0;
    const dbQuery = { $text: { $search: `${keywords}` } };
    const score = { score: { $meta: 'textScore' } };

    result.total = await Coops.countDocuments(dbQuery);

    const coops = await Coops.find(dbQuery, score)
      .sort(score)
      .skip(skip)
      .limit(limit)
      .lean();

    result.data = JSON.parse(JSON.stringify(coops)); //  needed to prevent JSON serialization error
    result.pageCount = Math.ceil(result.total / PAGE_SIZE);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json(result);
  }
};
