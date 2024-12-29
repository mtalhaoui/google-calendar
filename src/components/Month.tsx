import React from 'react'
import Day from './Day'
import dayjs from 'dayjs'

interface MonthProps {
    month: dayjs.Dayjs[][];
}

const Month = ({ month }: MonthProps) => {
    return (
        <div className='flex-1 grid grid-cols-7 grid-rows-5'>
            {month.map((week, weekIndex: number) => (
                <React.Fragment key={weekIndex}>
                    {week.map((day, dayIndex: number) => (
                        <Day day={day} key={dayIndex} weekIdx={weekIndex} />
                    ))}
                </React.Fragment>
            ))}
        </div>
    )
}

export default Month