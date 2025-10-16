import { useRef } from "react";

interface FileUploadButtonProps {
    label: string;
    isLoading?: boolean;
    onUpload: (file: File) => Promise<void> | void;
}

export default function FileUploadButton({ label, onUpload, isLoading = false }: FileUploadButtonProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            await onUpload(file);
        } catch (err) {
            console.error("File upload failed:", err);
        } finally {
            e.target.value = ""; // reset input value
        }
    };

    return (
        <div className="inline-block">
            <button
                type="button"
                onClick={handleClick}
                disabled={isLoading}
                className="text-white px-4 py-2 rounded text-sm bg-blue-500 hover:bg-blue-600 transition disabled:opacity-50"
            >
                {isLoading ? "Загрузка..." : label}
            </button>

            <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
}
