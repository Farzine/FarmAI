import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import {
  addScmEntry,
  getScmEntries,
  deleteScmEntry,
  editScmEntry,
} from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import ScmTile from "../../components/admin-view/scm-tile"; 

function ScientificCultivationPage() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [crop_name, setCropName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null); 
  const dispatch = useDispatch();
  const { scmList } = useSelector((state) => state.commonFeature);
  const { toast } = useToast(); 

  function handleUploadScmEntry() {
    const formData = new FormData();

    if (imageFile) {
      formData.append("image", imageFile); 
    }else{
      formData.append("image", uploadedImageUrl);
    }
    formData.append("description", description);
    formData.append("crop_name", crop_name);

    const action = editId
      ? editScmEntry({ id: editId, formData }) 
      : addScmEntry({ image: imageFile, description, crop_name: crop_name });

    dispatch(action).then((data) => {
      if (data?.payload?.success) {
        dispatch(getScmEntries());
        setImageFile(null);
        setUploadedImageUrl("");
        setCropName("");
        setDescription("");
        setEditId(null); 
        toast({
          title:
            data?.payload?.message ||
            (editId ? "Entry updated successfully" : "Entry added successfully"),
          variant: "default",
        });
      }
    });
  }

  function handleDelete(id) {
    dispatch(deleteScmEntry(id)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message || "Entry deleted successfully",
          variant: "destructive",
        });
        dispatch(getScmEntries());
      }
    });
  }

  function handleEdit(scmItem) {
    setCropName(scmItem.crop_name);
    setDescription(scmItem.description);
    setUploadedImageUrl(scmItem.path); 
    setEditId(scmItem._id); 
  }

  useEffect(() => {
    dispatch(getScmEntries());
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
        value={crop_name}
        onChange={(e) => setCropName(e.target.value)}
        placeholder="Crop Name"
        className="mt-5 w-full p-2 border border-gray-300 rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="mt-3 w-full h-56 p-2 border border-gray-300 rounded"
      />
      <Button onClick={handleUploadScmEntry} className="mt-5 w-full">
        {editId ? "Update Entry" : "Upload"}
      </Button>

      <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {scmList && scmList.length > 0 ? (
          scmList.map((scmItem) => (
            <ScmTile
              key={scmItem._id}
              scmItem={scmItem}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p>No SCM entries available</p>
        )}
      </div>
    </div>
  );
}

export default ScientificCultivationPage;
