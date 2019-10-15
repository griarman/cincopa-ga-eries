import React from 'react'
import { menuList } from '../../../Constants'
import ListElement from './ListElement'
import './menuList.scss'

export default function MenuList(props) {

    return (
        <ul className='nam-nav nam-leftnav'>
            { menuList.map(el => <ListElement key={ el.id } el={ el }/> )}
        </ul>
    )
}