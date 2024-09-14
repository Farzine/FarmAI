"use client";
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '@/components/Sidebar';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const UploadProductPage: React.FC = () => {
    const [product, setProduct] = useState<any[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDiscountPrice, setProductDiscountPrice] = useState('');
    const [tag, setTag] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const token = Cookies.get('token');
      if (!token) router.push('/admin');

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const token = Cookies.get('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/product`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                setProduct(data);
            } else {
                console.error('Error fetching product:', response.statusText);
                if (response.status === 403) {
                    alert('Unauthorized: Please log in again.');
                    router.push('/admin');
                }
            }
        } catch (error) {
            console.error('Error fetching product:', error);
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
    const handleProductNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(event.target.value);
    };
    const handleProductPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductPrice(event.target.value);
    };
    const handleProductDiscountPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductDiscountPrice(event.target.value);
    };
    const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTag(event.target.value);
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
        formData.append('product_name', productName);
        formData.append('product_price', productPrice);
        formData.append('product_discount_price', productDiscountPrice);
        formData.append('tag', tag);

        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/product/upload`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                }
            });

            if (response.ok) {
                fetchProduct();
                setFile(null);
                setDescription('');
                setProductName('');
                setProductPrice('');
                setProductDiscountPrice('');
                setTag('');
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                setSuccessMessage('Product uploaded successfully');
                setTimeout(() => setSuccessMessage(null), 3000);
            } else {
                const errorText = await response.text();
                console.error('Error uploading Product:', errorText);
                setErrorMessage('Failed to upload Product. Please try again.');
                setTimeout(() => setErrorMessage(null), 3000);
            }
        } catch (error) {
            console.error('Error uploading Product:', error);
            setErrorMessage('Failed to upload Product. Please try again.');
            setTimeout(() => setErrorMessage(null), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        setLoading(true);

        try {
            const token = Cookies.get('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/product/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.ok) {
                fetchProduct();
                setSuccessMessage('Product deleted successfully');
                setTimeout(() => setSuccessMessage(null), 3000);
            } else {
                console.error('Error deleting Product:', response.statusText);
                if (response.status === 403) {
                    alert('Unauthorized: Please log in again.');
                    router.push('/admin');
                }
            }
        } catch (error) {
            console.error('Error deleting Product:', error);
            setErrorMessage('Failed to delete Product. Please try again.');
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
                <h1 className="text-3xl font-bold mb-4">Product Management</h1>

                {product.length === 0 && <p>No product found</p>}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-8 w-full md:w-1/3">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="border p-2"
                    />
                    <input
                        type="text"
                        value={productName}
                        onChange={handleProductNameChange}
                        placeholder="Enter Product Name"
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
                        type="text"
                        value={productPrice}
                        onChange={handleProductPriceChange}
                        placeholder="Enter Product Price"
                        className="border p-2"
                    />
                    <input
                        type="text"
                        value={productDiscountPrice}
                        onChange={handleProductDiscountPriceChange}
                        placeholder="Enter Product Discount Price"
                        className="border p-2"
                    />
                    <select
                        value={tag}
                        onChange={handleTagChange}
                        className="border p-2"
                    >
                        <option value="">Select Tag</option>
                        <option value="seeds">Seeds</option>
                        <option value="insecticide">Insecticide</option>
                        <option value="fertilizer">Fertilizer</option>
                        <option value="sapling">Sapling</option>
                        <option value="tools">Tools</option>
                        <option value="other">Other</option>
                    </select>
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
                    {product.map((product: any) => (
                        <div key={product._id} className="flex justify-between items-center border p-4 rounded shadow-lg bg-[#eaefef]">
                            <div style={{ flex: 1 }}>
                                <p className="mb-2 text-gray-700" style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {truncateText(product.description, 30)}
                                </p>
                                <p className="mb-2 text-gray-700">
                                    <strong>Name:</strong> {product.product_name}
                                </p>
                                <p className="mb-2 text-gray-700">
                                    <strong>Price:</strong> {product.product_price}
                                </p>
                                <p className="mb-2 text-gray-700">
                                    <strong>Discount Price:</strong> {product.product_discount_price}
                                </p>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="mt-2 px-2 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors duration-200"
                                    style={{ fontSize: '0.75rem' }}
                                    disabled={loading}
                                >
                                    {loading ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                            <Image src={product.path} alt={product.description} className="w-32 h-24 object-cover rounded ml-4" width={100} height={100} />
                        </div>
                    ))}
                    {isLoading && <div>Loading...</div>}
                </div>
            </div>
        </div>
    );
};

export default UploadProductPage;
