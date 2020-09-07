import Mongoose from 'mongoose'

export const UserSchema = new Mongoose.Schema({
  ONEmUserId: { type: String },
  aboutMe: { type: String },
  authorAbout: { type: String },
  authorPermissions: { type: String },
  myPhoto: { type: String },
  media: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  title: { type: String },
  locale: { type: String },
  address: { type: String },
  country: { type: String },
  region: { type: String },
  activeProfile: { type: String },
  activeSetting: { type: String },
  searchRegion: { type: String, default: 'official' },
  searchType: { type: String, default: 'all' },
  nickName: { type: String },
  email: { type: String },
  rating: { type: String },
  currency: { type: String },
  data: { type: Object },
  farmer: { type: Boolean, default: true },
  landHectares: { type: Number, default: 0 },
  commodities: { type: String },
  fertilizer: { type: Boolean, default: false },
  loan: { type: Boolean, default: false },
  seeds: { type: Boolean, default: false },
  workers: { type: Boolean, default: false },
  equipment: { type: Boolean, default: false },
  classifieds: { type: Boolean, default: true },
  activities: { type: Boolean, default: true },
  faqs: { type: Boolean, default: true },
  forums: { type: Boolean, default: true },
  _forum: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'forums',
    required: false
  },
  _coop: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'coops',
    required: false
  },
  coopsCount: { type: Number, default: 0 },
  program: { type: Object },
  notifications: { type: Boolean, default: true },
  messaging: { type: Boolean, default: true },
  threads: { type: Boolean, default: false },
  directory: { type: Boolean, default: true },
  preApprovalCode: { type: String },
  welcomeMessage: { type: String },
  master: { type: Boolean },
  lastSearch: { type: String }
}, {
  timestamps: true
})

// The * denotes that the field is in active use
export const CoopSchema = new Mongoose.Schema({
  ONEmUserId: { type: String }, // * User ID from Sub This is the owner's ONEm ID
  _user: { // This is the owners User _id
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  accountType: { type: String, default: 'Free' }, // Free or paid when we were going to have premium
  memberLimit: { type: Number, default: 20 }, // * used to limit how many members there are
  official: { type: Boolean, default: false }, // was used to denote just listed or owned and controlled
  registration: { type: String }, // CDA field
  banner: { type: String }, // * multimedia content
  unsplash: { type: String }, // * the author id used for owned unsplash accounts
  country: { type: String }, // * country
  city: { type: String }, // * city
  state: { type: String }, // * state
  postCode: { type: String }, // * post code
  loc: { // * geo coordinates for their location
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  // lat: { type: String }, // * lat
  // lon: { type: String }, // * lon
  facebookUrl: { type: String }, // * FB link
  linkedInUrl: { type: String }, // * Ln link
  webUrl: { type: String }, // * Web link
  googleMapsUrl: { type: String }, // * country google map link may be exact link with directions etc.
  directory: { type: String }, // * default true false if don't want to be listed now it is hiddent and not accessible
  marketplace: { type: String }, // * default true false if don't want to be listed now it is hiddent and not accessible
  currency: { type: String }, // * currency code
  name: { type: String }, // * Official name of cooperative
  region: { type: String }, // CDA field
  province: { type: String }, // CDA field
  municipality: { type: String }, // CDA field
  address: { type: String }, // * Street address
  startDate: { type: String }, // CDA field
  category: { type: String }, // CDA field
  type: { type: String }, // CDA field
  status: { type: String }, // CDA field
  size: { type: String }, // CDA field
  membership: { type: String }, // CDA field
  members: { type: Number, default: 0 }, // Was used to avoid having to recount, but not anymore
  contact: { type: String }, // * Name of official contact
  title: { type: String }, // * Title of official contact
  description: { type: String }, // * Desscription of the community
  telephone: { type: String }, // * telephone
  fax: { type: String }, // * fax
  email: { type: String }, // * email
  inviteEmails: { type: Object }, // Original invites not used any longer but still holds the original data
  area: { type: String }, // CDA field
  activity: { type: String }, // * From a pick list of activities
  report: { type: Array }, // * Storage for reports
  businessVolume: { type: Number }, // CDA field
  premiumModules: { type: Date }, // Not used anymore was for premium
  howToJoin: { type: String }, // * Button for how to join drop down list
  likes: { type: Number }, // * How many likes
  views: { type: Number }, // * How many views
  menus: { type: Object }, // * Main menu definitions ( for future translations )
  data: { type: Object } // * place holder for other data
}, {
  timestamps: true
});

export const ClassifiedsSchema = new Mongoose.Schema({
  _coop: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'coops',
    required: true
  },
  _user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  country: { type: String },
  city: { type: String },
  views: { type: Number },
  messages: { type: Number },
  nickName: { type: String },
  type: { type: String },
  status: { type: String },
  title: { type: String },
  description: { type: String },
  visibility: { type: String },
  media: { type: String },
  price: { type: Number }
}, {
  timestamps: true
});

