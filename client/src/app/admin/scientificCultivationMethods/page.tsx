"use client";
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '@/components/Sidebar';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const UploadScientificCultivationMethodsPage: React.FC = () => {
    const [scientificCultivationMethods, setScientificCultivationMethods] = useState<any[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [cropName, setCropName] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const token = Cookies.get('token');
      if (!token) router.push('/admin');

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const token = Cookies.get('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/scientificCultivationMethods`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                setScientificCultivationMethods(data);
            } else {
                console.error('Error fetching scientific cultivation methods:', response.statusText);
                if (response.status === 403) {
                    alert('Unauthorized: Please log in again.');
                    router.push('/admin');
                }
            }
        } catch (error) {
            console.error('Error fetching scientificCultivationMethods:', error);
        }finally {
            setIsLoading(false);
          }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleCropNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCropName(event.target.value);
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('description', description);
        formData.append('crop_name', cropName);

        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/scientificCultivationMethods/upload`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                }
            });

            if (response.ok) {
                fetchImages();
                setFile(null);
                setDescription('');
                setCropName('');
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                setSuccessMessage('Scientific Cultivation Methods uploaded successfully');
                setTimeout(() => setSuccessMessage(null), 3000);
            } else {
                const errorText = await response.text();
                console.error('Error uploading Scientific Cultivation Methods:', errorText);
                setErrorMessage('Failed to upload Scientific Cultivation Methods. Please try again.');
                setTimeout(() => setErrorMessage(null), 3000);
            }
        } catch (error) {
            console.error('Error uploading Scientific Cultivation Methods:', error);
            setErrorMessage('Failed to upload Scientific Cultivation Methods. Please try again.');
            setTimeout(() => setErrorMessage(null), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        setLoading(true);

        try {
            const token = Cookies.get('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/scientificCultivationMethods/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.ok) {
                fetchImages();
                setSuccessMessage('Scientific Cultivation Methods deleted successfully');
                setTimeout(() => setSuccessMessage(null), 3000);
            } else {
                console.error('Error deleting Scientific Cultivation Methods:', response.statusText);
                if (response.status === 403) {
                    alert('Unauthorized: Please log in again.');
                    router.push('/admin');
                }
            }
        } catch (error) {
            console.error('Error deleting scientificCultivationMethods:', error);
            setErrorMessage('Failed to delete Scientific Cultivation Methods. Please try again.');
            setTimeout(() => setErrorMessage(null), 3000);
        } finally {
            setLoading(false);
        }
    };

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <Sidebar />

            {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            )}
            <div className={`flex-1 p-4 md:p-8 overflow-y-auto bg-gray-100 h-screen ${loading ? 'filter blur-sm' : ''}`}>
                <h1 className="text-3xl font-bold mb-4">Image Management</h1>

                {scientificCultivationMethods.length === 0 && <p>No image items found</p>}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-8 w-full md:w-1/3">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="border p-2"
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Enter Picture Description"
                        className="border p-2"
                    />
                    <input
                        type='text'
                        value={cropName}
                        onChange={handleCropNameChange}
                        placeholder='Enter Crop Name'
                        className="border p-2"
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full md:w-40"
                        disabled={loading}
                    >
                        {loading ? 'Uploading...' : 'Upload'}
                    </button>
                </form>
                {/* Success message display */}
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline"> {successMessage}</span>
                    </div>
                )}

                {/* Error message display */}
                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {errorMessage}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {scientificCultivationMethods.map((crop: any) => (
                        <div key={crop._id} className="flex justify-between items-center border p-4 rounded shadow-lg bg-[#eaefef]">
                            <div style={{ flex: 1 }}>
                                <p className="mb-2 text-gray-700" style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {truncateText(crop.description, 30)}
                                </p>
                                <p className="mb-2 text-gray-700">
                                    <strong>Crop:</strong> {crop.crop_name}
                                </p>
                                <button
                                    onClick={() => handleDelete(crop._id)}
                                    className="mt-2 px-2 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors duration-200"
                                    style={{ fontSize: '0.75rem' }}
                                    disabled={loading}
                                >
                                    {loading ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                            <Image src={crop.path} alt={crop.description} className="w-32 h-24 object-cover rounded ml-4" width={100} height={100} />
                        </div>
                    ))}
                    {isLoading && <div>Loading...</div>}
                </div>
            </div>
        </div>
    );
};

export default UploadScientificCultivationMethodsPage;
