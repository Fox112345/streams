import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { getStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends Component {
  componentDidMount() {
    this.props.getStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    const { stream } = this.props;

    if (!stream) return <div>Loading...</div>;

    return (
      <>
        <h3>Edit Stream</h3>
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(stream, "title", "description")}
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { getStream, editStream })(StreamEdit);
