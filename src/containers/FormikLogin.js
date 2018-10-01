import React, { Component } from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
}
  from 'formik';
import Yup from 'yup';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

@inject('shop')
@observer
class FormikLogin extends Component {
  render() {
    return (
      <div className="container has-text-centered">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Email not valid').required('Email is required'),
            password: Yup.string().required('Password is required'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            this.props.shop.user.logIn(values);
            setSubmitting(false);
            this.props.history.goBack();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <label className="label ">
                Email
                <ErrorMessage className="help is-danger" name="email" component="div" />
                <div className="control has-icons-left has-icons-right">
                  <Field className="input" type="email" name="email" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope" />
                  </span>
                </div>
              </label>
              <br />
              <label className="label">
                Password
                <ErrorMessage className="help is-danger" name="password" component="div" />
                <div className="control has-icons-left has-icons-right">
                  <Field className="input" type="password" name="password" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock" />
                  </span>
                </div>
              </label>
              <br />
              <button className="button is-dark " type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <h5>
          Need an account?
          <Link to="/register"> Register Here!</Link>
        </h5>
      </div>
    );
  }
}

export default FormikLogin;
