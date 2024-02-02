import { LegacyRef, forwardRef, useId } from 'react';

export interface SelectProps {
    options: Array<string>,
    label?: string;
    className: string,
}

function Select({ options, label, className, ...props }: SelectProps, ref: LegacyRef<HTMLSelectElement>) {
    const id = useId();
    return (
        <div className='w-full'>
            {
                label &&
                <label
                    htmlFor={id}
                    className=''
                >
                </label>
            }
            <select
                {...props}
                ref={ref}
                id={id}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${className}`}>

                {
                    options?.map((option) => (
                        <option value={option} key={option}>{option}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default forwardRef(Select);