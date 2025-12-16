import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { exampleCvData } from '../exampleCv'

interface CvState {
  cvData: ICvData
  setHeader: (header: IHeader) => void
  setExperience: (experience: IExperienceItem[]) => void
  setEducation: (education: IEducationItem[]) => void
  setSkills: (skills: ISkills) => void
  setHobbies: (hobbies: IHobbies | null) => void
  setCvData: (cvData: ICvData) => void
  moveExperienceItem: (index: number, direction: 'up' | 'down') => void
  moveEducationItem: (index: number, direction: 'up' | 'down') => void
}

export const useCvStore = create<CvState>()(
  persist(
    (set) => ({
      cvData: exampleCvData,
      setHeader: (header) => set((state) => ({ cvData: { ...state.cvData, header } })),
      setExperience: (experience) => set((state) => ({ cvData: { ...state.cvData, experience } })),
      setEducation: (education) => set((state) => ({ cvData: { ...state.cvData, education } })),
      setSkills: (skills) => set((state) => ({ cvData: { ...state.cvData, skills } })),
      setHobbies: (hobbies) => set((state) => ({ cvData: { ...state.cvData, hobbies } })),
      setCvData: (cvData) => set({ cvData }),
      moveExperienceItem: (index, direction) =>
        set((state) => {
          const newExperience = [...state.cvData.experience]
          if (direction === 'up' && index > 0) {
            ;[newExperience[index], newExperience[index - 1]] = [newExperience[index - 1], newExperience[index]]
          } else if (direction === 'down' && index < newExperience.length - 1) {
            ;[newExperience[index], newExperience[index + 1]] = [newExperience[index + 1], newExperience[index]]
          }
          return { cvData: { ...state.cvData, experience: newExperience } }
        }),
      moveEducationItem: (index, direction) =>
        set((state) => {
          const newEducation = [...state.cvData.education]
          if (direction === 'up' && index > 0) {
            ;[newEducation[index], newEducation[index - 1]] = [newEducation[index - 1], newEducation[index]]
          } else if (direction === 'down' && index < newEducation.length - 1) {
            ;[newEducation[index], newEducation[index + 1]] = [newEducation[index + 1], newEducation[index]]
          }
          return { cvData: { ...state.cvData, education: newEducation } }
        }),
    }),
    {
      name: 'cv-maker-storage',
    }
  )
)
