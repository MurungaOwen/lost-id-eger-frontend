import { useState } from "react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

const baseApi=import.meta.env.VITE_BASE_API;

export function UploadImage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [contactInfo, setContactInfo] = useState({ phone: "" });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string); // Create a preview URL
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("contact", contactInfo.phone);
        console.log(`file is ${selectedFile.name} and size is: ${selectedFile.size}`)
        setLoading(true);

        try {
            const response = await fetch(`${baseApi}/upload`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Upload failed");
            }

            const data = await response.json();
            toast.success("Upload successful", {duration:5000});
            console.log(data);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Error uploading image", {duration:5000})
            }
            console.error(error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setContactInfo((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex items-center justify-center sm:mt-4 sm:p-2 min-h-screen p-6">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-4 text-teal-600">Upload ID Image</h2>
                <label className="flex items-center cursor-pointer border-2 border-dashed border-teal-400 rounded-lg p-4 text-center mb-4">
                    <Upload className="mr-2 text-teal-500" />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <span className="text-teal-500 hover:underline">Choose an image</span>
                </label>

                {preview && (
                    <div className="mt-4">
                        <img
                            src={preview}
                            alt="Image Preview"
                            className="w-full h-auto rounded-lg border border-gray-300"
                        />
                    </div>
                )}

                <div className="mt-4">
                    <input
                        type="text"
                        name="phone"
                        placeholder="Enter phone number for owner to contact you"
                        value={contactInfo.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        required
                    />
                </div>

                <button
                    onClick={handleUpload}
                    disabled={loading || !selectedFile}
                    className="mt-4 w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition duration-200"
                >
                    {loading ? "Uploading ID..." : "Upload"}
                </button>
            </div>
        </div>
    );
}
