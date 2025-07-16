import React, { useState } from 'react'

interface AccordioItemProps {
    title?: string,
    children?: React.ReactNode
}

const AccordionItem = ({title='Add Title Here', children='content here'}: AccordioItemProps) => {

	const [open, setOpen] = useState(false);

	const toggleAccordion = () => {
		setOpen(!open);
	}

  return (
    <div className="collapse collapse-arrow border border-base-300 mb-4">
        <input type="checkbox" name="my-accordion-2" checked={open} onChange={toggleAccordion} />
        <div className="collapse-title text-sm font-semibold">{title}</div>
        <div className="collapse-content space-y-4 text-sm">{children}</div>
    </div>
    // <div className="collapse collapse-arrow ">
    //     <input type="checkbox" name="my-accordion-2" checked={open} onChange={toggleAccordion} />
    //     <div className={`collapse-title font-semibold border-b-2 border-[${colors.primary}] `}>{title}</div>
    //     <div className="collapse-content space-y-4 text-sm mt-4">{children}</div>
    // </div>
  )
}

export default AccordionItem