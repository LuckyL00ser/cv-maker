import {PencilLine} from 'lucide-react'

interface SkillsSectionProps {
    skills: ISkills;
    sectionId?: string;
    itemRange?: [number, number];
}

export default function SkillsSection({ skills, sectionId, itemRange }: SkillsSectionProps) {
    const allEntries = Object.entries(skills.skillGroup);
    const entries = itemRange ? allEntries.slice(itemRange[0], itemRange[1]) : allEntries;
    if (entries.length === 0) return null;

    return (
        <section data-section-id={sectionId}>
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1 flex gap-2 items-center"><PencilLine />Skills</h2>
            <div className="flex flex-col gap-4">
                {entries.map(([group, items]) => (
                    <div key={group} className="atomic-item">
                        <h3 className="font-semibold mb-1">{group}</h3>
                        <div className="flex flex-wrap gap-2">
                            {items.map((skill, i) => (
                                <span key={i} className="bg-gray-200 px-2 py-1 rounded text-xs">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
