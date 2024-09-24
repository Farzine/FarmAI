import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addScmEntry, getScmEntries as getScmEntry, deleteScmEntry, editScmEntry } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ScientificCultivationPage() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [cropName, setCropName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { scmList } = useSelector((state) => state.commonFeature);

  function handleUploadScmEntry() {
    const newScmEntry = {
      path: uploadedImageUrl,
      public_id: imageFile?.public_id || "",
      description,
      crop_name: cropName,
    };

    dispatch(addScmEntry(newScmEntry)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getScmEntry());
        setImageFile(null);
        setUploadedImageUrl("");
        setCropName("");
        setDescription("");
      }
    });
  }

  useEffect(() => {
    dispatch(getScmEntry());
  }, [dispatch]);

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <input
        type="text"
        value={cropName}
        onChange={(e) => setCropName(e.target.value)}
        placeholder="Crop Name"
        className="mt-5 w-full p-2 border border-gray-300 rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="mt-3 w-full p-2 border border-gray-300 rounded"
      />
      <Button onClick={handleUploadScmEntry} className="mt-5 w-full">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {scmList && scmList.length > 0
          ? scmList.map((scmItem) => (
              <div className="relative" key={scmItem._id}>
                <img
                  src={scmItem.path}
                  alt={scmItem.crop_name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="p-2 bg-white rounded-b-lg">
                  <h3 className="text-lg font-semibold">{scmItem.crop_name}</h3>
                  <p className="text-sm text-gray-600">{scmItem.description}</p>
                </div>
              </div>
            ))
          : <p>No SCM entries available</p>}
      </div>
    </div>
  );
}

export default ScientificCultivationPage;
