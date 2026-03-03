import {Sailboat} from 'lucide-react'

interface HobbiesSectionProps {
    hobbies: IHobbies | null;
}

export default function HobbiesSection({ hobbies }: HobbiesSectionProps) {
    if (!hobbies || hobbies.hobbies.length === 0) return null;

    return (
        <section>
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1 flex gap-2 items-center"><Sailboat />Hobbies</h2>
            <ul className="list-disc list-inside">
                {hobbies.hobbies.map((hobby, index) => (
                    <li key={index}>{hobby}</li>
                ))}
            </ul>
        </section>
    )
}
