import React from 'react'
import MenuList from './MenuList'
import Account from './Account'

import './menu.scss'

export default function Menu(props) {
    return (
        <div className={'navAppMode loggedusertype-user'}>
            <a href="/" className={'name-logo'}>logo</a>
            <div style={{flexGrow: 0}}>
                <button className={'btn dark showMobileMenu'} type={'button'}>
                    <i>
                        <span/>
                        <span/>
                        <span/>
                    </i>
                </button>
            </div>
            <MenuList />
            <Account />
        </div>
    )
}