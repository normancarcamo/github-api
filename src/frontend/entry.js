// polifyll only in development use it.
import 'frontend/assets/css/main.css';

// Dependencies:
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import styles from './home.styl';

class App extends Component {
	constructor(props) {
		super(props);
		// Initial state:
		this.state = {};
		// Handlers:
    console.log('Hola mundo.');
	}

	render() {

		return (
      <div>
        <h1 className={styles.title}>Welcome!</h1>
        <a href="/api/github" className={styles.link}>Start here... /api/github</a>
      </div>
    );
	}
}

console.log('Aqui....');

ReactDOM.render(<App name="Norman" />, document.getElementById('app'));

// export default CSSModules(Header, styles);
