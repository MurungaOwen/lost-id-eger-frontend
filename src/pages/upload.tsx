import { useState } from "react";
import { Upload } from "lucide-react";

export function UploadImage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [contactInfo, setContactInfo] = useState({ phone: "" });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setError(null);
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

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Upload failed");
            }

            const data = await response.json();
            setSuccess("Upload successful!");
            console.log(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message || "Error uploading");
            } else {
                setError("Unknown error occurred"); 
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
        <div className="flex items-center justify-center sm:mt-4 sm:p-2 max-h-screenbg-gray-100 p-6">
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

                {error && <p className="mt-2 p-2 bg-red-100 text-red-500 text-center">{error}</p>}
                {success && <p className="mt-2 p-2 bg-green-100 text-green-500 text-center">{success}</p>}
            </div>
        </div>
    );
}
