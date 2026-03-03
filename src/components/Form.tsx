import AchievementSection from "./Form/AchievementSection"
import EducationSection from "./Form/EducationSection"
import ExperienceSection from "./Form/ExperienceSection"
import HeaderSection from "./Form/HeaderSection"
import HobbiesSection from "./Form/HobbiesSection"
import SkillsSection from "./Form/SkillsSection"

export default function Form() {
    return (
        <div className="flex flex-col gap-4 p-4">
            <HeaderSection />
            <ExperienceSection />
            <EducationSection />
            <SkillsSection />
            <AchievementSection />
            <HobbiesSection />
        </div>
    )
}