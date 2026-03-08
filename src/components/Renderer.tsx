import React, { useLayoutEffect, useRef, useState } from "react";
import { useCvStore } from "../store/useCvStore";
import AchievementSection from "./Renderer/AchievementSection";
import EducationSection from "./Renderer/EducationSection";
import ExperienceSection from "./Renderer/ExperienceSection";
import HeaderSection from "./Renderer/HeaderSection";
import HobbiesSection from "./Renderer/HobbiesSection";
import Page from "./Renderer/Page";
import SkillsSection from "./Renderer/SkillsSection";
import { measureColumns, paginateColumn, type PageSectionSlice } from "../utils/contentPaginator";

interface PaginationState {
    leftPages: PageSectionSlice[][];
    rightPages: PageSectionSlice[][];
    pageCount: number;
}

function renderSlice(slice: PageSectionSlice, cvData: ICvData): React.ReactNode {
    const { sectionId, startIndex, endIndex } = slice;
    const range: [number, number] = [startIndex, endIndex];

    switch (sectionId) {
        case 'experience':
            return <ExperienceSection key={`${sectionId}-${startIndex}`} experience={cvData.experience} itemRange={range} />;
        case 'education':
            return <EducationSection key={`${sectionId}-${startIndex}`} education={cvData.education} itemRange={range} />;
        case 'achievements':
            return cvData.achievements
                ? <AchievementSection key={`${sectionId}-${startIndex}`} achievements={cvData.achievements} itemRange={range} />
                : null;
        case 'hobbies':
            return <HobbiesSection key={sectionId} hobbies={cvData.hobbies} />;
        case 'skills':
            return <SkillsSection key={`${sectionId}-${startIndex}`} skills={cvData.skills} itemRange={range} />;
        default:
            return null;
    }
}

export default function Renderer() {
    const { cvData } = useCvStore();
    const ghostRef = useRef<HTMLDivElement>(null);
    const [pagination, setPagination] = useState<PaginationState | null>(null);

    useLayoutEffect(() => {
        if (!ghostRef.current) return;

        // Measure A4 content height from the ghost sentinel element
        const sentinelEl = ghostRef.current.querySelector('[data-page-height-sentinel]') as HTMLElement | null;
        const pageContentHeight = sentinelEl ? sentinelEl.offsetHeight : 1058;

        const { leftColumn, rightColumn, headerHeight } = measureColumns(ghostRef.current);

        const leftPages = paginateColumn(leftColumn, pageContentHeight, headerHeight);
        const rightPages = paginateColumn(rightColumn, pageContentHeight, headerHeight);

        const pageCount = Math.max(leftPages.length, rightPages.length);
        while (leftPages.length < pageCount) leftPages.push([]);
        while (rightPages.length < pageCount) rightPages.push([]);

        setPagination({ leftPages, rightPages, pageCount });
    }, [cvData]);

    const { header } = cvData;

    return (
        <div className="pb-8">
            {/* ── Ghost render: hidden, used only for measurement ─────────────────── */}
            <div
                ref={ghostRef}
                aria-hidden
                style={{
                    position: 'fixed',
                    left: '-9999px',
                    top: 0,
                    width: '210mm',
                    boxSizing: 'border-box',
                    padding: '32px',
                    visibility: 'hidden',
                    pointerEvents: 'none',
                    zIndex: -1,
                }}
            >
                {/* Sentinel to measure A4 content area height in px */}
                <div
                    data-page-height-sentinel
                    style={{ position: 'absolute', height: 'calc(297mm - 64px)', width: 1 }}
                />

                <div data-ghost-header>
                    <HeaderSection header={header} />
                </div>

                <div className="grid grid-cols-12 gap-6">
                    <div data-column-id="left" className="col-span-8 flex flex-col gap-6">
                        <ExperienceSection sectionId="experience" experience={cvData.experience} />
                        <EducationSection sectionId="education" education={cvData.education} />
                        {cvData.achievements && (
                            <AchievementSection sectionId="achievements" achievements={cvData.achievements} />
                        )}
                    </div>
                    <div data-column-id="right" className="col-span-4 flex flex-col gap-6">
                        <HobbiesSection sectionId="hobbies" hobbies={cvData.hobbies} />
                        <SkillsSection sectionId="skills" skills={cvData.skills} />
                    </div>
                </div>
            </div>

            {/* ── Paginated render ─────────────────────────────────────────────────── */}
            <div className="print-pages-container">
                {pagination && Array.from({ length: pagination.pageCount }, (_, pageIndex) => (
                <Page key={pageIndex}>
                    {pageIndex === 0 && <HeaderSection header={header} />}
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-8 flex flex-col gap-6">
                            {pagination.leftPages[pageIndex].map(slice => renderSlice(slice, cvData))}
                        </div>
                        <div className="col-span-4 flex flex-col gap-6">
                            {pagination.rightPages[pageIndex].map(slice => renderSlice(slice, cvData))}
                        </div>
                    </div>
                </Page>
            ))}
            </div>
        </div>
    );
}
