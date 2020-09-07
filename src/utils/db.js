import Mongoose from 'mongoose';
import * as config from '../../common/config';
import { CoopSchema, ClassifiedsSchema, UserSchema } from '../models/Models';

export const { ObjectId } = Mongoose.Types;

let isConnected = false;
let Coops = null;
let Classifieds = null;
let Users = null;
let activities = [];
const PAGE_SIZE = 24;

// eslint-disable-next-line import/prefer-default-export
export async function connect() {
  if (isConnected) {
    return {
      isConnected, Coops, activities, Users, Classifieds,
    };
  }

  try {
    const connection = await Mongoose.createConnection(config.dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    Coops = connection.model('coops', CoopSchema);
    Classifieds = connection.model('classifieds', ClassifiedsSchema);
    Users = connection.model('users', UserSchema);

    let act = await Coops.distinct('activity');
    act = act.filter((activity) => activity !== '');
    activities = act;

    isConnected = connection && connection.readyState === 1;
  } catch (error) {
    console.error(error);
  }
  return {
    isConnected,
    Coops,
    activities,
    Classifieds,
    Users,
  };
}

export async function pageQuery(
  model,
  query,
  queryOptions = {},
  sort,
  page = 1,
  limit = PAGE_SIZE,
) {
  try {
    if (!isConnected) {
      throw new Error('Not connected');
    }

    limit = String(limit === '0') ? PAGE_SIZE : limit;
    limit = limit ? Math.min(PAGE_SIZE, limit) : PAGE_SIZE;

    const result = {
      data: [],
      limit,
      page,
      pageCount: 0,
      total: 0,
    };

    const skip = page > 0 ? ((page - 1) * limit) : 0;

    result.total = await model.countDocuments(query);

    const data = await model.find(query, queryOptions)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    result.data = JSON.parse(JSON.stringify(data)); //  needed to prevent JSON serialization error
    result.pageCount = Math.ceil(result.total / PAGE_SIZE);

    return result;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
