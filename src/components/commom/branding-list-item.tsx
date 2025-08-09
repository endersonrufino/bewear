import Image from "next/image";
import Link from "next/link";

interface Branding {
    id: string
    title: string;
    img: string
}

interface BrandingListItemProps {
    branding: Branding
}

export default function BrandingListItem({ branding }: BrandingListItemProps) {
    return (
        <Link href="/" className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center w-32 h-32 border-3 border-[#F1F1F1] rounded-4xl bg-white">
                <Image src={branding.img} alt={branding.title} width={50} height={50} />
            </div>
            <div className="max-w-[200px] text-center">
                <p className="truncate text-sm font-semibold">{branding.title}</p>
            </div>
        </Link>
    )
}