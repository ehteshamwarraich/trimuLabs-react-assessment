import { useState } from "react";
import { useMutation } from "@apollo/client";
import {ADD_JOB} from '../GraphQL/Mutations';

const JobForm = () => {
  const [formState, setFormState] = useState({
    title: "",
    companyName: "",
    locationNames: "",
    userEmail: "",
    description: "",
    applyUrl: "",
    commitmentId: "cjtu8esth000z0824x00wtp1i",
  });
  const [errorMessage, setErrorMessage] = useState("");

  

  const [addJob, { error }] = useMutation(ADD_JOB);

  const validate=({title,companyName,locationNames,userEmail,description,applyUrl})=>{
    if(title===""||companyName===""||locationNames===""||userEmail===""||description===""||applyUrl===""){
      setErrorMessage("Missing Values in form");
      return false;
    }
    else{ 
      setErrorMessage("");
      return true
    }
  }

  const onSubmit =async (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    if(validate(formState)){
      try {
        console.log("Sending postJob request");
        const result =await addJob({ variables: { input: { ...formState } } });
        if (result) {
          console.log("Job Posted");
          console.log(result);
          alert(`Job posted successfully on server with \nID: ${result.data.postJob.id} \nTITLE: ${result.data.postJob.title}`);
  
        }
      } catch (err) {
        console.log("error", err);
        alert("Error posting job");
      }

    }
  
  };
  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className="form-control">
        <label>Job Title</label>
        <input
          type="text"
          placeholder="Add Title"
          value={formState.title}
          onChange={(e) =>
            setFormState({ ...formState, title: e.target.value })
          }
        />
      </div>
      <div className="form-control">
        <label>Commitment ID</label>
        <input
          type="text"
          placeholder="Add Commitment ID"
          value={formState.commitmentId}
          readOnly
        />
      </div>
      <div className="form-control">
        <label>CompanyName</label>
        <input
          type="text"
          placeholder="Add CompanyName Name"
          value={formState.companyName}
          onChange={(e) =>
            setFormState({ ...formState, companyName: e.target.value })
          }
        />
      </div>
      <div className="form-control">
        <label>Location</label>
        <input
          type="text"
          placeholder="Add Locations"
          value={formState.locationNames}
          onChange={(e) =>
            setFormState({ ...formState, locationNames: e.target.value })
          }
        />
      </div>
      <div className="form-control">
        <label>User E-mail</label>
        <input
          type="text"
          placeholder="Add Email Address"
          value={formState.userEmail}
          onChange={(e) =>
            setFormState({ ...formState, userEmail: e.target.value })
          }
        />
      </div>
      <div className="form-control">
        <label>Job Description</label>
        <input
          type="text"
          placeholder="Add CompanyName Name"
          value={formState.description}
          onChange={(e) =>
            setFormState({ ...formState, description: e.target.value })
          }
        />
      </div>
      <div className="form-control">
        <label>Apply Url</label>
        <input
          type="text"
          placeholder="Add URL"
          value={formState.applyUrl}
          onChange={(e) =>
            setFormState({ ...formState, applyUrl: e.target.value })
          }
        />
      </div>
      <div className="form-control">
      <p className="error-text">{errorMessage}</p>
      <input type="submit" value="Save Job" className='btn btn-block'/>
      </div>
    </form>
  );
};

export default JobForm;
