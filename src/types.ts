export interface StoryDay {
  day: number;
  title: string;
  story: string;
  isUnlocked: boolean;
  image?: string;
}

export interface GalleryItem {
  id: number;
  url: string;
  compliment: string;
}

export interface LoveJourneyState {
  partnerName: string;
  partnerCompliment: string;
  startDate: string; // ISO String or YYYY-MM-DD
  mainPhotoUrl: string;
  daysStory: StoryDay[];
  galleryItems: GalleryItem[];
  heartfeltLetter: string;
  musicUrl: string;
}
