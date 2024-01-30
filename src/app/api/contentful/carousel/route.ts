import { NextResponse } from "next/server";
import { Entry } from "../../../types";
import { contentfulClient } from "@/app/lib/contentful";

export const GET = async (): Promise<NextResponse<Entry>> => {
  const entries = await contentfulClient.getEntries();
  if (entries) {
    const carouselImages = entries.items.find(
      (item: Entry) => item.fields.name === "instruments"
    );
    if (carouselImages) {
      return NextResponse.json(carouselImages);
    } else {
      throw new Error("Carousel images entry not found");
    }
  } else {
    throw new Error("Failed to fetch entries");
  }
};
