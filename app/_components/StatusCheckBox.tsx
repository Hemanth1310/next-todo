"use client"

import React, { useTransition } from 'react'
import { toggleStatusAction } from '../actions/todoActions'
import { useRouter } from 'next/navigation'

type Props = {
    id: number,
    status: boolean
}

const StatusCheckBox = ({ id, status }: Props) => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleToggle = () => {
        startTransition(async () => {
            // 1. Invert status (!status) so the server gets the target value
            const response = await toggleStatusAction(id, !status)

            if (response.success) {
                // 2. Refresh the server component tree to pull fresh data
                router.refresh()
            } else {
                // Handle error if DB update fails
                console.error(response.error)
            }
        })
    }

    return (
        <div className="flex items-center justify-center min-w-6 min-h-6">
            {isPending ? (
                <span className="loading loading-ring loading-sm text-success"></span>
            ) : (
                <input 
                    type='checkbox' 
                    className='checkbox checkbox-success' 
                    onChange={handleToggle} 
                    // 3. Use checked instead of defaultChecked when controlled by server re-renders
                    checked={status}
                />
            )}
        </div>
    )
}

export default StatusCheckBox