import {GraduationCap} from 'lucide-react'

interface EducationSectionProps {
    education: IEducationItem[];
}

export default function AchievementSection({ education }: EducationSectionProps) {
    if (education.length === 0) return null;

    return (
        <section>
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1 flex gap-2 items-center"><GraduationCap /> Education</h2>
            <div className="flex flex-col gap-4">
                {education.map((item, index) => (
                    <div key={index}>
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
