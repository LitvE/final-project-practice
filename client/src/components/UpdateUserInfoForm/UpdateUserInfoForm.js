import React from 'react';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { clearUserError } from '../../actions/actionCreator';
import styles from './UpdateUserInfoForm.module.sass';
import FormInput from '../FormInput/FormInput';
import Schems from '../../validators/validationSchems';
import Error from '../Error/Error';

const UpdateUserInfoForm = (props) => {
  const {
    onSubmit, submitting, error, clearUserError,
  } = props;
  return (
    <Formik onSubmit={onSubmit} initialValues={props.initialValues} validationSchema={Schems.UpdateUserSchema}>
      {formikProps => {
          return(
            <Form className={styles.updateContainer}>
              {error && <Error data={error.data} status={error.status} clearError={clearUserError} />}
              <div className={styles.container}>
                <span className={styles.label}>First Name</span>
                <FormInput
                  name="firstName"
                  type="text"
                  label="First Name"
                  classes={{
                    container: styles.inputContainer,
                    input: styles.input,
                    warning: styles.error,
                    notValid: styles.notValid,
                  }}
                />
              </div>
              <div className={styles.container}>
                <span className={styles.label}>Last Name</span>
                <FormInput
                  name="lastName"
                  type="text"
                  label="LastName"
                  classes={{
                    container: styles.inputContainer,
                    input: styles.input,
                    warning: styles.error,
                    notValid: styles.notValid,
                  }}
                />
              </div>
              <div className={styles.container}>
                <span className={styles.label}>Display Name</span>
                <FormInput
                  name="displayName"
                  type="text"
                  label="Display Name"
                  classes={{
                    container: styles.inputContainer,
                    input: styles.input,
                    warning: styles.error,
                    notValid: styles.notValid,
                  }}
                />
              </div>
              <div className={styles.imageUploadContainer}>
                <div className={styles.uploadInputContainer}>
                  <span>Support only images (*.png, *.gif, *.jpeg)</span>
                  <input id="fileInput" name="file" type="file" accept=".jpg, .png, .jpeg" onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    formikProps.setFieldValue("file", file);
                    const node = window.document.getElementById('imagePreview');
                    const reader = new FileReader();
                    reader.onload = () => {
                      node.src = reader.result;
                    };
                    reader.readAsDataURL(file);
                  }}/>
                  <label htmlFor="fileInput">Chose file</label>
                </div>
                <img id="imagePreview" className={styles.imgStyle} alt="user" />
              </div>
              <button type="submit" disabled={submitting}>
                Submit
              </button>
            </Form>
          )
      }}
    </Formik>
  );
};

const mapStateToProps = (state) => {
  const { data, error } = state.userStore;
  return {
    error,
    initialValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      displayName: data.displayName,
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  clearUserError: () => dispatch(clearUserError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserInfoForm);
