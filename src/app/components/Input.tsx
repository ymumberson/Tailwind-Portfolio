interface InputProps<T extends string | number> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> {
    value: T;
    onChange: (value: T) => void;
    type?: "text" | "number";
    label?: string;
}

export function Input<T extends string | number>({value, onChange, type="text", label, className, ...props}: InputProps<T>) {
    return (
        <label
            className={`
                inline-flex items-center
                border-2 border-gray-800
                rounded-md
                text-sm font-medium
                transition-colors
                focus-within:ring-4
                focus-within:ring-gray-300
                dark:border-gray-600
                dark:focus-within:ring-gray-800
                ${className ?? ""}
            `}
        >
            {label && (
                <span className="px-2 text-gray-900 dark:text-gray-400 w-auto">
                    {label}
                </span>
            )}

            <input
                {...props}
                type={type}
                value={value}
                onChange={(e) => {
                    const newValue =
                        type === "number"
                            ? Number(e.target.value)
                            : e.target.value;

                    onChange(newValue as T);
                }}
                className={`
                    p-2
                    w-24
                    bg-transparent
                    text-gray-900
                    outline-none
                    placeholder:text-gray-500
                    dark:text-gray-400
                `}
            />
        </label>
    );
}