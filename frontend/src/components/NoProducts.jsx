function NoProducts({ keyword }) {
  return (
    <div className="flex items-center justify-center py-20 px-4">
      <div className="flex flex-col items-center text-center max-w-md w-full p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-100 shadow-lg shadow-gray-500/60 transition hover:shadow-xl">
        <div className="mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 text-3xl">
          ⚠️
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {keyword ? `We couldn't find any product matching "${keyword}". Try using different keywords.` : `No products found. Please check back leter`}
        </p>
      </div>
    </div>
  )
}

export default NoProducts