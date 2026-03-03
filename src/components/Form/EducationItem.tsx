import Record from "./Record"

interface EducationItemProps {
    value: IEducationItem;
    onChange: (value: IEducationItem) => void;
}

export default function EducationItem(props: EducationItemProps) {
    const { degree, institution, locaton, startDate, endDate, description } = props.value;

    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-4">
                <Record
                    section="education"
                    label="Degree"
                    type="text"
                    value={degree}
                    onChange={(value) => props.onChange({ ...props.value, degree: value })}
                    placeholder="e.g. Bachelor of Science"
                />
                <Record
                    section="education"
                    label="Institution"
                    type="text"
                    value={institution}
                    onChange={(value) => props.onChange({ ...props.value, institution: value })}
                    placeholder="e.g. University of Technology"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Record
                    section="education"
                    label="Location"
                    type="text"
                    value={locaton ? locaton : ''}
                    onChange={(value) => props.onChange({ ...props.value, locaton: value || null })}
                    placeholder="e.g. New York, NY"
                />
                <div className="grid grid-cols-2 gap-2">
                    <Record
                        section="education"
                        label="Start Date"
                        type="date"
                        value={startDate.toISOString().substring(0, 10)}
                        onChange={(value) => props.onChange({ ...props.value, startDate: new Date(value) })}
                    />
                    <Record
                        section="education"
                        label="End Date"
                        type="date"
                        value={endDate ? endDate.toISOString().substring(0, 10) : ''}
                        onChange={(value) => props.onChange({ ...props.value, endDate: new Date(value) })}
                    />
                </div>
            </div>
            <Record
                section="education"
                label="Description"
                type="text"
                value={description ? description : ''}
                onChange={(value) => props.onChange({ ...props.value, description: value })}
                placeholder="Additional details about your studies"
            />
        </div>
    )
}
