import Record from "./Record"

interface ExperienceItemProps {
    value: IExperienceItem;
    onChange: (value: IExperienceItem) => void;
}


export default function ExperienceItem(props: ExperienceItemProps) {
    const { position, company, startDate, endDate, plainDescription, bulletedDescription } = props.value;

    const handleAddBullet = () => {
        const newBullets = bulletedDescription ? [...bulletedDescription, ''] : [''];
        props.onChange({ ...props.value, bulletedDescription: newBullets });
    };

    const handleEditBullet = (index: number, value: string) => {
        if (bulletedDescription) {
            const newBullets = [...bulletedDescription];
            newBullets[index] = value;
            props.onChange({ ...props.value, bulletedDescription: newBullets });
        }
    };

    const handleRemoveBullet = (index: number) => {
        if (bulletedDescription) {
            const newBullets = bulletedDescription.filter((_, i) => i !== index);
            props.onChange({ ...props.value, bulletedDescription: newBullets.length > 0 ? newBullets : null });
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-4">
                <Record
                    section="work-experience"
                    label="Position"
                    type="text"
                    value={position}
                    onChange={(value) => props.onChange({ ...props.value, position: value })}
                    placeholder="e.g. Software Engineer"
                />
                <Record
                    section="work-experience"
                    label="Company"
                    type="text"
                    value={company}
                    onChange={(value) => props.onChange({ ...props.value, company: value })}
                    placeholder="e.g. Google"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Record
                    section="work-experience"
                    label="Start Date"
                    type="date"
                    value={startDate.toISOString().substring(0, 10)}
                    onChange={(value) => props.onChange({ ...props.value, startDate: new Date(value) })}
                />
                <Record
                    section="work-experience"
                    label="End Date"
                    type="date"
                    value={endDate ? endDate.toISOString().substring(0, 10) : ''}
                    onChange={(value) => props.onChange({ ...props.value, endDate: new Date(value) })}
                />
            </div>
            <Record
                section="work-experience"
                label="Description"
                type="text"
                value={plainDescription ? plainDescription : ''}
                onChange={(value) => props.onChange({ ...props.value, plainDescription: value })}
                placeholder="Short description of your role"
            />

            <div className="mt-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1 mb-2 block">Bullet Points</label>
                <div className="flex flex-col gap-2">
                    {bulletedDescription && bulletedDescription.length > 0 && bulletedDescription.map((bullet, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 ml-1"></div>
                            <input
                                type="text"
                                value={bullet}
                                onChange={(e) => handleEditBullet(index, e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white text-gray-800 text-sm shadow-sm"
                                placeholder="Enter achievement or responsibility"
                            />
                            <button
                                onClick={() => handleRemoveBullet(index)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleAddBullet}
                    className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 px-1"
                >
                    <span>+</span> Add Bullet Point
                </button>
            </div>
        </div>
    )
}