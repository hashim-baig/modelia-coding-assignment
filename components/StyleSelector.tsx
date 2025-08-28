import { ChangeEvent } from 'react';

interface Props {
    style: string;
    setStyle: (v: string) => void;
}

const styles = ['Editorial', 'Streetwear', 'Vintage', 'Minimalist'];

export default function StyleSelector({ style, setStyle }: Props) {
    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        setStyle(e.target.value);
    }

    return (
        <div>
            <label htmlFor="styleSelect" className="block font-medium mb-1">
                Style
            </label>
            <select
                id="styleSelect"
                value={style}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline focus:ring-2"
            >
                {styles.map((s) => (
                    <option key={s} value={s}>
                        {s}
                    </option>
                ))}
            </select>
        </div>
    );
}
