import { useCvStore } from "../../store/useCvStore"

export default function HobbiesSection() {
    const { cvData, setHobbies } = useCvStore()
    const hobbies = cvData.hobbies?.hobbies || []
    const onChange = setHobbies

    const handleAddHobby = () => {
        const newHobbies = [...hobbies, '']
        onChange({ hobbies: newHobbies })
    }

    const handleEditHobby = (index: number, value: string) => {
        const newHobbies = [...hobbies]
        newHobbies[index] = value
        onChange({ hobbies: newHobbies })
    }

    const handleRemoveHobby = (index: number) => {
        const newHobbies = hobbies.filter((_, i) => i !== index)
        onChange(newHobbies.length > 0 ? { hobbies: newHobbies } : null)
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 transition-all hover:shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                Hobbies
            </h2>
            <div className="flex flex-col gap-3">
                {hobbies.length > 0 && hobbies.map((hobby, index) => (
                    <div key={index} className="flex items-center bg-gray-50 border border-gray-200 rounded-md shadow-sm overflow-hidden group focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500">
                        <input
                            type="text"
                            value={hobby}
                            onChange={(e) => handleEditHobby(index, e.target.value)}
                            className="flex-1 px-3 py-2 bg-transparent border-none focus:ring-0 text-sm"
                            placeholder="Enter hobby"
                        />
                        <button
                            onClick={() => handleRemoveHobby(index)}
                            className="px-3 py-2 text-gray-400 hover:text-red-500 hover:bg-red-50 border-l border-gray-200 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>
                        </button>
                    </div>
                ))}
                <button
                    onClick={handleAddHobby}
                    className="mt-2 w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-medium hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-sm"
                >
                    <span>+</span> Add Hobby
                </button>
            </div>
        </div>
    )
}
