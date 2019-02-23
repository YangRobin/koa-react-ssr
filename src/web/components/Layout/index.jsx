

import React from 'react';
import Header from "../header/index.jsx"
import Footer from '../footer/index.jsx';
import style from "./style.scss"

const Layout = (ChildComponent) => class extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<ChildComponent />
				<Footer />
			</div>
		)
	}
}
export default Layout;
