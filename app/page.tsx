import { MainForm } from "@/components/blocks/MainForm";
import Details from "@/components/blocks/Details";

export default function Home() {
    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 pt-10">
            <div className="bg-white rounded-3xl flex overflow-hidden min-h-[650px]">
                <div className="w-1/2 p-10">
                    <MainForm />
                </div>
                <div className="w-1/2 p-10 bg-slate-900 rounded-bl-[80px]">
                    <Details />
                </div>
            </div>
        </div>
    );
}
