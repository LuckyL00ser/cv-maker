import {GraduationCap} from 'lucide-react'

interface EducationSectionProps {
    education: IEducationItem[];
    sectionId?: string;
    itemRange?: [number, number];
}

export default function EducationSection({ education, sectionId, itemRange }: EducationSectionProps) {
    const items = itemRange ? education.slice(itemRange[0], itemRange[1]) : education;
    if (items.length === 0) return null;

    return (
        <section data-section-id={sectionId}>
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1 flex gap-2 items-center"><GraduationCap /> Education</h2>
            <div className="flex flex-col gap-4">
                {items.map((item, index) => (
                    <div key={index} className="atomic-item">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-md mr-3">{item.degree}</h3>
                            <span className="text-xs text-gray-500 text-nowrap">
                                {item.startDate.toLocaleDateString()} - {item.endDate ? item.endDate.toLocaleDateString() : 'Present'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold italic">{item.institution}</span>
                            {item.locaton && <span className="text-xs text-gray-500">{item.locaton}</span>}
                        </div>
                        {item.description && <p>{item.description}</p>}
                    </div>
                ))}
            </div>
        </section>
    )
}

// export function EducationBlock({ institution, degree, startDate, endDate, locaton, description, key }: EducationBlockProps) {

//     return (
//         <div key={key}>
//             <div className="flex justify-between items-baseline">
//                 <h3 className="font-bold text-md mr-3">{degree}</h3>
//                 <span className="text-xs text-gray-500 text-nowrap">
//                     {startDate.toLocaleDateString()} - {endDate ? endDate.toLocaleDateString() : 'Present'}
//                 </span>
//             </div>
//             <div className="flex justify-between items-center mb-1">
//                 <span className="font-semibold italic">{institution}</span>
//                 {locaton && <span className="text-xs text-gray-500">{locaton}</span>}
//             </div>
//             {description && <p>{description}</p>}
//         </div>
//     )
// }
