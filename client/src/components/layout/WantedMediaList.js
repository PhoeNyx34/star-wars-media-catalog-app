import React, { useState } from "react"
import { useCollapse } from "react-collapsed"

const WantedMediaList = ({ wantedMediaList }) => {
    const [isExpanded, setExpanded] = useState(true)
    const { getCollapseProps, getToggleProps } = useCollapse({isExpanded})

    return (
        <div className="cell medium-3 grid-y">
            <h2>Media I Want</h2>
            <button className="button"
                {...getToggleProps({
                onClick: () => setExpanded((prevExpanded) => !prevExpanded),
                })}
            >
                {isExpanded ? 'Hide List' : 'Show List'}
            </button>
            <section {...getCollapseProps()}>{wantedMediaList}</section>
        </div>
    )

}

export default WantedMediaList