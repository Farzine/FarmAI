import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function ScmTile({ expertAdviceItem, handleEdit, handleDelete }) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="relative">
        <img
          src={expertAdviceItem?.path}
          alt={expertAdviceItem?.title}
          className="w-full h-[300px] object-cover rounded-t-lg"
        />
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{expertAdviceItem?.title}</h2>
          <p className="text-gray-600">{expertAdviceItem?.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button onClick={() => handleEdit(expertAdviceItem)}>Edit</Button>
          <Button onClick={() => handleDelete(expertAdviceItem?._id)} variant="destructive">
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ScmTile;
