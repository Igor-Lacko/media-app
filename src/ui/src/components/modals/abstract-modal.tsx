/**
 * Base function for all modals. Should never be used individually.
 * @param children Children to be rendered inside the modal.
 */
export default function AbstractModal({ children } : { children: React.ReactNode }) {
    return (
        <div className={"fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50 z-50"}>
            <div 
                className={"bg-white flex flex-col dark:bg-gray-800 rounded-lg shadow-lg\
                        py-3 px-10 space-y-4 max-w-md w-full"}
            >
                {children}
            </div>
        </div>
    );
}