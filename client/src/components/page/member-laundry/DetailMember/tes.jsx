import React, { useState } from "react";

const Name = ({ onChange, value }) => (
  <div className="field">
    <label htmlFor="name">name:</label>
    <input
      id="name"
      type="text"
      onChange={onChange}
      maxlength="25"
      value={value}
      placeholder="Alexa"
      required
    />
  </div>
);
const Status = ({ onChange, value }) => (
  <div className="field">
    <label htmlFor="status">status:</label>
    <input
      id="status"
      type="text"
      onChange={onChange}
      maxLength="35"
      value={value}
      placeholder="It's a nice day!"
      required
    />
  </div>
);
const Profile = ({ onSubmit, src, name, status }) => (
  <div className="card">
    <form onSubmit={onSubmit}>
      <h1>Profile Card</h1>
      <label className="custom-file-upload fas">
        <div className="img-wrap">
          <img for="photo-upload" src={src} alt="foto" />
        </div>
      </label>
      <div className="name">{name}</div>
      <div className="status">{status}</div>
      <button type="submit" className="edit">
        Edit Profile{" "}
      </button>
    </form>
  </div>
);
const Edit = ({ onSubmit, children }) => (
  <div className="card">
    <form onSubmit={onSubmit}>
      <h1>Profile Card</h1>
      {children}
      <button type="submit" className="save">
        Save{" "}
      </button>
    </form>
  </div>
);
const ImgUpload = ({ onChange, src }) => (
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload">
      <img for="photo-upload" src={src} alt="foto" />
    </div>
    <input id="photo-upload" type="file" onChange={onChange} />
  </label>
);

export const CardProfile = () => {
  const [imageComp, setImageComp] = useState({
    file: "",
    imagePreviewUrl:
      "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true",
    name: "",
    status: "",
    active: "edit",
  });

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setImageComp({
        ...imageComp,
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };
  // const editName = (e) => {
  //   const name = e.target.value;
  //   setImageComp({
  //     ...imageComp,
  //     name,
  //   });
  // };
  // const editStatus = (e) => {
  //   const status = e.target.value;
  //   setImageComp({
  //     ...imageComp,
  //     status,
  //   });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    let activeP = imageComp.active === "edit" ? "profile" : "edit";
    setImageComp({
      ...imageComp,
      active: activeP,
    });
  };

  const { imagePreviewUrl, name, status, active } = imageComp;
  return (
    <div>
      {active === "edit" ? (
        <div className="card">
          <form onSubmit={handleSubmit}>
            <h1>Profile Card</h1>
            <label htmlFor="photo-upload" className="custom-file-upload fas">
              <div className="img-wrap img-upload">
                <img for="photo-upload" src={imagePreviewUrl} alt="foto" />
              </div>
              <input id="photo-upload" type="file" onChange={photoUpload} />
            </label>
            <button type="submit" className="save">
              Save{" "}
            </button>
          </form>
        </div>
      ) : (
        <Profile
          onSubmit={handleSubmit}
          src={imagePreviewUrl}
          name={name}
          status={status}
        />
      )}
    </div>
  );
};
