import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions";

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) errors.title = `You must enter title`;
  if (!formValues.description)
    errors.description = `You must enter description`;

  return errors;
};

class StreamCreate extends React.Component {
  renderInput = ({ input, label, meta }) => {
    return (
      <div className={meta.touched && meta.error ? "field error" : "field"}>
        <label>{label}</label>
        <input {...input} autoComplete={`off`} />
        {meta.touched ? (
          <div className={`ui error message`}>{meta.error}</div>
        ) : null}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className={`ui form error`}
        >
          <Field
            name={`title`}
            component={this.renderInput}
            label={`Enter Title`}
          />
          <Field
            name={`description`}
            component={this.renderInput}
            label={`Enter Description`}
          />
          <button className={`ui button primary`}>Submit</button>
        </form>
      </div>
    );
  }
}

const formWrapped = reduxForm({
  form: "streamCreate",
  validate,
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
