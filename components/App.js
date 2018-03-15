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
        this.getGif(searchingText, function(gif) {
          this.setState({
            loading: false,
            gif: gif,
            searchingText: searchingText
          });
        }.bind(this));
      },

      getGif: httpGet(searchingText)
      .then(response => {
            const data = JSON.parse(xhr.responseText).data;
            const gif = {
                 url: data.fixed_width_downsampled_url,
                 sourceUrl: data.url
               };
      })
      .catch(error => console.log('Something went wrong')),


      function httpGet(searchingText) {
        var url = 'http://api.giphy.com' + '/v1/gifs/random?api_key=' + 'dc6zaTOxFJmzC' + '&tag=' + searchingText;
        return new Promise(
          function (resolve, reject) {
              // const url = `http://api.giphy.com/s/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${searchingText}`;
              const xhr = new XMLHttpRequest();
              request.onload = function() {
                if (this.status === 200) {
                  resolve(this.response);
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
      },



    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
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
