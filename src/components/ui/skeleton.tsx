// ui/skeleton.tsx
import { Card, CardContent } from "./card";

const Skeleton = () => {
    return (
        <Card className="p-4 w-full bg-gray-100 animate-pulse">
            <CardContent>
                {/* Image Skeleton */}
                <div className="h-40 bg-gray-300 rounded-md"></div>
                
                {/* Description Skeleton */}
                <div className="mt-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Skeleton;
