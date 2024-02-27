import { contentfulClient } from "@/app/lib/contentful";
import { NextResponse } from "next/server";
import { Biography } from "@/app/types";

//TODO: change type
export const GET = async (): Promise<NextResponse<Biography>> => {
  const entries = await contentfulClient.getEntries();
  if (entries) {
    const services = entries.items.find(
      (item: any) => item.fields.name === "equipment"
    );
    if (services) {
      return NextResponse.json(services);
    } else {
      throw new Error("Equipment entry not found");
    }
  } else {
    throw new Error("Failed to fetch entries");
  }
};
