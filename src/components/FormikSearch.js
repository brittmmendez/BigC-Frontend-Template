import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import Yup from 'yup';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@inject('shop')
@observer
class FormikSearch extends Component {
  render() {
    return (
      <Formik
        initialValues={{ search: '' }}
        validationSchema={Yup.object().shape({
          search: Yup.string().required(),
        })}
        onSubmit={(searchTerm, { setSubmitting, resetForm }) => {
          this.props.closeNav();
          this.props.history.push(`/search/${searchTerm.search}`);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="field has-addons">
              <div className="control">
                <Field className="input" type="search" name="search" placeholder="Search Now" />
              </div>
              <div className="control">
                <button className="button is-rounded" type="submit" disabled={isSubmitting}>
                  Search
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}

export default withRouter(FormikSearch);
