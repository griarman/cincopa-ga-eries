import React from 'react'


export default function ListElement(props) {
    const {hiddenMobile, name, link} = props.el;
    return (
        <li className={ hiddenMobile }>
            <a href={ link }>{ name }</a>
        </li>
    )
}