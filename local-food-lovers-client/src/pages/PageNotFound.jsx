import React from 'react';
import pageNotFound from "../assets/404-error-page-templates.jpg.avif"
const PageNotFound = () => {
    return (
        <div className='flex justify-center items-center'>
            <img src={pageNotFound} alt="404 page not found" />
        </div>
    );
};

export default PageNotFound;