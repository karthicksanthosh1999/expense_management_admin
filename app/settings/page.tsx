import React from 'react'
import SettingTabs from './_components/settings-tab'
import SecondHeader from '@/components/second-header';

const page = () => {
    return (
        <div>
            <SecondHeader currentPage='Setting' >
                <></>
            </SecondHeader>
            <SettingTabs />
        </div>
    )
}

export default page
