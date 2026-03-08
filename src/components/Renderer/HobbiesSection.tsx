import {Sailboat} from 'lucide-react'

interface HobbiesSectionProps {
    hobbies: IHobbies | null;
    sectionId?: string;
}

export default function HobbiesSection({ hobbies, sectionId }: HobbiesSectionProps) {
    if (!hobbies || hobbies.hobbies.length === 0) return null;

    return (
        <section data-section-id={sectionId}>
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1 flex gap-2 items-center"><Sailboat />Hobbies</h2>
            <ul className="list-disc list-inside atomic-item">
                {hobbies.hobbies.map((hobby, index) => (
                    <li key={index}>{hobby}</li>
                ))}
            </ul>
        </section>
    )
}
