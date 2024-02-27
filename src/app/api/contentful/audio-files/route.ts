import { contentfulClient } from "@/app/lib/contentful";
import { AudioFiles } from "@/app/types";
import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse<AudioFiles>> => {
  const entries = await contentfulClient.getEntries();
  // console.log("Entries: ", entries.items);
  if (entries) {
    const audioFiles = entries.items.find(
      (item: any) => item.fields.name === "audio-files"
    );
    if (audioFiles) {
      return NextResponse.json(audioFiles);
    } else {
      throw new Error("audioFiles entry not found");
    }
  } else {
    throw new Error("Failed to fetch entries");
  }
};
