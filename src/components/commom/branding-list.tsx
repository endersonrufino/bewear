"use client"

import { BrandingListType } from "@/types/branding-list-type";

import BrandingListItem from "./branding-list-item"

export default function BrandingList({ title, brandings }: BrandingListType) {

    return (
        <div className="space-y-6">
            <h3 className="font-semibold px-5">{title}</h3>
            <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
                {brandings.map(branding => <BrandingListItem key={branding.id} branding={branding} />)}
            </div>
        </div>
    )
}