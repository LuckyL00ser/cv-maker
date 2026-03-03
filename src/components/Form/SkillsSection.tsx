import { useState } from "react"
import { useCvStore } from "../../store/useCvStore"

export default function SkillsSection() {
    const { cvData, setSkills } = useCvStore()
    const value = cvData.skills
    const onChange = setSkills
    const [newGroupName, setNewGroupName] = useState("")

    const handleAddGroup = () => {
        if (newGroupName.trim()) {
            const newSkills = {
                skillGroup: {
                    ...value.skillGroup,
                    [newGroupName]: []
                }
            }
            onChange(newSkills)
            setNewGroupName("")
        }
    }

    const handleRemoveGroup = (groupName: string) => {
        const newSkills = { ...value.skillGroup }
        delete newSkills[groupName]
        onChange({ skillGroup: newSkills })
    }

    const handleAddSkill = (groupName: string) => {
        const newSkills = { ...value.skillGroup }
        newSkills[groupName] = [...(newSkills[groupName] || []), '']
        onChange({ skillGroup: newSkills })
    }

    const handleEditSkill = (groupName: string, index: number, skillValue: string) => {
        const newSkills = { ...value.skillGroup }
        newSkills[groupName] = [...newSkills[groupName]]
        newSkills[groupName][index] = skillValue
        onChange({ skillGroup: newSkills })
    }

    const handleRemoveSkill = (groupName: string, index: number) => {
        const newSkills = { ...value.skillGroup }
        newSkills[groupName] = newSkills[groupName].filter((_, i) => i !== index)
        onChange({ skillGroup: newSkills })
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 transition-all hover:shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                Skills
            </h2>
            <div className="flex flex-col gap-6">
                {Object.entries(value.skillGroup).map(([groupName, skills]) => (
                    <div key={groupName} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold text-gray-700">{groupName}</h3>
                            <button
                                onClick={() => handleRemoveGroup(groupName)}
                                className="text-xs text-red-500 hover:text-red-700 font-medium"
                            >
                                Remove Group
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {skills.map((skill, index) => (
                                <div key={index} className="flex items-center bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden group focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500">
                                    <input
                                        type="text"
                                        value={skill}
                                        onChange={(e) => handleEditSkill(groupName, index, e.target.value)}
                                        className="flex-1 px-3 py-1.5 text-sm border-none focus:ring-0 w-32"
                                        placeholder="Skill"
                                    />
                                    <button
                                        onClick={() => handleRemoveSkill(groupName, index)}
                                        className="px-2 py-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 border-l border-gray-100 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => handleAddSkill(groupName)}
                            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
                        >
                            <span>+</span> Add Skill
                        </button>
                    </div>
                ))}

                <div className="flex gap-2 items-center mt-2 pt-4 border-t border-gray-100">
                    <input
                        type="text"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddGroup()}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white text-gray-800 text-sm shadow-sm"
                        placeholder="New skill group (e.g. Languages)"
                    />
                    <button
                        onClick={handleAddGroup}
                        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium shadow-sm"
                    >
                        Add Group
                    </button>
                </div>
            </div>
        </div>
    )
}
