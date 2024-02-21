import { contentfulClient } from "@/app/lib/contentful";
import { NextResponse } from "next/server";
import { Biography } from "@/app/types";

export const GET = async (): Promise<NextResponse<Biography>> => {
  const entries = await contentfulClient.getEntries();
  if (entries) {
    const services = entries.items.find(
      (item: any) => item.fields.name === "services"
    );
    if (services) {
      return NextResponse.json(services);
    } else {
      throw new Error("Biography entry not found");
    }
  } else {
    throw new Error("Failed to fetch entries");
  }
};
