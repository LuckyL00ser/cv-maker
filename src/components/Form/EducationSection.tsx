import { useCvStore } from "../../store/useCvStore"
import EducationItem from "./EducationItem"

export default function EducationSection() {
    const { cvData, setEducation, moveEducationItem } = useCvStore()
    const educationItems = cvData.education
    const onChange = setEducation
    const onMove = moveEducationItem

    const handleItemChange = (index: number, value: IEducationItem) => {
        const newItems = [...educationItems]
        newItems[index] = value
        onChange(newItems)
    }

    const handleAddEducation = () => {
        onChange([...educationItems, {
            degree: '',
            institution: '',
            locaton: null,
            startDate: new Date(),
            endDate: null,
            description: ''
        }])
    }

    const handleRemoveEducation = (index: number) => {
        onChange(educationItems.filter((_, i) => i !== index))
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 transition-all hover:shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                Education
            </h2>
            <div className="flex flex-col gap-6">
                {educationItems.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 group">
                        <div className="flex justify-end mb-2 gap-2">
                            <button
                                onClick={() => onMove(index, 'up')}
                                disabled={index === 0}
                                className="text-xs text-gray-400 hover:text-blue-500 font-medium flex items-center gap-1 transition-colors disabled:opacity-30 disabled:hover:text-gray-400"
                                title="Move up"
                            >
                                ▲
                            </button>
                            <button
                                onClick={() => onMove(index, 'down')}
                                disabled={index === educationItems.length - 1}
                                className="text-xs text-gray-400 hover:text-blue-500 font-medium flex items-center gap-1 transition-colors disabled:opacity-30 disabled:hover:text-gray-400"
                                title="Move down"
                            >
                                ▼
                            </button>
                            <div className="w-px h-4 bg-gray-200 mx-1"></div>
                            <button
                                onClick={() => handleRemoveEducation(index)}
                                className="text-xs text-gray-400 hover:text-red-500 font-medium flex items-center gap-1 transition-colors"
                                title="Remove education"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                                Remove
                            </button>
                        </div>
                        <EducationItem
                            value={item}
                            onChange={(value) => handleItemChange(index, value)}
                        />
                    </div>
                ))}
            </div>
            <button
                onClick={handleAddEducation}
                className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-medium hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
            >
                <span>+</span> Add Education
            </button>
        </div>
    )
}
