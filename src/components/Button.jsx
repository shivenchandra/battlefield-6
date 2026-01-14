import React from 'react'

const Button = ({ title, id, rightIcon, leftIcon, containerClass, href }) => {
    const content = (
        <>
            {leftIcon}
            <span className='relative incline-flex overflow-hidden font-general text-xs uppercase'>
                <div>
                    {title}
                </div>
            </span>
            {rightIcon}
        </>
    );

    const className = `group relative z-10 w-fit cursor-pointer overflow-hidden bg-red-500 px-5 py-3 text-black ${containerClass}`;

    return href ? (
        <a id={id} href={href} className={className} target="_blank" rel="noopener noreferrer">
            {content}
        </a>
    ) : (
        <button id={id} className={className}>
            {content}
        </button>
    );
}

export default Button