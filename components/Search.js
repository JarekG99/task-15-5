Search = React.createClass({

  getInitialState() {
    return {
      searchingText: ''
    };
  },

  resetForm: function()  {
    this.setState({searchingText: ''});
},

  handleChange: function(event) {
    var searchingText = event.target.value;
    this.setState({searchingText: searchingText});

    if (searchingText.length > 2) {
      this.props.onSearch(searchingText);
    }

  },

  handleKeyUp: function(event) {
    if (event.keyCode === 13) {
      this.props.onSearch(this.state.searchingText);
    }
  },

    render: function() {
        var styles = {
            fontSize: '1.5em',
            width: '90%',
            maxWidth: '350px'
        };

    return (
            <input
             id="input"
             type="text"
             onChange={this.handleChange}
             placeholder="Write what you want..."
             style={styles}
             value={this.state.searchingText}
             onMouseOver={this.resetForm}

            />
          );
  }
});
