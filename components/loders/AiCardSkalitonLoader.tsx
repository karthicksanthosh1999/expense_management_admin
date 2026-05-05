const AiSuggestionCardSkeleton = () => {
    return (
        <div className="p-6 bg-card rounded-xl animate-pulse">
            <div className="h-6 w-40 bg-gray-700 rounded mb-4" />
            <div className="h-4 w-32 bg-gray-700 rounded mb-2" />
            <div className="h-24 bg-gray-800 rounded" />
        </div>
    );
};

export default AiSuggestionCardSkeleton;
