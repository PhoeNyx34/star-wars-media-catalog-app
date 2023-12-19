import React, { useState } from "react"
import { useCollapse } from "react-collapsed"

const ConsumedMediaList = ({ consumedMediaList }) => {
    const [isExpanded, setExpanded] = useState(true)
    const { getCollapseProps, getToggleProps } = useCollapse({isExpanded})

    return (
        <div className="cell medium-3 grid-y">
            <h2>Media I've Consumed</h2>
            <button className="button"
                {...getToggleProps({
                onClick: () => setExpanded((prevExpanded) => !prevExpanded),
                })}
            >
                {isExpanded ? 'Hide List' : 'Show List'}
            </button>
            <section {...getCollapseProps()}>{consumedMediaList}</section>
        </div>
    )

}

export default ConsumedMediaList