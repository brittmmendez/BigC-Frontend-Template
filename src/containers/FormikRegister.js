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
class FormikRegister extends Component {
  render() {
    return (
      <div className="container has-text-centered">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            verifyEmail: '',
            password: '',
            verifyPassword: '',
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            email: Yup.string().email('Email not valid').required('Email is required'),
            verifyEmail: Yup.string().oneOf([Yup.ref('email'), null], 'Emails do not match').required('Confirmation Email is required'),
            password: Yup.string().min(8, 'Password must be 8 characters or longer').required('Password is required'),
            verifyPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match').required('Confirmation Password is required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            this.props.shop.user.register(values)
              .then((response) => {
                if (response) {
                  setSubmitting(false);
                  this.props.history.push('/login');
                } else {
                  console.log('error');
                  setSubmitting(false);
                }
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {this.props.shop.user.registerError
                && (
                  <strong>
                    <p className="help is-danger">
                      Account not created. Username already exists. Please
                      <Link to="/login"> Log In!</Link>
                    </p>
                  </strong>
                )}
              <label className="label">
                First Name
                <ErrorMessage className="help is-danger" name="firstName" component="div" />
                <div className="control has-icons-left has-icons-right">
                  <Field className="input" type="firstName" name="firstName" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user" />
                  </span>
                </div>
              </label>
              <br />
              <label className="label">
                Last Name
                <ErrorMessage className="help is-danger" name="lastName" component="div" />
                <div className="control has-icons-left has-icons-right">
                  <Field className="input" type="lastName" name="lastName" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user" />
                  </span>
                </div>
              </label>
              <br />
              <label className="label">
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
                Confirm Email
                <ErrorMessage className="help is-danger" name="verifyEmail" component="div" />
                <div className="control has-icons-left has-icons-right">
                  <Field className="input" type="verifyEmail" name="verifyEmail" />
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
              <label className="label">
                Confirm Password
                <ErrorMessage className="help is-danger" name="verifyPassword" component="div" />
                <div className="control has-icons-left has-icons-right">
                  <Field className="input" type="password" name="verifyPassword" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock" />
                  </span>
                </div>
              </label>
              <br />
              <button className="button is-primary " type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <h5>
          Already have an account?
          <Link to="/login"> Log In!</Link>
        </h5>
      </div>
    );
  }
}

export default FormikRegister;
