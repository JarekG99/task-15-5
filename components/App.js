App = React.createClass({

    getInitialState() {
      return {
          loading: false,
          searchingText: '',
          gif: {}
      };
    },

    handleSearch: function(searchingText) {
        this.setState({
          loading: true
        });

        this.httpGet(searchingText).then( function(gif) {
          this.setState({
            loading: false,
            gif: gif,
            searchingText: searchingText
          });
        }.bind(this)).catch(error => console.log('Something went wrong'));
      },

    httpGet: function(searchingText) {
        var url = 'http://api.giphy.com' + '/v1/gifs/random?api_key=' + 'dc6zaTOxFJmzC' + '&tag=' + searchingText;
        return new Promise(
          function (resolve, reject) {
              // const url = `http://api.giphy.com/s/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${searchingText}`;
              const request = new XMLHttpRequest();
              request.onload = function() {
                if (this.status === 200) {

                  const data = JSON.parse(request.responseText).data;
                  const gif = {
                       url: data.fixed_width_downsampled_url,
                       sourceUrl: data.url
                     };
                  resolve(gif);

                } else {
                  reject(new Error(this.statusText));
                }
              };
              request.onerror = function() {
                reject(new Error(
                  `XMLHttpRequest Error: ${this.statusText}`
                ));
              };
              request.open('GET', url);
              request.send();
          });
          console.log('searchingText');
      },



    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            <div style={styles}>
                <h1> GIF Loader!</h1>
                <p>Find gif on: <a href='http://giphy.com'>giphy.com</a>. Press space to see next gif.</p>
                <Search onSearch={this.handleSearch}/>
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>
        );
    }
});
