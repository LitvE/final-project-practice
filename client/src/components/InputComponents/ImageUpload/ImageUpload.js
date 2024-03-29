import React from 'react';
import classNames from 'classnames';
import { useField } from 'formik';

const ImageUpload = (props) => {
  const [field, meta, helpers ] = useField(props.name);
  const { uploadContainer, inputContainer, imgStyle } = props.classes;
  const {setofferdata} = props;

  const onChange = (e) => {
    const node = window.document.getElementById('imagePreview');
    const file = e.target.files[0];
    const imageType = /image\/jpeg/;
    if (!file.type.match(imageType)) {
      e.target.value = '';
    } else {
      setofferdata(file);
      field.onChange(e);
      const reader = new FileReader();
      reader.onload = () => {
        node.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.png, *.gif, *.jpeg)</span>
        <input
          {...field}
          {...props}
          id="fileInput"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={onChange}
        />
        {meta.touched && meta.error ? (<div className="error">{meta.error}</div>) : null}
        <label htmlFor="fileInput">Chose file</label>
      </div>
      <img id="imagePreview" className={classNames({ [imgStyle]: !!field.value })} alt="user" />
    </div>
  );
};

export default ImageUpload;
