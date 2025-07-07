/**
 * Used when useQuery/useFetchById returns a loading statge. Shows a spinning wheel.
 */
export default function LoadingPage() {
    return (
        <div 
            className={"flex dlex-col items-center justify-center w-full h-full bg-white dark:bg-gray-800"}
        >
            <div 
                className={"animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-400 dark:border-gray-600"}
            />
        </div>
    );
}