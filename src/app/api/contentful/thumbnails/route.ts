import { NextResponse, NextRequest } from "next/server";
import { Thumbnails } from "../../../types";
import { contentfulClient } from "@/app/lib/contentful";

export const GET = async (): Promise<NextResponse<Thumbnails>> => {
  const entries = await contentfulClient.getEntries();
  if (entries) {
    const thumbnailsEntry = entries.items.find(
      (item: Thumbnails) => item.fields.name === "thumbnails"
    );
    if (thumbnailsEntry) {
      return NextResponse.json(thumbnailsEntry);
    } else {
      throw new Error("Thumbnails entry not found");
    }
  } else {
    throw new Error("Failed to fetch entries");
  }
};
