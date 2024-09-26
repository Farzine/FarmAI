import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function ScmTile({ scmItem, handleEdit, handleDelete }) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="relative">
        <img
          src={scmItem?.path}
          alt={scmItem?.crop_name}
          className="w-full h-[300px] object-cover rounded-t-lg"
        />
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{scmItem?.crop_name}</h2>
          <p className="text-gray-600">{scmItem?.description.slice(0, 100)}...</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button onClick={() => handleEdit(scmItem)}>Edit</Button>
          <Button onClick={() => handleDelete(scmItem?._id)} variant="destructive">
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ScmTile;
