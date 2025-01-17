import React, { Component } from "react";
import { connect } from "react-redux";
import { getStream } from "../../actions";
import flv from "flv.js";

class StreamShow extends Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.props.getStream(this.props.match.params.id);
    this.buildPlayer();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer = () => {
    if (this.player || !this.props.stream) {
      return;
    }
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${this.props.match.params.id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  };

  render() {
    if (!this.props.stream) return <div> Loading... </div>;

    const { title, description } = this.props.stream;
    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { getStream })(StreamShow);
