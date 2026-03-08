import Record from "./Record"

interface EducationItemProps {
    value: IAchievementItem;
    onChange: (value: IAchievementItem) => void;
}

export default function AchievementItem(props: EducationItemProps) {
    const { title, location, date, link, description } = props.value;

    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-4">
                <Record
                    section="achievement"
                    label="Title"
                    type="text"
                    value={title}
                    onChange={(value) => props.onChange({ ...props.value, title: value })}
                    placeholder="e.g. Won a hackathon XYZ"
                />
                <Record
                    section="achievement"
                    label="Description"
                    type="text"
                    value={description}
                    onChange={(value) => props.onChange({ ...props.value, description: value })}
                    placeholder="e.g. built a cutting-edge dashboard"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Record
                    section="achievement"
                    label="Location"
                    type="text"
                    value={location ? location : ''}
                    onChange={(value) => props.onChange({ ...props.value, location: value || null })}
                    placeholder="e.g. New York, NY"
                />
                <Record
                    section="achievement"
                    label="Start Date"
                    type="date"
                    value={date?.toISOString().substring(0, 10)}
                    onChange={(value) => props.onChange({ ...props.value, date: new Date(value) })}
                />
            </div>
            <Record
                section="achievement"
                label="Link"
                type="text"
                value={link ? link : ''}
                onChange={(value) => props.onChange({ ...props.value, link: value })}
                placeholder="Optional link to achievement"
            />
        </div>
    )
}
