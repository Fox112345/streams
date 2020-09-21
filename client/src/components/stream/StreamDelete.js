import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { getStream, delStream } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StreamList from "./StreamList";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.getStream(this.props.match.params.id);
  }

  renderActions = () => {
    return (
      <>
        <button
          onClick={() => this.props.delStream(this.props.match.params.id)}
          className={`ui button negative`}
        >
          Delete
        </button>
        <Link to={`/`} className={`ui button `}>
          Cancel
        </Link>
      </>
    );
  };

  renderContent = () => {
    if (!this.props.stream) {
      return `Are u sure u want delete this stream?`;
    }

    return `Are u sure u want delete the stream: ${this.props.stream.title}?`;
  };

  render() {
    return (
      <>
        <StreamList />
        <Modal
          title={`Delete stream`}
          descr={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push("/")}
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

export default connect(mapStateToProps, { getStream, delStream })(StreamDelete);
