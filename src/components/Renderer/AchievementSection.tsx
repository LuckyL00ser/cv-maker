import { Goal } from 'lucide-react'

interface AchievementSectionProps {
    achievements: IAchievementItem[];
    sectionId?: string;
    itemRange?: [number, number];
}

export default function AchievementSection({ achievements, sectionId, itemRange }: AchievementSectionProps) {
    const items = itemRange ? achievements.slice(itemRange[0], itemRange[1]) : achievements;
    if (items.length === 0) return null;

    return (
        <section data-section-id={sectionId}>
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1 flex gap-2 items-center"><Goal /> Achievements</h2>
            <div className="flex flex-col gap-4">
                {items.map((item, index) => (
                        <div key={index} className="flex justify-between atomic-item">
                            <div>
                                <h3 className="font-bold text-md mr-3">{item.title}</h3>
                                {item. description && <p>{item.description}</p>}
                                {item.link && (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                                        {item.link}
                                    </a>
                                )}
                            </div>
                            <div className='flex flex-col'>
                                <span className="text-xs text-gray-500 text-nowrap">
                                    {item.date.toLocaleDateString()}
                                </span>
                                {location && <span className="text-xs text-gray-500 grow text-end">{item.location}</span>}
                            </div>
                        </div>

                ))}
            </div>
        </section>
    )
}

// export function AchievementBlock({ title, description, location, date, link, key }: AchievementBlockProps) {
//     return (
        // <div key={key}>
        //     <div className="flex justify-between">
        //         <div>
        //             <h3 className="font-bold text-md mr-3">{title}</h3>
        //             {description && <p>{description}</p>}
        //             {link && (
        //                 <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
        //                     {link}
        //                 </a>
        //             )}
        //         </div>
        //         <div className='flex flex-col'>
        //             <span className="text-xs text-gray-500 text-nowrap">
        //                 {date.toLocaleDateString()}
        //              </span>
        //              {location && <span className="text-xs text-gray-500 grow text-end">{location}</span>}
        //          </div>
        //      </div>

        //  </div>
//     )
// }