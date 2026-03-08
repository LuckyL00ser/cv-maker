export interface SectionMeasurement {
  id: string
  headerHeight: number  // px: distance from section top to first atomic-item top
  itemHeights: number[] // px: height of each atomic-item
  itemGap: number       // px: measured gap between consecutive atomic-items
}

export interface ColumnMeasurement {
  sections: SectionMeasurement[]
  sectionGap: number // px: measured gap between consecutive sections
}

export interface PageSectionSlice {
  sectionId: string
  startIndex: number // inclusive
  endIndex: number   // exclusive
}

/**
 * Greedily packs section items into A4 pages.
 * @param firstPageOffset - height already consumed on page 0 (e.g. by the header)
 * @returns array of pages, each page being an array of section slices
 */
export function paginateColumn(
  column: ColumnMeasurement,
  pageHeight: number,
  firstPageOffset = 0
): PageSectionSlice[][] {
  const pages: PageSectionSlice[][] = [[]]
  // Track height consumed on current page; start at offset for first page
  let currentH = firstPageOffset
  let pageFloor = firstPageOffset // height "floor" for current page (offset for page 0, 0 for rest)

  const newPage = () => {
    pages.push([])
    pageFloor = 0
    currentH = 0
  }

  for (const section of column.sections) {
    if (section.itemHeights.length === 0) continue

    let itemStart = 0

    while (itemStart < section.itemHeights.length) {
      const sectionGapH = currentH > pageFloor ? column.sectionGap : 0
      const overhead = sectionGapH + section.headerHeight

      // If the section header alone doesn't fit, break to new page
      if (currentH > pageFloor && currentH + overhead > pageHeight) {
        newPage()
        continue // retry with reset currentH
      }

      let sliceH = currentH + overhead
      let itemEnd = itemStart

      for (let ii = itemStart; ii < section.itemHeights.length; ii++) {
        const gapH = ii === itemStart ? 0 : section.itemGap
        const candidate = sliceH + gapH + section.itemHeights[ii]
        // Force at least one item per page to prevent infinite loops
        if (candidate <= pageHeight || ii === itemStart) {
          sliceH = candidate
          itemEnd = ii + 1
        } else {
          break
        }
      }

      pages[pages.length - 1].push({
        sectionId: section.id,
        startIndex: itemStart,
        endIndex: itemEnd,
      })

      currentH = sliceH
      itemStart = itemEnd

      if (itemStart < section.itemHeights.length) {
        newPage()
      }
    }
  }

  return pages
}

export function measureColumns(ghostRoot: HTMLElement): {
  leftColumn: ColumnMeasurement
  rightColumn: ColumnMeasurement
  headerHeight: number
} {
  const leftColEl = ghostRoot.querySelector('[data-column-id="left"]')
  const rightColEl = ghostRoot.querySelector('[data-column-id="right"]')
  const headerEl = ghostRoot.querySelector('[data-ghost-header]') as HTMLElement | null
  const headerHeight = headerEl ? headerEl.offsetHeight : 0

  const measureColumn = (colEl: Element | null): ColumnMeasurement => {
    if (!colEl) return { sections: [], sectionGap: 0 }

    const sectionEls = Array.from(
      colEl.querySelectorAll(':scope > section[data-section-id]')
    )
    let sectionGap = 0

    const sections: SectionMeasurement[] = sectionEls.map((sectionEl, si) => {
      const sectionId = sectionEl.getAttribute('data-section-id')!
      const sectionRect = sectionEl.getBoundingClientRect()

      if (si > 0) {
        const prevRect = sectionEls[si - 1].getBoundingClientRect()
        sectionGap = sectionRect.top - prevRect.bottom
      }

      const atomicItems = Array.from(sectionEl.querySelectorAll('.atomic-item'))

      const headerHeight =
        atomicItems.length > 0
          ? atomicItems[0].getBoundingClientRect().top - sectionRect.top
          : sectionRect.height

      const itemHeights: number[] = []
      let itemGap = 0

      atomicItems.forEach((itemEl, ii) => {
        const itemRect = itemEl.getBoundingClientRect()
        if (ii > 0) {
          itemGap = itemRect.top - atomicItems[ii - 1].getBoundingClientRect().bottom
        }
        itemHeights.push(itemRect.height)
      })

      return { id: sectionId, headerHeight, itemHeights, itemGap }
    })

    return { sections, sectionGap }
  }

  return {
    leftColumn: measureColumn(leftColEl),
    rightColumn: measureColumn(rightColEl),
    headerHeight,
  }
}
