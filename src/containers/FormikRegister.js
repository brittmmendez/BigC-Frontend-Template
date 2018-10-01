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
            verifyEmail: Yup.string().oneOf([Yup.ref('email'), null], "Emails don't match").required('Confirmation Email is required'),
            password: Yup.string().min(8, 'Password must be 8 characters or longer').required('Password is required'),
            verifyPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match").required('Confirmation Password is required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            this.props.shop.user.register(values).then(

            );
            // this.props.history.push('/account');
            this.props.history.push('/login');
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <label className="label">
                First Name
                <ErrorMessage className="help is-danger" name="firstName" component="div" />
                <Field className="input" type="firstName" name="firstName" />
              </label>
              <br />
              <label className="label">
                Last Name
                <ErrorMessage className="help is-danger" name="lastName" component="div" />
                <Field className="input" type="lastName" name="lastName" />
              </label>
              <br />
              <label className="label">
                Email
                <ErrorMessage className="help is-danger" name="email" component="div" />
                <Field className="input" type="email" name="email" />
              </label>
              <br />
              <label className="label">
                Confirm Email
                <ErrorMessage className="help is-danger" name="verifyEmail" component="div" />
                <Field className="input" type="verifyEmail" name="verifyEmail" />
              </label>
              <br />
              <label className="label">
                Password
                <ErrorMessage className="help is-danger" name="password" component="div" />
                <Field className="input" type="password" name="password" />
              </label>
              <br />
              <label className="label">
                Confirm Password
                <ErrorMessage className="help is-danger" name="verifyPassword" component="div" />
                <Field className="input" type="password" name="verifyPassword" />
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

export default FormikRegister;
