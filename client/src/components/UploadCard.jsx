import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import PredictionCard from "./PredictionCard";

const PREDICT_URL = `${import.meta.env.VITE_API_URL}/predict`;

function UploadCard() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (!file) return;

    console.log("Upload file:", file.name, file.type, file.size);

    const formData = new FormData();
    formData.append("image", file, file.name || "image.jpg");

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(PREDICT_URL, {
        method: "POST",
        body: formData,
      });
      console.log("Response status:", res.status, res.statusText);

      const data = await res.json();
      console.log("Response data:", data);

      if (!res.ok) {
        throw new Error(data.error || `Request failed: ${res.status}`);
      }
      setResult(data);
    } catch (err) {
      console.error("Prediction failed:", err);
      alert(err.message || "Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      console.log("Dropped file:", droppedFile);
      setFile(droppedFile);
      setResult(null);
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      setFile(selectedFile);
      setResult(null);
    }
  };

  const clearFile = () => {
    setFile(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const openFilePicker = () => {
    if (loading) return;
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
      <div className="p-6 md:p-8 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
          <span className="text-2xl">📤</span>
          Upload Waste Image
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Drag & drop or click to select an image
        </p>

        {/* Single hidden input; works for both click + change-image */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFilePicker}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") openFilePicker();
          }}
          className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ${
            dragActive
              ? "border-indigo-500 bg-indigo-50/50"
              : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50/50"
          } cursor-pointer`}
        >
          {previewUrl ? (
            <div className="relative p-4" onClick={(e) => e.stopPropagation()}>
              {loading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/90 rounded-2xl">
                  <div className="w-14 h-14 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
                  <p className="text-gray-600 font-medium mt-4">Analyzing waste...</p>
                  <p className="text-gray-400 text-sm">AI is classifying your image</p>
                </div>
              )}
              <div className="relative aspect-video max-h-64 mx-auto rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-center text-sm text-gray-500 mt-2 truncate px-4">
                {file?.name}
              </p>
            </div>
          ) : (
            <div className="relative py-12 px-6 text-center">
              {loading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
                  <p className="text-gray-600 font-medium">Analyzing waste...</p>
                  <p className="text-gray-400 text-sm">AI is classifying your image</p>
                </div>
              ) : (
                <>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium mb-1">Drop your image here</p>
                  <p className="text-gray-400 text-sm">or click to browse</p>
                </>
              )}
            </div>
          )}
        </div>

        {previewUrl && (
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={openFilePicker}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Change Image
            </button>
            <button
              onClick={clearFile}
              className="flex-1 py-2.5 rounded-xl border border-red-200 text-red-600 font-medium hover:bg-red-50 transition-colors"
            >
              Clear
            </button>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
        >
          {loading ? "Analyzing..." : "Analyze Waste"}
        </button>
      </div>

      <PredictionCard result={result} />
    </div>
  );
}

export default UploadCard;
