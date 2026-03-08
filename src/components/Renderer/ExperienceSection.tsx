import {ScrollText} from 'lucide-react'

interface ExperienceSectionProps {
    experience: IExperienceItem[];
    sectionId?: string;
    itemRange?: [number, number]; // [start, end) — if omitted, render all
}

export default function ExperienceSection({ experience, sectionId, itemRange }: ExperienceSectionProps) {
    const items = itemRange ? experience.slice(itemRange[0], itemRange[1]) : experience;
    if (items.length === 0) return null;

    return (
        <section data-section-id={sectionId}>
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1 flex gap-2 items-center"><ScrollText />Work Experience</h2>
            <div className="flex flex-col gap-4">
                {items.map((item, index) => (
                    <div key={index} className="atomic-item">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-md mr-3">{item.position}</h3>
                            <span className="text-xs text-gray-500">
                                {item.startDate.toLocaleDateString()} - {item.endDate ? item.endDate.toLocaleDateString() : 'Present'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold italic">{item.company}</span>
                            {item.location && <span className="text-xs text-gray-500">{item.location}</span>}
                        </div>
                        {item.plainDescription && <p className="mb-2">{item.plainDescription}</p>}
                        {item.bulletedDescription && item.bulletedDescription.length > 0 && (
                            <ul className="list-disc list-outside pl-4">
                                {item.bulletedDescription.map((bullet, i) => (
                                    <li key={i}>{bullet}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )

}