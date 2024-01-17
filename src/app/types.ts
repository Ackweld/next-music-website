export type ImageAsset = {
  fields: { file: { url: string } };
};
export type Entry = {
  fields: { name: string; images: ImageAsset[] };
};

export type Video = {
  fields: {
    name: string;
    videoLink: string;
    thumbnail: {
      fields: {
        title: string;
        file: { url: string };
      };
    };
  };
};

export type Thumbnails = {
  fields: { name: string; videos: Video[] };
};
