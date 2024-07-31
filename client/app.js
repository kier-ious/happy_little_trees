class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };

    // Bind the callAPI method
    this.callAPI = this.callAPI.bind(this);
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div>
        <p>{this.state.apiResponse}</p>
      </div>
    );
  }
}
