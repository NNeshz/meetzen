import { SectionCards } from "@/modules/company/home/section-card";

export default function UserPage() {
    return <div className="pt-24 px-4">
        <div className="@container/main max-w-4xl mx-auto flex flex-col gap-4">
            <SectionCards />
            <SectionCards />
        </div>
    </div>;
}