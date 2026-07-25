interface ToggleProps {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    falseText: string,
    trueText: string
}

const Toggle: React.FC<ToggleProps> = ({ value, setValue, falseText, trueText }) => {
    return (
        <label className="inline-flex items-center cursor-pointer p-2 border-2 text-gray-900 hover:text-white border-gray-800 hover:bg-gray-900 focus-ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
            <span className="select-none text-sm font-medium text-heading">{falseText}</span>
            <input type="checkbox" value="" onChange={() => setValue((val: boolean) => !val)} className="sr-only peer" checked={value}/>
            <div className="relative mx-3 w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
            <span className="select-none text-sm font-medium text-heading">{trueText}</span>
        </label>
    );
}

export default Toggle;