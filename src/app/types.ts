import { Document } from "@contentful/rich-text-types";

export type ImageAsset = {
  fields: { name: string; file: { url: string } };
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

export type Biography = {
  fields: {
    name: string;
    profilePicture: ImageAsset;
    text: Document;
  };
};

export type AudioFile = {
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        size: number;
      };
      fileName: string;
      contentType: string;
    };
  };
};

export type AudioFiles = {
  fields: { name: string; files: AudioFile[] };
};
