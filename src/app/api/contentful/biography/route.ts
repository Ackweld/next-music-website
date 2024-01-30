import { contentfulClient } from "@/app/lib/contentful";
import { NextResponse } from "next/server";
import { Biography } from "@/app/types";

export const GET = async (): Promise<NextResponse<Biography>> => {
  const entries = await contentfulClient.getEntries();
  if (entries) {
    const biography = entries.items.find(
      (item: any) => item.fields.name === "biography"
    );
    if (biography) {
      return NextResponse.json(biography);
    } else {
      throw new Error("Biography entry not found");
    }
  } else {
    throw new Error("Failed to fetch entries");
  }
};
