function PredictionCard({ result }) {
  if (!result) return null;

  const confidencePercent = (result.confidence * 100).toFixed(1);
  const isRecyclable = result.recyclable;

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-xl">🔍</span>
        Prediction Result
      </h2>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-2xl font-bold text-gray-900 capitalize">
              {result.label}
            </p>
            <p className="text-gray-500 text-sm mt-0.5">
              Confidence: {confidencePercent}%
            </p>
          </div>
          <div>
            {isRecyclable ? (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-700 font-semibold border border-emerald-200/60">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Recyclable
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-100 text-red-700 font-semibold border border-red-200/60">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Non-Recyclable
              </span>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Confidence level</span>
            <span className="font-medium text-gray-900">{confidencePercent}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-gray-200 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isRecyclable
                  ? "bg-gradient-to-r from-emerald-500 to-green-600"
                  : "bg-gradient-to-r from-red-500 to-rose-600"
              }`}
              style={{ width: `${confidencePercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictionCard;
