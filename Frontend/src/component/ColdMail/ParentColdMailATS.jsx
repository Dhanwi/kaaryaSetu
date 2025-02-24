import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ColdMailATSPage from "./ColdMailATSPage";
import apiList from "../../lib/apiList";
import { SetPopupContext } from "../../App";
import PropType from "prop-types";
import { useParams } from "react-router-dom";

const ParentColdMailATS = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const setPopup = useContext(SetPopupContext);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${apiList.jobs}/${jobId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setJobDetails(response.data);
      } catch (error) {
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching job details",
        });
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [jobId, setPopup]);

  return (
    <div>
      {jobDetails ? (
        <ColdMailATSPage jobDetails={jobDetails} />
      ) : (
        <p>Loading job details...</p>
      )}
    </div>
  );
};

ParentColdMailATS.propTypes = {
  jobId: PropType.string.isRequired,
};

export default ParentColdMailATS;
