export interface Photo {
  id: number;
  url: string;
  caption: string;
  category: 'all' | 'living' | 'bedroom' | 'kitchen' | 'outdoor' | 'bath';
  aspectRatio?: string;
}

export interface Amenity {
  id: string;
  name: string;
  category: string;
  iconName: string;
  highlight?: boolean;
  notReported?: boolean;
  description?: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorInitial?: string;
  authorLocation?: string;
  yearsOnAirbnb: string;
  date: string;
  rating: number;
  comment: string;
}

export interface Bedroom {
  id: string;
  name: string;
  bedType: string;
  bedCount: string;
  image: string;
}

export interface CoHost {
  name: string;
  avatar: string;
  initial?: string;
  role?: string;
}

export interface Host {
  name: string;
  isSuperhost: boolean;
  avatar: string;
  joinedDate: string;
  reviewsCount: number;
  rating: number;
  yearsHosting: number;
  responseRate: string;
  responseTime: string;
  education?: string;
  bornIn?: string;
  bio: string;
  work?: string;
  languages?: string[];
  coHosts?: CoHost[];
}

export interface NearbyStay {
  id: string;
  title: string;
  location: string;
  subtitle: string;
  dates: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  image: string;
  isGuestFavorite?: boolean;
}

export interface ListingData {
  id: string;
  title: string;
  location: string;
  city: string;
  state: string;
  country: string;
  neighborhood: string;
  rating: number;
  reviewCount: number;
  isSuperhost: boolean;
  isGuestFavorite: boolean;
  propertyType: string;
  guestsCount: number;
  bedroomsCount: number;
  bedsCount: number;
  bathsCount: number;
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  taxes: number;
  description: string;
  spaceDescription: string;
  guestAccess: string;
  otherNotes: string;
  highlights: {
    icon: string;
    title: string;
    description: string;
  }[];
  ratingsBreakdown: {
    cleanliness: number;
    accuracy: number;
    communication: number;
    location: number;
    checkIn: number;
    value: number;
  };
  photos: Photo[];
  bedrooms: Bedroom[];
  amenities: Amenity[];
  reviews: Review[];
  host: Host;
  houseRules: string[];
  safetyProperty: string[];
  cancellationPolicy: string;
}

export interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}
