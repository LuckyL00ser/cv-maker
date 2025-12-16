import { useCvStore } from "../store/useCvStore"
import EducationSection from "./Renderer/EducationSection";
import ExperienceSection from "./Renderer/ExperienceSection";
import HeaderSection from "./Renderer/HeaderSection";
import HobbiesSection from "./Renderer/HobbiesSection";
import SkillsSection from "./Renderer/SkillsSection";

export default function Renderer() {
    const { cvData } = useCvStore()
    const { header, experience, education, skills, hobbies } = cvData;

    return (
        <div className="a4-page bg-white shadow-lg mx-auto p-8 text-sm text-gray-800" style={{ width: '210mm', minHeight: '297mm' }}>
            <HeaderSection header={header} />

            <div className="grid grid-cols-12 gap-6">
                {/* Main Content Column (Experience & Education) */}
                <div className="col-span-8 flex flex-col gap-6">
                    <ExperienceSection experience={experience} />
                    <EducationSection education={education} />
                </div>

                {/* Sidebar Column (Skills & Hobbies) */}
                <div className="col-span-4 flex flex-col gap-6">
                    <SkillsSection skills={skills} />
                    <HobbiesSection hobbies={hobbies} />
                </div>
            </div>
        </div>
    );
}
