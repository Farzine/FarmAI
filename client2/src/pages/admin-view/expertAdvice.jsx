import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import {
  addExpertAdvice,
  fetchAllExpertAdvice,
  deleteExpertAdvice,
  editExpertAdvice,
} from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import ExpertAdviceTile from "../../components/admin-view/expertAdvice-tile"; 

function ScientificCultivationPage() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null); 
  const dispatch = useDispatch();
  const {  expertAdviceList } = useSelector((state) => state.commonFeature);
  const { toast } = useToast(); 

  function handleUploadScmEntry() {
    const formData = new FormData();

    if (imageFile) {
      formData.append("image", imageFile); 
    }else{
      formData.append("image", uploadedImageUrl);
    }
    formData.append("description", description);
    formData.append("title", title);

    const action = editId
      ? editExpertAdvice({ id: editId, formData }) // Send formData for editing
      : addExpertAdvice({ image: imageFile, description, title: title });

    dispatch(action).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllExpertAdvice());
        setImageFile(null);
        setUploadedImageUrl("");
        setTitle("");
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
    dispatch(deleteExpertAdvice(id)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message || "Entry deleted successfully",
          variant: "destructive",
        });
        dispatch(fetchAllExpertAdvice());
      }
    });
  }

  function handleEdit(scmItem) {
    setTitle(scmItem.title);
    setDescription(scmItem.description);
    setUploadedImageUrl(scmItem.path); 
    setEditId(scmItem._id); 
  }

  useEffect(() => {
    dispatch(fetchAllExpertAdvice());
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="mt-5 w-full p-2 border border-gray-300 rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="mt-3 w-full p-2 border border-gray-300 rounded"
      />
      <Button onClick={handleUploadScmEntry} className="mt-5 w-full">
        {editId ? "Update Entry" : "Upload"}
      </Button>

      <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {expertAdviceList && expertAdviceList.length > 0 ? (
          expertAdviceList.map((scmItem) => (
            <ExpertAdviceTile
              key={scmItem._id}
              expertAdviceItem={scmItem}
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
