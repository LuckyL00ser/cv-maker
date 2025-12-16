interface SkillsSectionProps {
    skills: ISkills;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
    if (Object.keys(skills.skillGroup).length === 0) return null;

    return (
        <section>
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Skills</h2>
            <div className="flex flex-col gap-4">
                {Object.entries(skills.skillGroup).map(([group, items]) => (
                    <div key={group}>
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
