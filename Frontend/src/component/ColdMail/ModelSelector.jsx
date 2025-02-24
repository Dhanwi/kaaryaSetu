import React, { useState, useEffect } from "react";
import axios from "axios";
// import { application } from "express";
import apiList from "../../lib/apiList";
import PropType from "prop-types";

const ModelSelector = ({ onModelSelect }) => {
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState("");

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(apiList.models);
        setModels(response.data.models);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };
    fetchModels();
  }, []);

  const handleModelChange = (e) => {
    const modelId = e.target.value;
    setSelectedModelId(modelId);
    const selectedModel = models.find((model) => model.id === modelId);
    onModelSelect(selectedModel); // Notify parent component
  };

  const handleBestForYou = () => {
    const bestModel = models.find((model) => model.available);
    if (bestModel) {
      setSelectedModelId(bestModel.id);
      onModelSelect(bestModel);
    } else {
      alert("No available models at the moment.");
    }
  };

  return (
    <div className="mt-4 bg-[#02101E] p-4 rounded shadow-xl shadow-cyan-500/20">
      <label
        htmlFor="model-selector"
        className="block text-[#22D3EE] text-center mb-2 font-medium text-lg"
      >
        Choose a Model:
      </label>
      <div className="flex justify-center">
        <div className="text-xs text-neutral-400 font-serif mb-3 text-center w-[40vw]">
          select the model with less percentage range, that shows indirectly the
          number of tokens used overall or just click on{" "}
          <span className="text-[#22D3EE]">Best for You</span> button and it
          will <span className="text-[#0891B2]">automatically select</span> the
          best model for you.
        </div>
      </div>

      <select
        id="model-selector"
        value={selectedModelId}
        onChange={handleModelChange}
        className="w-full border border-cyan-500/50 rounded px-2 py-1 bg-[#041124] text-white"
      >
        <option value="">-- Select a Model --</option>
        {models.map((model) => (
          <option key={model.id} value={model.id} disabled={!model.available}>
            {model.name} - {model.capability} ({model.usage}% used)
            {!model.available && " (Unavailable)"}
          </option>
        ))}
      </select>
      <div className="text-center">
        <button
          onClick={handleBestForYou}
          className="mt-4 px-4 py-2 bg-[#22D3EE] text-[#02101E] rounded shadow hover:bg-[#06B6D4] hover:shadow-cyan-700"
        >
          <i className="fas fa-magic"></i> Best for You
        </button>
      </div>
    </div>
  );
};

ModelSelector.propTypes = {
  onModelSelect: PropType.func.isRequired,
};

export default ModelSelector;
