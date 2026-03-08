import { A4_HEIGHT_PX, A4_WIDTH_PX } from "../../utils/constants";

export default function Page({children}: {children: React.ReactNode}) {
    return (
        <div className="a4-page bg-white shadow-lg mx-auto p-8 text-sm text-gray-800 flex flex-col" style={{ width: A4_WIDTH_PX, minHeight: A4_HEIGHT_PX }}>
            {children}
        </div>
    );
}