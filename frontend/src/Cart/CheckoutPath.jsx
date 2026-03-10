import { AccountBalance, LibraryAddCheck, LocalShipping } from '@mui/icons-material';

function CheckoutPath({ activePath }) {
    const path = [
        {
            label: 'Shiping Details',
            icon: <LocalShipping fontSize="small" />
        },
        {
            label: 'Confirm Order',
            icon: <LibraryAddCheck fontSize="small" />
        },
        {
            label: 'Payment',
            icon: <AccountBalance fontSize="small" />
        }
    ]
    return (
        <div className="w-full flex justify-center px-4 mt-16 py-6 bg-gray-900/90">
            <div className="flex items-center gap-4 sm:gap-8">
                {path.map((item, index) => {
                    const isActive = activePath === index;
                    const isCompleted = activePath > index;
                    return (
                        <div key={index} className="flex items-center gap-3">
                            <div
                                className={`w-10 h-10 flex items-center justify-center rounded-full border transition ${isCompleted ? "bg-indigo-600 border-indigo-600 text-white"
                                    : isActive ? "border-indigo-500 text-indigo-400" : "border-gray-600 text-gray-500"}`}>
                                {item.icon}
                            </div>
                            <span className={`hidden sm:block text-sm font-medium${isCompleted ? "text-white" : isActive ? "text-indigo-400" : "text-gray-500"}`}>
                                {item.label}
                            </span>
                            {index !== path.length - 1 && (
                                <div className={`w-8 sm:w-14 h-px${isCompleted ? "bg-indigo-600" : "bg-gray-600"}`} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CheckoutPath