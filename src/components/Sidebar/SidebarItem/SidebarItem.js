import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { BsChevronDown } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const SidebarItem = ({ title, list }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className="sidebar_item">
            <Accordion className="sidebar_accordion" expanded={expanded === title} onChange={handleChange(title)}>
                <AccordionSummary
                    expandIcon={<BsChevronDown />}
                    className="sb_accordion_header"
                >
                    <h4 className="mb-0 sidebar_title">{title}</h4>
                </AccordionSummary>
                <AccordionDetails className="sb_accordion_content">
                    <ul className="sidebar_list mb-0 ps-0">
                        {list?.map(item => (
                            <li key={item.title}>
                                <Link to={`/category/${item.title}`} className="d-flex align-items-center justify-content-between">
                                    <span className="sb_item_name">{item.title}</span>
                                    <span className="sb_item_count">{item.products.length}</span>
                                </Link>

                            </li>
                        ))}

                    </ul>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default SidebarItem;