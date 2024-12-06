import { MainForm } from "@/components/blocks/MainForm";
export default function Home() {
    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 pt-10">
            <div className="space-y-10 divide-y divide-gray-900/10">
                <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                    <div className="px-4 sm:px-0">
                        <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>
                    </div>

                    <MainForm />

                </div>
            </div>
        </div>
    );
}
