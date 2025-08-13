import React, { useState } from 'react'

interface AccordioItemProps {
    title?: string,
    opened?: boolean,
    children?: React.ReactNode
}

const AccordionItem = ({title='Add Title Here', opened=true, children='content here'}: AccordioItemProps) => {

	const [open, setOpen] = useState(opened);

	const toggleAccordion = () => {
		setOpen(!open);
	}

  return (
    <div className="collapse collapse-arrow border mb-4 border-gray-300">
        <input type="checkbox" name="my-accordion-2" checked={open} onChange={toggleAccordion} />
        <div className="collapse-title text-sm font-semibold">{title}</div>
        <div className="collapse-content space-y-4 text-sm">{children}</div>
    </div>
  )
}

export default AccordionItem